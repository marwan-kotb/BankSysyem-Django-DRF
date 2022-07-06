from dataclasses import field, fields
from pyexpat import model
from statistics import mode
from rest_framework import serializers
from .models import *

class customerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customers
        fields = '__all__' 
        #["id", "username", "password", "CustomerPhone", "date_joined", "OtherDetails", "CustomerTypeCode"]

class accountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accounts
        fields = '__all__'

class merchantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Merchant
        fields = '__all__'

class productSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductsAndServices
        fields = '__all__'

class customerpurchaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerPurchase
        fields = '__all__'

class transactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = '__all__'

class customertypesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomerTypes
        fields = '__all__'

class accounttypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AccountType
        fields = '__all__'

