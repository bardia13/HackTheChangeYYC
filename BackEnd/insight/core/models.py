from django.db import models
from .utility import get_yt_video_id
from .transcript import get_transcript
from .ml import get_summary_of_transcript
import json
# Create your models here.

class Video(models.Model):
    url = models.URLField(blank=True, null=True)
    video_id = models.CharField(blank=False, null=False, max_length=100)
    platform = models.CharField(default="Youtube", null=False, blank=False, max_length=50)
    
    def get_summary(self):
        transcripts = json.loads(get_transcript(self.video_id))
        return get_summary_of_transcript(transcripts)
        


    
class Topic(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="topics")
    name = models.CharField(max_length=200, null=False, blank=False)
    content = models.TextField(blank=True, null=True)
    question_counter = models.IntegerField(default=0)
    start_timestamp = models.FloatField(default=0, null=False, blank=False)
    end_timestamp = models.FloatField(default=0, null=False, blank=False)

    