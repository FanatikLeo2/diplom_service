# Generated by Django 5.1.2 on 2024-10-17 18:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('autoservice', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='maintainance',
            old_name='tm_type',
            new_name='maintanance_type',
        ),
    ]
