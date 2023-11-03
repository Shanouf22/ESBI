from django.urls import path
from Transaction import views

urlpatterns = [
    path('api/handletransaction', views.handle_transaction),
    path('api/getstatements', views.get_statements),
    path('api/credittokens', views.credit_tokens), 
]