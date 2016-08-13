from django.test import TestCase
from django.urls import reverse
from .models import *
import json
from vehicle_api import search


# Testing the models
class VehicleTests(TestCase):

    def setUp(self):
        self.manufacturer = Manufacturer(manufacturer_name='Honda')
        self.color = VehicleColor(color_slug='branco', color_name='Branca')
        self.vehicle_type = VehicleType(type_slug='moto', type_name='Moto')
        self.model = VehicleModel(model_name='NX200')

    def test_creating_vehicle_instance_with_unsaved_references(self):
        """
        Saving a vahicle instance with an invalid color shoulf raise
        an exception
        """
        vehicle = Vehicle(manufacturer=self.manufacturer,
                color=self.color,
                vehicle_type=self.vehicle_type,
                model=self.model,
                kms=500,
                engine=0.200,
            )
        self.assertRaises(ValueError, vehicle.save)

    def test_creating_vehicle_instance_with_references(self):
        self.manufacturer.save()
        self.color.save()
        self.vehicle_type.save()
        self.model.save()
        vehicle = Vehicle(manufacturer=self.manufacturer,
                color=self.color,
                vehicle_type=self.vehicle_type,
                model=self.model,
                kms=500,
                engine=0.200,
            )
        self.assertIsInstance(vehicle, Vehicle)

# Testing the views
class ViewTests(TestCase):
    def setUp(self):
        self.manufacturer = Manufacturer(manufacturer_name='Yamaha')
        self.color = VehicleColor(color_slug='branco', color_name='Branca')
        self.vehicle_type = VehicleType(type_slug='moto', type_name='Moto')
        self.model = VehicleModel(model_name='Tenere')

    def test_create_vehicle(self):
        self.manufacturer.save()
        self.color.save()
        self.vehicle_type.save()
        self.model.save()
        response = self.client.post('/vehicles/',
                self._get_post_data(),
                format='json',
            )
        self.assertEqual(response.status_code, 201)



    def test_listing_all_vehicles(self):
        response = self.client.get('/vehicles/')
        self.assertEqual(response.status_code, 200)

    def _get_post_data(self):
        return json.loads( '''
                {
                    "manufacturer": "Yamaha",
                    "model": "Tenere",
                    "color": "branco",
                    "kms": 0,
                    "engine": "0.250",
                    "vehicle_type": "moto"
                }
                '''
            )

# Testing search module
class SearchTest(TestCase):
    def setUp(self):
        self._create_vehicle(vehicle_type='tipo1', manufacturer='fabri1',
                model='model1', color='color1', kms=0, engine=0.300)
        self._create_vehicle(vehicle_type='tipo1', manufacturer='fabri2',
                model='model2', color='color2', kms=0, engine=0.125)
        self._create_vehicle(vehicle_type='tipo2', manufacturer='fabri3',
                model='model3', color='color3', kms=1000, engine=1.0)
        self._create_vehicle(vehicle_type='tipo2', manufacturer='fabri3',
                model='model4', color='color4', kms=2000, engine=1.0)
        self._create_vehicle(vehicle_type='tipo2', manufacturer='fabri3',
                model='model5', color='color5', kms=5000, engine=1.6)

    def _create_vehicle(self, vehicle_type='moto',
                model=None,
                color=None,
                kms=None,
                engine=None,
                manufacturer=None
            ):
        manufacturer = Manufacturer(manufacturer_name=manufacturer)
        model = VehicleModel(model_name=model)
        color = VehicleColor(color_slug=color, color_name=color)
        vehicle_type = VehicleType(type_slug=vehicle_type, type_name=vehicle_type)
        manufacturer.save()
        model.save()
        color.save()
        vehicle_type.save()
        vehicle = Vehicle(manufacturer=manufacturer,
                model=model,
                color=color,
                vehicle_type=vehicle_type,
                kms=kms,
                engine=engine
            )
        vehicle.save()

    def test_search_by_type(self):
        queryset = search.filter_by_request({'type': 'tipo1'})
        self.assertEqual(queryset.count(), 2)

    def test_search_by_model(self):
        queryset = search.filter_by_request({'model': 'model3'})
        self.assertEqual(queryset.count(), 1)

    def test_search_by_manufacturer(self):
        queryset = search.filter_by_request({'manufacturer': 'fabri3'})
        self.assertEqual(queryset.count(), 3)

    def test_search_by_color(self):
        queryset = search.filter_by_request({'color': 'color1'})
        self.assertEqual(queryset.count(), 1)

    def test_search_by_km(self):
        queryset = search.filter_by_request({'kmslte': 0})
        self.assertEqual(queryset.count(), 2)
        queryset = search.filter_by_request({'kmsgte': 500, 'kmslte': 1999})
        self.assertEqual(queryset.count(), 1)

    def test_search_by_engine(self):
        queryset = search.filter_by_request({'enginegte': 0.050,
                'enginelte': 0.999
            })
        self.assertEqual(queryset.count(), 2)

    def test_search_by_invalid_key(self):
        queryset = search.filter_by_request({'invalidkey': 'invalidvalue'})
        self.assertEqual(queryset.count(), 0)

