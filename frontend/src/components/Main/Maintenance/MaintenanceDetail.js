import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { patchMaintenance} from "../../../reducers/patchRequest/patchMaintenance";
import { fetchMaintenanceIdRetrieve } from "../../../reducers/idRetrieveReducer/fetchIdRetrieve";
import Select from 'react-select'
import './MaintenanceDetail.css'

export const MaintenanceDetail = () => {
    const reduxStateModels = useSelector(state => state.otherModels);
    const reduxState = useSelector(state => state.id.maintenance)
    const reduxStateMachine = useSelector(state => state.machine)
    
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [operatingTimeError, setOperatingTimeError] = useState('');

    const [eventDate, setEventDate] = useState('');
    const [operatingTime, setOperatingTime] = useState('');
    const [orderId, setOrderId] = useState('');
    const [orderDate, setOrderDate] = useState('');

    const machine_details = Object.values(reduxStateMachine || {}).map(item => ({id: item.id, label: item.machine_factory_num}));
    const maintenance_type_details = Object.values(reduxStateModels.maintenanceTypeModels || {}).map(item => ({id: item.id, label: item.name}));
    const service_company_details = Object.values(reduxStateModels.serviceCompany || {}).map(item => ({id: item.id, label: item.name}));

    const [selectedMachineDetails, setselectedMachineDetails] = useState(null);
    const [selectedMaintenanceTypeDetails, setselectedMaintenanceTypeDetails] = useState(null);
    const [selectedServiceCompanyModelDetails, setSelectedServiceCompanyModelDetails] = useState(null);
    
    const handleSubmit = async() => {
        if (selectedMachineDetails ||
            selectedMaintenanceTypeDetails ||
            eventDate ||
            operatingTime ||
            orderId ||
            orderDate ||
            selectedServiceCompanyModelDetails
            ) {

            setError('');
            setOperatingTimeError('');

            if (operatingTime.trim() !== '' && isNaN(operatingTime)) {
                setOperatingTimeError('Пожалуйста, введите корректное значение для Operating Time.');
                return;
            }

            await patchMaintenance(reduxState.id,
                                selectedMachineDetails?.id, 
                                selectedMaintenanceTypeDetails?.id,
                                eventDate,
                                operatingTime,
                                orderId,
                                orderDate,
                                selectedServiceCompanyModelDetails?.id,
            );
            dispatch(fetchMaintenanceIdRetrieve(reduxState.id))
        } else {
            setError('Пожалуйста, заполните хотя бы одно поле.');
            return;
        }
    };

    return (
        
        <div>
        {reduxState ?
        <div className="main-maintenance-detail-cont">
            <h1>ТО {reduxState.id}</h1>
            <div className="maintenance-detail-row">
                <div className="maintenance-detail-table-block">
                    <span>Машина</span>
                    <span>{reduxState.machine_details.machine_factory_num}</span>
                    <Select 
                        options={machine_details}
                        value={selectedMachineDetails}
                        onChange={(option) => setselectedMachineDetails(option)}
                        placeholder="Выберите машину"
                    />
                </div>
                <div className="maintenance-detail-table-block">
                    <span>Тип ТО</span>
                    <span>{reduxState.maintenance_type_details.name}</span>
                    <Select 
                        options={maintenance_type_details}
                        value={selectedMaintenanceTypeDetails}
                        onChange={(option) => setselectedMaintenanceTypeDetails(option)}
                        placeholder="Выберите тип ТО"
                    />
                </div>
                <div className="maintenance-detail-table-block">
                    <span>Дата проведения ТО</span>
                    <span>{reduxState.event_date}</span>
                    <input
                        className="input"
                        type="date"
                        value={eventDate}
                        onChange={(e) => {setEventDate(e.target.value)}}
                    />
                </div>
                <div className="maintenance-detail-table-block">
                    <span>Наработка</span>
                    <span>{reduxState.operating_time}</span>
                    <input
                        className="input"
                        type="text"
                        placeholder="operatingTime"
                        value={operatingTime}
                        onChange={(e) => {setOperatingTime(e.target.value)}}
                    />
                </div>
                <div className="maintenance-detail-table-block">
                    <span>№ заказ-наряда</span>
                    <span>{reduxState.order_id}</span>
                    <input
                        className="input"
                        type="text"
                        placeholder="orderId"
                        value={orderId}
                        onChange={(e) => {setOrderId(e.target.value)}}
                    />
                </div>
                <div className="maintenance-detail-table-block">
                    <span>Дата заказ-наряда</span>
                    <span>{reduxState.order_date}</span>
                    <input
                        className="input"
                        type="date"
                        placeholder="orderDate"
                        value={orderDate}
                        onChange={(e) => {setOrderDate(e.target.value)}}
                    />
                </div>
                <div className="maintenance-detail-table-block">
                    <span>сервисная компания</span>
                    <span>{reduxState.service_company_details.name}</span>
                    <Select 
                        options={service_company_details}
                        value={selectedServiceCompanyModelDetails}
                        onChange={(option) => setSelectedServiceCompanyModelDetails(option)}
                        placeholder="Выберите сервисную компанию"
                    />
                </div>
            </div>
            <button onClick={handleSubmit} className="signin-input">Сохранить</button>
            {operatingTimeError && <div className="error-message" style={{color: 'red'}}>{operatingTimeError}</div>}
            {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
        </div>
        :
        <div className="main-maintenance-detail-cont">
            <span className="maintenance-detail-header">загрузка</span>
            <span className="maintenance-detail-hint">
                {"(если вы перешли на эту страницу не посредством клинка на конкретное ТО то тут ничего не появится)"}
            </span>
        </div>
        }

        </div>
    )    
}