# Generated by Django 4.1 on 2022-12-14 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_aive', '0006_prdctninfo_output_virus_rna_seq_1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prdctninfo',
            name='public_yn',
            field=models.CharField(default='N', max_length=1),
        ),
    ]
