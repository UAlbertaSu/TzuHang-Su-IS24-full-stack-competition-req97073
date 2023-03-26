# Generated by Django 4.1.7 on 2023-03-26 02:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Developers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('developerName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ScrumMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scrumMasterName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('productId', models.IntegerField(primary_key=True, serialize=False)),
                ('productName', models.CharField(max_length=100)),
                ('productOwner', models.CharField(max_length=100)),
                ('startDate', models.DateField()),
                ('Methodology', models.CharField(max_length=100)),
                ('developers', models.ManyToManyField(to='myapi.developers')),
                ('scrumMaster', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='myapi.scrummaster')),
            ],
        ),
    ]