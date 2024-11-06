import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { patchMachine} from "../../../reducers/patchRequest/patchMachine";
import { fetchMachineIdRetrieve } from "../../../reducers/idRetrieveReducer/fetchIdRetrieve";
import Select from 'react-select'

export const MachineDetail = function() {
    const reduxStateModels = useSelector(state => state.otherModels);
    const reduxState = useSelector(state => state.id.machine)
    const reduxStateUser = useSelector(state => state.user)

    const dispatch = useDispatch();
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

    const machine_model_details = Object.values(reduxStateModels.machineModels || {}).map(item => ({id: item.id, label: item.name}));
    const engine_model_details = Object.values(reduxStateModels.engineModels || {}).map(item => ({id: item.id, label: item.name}));
    const transmission_model_details = Object.values(reduxStateModels.transmissionModels || {}).map(item => ({id: item.id, label: item.name}));
    const steering_axle_model_details = Object.values(reduxStateModels.steeringAxleModels || {}).map(item => ({id: item.id, label: item.name}));
    const driving_axle_model_details = Object.values(reduxStateModels.drivingAxleModels || {}).map(item => ({id: item.id, label: item.name}));
    const client_details = Object.values(reduxStateModels.userAll || {}).map(item => ({id: item.id, label: item.username}));
    const service_company_details = Object.values(reduxStateModels.serviceCompany || {}).map(item => ({id: item.id, label: item.name}));

    const [selectedMachineModelDetails, setSelectedMachineModelDetails] = useState(null);
    const [selectedEngineModelDetails, setSelectedEngineModelDetails] = useState(null);
    const [selectedTransmissionModelDetails, setSelectedTransmissionModelDetails] = useState(null);
    const [selectedSteeringAxleModelDetails, setSelectedSteeringAxleModelDetails] = useState(null);
    const [selectedDrivingAxleModelDetails, setSelectedDrivingAxleModelDetails] = useState(null);
    const [selectedClientDetails, setSelectedClientDetails] = useState(null);
    const [selectedServiceCompanyModelDetails, setSelectedServiceCompanyModelDetails] = useState(null);
    
    const handleSubmit = async() => {
        if (machineFactoryNum ||
            selectedMachineModelDetails ||
            engineFactoryNum ||
            selectedEngineModelDetails ||
            transmissionFactoryNum ||
            selectedTransmissionModelDetails ||
            steeringAxleFactoryNum ||
            selectedSteeringAxleModelDetails ||
            drivingAxleFactoryNum ||
            selectedDrivingAxleModelDetails ||
            deliveryContractNum ||
            dateOfShipment||
            customer || 
            deliveryAddress ||
            equipment ||
            selectedClientDetails ||
            selectedServiceCompanyModelDetails
            ) {
            setError('');
            await patchMachine(reduxState.id,
                                machineFactoryNum, 
                                selectedMachineModelDetails?.id, 
                                engineFactoryNum, 
                                selectedEngineModelDetails?.id,
                                transmissionFactoryNum,
                                selectedTransmissionModelDetails?.id,
                                steeringAxleFactoryNum,
                                selectedSteeringAxleModelDetails?.id,
                                drivingAxleFactoryNum,
                                selectedDrivingAxleModelDetails?.id,
                                deliveryContractNum,
                                dateOfShipment,
                                customer,
                                deliveryAddress,
                                equipment,
                                selectedClientDetails?.id,
                                selectedServiceCompanyModelDetails?.id,
            );
            dispatch(fetchMachineIdRetrieve(reduxState.id))
        } else {
            setError('Пожалуйста, заполните хотя бы одно поле.');
            return;
        }
    };

    return (
        <div>
        {reduxState ?
        <div className="main-machine-detail-cont">
            <h1>машина {reduxState.id}</h1>
            <div className="machine-detail-row">
                <div className="machine-detail-table-block">
                    <span>зав № машины</span>
                    <span>{reduxState.machine_factory_num}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="machine_factory_num"
                        value={machineFactoryNum}
                        onChange={(e) => {setMachineFactoryNum(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>модель машины</span>
                    <span>{reduxState.machine_model_details.name}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <Select 
                        options={machine_model_details}
                        value={selectedMachineModelDetails}
                        onChange={(option) => setSelectedMachineModelDetails(option)}
                        placeholder="Выберите модель машины"
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>зав № двигателя</span>
                    <span>{reduxState.engine_factory_num}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="engineFactoryNum"
                        value={engineFactoryNum}
                        onChange={(e) => {setEngineFactoryNum(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>модель двигателя</span>
                    <span>{reduxState.engine_model_details.name}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <Select 
                        options={engine_model_details}
                        value={selectedEngineModelDetails}
                        onChange={(option) => setSelectedEngineModelDetails(option)}
                        placeholder="Выберите модель двигателя"
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>зав № трансмисси</span>
                    <span>{reduxState.transmission_factory_num}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="transmission_factory_num"
                        value={transmissionFactoryNum}
                        onChange={(e) => {setTransmissionFactoryNum(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>модель трансмиссии</span>
                    <span>{reduxState.transmission_model_details.name}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <Select 
                        options={transmission_model_details}
                        value={selectedTransmissionModelDetails}
                        onChange={(option) => setSelectedTransmissionModelDetails(option)}
                        placeholder="Выберите модель трансмиссии"
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>зав № упр. моста</span>
                    <span>{reduxState.steering_axle_factory_num}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="steering_axle_factory_num"
                        value={steeringAxleFactoryNum}
                        onChange={(e) => {setSteeringAxleFactoryNum(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>модель упр. моста</span>
                    <span>{reduxState.steering_axle_model_details.name}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <Select 
                        options={steering_axle_model_details}
                        value={selectedSteeringAxleModelDetails}
                        onChange={(option) => setSelectedSteeringAxleModelDetails(option)}
                        placeholder="Выберите модель управляемого моста"
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>зав № вед. моста</span>
                    <span>{reduxState.driving_axle_factory_num}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="driving_axle_factory_num"
                        value={drivingAxleFactoryNum}
                        onChange={(e) => {setDrivingAxleFactoryNum(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>модель вед .моста</span>
                    <span>{reduxState.driving_axle_model_details.name}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <Select 
                        options={driving_axle_model_details}
                        value={selectedDrivingAxleModelDetails}
                        onChange={(option) => setSelectedDrivingAxleModelDetails(option)}
                        placeholder="Выберите модель ведущего моста"
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>№ договора поставки</span>
                    <span>{reduxState.delivery_contract_num}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="delivery_contract_num"
                        value={deliveryContractNum}
                        onChange={(e) => {setDeliveryContractNum(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>дата отгрузки с завода</span>
                    <span>{reduxState.date_of_shipment}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="date"
                        placeholder="date_of_shipment"
                        value={dateOfShipment}
                        onChange={(e) => {setDateOfShipment(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>грузополучатель</span>
                    <span>{reduxState.customer}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="customer"
                        value={customer}
                        onChange={(e) => {setCustomer(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>адрес поставки</span>
                    <span>{reduxState.delivery_address}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="delivery_address"
                        value={deliveryAddress}
                        onChange={(e) => {setDeliveryAddress(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>комплектация</span>
                    <span>{reduxState.equipment}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="equipment"
                        value={equipment}
                        onChange={(e) => {setEquipment(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>клиент</span>
                    <span>{reduxState.client_details.username}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <Select 
                        options={client_details}
                        value={selectedClientDetails}
                        onChange={(option) => setSelectedClientDetails(option)}
                        placeholder="Выберите клиента"
                    />
                    : null}
                </div>
                <div className="machine-detail-table-block">
                    <span>сервисная компания</span>
                    <span>{reduxState.service_company_details.name}</span>
                    {reduxStateUser.groups_details[0]?.name === "Managers" ?
                    <Select 
                        options={service_company_details}
                        value={selectedServiceCompanyModelDetails}
                        onChange={(option) => setSelectedServiceCompanyModelDetails(option)}
                        placeholder="Выберите сервисную компанию"
                    />
                    : null}
                </div>
            </div>
            {reduxStateUser.groups_details[0]?.name === "Managers" ?
            <button onClick={handleSubmit} className="signin-input">Сохранить</button>
            : null}
            {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
        </div>
        :
        <div className="main-machine-detail-cont">
            <span className="machine-detail-header">загрузка</span>
            <span className="machine-detail-hint">
                {"(если вы перешли на эту страницу не посредством кнопки \"редактировать\" то тут ничего не появится)"}
            </span>
        </div>
        }

        </div>
    )
}