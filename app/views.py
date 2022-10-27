from rest_framework import viewsets
from app.models import Recipe, Ingredient
from app import serializers


class RecipeViewSet(viewsets.ModelViewSet):
    """View for manage Recipe APIs."""
    serializer_class = serializers.RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        name = self.request.query_params.get('name')
        queryset = self.queryset
        if name:
            queryset = queryset.filter(name__icontains=name)

        return queryset.order_by('-id').distinct()

