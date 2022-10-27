from rest_framework import serializers

from app.models import Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    """Serializer for ingredients."""

    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipes."""

    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = '__all__'

    def _get_or_create_ingredients(self, ingredients, recipe):
        """Handle getting or creating ingredients as needed."""
        for ingredient in ingredients:
            ingredient_obj, created = Ingredient.objects.get_or_create(
                **ingredient
            )
            recipe.ingredients.add(ingredient_obj)

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        self._get_or_create_ingredients(ingredients_data, recipe)
        return recipe

    def update(self, instance, validated_data):
        ingredients = validated_data.pop('ingredients', None)
        if ingredients is not None:
            instance.ingredients.clear()
            self._get_or_create_ingredients(ingredients, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

    #
    #     def _get_or_create_ingredients(self, ingredients, recipe):
    #         """Handle getting or creating ingredients as needed."""
    #         for ingredient in ingredients:
    #             ingredient_obj, created = Ingredient.objects.get_or_create(
    #                 **ingredient
    #             )
    #             recipe.ingredients.add(ingredient_obj)
    #
    #     ingredients = validated_data.pop('ingredients', None)
    #     if ingredients is not None:
    #         instance.ingredients.clear()
    #         self._get_or_create_ingredients(ingredients, instance)
    #
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
