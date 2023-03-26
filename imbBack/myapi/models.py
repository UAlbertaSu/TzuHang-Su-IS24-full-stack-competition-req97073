from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
      
class Product(models.Model):
    class methadologyChoice(models.TextChoices):
        
        UNDECIDED = 'Undecided'
        AGILE = 'Agile'
        WATERFALL = 'Waterfall'
    
    productId = models.AutoField(primary_key=True)
    productName = models.CharField(max_length=100)
    scrumMaster = models.CharField(max_length=100)
    productOwner = models.CharField(max_length=100)
    developers = ArrayField(models.TextField(null = True), default = list, blank = True)
    startDate = models.DateField()
    Methodology = models.CharField(max_length=100, choices = methadologyChoice.choices, default = methadologyChoice.UNDECIDED)
    
    def __str__(self):
        return self.productName

