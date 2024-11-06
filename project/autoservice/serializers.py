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
        fields = ['id', 'user', 'name', 'description']


class ClientSerializer(serializers.ModelSerializer):
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True)
    groups_details = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'groups', 'groups_details']

    def get_groups_details(self, obj):
        groups = obj.groups.all()
        return GroupSerializer(groups, many=True).data if groups else None


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class MachineSerializer(serializers.ModelSerializer):
    machine_model = serializers.PrimaryKeyRelatedField(queryset=MachineModel.objects.all())
    machine_model_details = serializers.SerializerMethodField()
    engine_model = serializers.PrimaryKeyRelatedField(queryset=EngineModel.objects.all())
    engine_model_details = serializers.SerializerMethodField()
    transmission_model = serializers.PrimaryKeyRelatedField(queryset=TransmissionModel.objects.all())
    transmission_model_details = serializers.SerializerMethodField()
    steering_axle_model = serializers.PrimaryKeyRelatedField(queryset=SteeringAxleModel.objects.all())
    steering_axle_model_details = serializers.SerializerMethodField()
    driving_axle_model = serializers.PrimaryKeyRelatedField(queryset=DrivingAxleModel.objects.all())
    driving_axle_model_details = serializers.SerializerMethodField()
    client = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    client_details = serializers.SerializerMethodField()
    service_company = serializers.PrimaryKeyRelatedField(queryset=ServiceCompany.objects.all())
    service_company_details = serializers.SerializerMethodField()

    class Meta:
        model = Machine
        fields = ['id', 'machine_factory_num', 'machine_model', 'machine_model_details',
                  'engine_factory_num', 'engine_model', 'engine_model_details',
                  'transmission_factory_num', 'transmission_model', 'transmission_model_details',
                  'steering_axle_factory_num', 'steering_axle_model', 'steering_axle_model_details',
                  'driving_axle_factory_num', 'driving_axle_model', 'driving_axle_model_details',
                  'delivery_contract_num', 'date_of_shipment',
                  'customer', 'delivery_address',
                  'equipment', 'client', 'client_details',
                  'service_company', 'service_company_details',
                  ]
        read_only_fields = ['client']

    def get_machine_details(self, obj):
        machine = obj.machine
        return MachineSerializer(machine).data if machine else None

    def get_maintenance_type_detail(self, obj):
        maintenance_type = obj.maintenance_type
        return MaintenanceTypeSerializer(maintenance_type).data if maintenance_type else None

    def get_service_company_details(self, obj):
        service_company = obj.service_company
        return ServiceCompanySerializer(service_company).data if service_company else None

    def get_machine_model_details(self, obj):
        machine_model = obj.machine_model
        return MachineModelSerializer(machine_model).data if machine_model else None

    def get_engine_model_details(self, obj):
        engine_model = obj.engine_model
        return EngineModelSerializer(engine_model).data if engine_model else None

    def get_transmission_model_details(self, obj):
        transmission_model = obj.transmission_model
        return TransmissionModelSerializer(transmission_model).data if transmission_model else None

    def get_steering_axle_model_details(self, obj):
        steering_axle_model = obj.steering_axle_model
        return SteeringAxleModelSerializer(steering_axle_model).data if steering_axle_model else None

    def get_driving_axle_model_details(self, obj):
        driving_axle_model = obj.driving_axle_model
        return DrivingAxleModelSerializer(driving_axle_model).data if driving_axle_model else None

    def get_client_details(self, obj):
        client = obj.client
        return ClientSerializer(client).data if client else None

    def get_service_company_details(self, obj):
        service_company = obj.service_company
        return ServiceCompanySerializer(service_company).data if service_company else None

    def create(self, validated_data):
        machine_model_data = validated_data.pop('machine_model')
        engine_data = validated_data.pop('engine_model')
        transmission_data = validated_data.pop('transmission_model')
        steering_axle_data = validated_data.pop('steering_axle_model')
        driving_axle_data = validated_data.pop('driving_axle_model')
        client_data = validated_data.pop('client')
        service_company_data = validated_data.pop('service_company')

        machine = Machine.objects.create(
            machine_model=machine_model_data,
            engine_model=engine_data,
            transmission_model=transmission_data,
            steering_axle_model=steering_axle_data,
            driving_axle_model=driving_axle_data,
            client=client_data,
            service_company=service_company_data,
            **validated_data
        )
        return machine


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = ['id', 'name', 'description']


class MaintenanceSerializer(serializers.ModelSerializer):
    machine = serializers.PrimaryKeyRelatedField(queryset=Machine.objects.all())
    machine_details = serializers.SerializerMethodField()
    maintenance_type = serializers.PrimaryKeyRelatedField(queryset=MaintenanceType.objects.all())
    maintenance_type_details = serializers.SerializerMethodField()
    service_company = serializers.PrimaryKeyRelatedField(queryset=ServiceCompany.objects.all())
    service_company_details = serializers.SerializerMethodField()

    class Meta:
        model = Maintenance
        fields = ['id', 'machine', 'machine_details',
                  'maintenance_type', 'maintenance_type_details',
                  'event_date',
                  'operating_time', 'order_id', 'order_date',
                  'service_company', 'service_company_details',
                  ]

    def get_machine_details(self, obj):
        machine = obj.machine
        return MachineSerializer(machine).data if machine else None

    def get_maintenance_type_details(self, obj):
        maintenance_type = obj.maintenance_type
        return MaintenanceTypeSerializer(maintenance_type).data if maintenance_type else None

    def get_service_company_details(self, obj):
        service_company = obj.service_company
        return ServiceCompanySerializer(service_company).data if service_company else None

    def create(self, validated_data):
        machine_details_data = validated_data.pop('machine')
        maintenance_type_data = validated_data.pop('maintenance_type')
        service_company_data = validated_data.pop('service_company')

        maintenance = Maintenance.objects.create(
            machine=machine_details_data,
            maintenance_type=maintenance_type_data,
            service_company=service_company_data,
            **validated_data
        )
        return maintenance


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


