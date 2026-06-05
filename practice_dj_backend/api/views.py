from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """One class = full CRUD: list, create, retrieve, update, destroy"""
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
