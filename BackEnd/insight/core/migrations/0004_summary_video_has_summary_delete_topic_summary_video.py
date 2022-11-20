# Generated by Django 4.1.3 on 2022-11-20 03:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_alter_video_url_alter_video_video_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="Summary",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("content", models.TextField(blank=True, null=True)),
                ("question_counter", models.IntegerField(default=0)),
                ("start_timestamp", models.FloatField(default=0)),
                ("end_timestamp", models.FloatField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name="video",
            name="has_summary",
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(name="Topic",),
        migrations.AddField(
            model_name="summary",
            name="video",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="summeries",
                to="core.video",
            ),
        ),
    ]
