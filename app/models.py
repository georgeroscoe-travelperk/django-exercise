from django.db import models


class Recipe(models.Model):
    """Recipes."""
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    """Ingredient for recipes."""
    name = models.CharField(max_length=255)
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name='ingredients',
        null=True,
        blank=True)

    def __str__(self):
        return self.name
