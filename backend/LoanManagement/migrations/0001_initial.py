# Generated by Django 4.1.12 on 2023-10-28 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('loan_type', models.CharField(max_length=255)),
                ('id_proof', models.CharField(max_length=255)),
                ('due_date', models.DateField()),
                ('loan_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('loan_id', models.IntegerField()),
            ],
        ),
    ]
