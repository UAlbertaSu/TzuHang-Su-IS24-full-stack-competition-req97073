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
    # create a new product
    def create(self, request):
        # append to a list element returned by json.load therefore each time a create function is called
        # the data is reupdated. NOT very ideal, loads and dumps work unexpectedly. 
        # no error checking yet. 
        with open('data.json', "r") as f:
            
            data = json.load(f)
            
            newData = request.data
            data.append(newData)
        with open('data.json', "w") as writeF:
            json.dump(data,writeF)
        f.close()
        return Response(data, status = status.HTTP_200_OK)
        
               
    # list all active products
    def list(self, request):
        
        with open('data.json') as f:
            data = json.load(f)
            
        f.close()
        return Response(data, status = status.HTTP_200_OK)
    
    # get a specific product by productId, or by developer or Scrum Master
    def retrieve(self, request, pk):
        productList = []
        with open('data.json') as f:
            reqData = json.load(f)
            print(type(pk))
            if type(pk) == str:
                query = pk
                for i in range(len(reqData)):
                    if query in str(reqData[i]["productId"]):
                        productList.append(reqData[i])
                        break
                    if query in reqData[i]["Developers"]:
                        productList.append(reqData[i])
                    if query in reqData[i]["scrumMasterName"]:
                        productList.append(reqData[i])
                if productList:    
                    return Response(productList, status = status.HTTP_200_OK)
                elif not productList:
                
                    return Response("Error: No such entries exist",
                        status = status.HTTP_404_NOT_FOUND)
        f.close()   
        return Response("No Such entries Exist",
                        status = status.HTTP_404_NOT_FOUND)
    
        
    # update a product
    #just update? 
    def update(self, request, pk):
        
        with open('data.json', "r+") as f:
            data = json.load(f)
            productId = int(pk)
            listofIds = []
            for j in range(len(data)):
                listofIds.append(data[j]["productId"])
            for i in range(len(data)):
                if request.data["productId"] in listofIds:
                    return Response("Error: Product ID already exists", status = status.HTTP_400_BAD_REQUEST)
                if data[i]["productId"] == productId:
                    if request.data["startDate"] != data[i]["startDate"]:
                        f.close()
                        return Response("Error: You cannot change the start date of a project", status = status.HTTP_400_BAD_REQUEST)
                    else:
                        f.close()
                        data[i] = request.data
                        with open('data.json', "w") as writeF:        
                            json.dump(data, writeF)
                            f.close()
                            return Response(data[i], status = status.HTTP_200_OK)
             
    def destroy(self, request, pk):
        with open('data.json', "r+") as f:
            data = json.load(f)
            productId = int(pk)
            listofIds = []
            for j in range(len(data)):
                listofIds.append(data[j]["productId"])
            for i in range(len(data)):
                if productId not in listofIds:
                    f.close()
                    return Response("Error: Product ID does not exist", status = status.HTTP_400_BAD_REQUEST)
                if data[i]["productId"] == productId:
                    data.pop(i)
                    with open('data.json', "w") as writeF:        
                        json.dump(data, writeF)
                        f.close()
                        return Response("Product Deleted", status = status.HTTP_200_OK)
  