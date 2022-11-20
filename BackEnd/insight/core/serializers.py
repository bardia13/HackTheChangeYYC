from rest_framework.serializers import ModelSerializer
from .models import Video, Summary
from .transcript import get_transcript
import json

class SummarySerializer(ModelSerializer):
    class Meta: 
        model = Summary
        fields = ["text", "start", "end"]

class VideoSerializer(ModelSerializer):
    summaries = SummarySerializer(many=True, read_only=True)
    class Meta:
        model = Video
        fields = ["video_id", "summaries"]
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

