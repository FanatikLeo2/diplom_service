import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

export const Complaints = function() {
    const reduxState = useSelector(state => state.complaint)
    const [state, setState] = useState([])

    useEffect(() => {
            setState(reduxState)
    }, [reduxState])

    return (
        <div>
            {state.map(item => (
                <div key={item.id} className="item">

                    <h2>Рекламация №: {item.refusal_date}.{item.machine.machine_factory_num}</h2>
                    <p>Дата отказа: {item.refusal_date}</p>
                    <p>Наработка: {item.operating_time} м/ч</p>
                    <p>Узел отказа: {item.failure_node.name}</p>
                    <p>Описание отказа: {item.failure_description}</p>
                    <p>Способ восстановления: {item.recovery_method.name}</p>
                    {item.spare_parts_used ? <p>Используемые запасные части: {item.spare_parts_used}</p> : null}
                    <p>Дата восстановления: {item.recovery_date}</p>
                    <p>
                        Время простоя техники: {item.equipment_downtime} {(() => {
                            if (item.equipment_downtime === 1) {
                            return 'день';
                            } else if (item.equipment_downtime > 1 && item.equipment_downtime < 5) {
                            return 'дня';
                            } else {
                            return 'дней';
                            }
                        })()}
                    </p>
                    <p>Mашина: {item.machine.machine_factory_num}</p>
                    <p>Cервисная компания: {item.service_company.name}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};
