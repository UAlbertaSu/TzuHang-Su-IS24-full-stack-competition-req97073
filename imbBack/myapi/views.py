from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import ProductSerializer, DeveloperSerializer, ScrumMasterSerializer
from .models import Product, Developer, ScrumMaster
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class DeveloperViewSet(viewsets.ModelViewSet):
    queryset = Developer.objects.all()
    serializer_class = DeveloperSerializer
    
class ScrumMasterViewSet(viewsets.ModelViewSet):
    queryset = ScrumMaster.objects.all()
    serializer_class = ScrumMasterSerializer