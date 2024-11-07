import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { fetchMachineCreate } from "../../../reducers/machineReducer/fetchMachines";
import './CreateMachineForm.css'

export const CreateMachineForm = ({onFormSubmit}) => {
    const reduxState = useSelector(state => state.otherModels);
    const dispatch = useDispatch();
    const [state, setState] = useState([]);
    const [error, setError] = useState('');

    const [machineFactoryNum, setMachineFactoryNum] = useState('');
    const [engineFactoryNum, setEngineFactoryNum] = useState('');
    const [transmissionFactoryNum, setTransmissionFactoryNum] = useState('');
    const [steeringAxleFactoryNum, setSteeringAxleFactoryNum] = useState('');
    const [drivingAxleFactoryNum, setDrivingAxleFactoryNum] = useState('');
    const [deliveryContractNum, setDeliveryContractNum] = useState('');
    const [dateOfShipment, setDateOfShipment] = useState('');
    const [customer, setCustomer] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [equipment, setEquipment] = useState('');

    const machine_model_details = Object.values(reduxState.machineModels).map(item => ({id: item.id, label: item.name}));
    const engine_model_details = Object.values(reduxState.engineModels).map(item => ({id: item.id, label: item.name}));
    const transmission_model_details = Object.values(reduxState.transmissionModels).map(item => ({id: item.id, label: item.name}));
    const steering_axle_model_details = Object.values(reduxState.steeringAxleModels).map(item => ({id: item.id, label: item.name}));
    const driving_axle_model_details = Object.values(reduxState.drivingAxleModels).map(item => ({id: item.id, label: item.name}));
    const client_details = Object.values(reduxState.userAll).map(item => ({id: item.id, label: item.username}));
    const service_company_details = Object.values(reduxState.serviceCompany).map(item => ({id: item.id, label: item.name}));

    const [selectedMachineModelDetails, setSelectedMachineModelDetails] = useState(null);
    const [selectedEngineModelDetails, setSelectedEngineModelDetails] = useState(null);
    const [selectedTransmissionModelDetails, setSelectedTransmissionModelDetails] = useState(null);
    const [selectedSteeringAxleModelDetails, setSelectedSteeringAxleModelDetails] = useState(null);
    const [selectedDrivingAxleModelDetails, setSelectedDrivingAxleModelDetails] = useState(null);
    const [selectedClientDetails, setSelectedClientDetails] = useState(null);
    const [selectedServiceCompanyModelDetails, setSelectedServiceCompanyModelDetails] = useState(null);

    const handleSubmit = () => {
        setError('');
        if (!machineFactoryNum ||
            !selectedMachineModelDetails ||
            !engineFactoryNum ||
            !selectedEngineModelDetails ||
            !transmissionFactoryNum ||
            !selectedTransmissionModelDetails ||
            !steeringAxleFactoryNum ||
            !selectedSteeringAxleModelDetails ||
            !drivingAxleFactoryNum ||
            !selectedDrivingAxleModelDetails ||
            !deliveryContractNum ||
            !dateOfShipment ||
            !customer ||
            !deliveryAddress ||
            !equipment ||
            !selectedClientDetails ||
            !selectedServiceCompanyModelDetails
        ) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }
        dispatch(fetchMachineCreate(
            machineFactoryNum, 
            selectedMachineModelDetails.id, 
            engineFactoryNum, 
            selectedEngineModelDetails.id,
            transmissionFactoryNum,
            selectedTransmissionModelDetails.id,
            steeringAxleFactoryNum,
            selectedSteeringAxleModelDetails.id,
            drivingAxleFactoryNum,
            selectedDrivingAxleModelDetails.id,
            deliveryContractNum,
            dateOfShipment,
            customer,
            deliveryAddress,
            equipment,
            selectedClientDetails.id,
            selectedServiceCompanyModelDetails.id,
        ));
        onFormSubmit();
    };

    return (
        <div>
                <div className="createForm-main-cont">
                    <div className="machine-create-table-block">    
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите номер машины"
                            value={machineFactoryNum}
                            onChange={(e) => {setMachineFactoryNum(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <Select 
                            options={machine_model_details}
                            value={selectedMachineModelDetails}
                            onChange={(option) => setSelectedMachineModelDetails(option)}
                            placeholder="Выберите модель машины"
                            required
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите номер двигателя"
                            value={engineFactoryNum}
                            onChange={(e) => {setEngineFactoryNum(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <Select 
                            options={engine_model_details}
                            value={selectedEngineModelDetails}
                            onChange={(option) => setSelectedEngineModelDetails(option)}
                            placeholder="Выберите модель двигателя"
                            required
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите номер трансмиссии"
                            value={transmissionFactoryNum}
                            onChange={(e) => {setTransmissionFactoryNum(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <Select 
                            options={transmission_model_details}
                            value={selectedTransmissionModelDetails}
                            onChange={(option) => setSelectedTransmissionModelDetails(option)}
                            placeholder="Выберите модель трансмиссии"
                            required
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите номер управляемого моста"
                            value={steeringAxleFactoryNum}
                            onChange={(e) => {setSteeringAxleFactoryNum(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <Select 
                            options={steering_axle_model_details}
                            value={selectedSteeringAxleModelDetails}
                            onChange={(option) => setSelectedSteeringAxleModelDetails(option)}
                            placeholder="Выберите модель управляемого моста"
                            required
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите номер ведущего моста"
                            value={drivingAxleFactoryNum}
                            onChange={(e) => {setDrivingAxleFactoryNum(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <Select 
                            options={driving_axle_model_details}
                            value={selectedDrivingAxleModelDetails}
                            onChange={(option) => setSelectedDrivingAxleModelDetails(option)}
                            placeholder="Выберите модель ведущего моста"
                            required
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите № договора поставки"
                            value={deliveryContractNum}
                            onChange={(e) => {setDeliveryContractNum(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <span>Дата поставки:</span>
                        <input
                            id="dateOfShipment"
                            className="create-input"
                            type="date"
                            value={dateOfShipment}
                            onChange={(e) => {setDateOfShipment(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите грузополучателя"
                            value={customer}
                            onChange={(e) => {setCustomer(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите адрес доставки"
                            value={deliveryAddress}
                            onChange={(e) => {setDeliveryAddress(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <input
                            className="create-input"
                            type="text"
                            placeholder="Введите комплектацию"
                            value={equipment}
                            onChange={(e) => {setEquipment(e.target.value)}}
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <Select 
                            options={client_details}
                            value={selectedClientDetails}
                            onChange={(option) => setSelectedClientDetails(option)}
                            placeholder="Выберите клиента"
                            required
                        />
                    </div>
                    <div className="machine-create-table-block"> 
                        <Select 
                            options={service_company_details}
                            value={selectedServiceCompanyModelDetails}
                            onChange={(option) => setSelectedServiceCompanyModelDetails(option)}
                            placeholder="Выберите сервисную компанию"
                            required
                        />
                    </div>
                    <div className="machine-create-table-block">
                        {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
                        <button onClick={handleSubmit} className="signin-input">Сохранить</button>
                    </div>
                </div>
            </div>
                
    )    
}
