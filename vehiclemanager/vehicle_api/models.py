from django.db import models

# Create your models here.



class Manufacturer(models.Model):
    manufacturer_name = models.CharField(max_length=100, blank=False)
    def __str__(self):
        return self.manufacturer_name

class VehicleColor(models.Model):
    color_slug = models.CharField(max_length=10, blank=False)
    color_name = models.CharField(max_length=100)
    def __str__(self):
        return self.color_slug

class VehicleModel(models.Model):
    model_name = models.CharField(max_length=100)
    def __str__(self):
        return self.model_name

class VehicleType(models.Model):
    type_slug = models.CharField(max_length=12, blank=False)
    type_name = models.CharField(max_length=100)
    def __str__(self):
        return self.type_slug

class Vehicle(models.Model):
    manufacturer = models.ForeignKey('Manufacturer', related_name='vehicle_manufaturer')
    model = models.ForeignKey('VehicleModel', related_name='vehicle_model')
    color = models.ForeignKey('VehicleColor', related_name='vehicle_color')
    kms = models.PositiveIntegerField(default=0)
    engine = models.DecimalField(max_digits=5, decimal_places=3)
    vehicle_type = models.ForeignKey('VehicleType', related_name='vehicle_type')


