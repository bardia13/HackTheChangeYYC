# Generated by Django 4.1.3 on 2022-11-20 05:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_rename_end_timestamp_summary_end_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Keyword",
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
                ("keyword", models.CharField(max_length=100)),
                (
                    "summary",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="keywords",
                        to="core.summary",
                    ),
                ),
            ],
        ),
    ]
