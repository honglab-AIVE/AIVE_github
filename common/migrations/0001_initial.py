# Generated by Django 4.1.1 on 2022-09-21 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CommCode",
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
                ("cl_code", models.CharField(max_length=5)),
                ("cl_code_nm", models.TextField()),
                ("code", models.CharField(max_length=3)),
                ("code_nm", models.TextField()),
                ("code_dc", models.TextField(null=True)),
                ("use_yn", models.CharField(default="Y", max_length=1)),
                ("regist_id", models.TextField()),
                ("regist_dt", models.DateTimeField()),
            ],
        ),
        migrations.AddConstraint(
            model_name="commcode",
            constraint=models.UniqueConstraint(
                fields=("cl_code", "code"), name="COMM_CODE Unique"
            ),
        ),
    ]
