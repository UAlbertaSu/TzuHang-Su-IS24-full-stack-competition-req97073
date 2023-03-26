#serializers.py 

from rest_framework import serializers
from .models import Product, Developer, ScrumMaster


    
class DeveloperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields =['developerName']
        
class ScrumMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrumMaster
        fields = ['scrumMasterName']
        
        
class ProductSerializer(serializers.ModelSerializer):
    developers = DeveloperSerializer(many = True)
    scrumMaster = ScrumMasterSerializer(many = False)
    class Meta:
        model = Product
        fields = ['productId', 'productName', 'scrumMaster', 'productOwner', 'developers', 'startDate', 'Methodology']
        
       