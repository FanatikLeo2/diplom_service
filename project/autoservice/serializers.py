from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *

class MachineModelSerializer(serializers.Modelserializer):
    class Meta:
        model = MachineModel
        fields = ['id', 'name', 'description']

class EngineModelSerializer(serializers.Modelserializer):
    class Meta:
        model = EngineModel
        fields = ['id', 'name', 'description']

class TransmissionModelSerializer(serializers.Modelserializer):
    class Meta:
        model = TransmissionModel
        fields = ['id', 'name', 'description']
    
class SteeringAxleModelSerializer(serializers.Modelserializer):
    class Meta:
        model = SteeringAxleModel
        fields = ['id', 'name', 'description']

class DrivingAxleModelSerializer(serializers.Modelserializer):
    class Meta:
        model = DrivingAxleModel
        fields = ['id', 'name', 'description']

class ServiceCompanySerializer(serializers.Modelserializer):
    class Meta:
        model = ServiceCompany
        fields = ['id', 'name', 'description']

class ClientSerializer(serializers.Modelserializer):
    class Meta:
        model = User
        fields = ['username', 'groups']

class MachineSerializer(serializers.Modelserializer):
    machine_model = MachineModelSerializer()
    engine_model = EngineModelSerializer()
    transmission_model = TransmissionModelSerializer()
    steering_axle_model = SteeringAxleModelSerializer()
    driving_axle_model = DrivingAxleModelSerializer()
    date_of_shipment = serializers.DataField()
    client = ClientSerializer()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Machine
        fields = ['id', 'machine_factory_num', 'machine_model',
                  'engine_factory_num', 'engine_model', 
                  'transmission_factory_num', 'transmission_model', 
                  'steering_axle_model_num', 'steering_axle_model', 
                  'driving_axle_model_num', 'driving_axle_model_model', 
                  'delivery_contract_num', 'date_of_shipment', 
                  'customer', 'delivery_address', 
                  'equipment', 'client', 
                  'service_company',
                ]

class MaintainanceTypeSerializer(serializers.Modelserializer):
    class Meta:
        mosdel = MaintainanceType
        fields = ['id', 'name', 'description']

class MaintainanceSerializer(serializers.Modelserializer):
    machine = MachineSerializer()
    maintanance_type = MaintainanceTypeSerializer()
    event_date = serializers.DataField()
    operating_time = serializers.DataField()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Maintainance
        fields = ['id', 'machine', 'maintanance_type', 'event_date', 
                  'operating_time', 'order_id', 'order_date', 
                  'service_company'
                ]
        
class FailureNodeSerializer(serializers.Modelserializer):
    class Meta:
        model = FailureNode
        fields = ['id', 'name', 'description']

class RecoveryMethodSerializer(serializers.Modelserializer):
    class Meta:
        model = RecoveryMethod
        fields = ['id', 'name', 'description']

class ComplaintSerializer(serializers.Modelserializer):
    refusal_date = serializers.DataField()
    failure_node = FailureNodeSerializer()
    recovery_method = RecoveryMethodSerializer()
    recovery_date = serializers.DataField()
    machine = MachineSerializer()
    service_company = ServiceCompanySerializer()

    class Meta:
        model = Complaint
        fields = ['id', 'refusal_date', 'operating_time', 'failure_node',
                  'failure_description', 'recovery_method',
                  'spare_parts_used', 'spare_parts_used', 'equipment_downtime',
                  'machine', 'service_company']