from vehicle_api.models import Vehicle, VehicleModel, Manufacturer
from vehicle_api.serializers import VehicleSerializer, VehicleModelSerializer, ManufacturerSerializer
from rest_framework import generics


# Vechicle views
class VehicleList(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class VehicleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

# VehicleModel views
class VehicleModelList(generics.ListCreateAPIView):
    queryset = VehicleModel.objects.all()
    serializer_class = VehicleModelSerializer

class VehicleModelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = VehicleModel.objects.all()
    serializer_class = VehicleModelSerializer

# Manufacturer views
class ManufacturerList(generics.ListCreateAPIView):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer

class ManufacturerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
