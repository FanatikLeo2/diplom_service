import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {fetchMaintenanceIdRetrieve} from '../../../reducers/idRetrieveReducer/fetchIdRetrieve';
import { CreateMaintenanceForm } from "./CreateMaintenanceForm";

export const Maintenance = function() {
    const reduxState = useSelector(state => state.maintenance)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createForm, setCreateForm] = useState(false)

    const handleClick = (id) => {
        dispatch(fetchMaintenanceIdRetrieve(id))
        navigate('/autoservice/maintenance')
    }

    const handleFormSubmit = () => {
        setCreateForm(false);
    };

    return (
        <div>
            {createForm ? 
                <button className={"switch-button"} onClick={() => setCreateForm(false)}>закрыть форму</button> :
                <button className={"switch-button"} onClick={() => setCreateForm(true)}>Создать ТО</button>
            }
            <hr />
            {createForm ? <CreateMaintenanceForm onFormSubmit={handleFormSubmit}/> : null}
                {reduxState.map(item => (
                    <div key={item.id} className="item">
                        <h2 onClick={() => handleClick(item.id)} style={{ cursor: 'pointer' }}>
                            Техобслуживание: {item.event_date}.{item.machine_details.machine_factory_num}.ТО{item.maintenance_type_details.name}
                        </h2>
                        {/* <p>Вид ТО: {item.maintenance_type_details.name}</p>
                        <p>Дата проведения ТО: {item.event_date}</p>
                        <p>Наработка: {item.operating_time} м/ч</p>
                        <p>№ заказ-наряда: {item.order_id}</p>
                        <p>Дата заказ-наряда: {item.order_date}</p>
                        <p>Организация, проводившая ТО: {item.service_company_details.name}</p>
                        <p>Mашина: {item.machine_details.machine_factory_num}</p>
                        <p>Cервисная компания: {item.service_company_details.name}</p> */}
                        <hr />
                    </div>
                    ))
                }    
        </div>
    );
};
