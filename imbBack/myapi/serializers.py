#serializers.py 

from rest_framework import serializers
from .models import Product

        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
    
    def create(self, validated_data):
        instance = Product.objects.create(**validated_data)
        return instance
        
        
class UpdateProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ['productId', 'productName', 'scrumMaster', 'productOwner', 'developers', 'Methodology']