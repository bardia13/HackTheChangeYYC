# Generated by Django 4.1.3 on 2022-11-19 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="video",
            name="video_id",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
