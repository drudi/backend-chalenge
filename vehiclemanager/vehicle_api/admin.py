from django.contrib import admin

from .models import Manufacturer, VehicleColor, VehicleType, VehicleModel
# Register your models here.

admin.site.register(VehicleColor)
admin.site.register(VehicleType)
