# Generated by Django 2.2.6 on 2019-10-13 21:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Mainpage', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='markcoord',
            name='timecreate',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]