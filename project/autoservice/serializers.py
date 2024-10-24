from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import (
    MachineModel,
    EngineModel,
    TransmissionModel,
    SteeringAxleModel,
    DrivingAxleModel,
    ServiceCompany,
    Machine,
    MaintenanceType,
    Maintenance,
    FailureNode,
    RecoveryMethod,
    Complaint)


class MachineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineModel
        fields = ['id', 'name', 'description']


class EngineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineModel
        fields = ['id', 'name', 'description']


class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = ['id', 'name', 'description']


class SteeringAxleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SteeringAxleModel
        fields = ['id', 'name', 'description']


class DrivingAxleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivingAxleModel
        fields = ['id', 'name', 'description']


class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ['id', 'name', 'description']


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'groups']


class MachineSerializer(serializers.ModelSerializer):
    machine_model = MachineModelSerializer()
    engine_model = EngineModelSerializer()
    transmission_model = TransmissionModelSerializer()
    steering_axle_model = SteeringAxleModelSerializer()
    driving_axle_model = DrivingAxleModelSerializer()
    date_of_shipment = serializers.DateField()
    client = ClientSerializer()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Machine
        fields = ['id', 'machine_factory_num', 'machine_model',
                  'engine_factory_num', 'engine_model', 
                  'transmission_factory_num', 'transmission_model', 
                  'steering_axle_factory_num', 'steering_axle_model',
                  'driving_axle_factory_num', 'driving_axle_model',
                  'delivery_contract_num', 'date_of_shipment', 
                  'customer', 'delivery_address', 
                  'equipment', 'client', 
                  'service_company',
                ]


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = ['id', 'name', 'description']


class MaintenanceSerializer(serializers.ModelSerializer):
    machine = MachineSerializer()
    maintenance_type = MaintenanceTypeSerializer()
    event_date = serializers.DateField()
    order_date = serializers.DateField()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Maintenance
        fields = ['id', 'machine', 'maintenance_type', 'event_date',
                  'operating_time', 'order_id', 'order_date', 
                  'service_company'
                ]


class FailureNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureNode
        fields = ['id', 'name', 'description']


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ['id', 'name', 'description']


class ComplaintSerializer(serializers.ModelSerializer):
    refusal_date = serializers.DateField()
    failure_node = FailureNodeSerializer()
    recovery_method = RecoveryMethodSerializer()
    recovery_date = serializers.DateField()
    machine = MachineSerializer()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Complaint
        fields = ['id', 'refusal_date', 'operating_time', 'failure_node',
                  'failure_description', 'recovery_method',
                  'spare_parts_used', 'recovery_date',
                  'equipment_downtime', 'machine', 'service_company']