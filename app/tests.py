from django.test import TestCase
from django.urls import reverse

from app.models import Recipe, Ingredient
from rest_framework import status
from rest_framework.test import APIClient

from app.serializers import RecipeSerializer

RECIPES_URL = reverse('recipe:recipe-list')


def create_recipe(**params):
    defaults = {
        'name': 'Sample name',
        'description': 'Sample description'
    }
    defaults.update(params)

    recipe = Recipe.objects.create(**defaults)

    return recipe


def detail_url(recipe_id):
    """Create and return a recipe detail URL."""
    return reverse('recipe:recipe-detail', args=[recipe_id])


# Create your tests here.
class ModelTests(TestCase):
    """Test models."""

    def test_create_recipe(self):
        recipe = create_recipe()

        self.assertEqual(str(recipe), recipe.name)

    def test_create_ingredient(self):
        ingredient = Ingredient.objects.create(name='Flour')

        self.assertEqual(str(ingredient), ingredient.name)


class RecipeApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_retrieve_recipes(self):
        create_recipe()
        create_recipe()

        res = self.client.get(RECIPES_URL)

        recipes = Recipe.objects.all().order_by('-id')
        serializer = RecipeSerializer(recipes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(recipes.count(), 2)
        self.assertEqual(res.data, serializer.data)

    def test_create_recipe(self):
        """Test creating a recipe."""
        payload = {
            'name': 'Sample recipe',
            'description': 'Sample description',
            'ingredients': [{'name': 'Ingredient 1'}, {'name': 'Ingredient 2'}]
        }

        res = self.client.post(RECIPES_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        recipe = Recipe.objects.get(id=res.data['id'])
        for k, v in payload.items():
            if k == 'ingredients':
                continue
            self.assertEqual(getattr(recipe, k), v)

    def test_partial_update(self):
        """Test partial update of recipe."""

        original_name = 'Sample name'
        recipe = create_recipe()

        payload = {
            'description': 'New description',
            'ingredients': [{'name': 'Ingredient 1'}, {'name': 'Ingredient 2'}]
        }

        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, format='json')
        recipe = Recipe.objects.get(id=res.data['id'])

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        recipe.refresh_from_db()
        self.assertEqual(recipe.name, original_name)
        self.assertEqual(recipe.description, payload['description'])

    def test_full_update(self):
        """Test full update of recipe."""
        recipe = create_recipe()

        payload = {
            'name': 'New recipe name',
            'description': 'New sample recipe description',
            'ingredients': [{'name': 'Ingredient 1'}, {'name': 'Ingredient 2'}]
        }

        url = detail_url(recipe.id)
        res = self.client.put(url, payload, format='json')
        recipe = Recipe.objects.get(id=res.data['id'])

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        recipe.refresh_from_db()
        self.assertEqual(recipe.name, payload['name'])
        self.assertEqual(recipe.description, payload['description'])

    def test_delete_recipe(self):
        """Test deleting a recipe successful."""
        recipe = create_recipe()
        url = detail_url(recipe.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Recipe.objects.filter(id=recipe.id).exists())

    def test_filter_by_name_substring(self):
        """Test filtering by substring"""
        r1 = create_recipe(name='Pizza', description='Tasty')
        r2 = create_recipe(name='Chips', description='Yummy')

        params = {'name': 'Pi'}
        res = self.client.get(RECIPES_URL, params)
        s1 = RecipeSerializer(r1)
        s2 = RecipeSerializer(r2)
        self.assertIn(s1.data, res.data)
        self.assertNotIn(s2.data, res.data)
