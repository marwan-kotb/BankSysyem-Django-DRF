from django.urls import path
from . import views

app_name = 'bank'
urlpatterns = [
    path("api/customer/", views.customer, name="customer"),
    path("api/customer/<int:pk>/", views.customer_detail, name="customerDetails"),
    path("api/account/", views.account, name="account"),
    path("api/account/<int:pk>", views.account_detail, name="accountDetails"),
    path("api/product/", views.product, name="product"),
    path("api/product/<int:pk>", views.product_detail, name="productDetails"),
    path("api/merchant/", views.merchant, name="merchant"),
    path("api/customer/purchase/", views.purchase, name="purchase"),
    path("api/customer/purchase/<int:pk>", views.purchase_detail, name="purchasedetail"),
    path("api/transaction/", views.transaction, name="transaction"),
    path("api/customertype/", views.customertype, name="customertype"),
    path("api/accounttype/", views.accounttype, name="accounttype"),
    path("api/accounttypedetail/<int:pk>", views.accounttypedetail, name="accounttypedetail"),
    path("api/customertypedetail/<int:pk>", views.customertypedetail, name="customertypedetail"),
    path("api/merchantdetail/<int:pk>", views.merchantdetail, name="merchantdetail"),

]
