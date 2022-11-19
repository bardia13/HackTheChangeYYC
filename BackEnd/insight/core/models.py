from django.db import models
from .utility import get_yt_video_id
# Create your models here.

class Video(models.Model):
    url = models.URLField(blank=False, null=False)
    video_id = models.CharField(blank=True, null=True, max_length=100)
    platform = models.CharField(default="Youtube", null=False, blank=False, max_length=50)

    def save(self, *args, **kwargs):
        self.video_id = get_yt_video_id(self.url)
        super(Video, self).save(*args, **kwargs)

    
class Topic(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="topics")
    name = models.CharField(max_length=200, null=False, blank=False)
    content = models.TextField(blank=True, null=True)
    question_counter = models.IntegerField(default=0)
    start_timestamp = models.FloatField(default=0, null=False, blank=False)
    end_timestamp = models.FloatField(default=0, null=False, blank=False)

    