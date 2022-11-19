from rest_framework.serializers import ModelSerializer
from .models import Video, Topic
from .transcript import get_transcript
import json
class VideoSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = ["url", "video_id"]
        read_only_fields = ["video_id"]

    def to_representation(self, instance):
        dict = super().to_representation(instance)
        dict["transcript"] = json.loads(get_transcript(dict["video_id"]))
        return dict