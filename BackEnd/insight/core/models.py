from django.db import models
from .utility import get_yt_video_id
from .transcript import get_transcript
from .ml import get_summary_of_transcript, get_text_keywords
from django.db.models.signals import post_save
from django.dispatch import receiver
import json
# Create your models here.

class Video(models.Model):
    url = models.URLField(blank=True, null=True)
    video_id = models.CharField(blank=False, null=False, max_length=100)
    platform = models.CharField(default="Youtube", null=False, blank=False, max_length=50)
    has_summary = models.BooleanField(default=False)    
        
@receiver(post_save, sender=Video)
def video_post_save(sender, **kwargs):
    print("in here !")
    instance = kwargs["instance"]
    transcripts = json.loads(get_transcript(instance.video_id))
    if not instance.has_summary:
        summaries = get_summary_of_transcript(transcripts) 
        for summary in summaries:
            keywords = get_text_keywords(summary["text"])
            obj = Summary.objects.create(
                video = instance,
                text = summary["text"],
                start = summary["start"],
                end = summary["end"]
            )
            for keyword in keywords:
                Keyword.objects.create(
                    summary = obj,
                    keyword = keyword
                )

    
class Summary(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="summaries")
    text = models.TextField(blank=True, null=True)
    question_counter = models.IntegerField(default=0)
    start = models.FloatField(default=0, null=False, blank=False)
    end = models.FloatField(default=0, null=False, blank=False)

class Keyword(models.Model):
    summary = models.ForeignKey(Summary, on_delete=models.CASCADE, related_name="keywords")
    keyword = models.CharField(max_length=100, null=False, blank=False)
    