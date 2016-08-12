from rest_framework import serializers
from vehicle_api.models import Vehicle, VehicleColor, Manufacturer, VehicleType, VehicleModel

class VehicleSerializer(serializers.ModelSerializer):
    model = serializers.SlugRelatedField(many=False, slug_field='model_name', queryset=VehicleModel.objects.all())
    manufacturer = serializers.SlugRelatedField(many=False, slug_field='manufacturer_name', queryset=Manufacturer.objects.all())
    color = serializers.SlugRelatedField(many=False, slug_field='color_slug', queryset=VehicleColor.objects.all())
    vehicle_type = serializers.SlugRelatedField(many=False, slug_field='type_slug', queryset=VehicleType.objects.all())
    class Meta:
        model = Vehicle
        fields = ('id', 'manufacturer', 'model', 'color', 'kms', 'engine', 'vehicle_type')

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ('id', 'manufacturer_name')

class VehicleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleModel
        fields = ('id', 'model_name')

