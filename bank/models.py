from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE





class CustomerTypes(models.Model):
    CustomerTypeDescription = models.TextField(verbose_name=("description"), help_text=("Not Required"), blank=True)


class Customers(AbstractUser):
    cash = models.PositiveIntegerField(null=False, blank=False)
    CustomerPhone = models.PositiveIntegerField(null=False, blank=False, unique=True)
    OtherDetails = models.TextField(verbose_name=("Details"), help_text=("Not Required"), blank=True)
    CustomerTypeCode = models.ForeignKey(CustomerTypes, related_name="c", verbose_name=("Customer Type Code"), on_delete=models.CASCADE)

    class Meta:
        ordering = ("-date_joined",)
   


class AccountType(models.Model):
    AccountTypeDescription = models.TextField(verbose_name=("description"), unique=True, help_text=("Not Required"), blank=True)

class Accounts(models.Model):
    CreatedAt = models.DateTimeField(("Opened at"), auto_now_add=True, editable=False)
    OtherAccountDetails = models.TextField(verbose_name=("details"), help_text=("Not Required"), blank=True)
    AccountTypeCode = models.ForeignKey(AccountType, on_delete=models.CASCADE)
    CustomerId = models.OneToOneField(Customers, on_delete=models.CASCADE)

    class Meta:
            ordering = ("-CreatedAt",)

class Merchant(models.Model):
    MerchantName = models.CharField(
        verbose_name=("Merchant Name"),
        help_text=("Required"),
        max_length=40,
        unique=True,
    )
    MerchantPhone = models.PositiveIntegerField(null=False, blank=False, unique=True)
    MerchantEmail = models.EmailField(null=False, blank=False, unique=True, max_length=40)
    OtherDetailsOfMerchant = models.TextField(verbose_name=("Details of Merchant"), help_text=("Not Required"), blank=True)

class ProductsAndServices(models.Model):
    ProductsAndServicesDescription = models.TextField(verbose_name=("description"), help_text=("Required"), blank=True, null=False)
    MerchantId = models.ForeignKey(Merchant, verbose_name=("Merchant Id"), on_delete=models.CASCADE)


class CustomerPurchase(models.Model):
    Date = models.DateTimeField(("Done at"), auto_now_add=True, editable=False)
    Quantity = models.PositiveIntegerField(
        verbose_name=("Quantity"),
        help_text=("Maximum 99999999"),
        error_messages={
            "name": {
                "max_length": ("The quantity must be between 0 and 99999999"),
            },
        }
        
    )
    OtherDetailsOfPurchase = models.TextField(verbose_name=("Details of Purchase"), help_text=("Not Required"), blank=True)
    CustomersId = models.ForeignKey(Customers, on_delete=models.CASCADE)
    ProductsAndServicesCode = models.ForeignKey(ProductsAndServices, on_delete=models.CASCADE)

    class Meta:
        ordering = ("-id",)
    


class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True, editable=False)
    AmountOfTransaction = models.PositiveIntegerField(
        verbose_name=("Amount Of Transaction"),
        help_text=("Maximum 99999999"),
        error_messages={
            "name": {
                "max_length": ("The Amount must be between 0 and 99999999"),
            },
        }
        
    )
    PurchaseId = models.ForeignKey(CustomerPurchase, on_delete=models.CASCADE)
    AccountId = models.ForeignKey(Accounts, on_delete=models.CASCADE)


    class Meta:
        ordering = ("-date",)
    


