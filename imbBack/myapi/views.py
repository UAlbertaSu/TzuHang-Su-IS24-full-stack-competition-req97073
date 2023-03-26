from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import ProductSerializer, UpdateProductSerializer
from .models import Product
# Create your views here.

    
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = UpdateProductSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)