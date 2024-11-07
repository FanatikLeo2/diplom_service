import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {fetchMaintenanceIdRetrieve} from '../../../reducers/idRetrieveReducer/fetchIdRetrieve';
import { CreateMaintenanceForm } from "./CreateMaintenanceForm";
import './Maintenances.css'

export const Maintenance = function() {
    const reduxState = useSelector(state => state.maintenance)
    const [state, setState] = useState([]); // Локальное состояние для отфильтрованных машин
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createForm, setCreateForm] = useState(false)
    const [sortPattern, setSortPattern] = useState('event_date'); // Параметр сортировки
    const [filters, setFilters] = useState({
        maintenance_type: '', // Фильтр по типу ТО
        machine_num: '', // Фильтр по номеру машины
        service_company: '', // Фильтр по сервисной компании

    });

    // Функция для фильтрации состояния
    const filterState = () => {
        let filteredData = [...reduxState]; // Копируем исходный массив
        // Фильтрация по типу ТО
        if (filters.maintenance_type) {
            filteredData = filteredData.filter(item => item.maintenance_type_details.name.toLowerCase().includes(filters.maintenance_type.toLowerCase()));
        }
        // Фильтрация по номеру машины
        if (filters.machine_num) {
            filteredData = filteredData.filter(item => item.machine_details.machine_factory_num.toLowerCase().includes(filters.machine_num.toLowerCase()));
        }
        // Фильтрация по сервисной компании
        if (filters.service_company) {
            filteredData = filteredData.filter(item => item.service_company_details.name.toLowerCase().includes(filters.service_company.toLowerCase()));
        }
        return filteredData; // Возвращаем отфильтрованные данные
    };

    // Функция для сортировки состояния
    const sortState = () => {
        let sortedData = filterState(); // Сначала фильтруем данные
        switch (sortPattern) {
            case 'event_date':
                sortedData = sortedData.sort((a, b) => new Date(a.event_date) - new Date(b.event_date)); // Сортировка по дате ТО
                break;
            case 'order_date':
                sortedData = sortedData.sort((a, b) => new Date(a.order_date) - new Date(b.order_date)); // Сортировка по дате заказ-наряда
                break;    
            case 'order_id':
                sortedData = sortedData.sort((a, b) => a.order_id.localeCompare(b.order_id)); // Сортировка по номеру заказ-наряда
                break;
            case 'operating_time':
                sortedData = sortedData.sort((a, b) => a.operating_time - b.operating_time); // Сортировка по наработке
                break;

        }
        setState(sortedData); // Обновляем состояние с отсортированными данными
    };

    const handleClick = (id) => {
        dispatch(fetchMaintenanceIdRetrieve(id))
        navigate('/autoservice/maintenance')
    }

    const handleFormSubmit = () => {
        setCreateForm(false);
    };

    // Обработчик изменения значений фильтров
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    useEffect(() => {
        setState(reduxState); // Устанавливаем исходные данные
        if (reduxState.length < 2) {
            setState(reduxState); // Если данных меньше 2, просто показываем их
        } 
        if (reduxState.length > 1) {
            sortState(); // Если данных больше, то сортируем
        }
    }, [reduxState, sortPattern, filters]);  // Зависимость от reduxState, sortPattern и filters

    return (
        <div>
            {/* Выпадающий список для сортировки */}
            <span>Сортировка:  </span>
            <select value={sortPattern} onChange={(e) => setSortPattern(e.target.value)}>
                <option value='event_date'>по дате ТО</option>
                <option value='order_date'>по дате заказ-наряда</option>
                <option value='order_id'>по номеру заказ-наряда</option>
                <option value='operating_time'>по наработке</option>
            </select>

            {/* Форма для фильтров */}
            <div>
                <input
                    type="text"
                    name="maintenance_type"
                    value={filters.maintenance_type}
                    placeholder="Фильтр по типу ТО"
                    onChange={handleFilterChange}
                    className="input-filter"
                />
                <input
                    type="text"
                    name="machine_num"
                    value={filters.machine_num}
                    placeholder="Фильтр по номеру машины"
                    onChange={handleFilterChange}
                    className="input-filter"
                />
                <input
                    type="text"
                    name="service_company"
                    value={filters.service_company}
                    placeholder="Фильтр по сервисной компании"
                    onChange={handleFilterChange}
                    className="input-filter"
                />
            </div>

            {createForm ? 
                <button className={"switch-button"} onClick={() => setCreateForm(false)}>закрыть форму</button> :
                <button className={"switch-button"} onClick={() => setCreateForm(true)}>Создать ТО</button>
            }
            {createForm ? <CreateMaintenanceForm onFormSubmit={handleFormSubmit}/> : null}
                {state.map(item => (
                    <div key={item.id} className="item">
                    <div className="machine-table-block" 
                        onClick={() => handleClick(item.id)}>
                        <h2>ТО: {item.id}</h2>
                    </div>
                    <div className="machine-table-block">
                        Дата проведения ТО: {item.event_date}
                    </div>
                    <div className="machine-table-block">
                        Вид ТО: {item.maintenance_type_details.name}
                    </div>
                    <div className="machine-table-block">
                        Наработка: {item.operating_time} м/ч
                    </div>
                    <div className="machine-table-block">
                        № заказ-наряда: {item.order_id}
                    </div>
                    <div className="machine-table-block">
                        Дата заказ-наряда: {item.order_date}
                    </div>
                    <div className="machine-table-block">
                        Организация, проводившая ТО: {item.service_company_details.name}
                    </div>
                    <div className="machine-table-block">
                        Mашина: {item.machine_details.machine_factory_num}
                    </div>
                    </div>
                    ))
                }    
        </div>
    );
};
