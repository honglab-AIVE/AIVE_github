# Generated by Django 4.1 on 2022-11-14 11:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web_aive', '0002_prdctninfo_prdctn_sj_prdctninfo_public_yn_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='prdctninfo',
            old_name='trget_seq_rgi_end_lc',
            new_name='trget_seq_rgin_end_lc',
        ),
        migrations.RenameField(
            model_name='prdctninfo',
            old_name='trget_seq_rgi_st_lc',
            new_name='trget_seq_rgin_st_lc',
        ),
    ]