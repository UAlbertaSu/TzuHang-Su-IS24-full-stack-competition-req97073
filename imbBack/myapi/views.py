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
            
            listofID=[]
            data = json.load(f)
            for i in range(len(data)):
                listofID.append(data[i]["productId"])
            # check if product ID already exists
            if request.data["productId"] in listofID:
                return Response("Error: Product ID already exists",
                        status = status.HTTP_400_BAD_REQUEST)
            # make new data the request 
            newData = request.data
            #append new data into data list 
            data.append(newData)
        with open('data.json', "w") as writeF:
            json.dump(data,writeF)
        f.close()
        return Response(data, status = status.HTTP_200_OK)
        
               
    # list all products
    def list(self, request):
        
        with open('data.json') as f:
            data = json.load(f)
            
        f.close()
        return Response(data, status = status.HTTP_200_OK)
    
    # get a specific product by productId, or by developer or Scrum Master
    def retrieve(self, request, pk):
        #saves all the products that match the query
        productList = []
       
        with open('data.json') as f:
            reqData = json.load(f)
            #save the query
            query = pk
            
            # check if query is a productID 
            for i in range(len(reqData)):
                
                if query == str(reqData[i]["productId"]):
                    print(i)
                    productList.append(reqData[i])
                    #if match, break and return the product
                    return Response(productList, status = status.HTTP_200_OK)
                
                # if query wants to search by developer or scrum master
                elif query == reqData[i]["Developers"]:
                    productList.append(reqData[i])
                elif query == reqData[i]["scrumMasterName"]:
                    productList.append(reqData[i])
           
            if productList:    
                return Response(productList, status = status.HTTP_200_OK)
            # no matches
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
            # get all the product IDs
            for j in range(len(data)):
                listofIds.append(data[j]["productId"])
            # check if product ID already exists
            if request.data["productId"] in listofIds:
                    return Response("Error: Product ID already exists", status = status.HTTP_400_BAD_REQUEST)
            # else find the right product ID and update it
            for i in range(len(data)):
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
    # delete a product
    def destroy(self, request, pk):
        with open('data.json', "r+") as f:
            data = json.load(f)
            try:
                productId = int(pk)
            except ValueError:
                return Response("Error: Only delete product based on product numbers.", status = status.HTTP_400_BAD_REQUEST)
            listofIds = []
            # check if product exists
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
        return Response("Error: Bad Request", status = status.HTTP_400_BAD_REQUEST)
  