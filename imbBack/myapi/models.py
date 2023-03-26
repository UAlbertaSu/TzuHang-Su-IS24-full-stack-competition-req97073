from django.db import models

# Create your models here.

#TODO: a Class to hold developers working on a product (has-many) 
class Developer(models.Model):
    developerName = models.CharField(max_length=100) 

    def __str__(self):
        return self.developerName
    
# TODO: a Class to hold the scrum masters project (onr-to-many)
class ScrumMaster(models.Model):
    scrumMasterName = models.CharField(max_length=100)
    
    def __str__(self):
        return self.scrumMasterName
           
class Product(models.Model):
    class methadologyChoice(models.TextChoices):
        
        UNDECIDED = 'Undecided'
        AGILE = 'Agile'
        WATERFALL = 'Waterfall'
    
    productId = models.IntegerField(primary_key=True)
    productName = models.CharField(max_length=100)
    scrumMaster = models.ForeignKey(ScrumMaster, on_delete= models.CASCADE)
    productOwner = models.CharField(max_length=100)
    developers = models.ManyToManyField(Developer)
    startDate = models.DateField()
    Methodology = models.CharField(max_length=100, choices = methadologyChoice.choices, default = methadologyChoice.UNDECIDED)
    
    def __str__(self):
        return self.productName

