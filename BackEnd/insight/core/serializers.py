from rest_framework.serializers import ModelSerializer
from .models import Video, Summary, Keyword
from .transcript import get_transcript
from .ml import get_text_keywords
import json

class KeywordSerializer(ModelSerializer):
    class Meta:
        model = Keyword
        fields = ["id", "keyword"]

class SummarySerializer(ModelSerializer):
    keywords = KeywordSerializer(many=True, read_only=True)
    class Meta: 
        model = Summary
        fields = ["id", "text", "start", "end", "keywords"]

class VideoSerializer(ModelSerializer):
    summaries = SummarySerializer(many=True, read_only=True)
    class Meta:
        model = Video
        fields = ["id", "video_id", "summaries"]
        read_only_fields = ["summaries"]

    def to_representation(self, instance):
        dict = super().to_representation(instance)
        dict["transcript"] = json.loads(get_transcript(dict["video_id"]))
        # dict["summary"] = instance.get_summary()
        return dict
    
    def create(self, validated_data):
        try:
            instance = Video.objects.get(video_id = validated_data["video_id"])
            return instance
        except Video.DoesNotExist:
            return super().create(validated_data)

