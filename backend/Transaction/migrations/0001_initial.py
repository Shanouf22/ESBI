# Generated by Django 4.1.12 on 2023-10-29 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('ac_name_payee', models.CharField(max_length=255)),
                ('ac_no_payee', models.IntegerField()),
                ('ac_type_payer', models.CharField(max_length=255)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date_of_transaction', models.DateField()),
            ],
        ),
    ]
