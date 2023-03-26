#serializers.py 

from rest_framework import serializers
from .models import Product

        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
    
    def create(self, validated_data):
        # developers_data = validated_data.pop('developers')
        # print(developers_data)
        # for developer_data in developers_data:
        #     Developer.objects.create(developer_data["developerName"])
        # scrumMaster_data = validated_data.pop('scrumMaster')
        # scrumInstance = ScrumMaster.objects.create(scrumMaster_data)
        # print("Done")
        # validated_data['scrumMaster'] = scrumInstance['scrumMasterId']
        Product.objects.create(**validated_data)
        
class UpdateProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = ['productId', 'productName', 'scrumMaster', 'productOwner', 'developers', 'Methodology']