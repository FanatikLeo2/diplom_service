import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { fetchMaintenanceCreate } from "../../../reducers/maintenanceReducer/fetchMaintenances";
import './CreateMaintenanceForm.css'

export const CreateMaintenanceForm = ({onFormSubmit}) => {
    const reduxState = useSelector(state => state.otherModels);
    const reduxStateMachine = useSelector(state => state.machine);
    const dispatch = useDispatch();
    const [state, setState] = useState([]);
    const [error, setError] = useState('');
    const [operatingTimeError, setOperatingTimeError] = useState('');

    const [eventDate, setEventDate] = useState('');
    const [operatingTime, setOperatingTime] = useState('');
    const [orderId, setOrderId] = useState('');
    const [orderDate, setOrderDate] = useState('');

    const machine_details = Object.values(reduxStateMachine).map(item => ({id: item.id, label: item.machine_factory_num}));
    const maintenance_type_details = Object.values(reduxState.maintenanceTypeModels).map(item => ({id: item.id, label: item.name}));
    const service_company_details = Object.values(reduxState.serviceCompany).map(item => ({id: item.id, label: item.name}));

    const [selectedMachineDetails, setselectedMachineDetails] = useState(null);
    const [selectedMaintenanceTypeDetails, setselectedMaintenanceTypeDetails] = useState(null);
    const [selectedServiceCompanyModelDetails, setSelectedServiceCompanyModelDetails] = useState(null);

    const handleSubmit = () => {
        setError('');
        setOperatingTimeError('');

        if (!selectedMachineDetails ||
            !selectedMaintenanceTypeDetails ||
            !eventDate ||
            !operatingTime ||
            !orderId ||
            !orderDate ||
            !selectedServiceCompanyModelDetails 
        ) {
            setError('Пожалуйста, заполните все поля!');
            return;
        }

        if (isNaN(operatingTime) || operatingTime.trim() === '') {
            setOperatingTimeError('Введите корректное значение наработки!');
            return;
        }

        dispatch(fetchMaintenanceCreate(
            selectedMachineDetails.id, 
            selectedMaintenanceTypeDetails.id,
            eventDate,
            operatingTime,
            orderId,
            orderDate,
            selectedServiceCompanyModelDetails.id,
        ));
        onFormSubmit();
    };

    return (
        
            <div className="createForm-main-cont">
                <div className="machine-create-table-block"> 
                    <Select 
                        options={machine_details}
                        value={selectedMachineDetails}
                        onChange={(option) => setselectedMachineDetails(option)}
                        placeholder="Выберите машину"
                        required
                    />
                </div>
                <div className="machine-create-table-block"> 
                    <Select 
                        options={maintenance_type_details}
                        value={selectedMaintenanceTypeDetails}
                        onChange={(option) => setselectedMaintenanceTypeDetails(option)}
                        placeholder="Выберите тип ТО"
                        required
                    />
                </div>
                <div className="machine-create-table-block">
                    <span>Дата проведения ТО:</span>
                    <input
                        className="create-input"
                        type="date"
                        value={eventDate}
                        onChange={(e) => {setEventDate(e.target.value)}}
                    />
                </div>
                <div className="machine-create-table-block">
                    <input
                        className="create-input"
                        type="text"
                        placeholder="operatingTime"
                        value={operatingTime}
                        onChange={(e) => {setOperatingTime(e.target.value)}}
                    />
                </div>
                <div className="machine-create-table-block">
                    <input
                        className="create-input"
                        type="text"
                        placeholder="orderId"
                        value={orderId}
                        onChange={(e) => {setOrderId(e.target.value)}}
                    />
                </div>
                <div className="machine-create-table-block">
                    <label>Дата заказ-наряда:</label>
                    <input
                        className="create-input"
                        type="date"
                        value={orderDate}
                        onChange={(e) => {setOrderDate(e.target.value)}}
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
                    {operatingTimeError && <div className="error-message" style={{color: 'red'}}>{operatingTimeError}</div>}
                    {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
                    <button onClick={handleSubmit} className="signin-input">Сохранить</button>
                </div>
            </div>
    )    
}
