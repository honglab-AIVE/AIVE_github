# Generated by Django 4.1 on 2022-09-25 06:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PrdctnInfo',
            fields=[
                ('prdctn_info_seq', models.AutoField(primary_key=True, serialize=False)),
                ('prdctn_protein_struct', models.CharField(max_length=2)),
                ('input_virus_seq_1', models.TextField()),
                ('input_virus_seq_2', models.TextField(null=True)),
                ('input_virus_seq_3', models.TextField(null=True)),
                ('input_virus_seq_4', models.TextField(null=True)),
                ('input_virus_seq_5', models.TextField(null=True)),
                ('input_virus_seq_6', models.TextField(null=True)),
                ('input_virus_seq_7', models.TextField(null=True)),
                ('input_virus_seq_8', models.TextField(null=True)),
                ('output_virus_seq_1', models.TextField()),
                ('output_virus_seq_2', models.TextField(null=True)),
                ('output_virus_seq_3', models.TextField(null=True)),
                ('output_virus_seq_4', models.TextField(null=True)),
                ('output_virus_seq_5', models.TextField(null=True)),
                ('output_virus_seq_6', models.TextField(null=True)),
                ('output_virus_seq_7', models.TextField(null=True)),
                ('output_virus_seq_8', models.TextField(null=True)),
                ('prdctn_knd', models.CharField(max_length=1)),
                ('regist_dt', models.DateTimeField()),
                ('regist_id', models.TextField()),
                ('del_yn', models.CharField(default='N', max_length=1)),
                ('del_dt', models.DateTimeField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PolarResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('polar_feature_se', models.CharField(max_length=5)),
                ('struct_se', models.CharField(max_length=5)),
                ('polar_cnt', models.IntegerField()),
                ('regist_dt', models.DateTimeField()),
                ('prdctn_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web_aive.prdctninfo')),
            ],
        ),
        migrations.CreateModel(
            name='JobInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_seq_knd', models.CharField(max_length=3)),
                ('job_prgss_sttus', models.CharField(default='S', max_length=1)),
                ('job_gpu_no', models.IntegerField(default=-1)),
                ('job_cn', models.TextField(null=True)),
                ('job_st_dt', models.DateTimeField(null=True)),
                ('job_end_dt', models.DateTimeField(null=True)),
                ('regist_dt', models.DateTimeField()),
                ('prdctn_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web_aive.prdctninfo')),
            ],
        ),
        migrations.CreateModel(
            name='ApesResult',
            fields=[
                ('apes_result_seq', models.AutoField(primary_key=True, serialize=False)),
                ('ph', models.FloatField()),
                ('rsdue', models.FloatField()),
                ('regist_dt', models.DateTimeField()),
                ('prdctn_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web_aive.prdctninfo')),
            ],
        ),
        migrations.CreateModel(
            name='Af2Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aa_seq_knd', models.CharField(max_length=4)),
                ('regist_dt', models.DateTimeField()),
                ('prdctn_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web_aive.prdctninfo')),
            ],
        ),
        migrations.AddConstraint(
            model_name='polarresult',
            constraint=models.UniqueConstraint(fields=('prdctn_info_id', 'polar_feature_se', 'struct_se'), name='POLAR_RESULT Unique IDX 1'),
        ),
        migrations.AddConstraint(
            model_name='jobinfo',
            constraint=models.UniqueConstraint(fields=('prdctn_info_id', 'job_seq_knd'), name='JOB_INFO Unique IDX 1'),
        ),
        migrations.AddConstraint(
            model_name='apesresult',
            constraint=models.UniqueConstraint(fields=('prdctn_info_id', 'apes_result_seq'), name='APES_RESULT Unique IDX 1'),
        ),
        migrations.AddConstraint(
            model_name='af2result',
            constraint=models.UniqueConstraint(fields=('prdctn_info_id', 'aa_seq_knd'), name='AF2_RESULT Unique IDX 1'),
        ),
    ]
