# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

# from .serializers import ProductSerializer, UpdateProductSerializer
# from .models import Product

import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
class ProductViewSet(viewsets.ViewSet):
    
    # @api_view(['GET'])
    def list(self, request):
        
        with open('data.json') as f:
            data = json.load(f)
            return Response(data, status = status.HTTP_200_OK)
        f.close()
    
    # get a specific product
    def retrieve(self, request, pk):
        productList = []
        with open('data.json') as f:
            reqData = json.load(f)
            if type(pk) == int:
                productId = int(pk)
                for i in range(len(reqData)):
                    if reqData[i]["productId"] == productId:
                        return Response(reqData[i], status = status.HTTP_200_OK)
            elif(type(pk) == str):
                developer = pk
                
                
                for i in range(len(reqData)):
                    if developer in reqData[i]["Developers"]:
                        productList.append(reqData[i])
                if productList:    
                    return Response(productList, status = status.HTTP_200_OK)
                elif(not productList):
                    return Response("Error: The Employee does not exist, or the Employee is not wokring on any project",
                        status = status.HTTP_404_NOT_FOUND)
        f.close()   
        return Response("No Such entries Exist",
                        status = status.HTTP_404_NOT_FOUND)
    
        
# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
    
#     def retrieve(self, request, *args, **kwargs):
#         developer = request.data["develoeprs"]
#         products = Product.objects.filter(developers__icontains = developer)
#         if not products:
#             return Response("response not found", status = status.HTTP_404_NOT_FOUND)
#         serializer = ProductSerializer(products, many=True)
#         return Response(serializer.data, status = status.HTTP_200_OK)
    
#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = UpdateProductSerializer(instance, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
        
#         return Response(serializer.data)