import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMachineIdRetrieve } from '../../../reducers/idRetrieveReducer/fetchIdRetrieve';
import { CreateMachineForm } from "./CreateMachineForm";
 
export const Machine = function() {
    const reduxState = useSelector(state => state.machine); // Состояние машин
    const reduxStateUser = useSelector(state => state.user); // Состояние пользователя
    const [state, setState] = useState([]); // Локальное состояние для отфильтрованных машин
    const [createForm, setCreateForm] = useState(false); // Состояние для формы создания машины
    const [sortPattern, setSortPattern] = useState('shipment'); // Параметр сортировки
    const [filters, setFilters] = useState({
        model: '', // Фильтр по модели машины
        engine: '', // Фильтр по двигателю
        transmission: '', // Фильтр по трансмиссии
        shipmentDateFrom: '', // Фильтр по дате отгрузки "от"
        shipmentDateTo: '' // Фильтр по дате отгрузки "до"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Функция для фильтрации состояния
    const filterState = () => {
        let filteredData = [...reduxState]; // Копируем исходный массив

        // Фильтрация по модели машины
        if (filters.model) {
            filteredData = filteredData.filter(item => item.machine_model_details.name.toLowerCase().includes(filters.model.toLowerCase()));
        }
        // Фильтрация по двигателю
        if (filters.engine) {
            filteredData = filteredData.filter(item => item.engine_model_details.name.toLowerCase().includes(filters.engine.toLowerCase()));
        }
        // Фильтрация по трансмиссии
        if (filters.transmission) {
            filteredData = filteredData.filter(item => item.transmission_model_details.name.toLowerCase().includes(filters.transmission.toLowerCase()));
        }
        // Фильтрация по дате отгрузки "от"
        if (filters.shipmentDateFrom) {
            filteredData = filteredData.filter(item => new Date(item.date_of_shipment) >= new Date(filters.shipmentDateFrom));
        }
        // Фильтрация по дате отгрузки "до"
        if (filters.shipmentDateTo) {
            filteredData = filteredData.filter(item => new Date(item.date_of_shipment) <= new Date(filters.shipmentDateTo));
        }

        return filteredData; // Возвращаем отфильтрованные данные
    };

    // Функция для сортировки состояния
    const sortState = () => {
        let sortedData = filterState(); // Сначала фильтруем данные
        switch (sortPattern) {
            case 'shipment':
                sortedData = sortedData.sort((a, b) => new Date(a.date_of_shipment) - new Date(b.date_of_shipment)); // Сортировка по дате отгрузки
                break;
            case 'model':
                sortedData = sortedData.sort((a, b) => a.machine_model_details.name.localeCompare(b.machine_model_details.name)); // Сортировка по модели
                break;
            case 'engine':
                sortedData = sortedData.sort((a, b) => a.engine_model_details.name.localeCompare(b.engine_model_details.name)); // Сортировка по двигателю
                break;
            case 'transmission':
                sortedData = sortedData.sort((a, b) => a.transmission_model_details.name.localeCompare(b.transmission_model_details.name)); // Сортировка по трансмиссии
                break;
            case 'lead':
                sortedData = sortedData.sort((a, b) => a.steering_axle_model_details.name.localeCompare(b.steering_axle_model_details.name)); // Сортировка по ведущему мосту
                break;
            case 'control':
                sortedData = sortedData.sort((a, b) => a.driving_axle_model_details.name.localeCompare(b.driving_axle_model_details.name)); // Сортировка по управляемому мосту
                break;
        }
        setState(sortedData); // Обновляем состояние с отсортированными данными
    };

    const handleClick = (id) => {
        dispatch(fetchMachineIdRetrieve(id)); // Получаем данные по выбранной машине
        navigate('/autoservice/machine'); // Перенаправляем на страницу машины
    };

    const handleFormSubmit = () => {
        setCreateForm(false); // Закрываем форму
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
            <select value={sortPattern} onChange={(e) => setSortPattern(e.target.value)}>
                <option value='shipment'>по дате</option>
                <option value='model'>по модели</option>
                <option value='engine'>по двигателю</option>
                <option value='transmission'>по трансмиссии</option>
                <option value='lead'>по вед.мосту</option>
                <option value='control'>по упр.мосту</option>
            </select>

            {/* Форма для фильтров */}
            <div>
                <input
                    type="text"
                    name="model"
                    value={filters.model}
                    placeholder="Фильтр по модели"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="engine"
                    value={filters.engine}
                    placeholder="Фильтр по двигателю"
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="transmission"
                    value={filters.transmission}
                    placeholder="Фильтр по трансмиссии"
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="shipmentDateFrom"
                    value={filters.shipmentDateFrom}
                    onChange={handleFilterChange}
                    placeholder="Дата от"
                />
                <input
                    type="date"
                    name="shipmentDateTo"
                    value={filters.shipmentDateTo}
                    onChange={handleFilterChange}
                    placeholder="Дата до"
                />
            </div>

            {/* Кнопка для создания новой машины (для пользователей с ролью "Managers") */}
            {reduxStateUser.groups_details[0]?.name === "Managers" ? (
                createForm ? (
                    <button className="switch-button" onClick={() => setCreateForm(false)}>Закрыть форму</button>
                ) : (
                    <button className="switch-button" onClick={() => setCreateForm(true)}>Создать машину</button>
                )
            ) : null}

            {createForm ? <CreateMachineForm onFormSubmit={handleFormSubmit}/> : null}

            {/* Отображение списка машин */}
            {state.map(item => (
                <div key={item.id} className="item">
                    <h2 onClick={() => handleClick(item.id)} style={{ cursor: 'pointer' }}>Машина №: {item.id} - {item.machine_factory_num}</h2>
                    <p>Модель: {item.machine_model_details.name}</p>
                    <p>Двигатель: {item.engine_model_details.name}</p>
                    <p>Трансмиссия: {item.transmission_model_details.name}</p>
                    <p>Управляемый мост: {item.steering_axle_model_details.name}</p>
                    <p>Ведущий мост: {item.driving_axle_model_details.name}</p>
                    <p>Дата отгрузки: {item.date_of_shipment}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};
