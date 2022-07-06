from urllib import request
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from bank.models import *
from . serializers import *

@api_view(['GET', 'POST'])
def customer(request):

    if request.method == 'GET':
        alldata = Customers.objects.all()
        serializer = customerSerializer(alldata, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        #newEle = CustomerTypes.objects.create(CustomerTypeDescription=request.data["CustomerTypeCode"])
        try:
            type = CustomerTypes.objects.get(CustomerTypeDescription=request.data["CustomerTypeCode"])
            
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        request.data["CustomerTypeCode"] = type.id
        serializer = customerSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'DELETE'])
def customer_detail(request, pk):

    try:
        snippet = Customers.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = customerSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
def account(request):
    if request.method == 'GET':
        alldata = Accounts.objects.all()
        serializer = accountSerializer(alldata, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        try:
            customer = Customers.objects.get(username=request.data["CustomerId"])
            accounttype = AccountType.objects.get(AccountTypeDescription=request.data["AccountTypeCode"]) 

        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        request.data["CustomerId"] = customer.id
        request.data["AccountTypeCode"] = accounttype.id
        serializer = accountSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'DELETE'])
def account_detail(request, pk):

    try:
        snippet = Accounts.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = accountSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
def merchant(request):

    if request.method == 'GET':
        alldata = Merchant.objects.all()
        serializer = merchantSerializer(alldata, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        
        serializer = merchantSerializer(data=request.data)        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


@api_view(['GET', 'POST'])
def product(request):
    
    if request.method == 'GET':
        alldata = ProductsAndServices.objects.all()
        serializer = productSerializer(alldata, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        
        merchantid = Merchant.objects.get(MerchantName=request.data["MerchantId"])
        request.data['MerchantId'] = merchantid.id

        serializer = productSerializer(data=request.data)        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
        
@api_view(['GET','DELETE'])
def product_detail(request, pk):

    try:
        snippet = ProductsAndServices.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = productSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def purchase(request):
    if request.method == 'GET':
        alldata = CustomerPurchase.objects.all()
        serializer = customerpurchaseSerializer(alldata, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        
        customer_id = Customers.objects.get(username=request.data["CustomersId"])
        Product = ProductsAndServices.objects.get(ProductsAndServicesDescription=request.data["ProductsAndServicesCode"])
        request.data['CustomersId'] = customer_id.id
        request.data["ProductsAndServicesCode"] = Product.id
        
        serializer = customerpurchaseSerializer(data=request.data)        
        if serializer.is_valid():
            t = None
            b = serializer.save()
            try:
                t = Transaction.objects.create(AmountOfTransaction=request.data['Quantity'], PurchaseId=b, AccountId=Accounts.objects.get(CustomerId=request.data['CustomersId'])).save()
                obj = Customers.objects.get(pk=request.data['CustomersId'])
                obj.cash = int(int(obj.cash) - int(request.data['Quantity']))
                obj.save()
                t = False            
            except:
                if t != None:
                    t.delete()
                b.delete()
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
            return Response(serializer.data, status=status.HTTP_201_CREATED)   

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def transaction(request):
    if request.method == 'GET':
        alldata = Transaction.objects.all()
        serializer = transactionSerializer(alldata, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def customertype(request):
    
    if request.method == 'GET':
        alldata = CustomerTypes.objects.all()
        serializer = customertypesSerializer(alldata, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def accounttype(request):
    if request.method == 'GET':
        alldata = AccountType.objects.all()
        serializer = accounttypeSerializer(alldata, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def customertypedetail(request, pk):
    
    try:
        snippet = CustomerTypes.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = customertypesSerializer(snippet)
        return Response(serializer.data)

@api_view(['GET'])
def accounttypedetail(request, pk):
    
    try:
        snippet = AccountType.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = accounttypeSerializer(snippet)
        return Response(serializer.data)



@api_view(['GET'])
def merchantdetail(request, pk):
    
    try:
        snippet = Merchant.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = merchantSerializer(snippet)
        return Response(serializer.data)


@api_view(['GET'])
def purchase_detail(request, pk):
    
    try:
        snippet = CustomerPurchase.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = customerpurchaseSerializer(snippet)
        return Response(serializer.data)