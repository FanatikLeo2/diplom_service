import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMachineIdRetrieve,
    fetchMachineModelIdRetrieve,
    fetchTransmissionModelIdRetrieve,
    fetchEngineModelIdRetrieve,
    fetchSteeringAxleModelIdRetrieve,
    fetchDrivingAxleModelIdRetrieve,
 } from '../../../reducers/idRetrieveReducer/fetchIdRetrieve';
import { CreateMachineForm } from "./CreateMachineForm";
import './Machine.css'
 
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
        steering_axle: '', // Фильтр по управляемому мосту
        driving_axle: '' // Фильтр по ведущему мосту
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
        // Фильтрация по управляемому мосту
        if (filters.steering_axle) {
            filteredData = filteredData.filter(item => item.steering_axle_model_details.name.toLowerCase().includes(filters.steering_axle.toLowerCase()));
        }
        // Фильтрация по ведущему мосту
        if (filters.driving_axle) {
            filteredData = filteredData.filter(item => item.driving_axle_model_details.name.toLowerCase().includes(filters.driving_axle.toLowerCase()));
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
            case 'machine_num':
                sortedData = sortedData.sort((a, b) => a.machine_factory_num.localeCompare(b.machine_factory_num)); // Сортировка по номеру машины
                break;    
            case 'model':
                sortedData = sortedData.sort((a, b) => a.machine_model_details.name.localeCompare(b.machine_model_details.name)); // Сортировка по модели
                break;
            case 'engine':
                sortedData = sortedData.sort((a, b) => a.engine_model_details.name.localeCompare(b.engine_model_details.name)); // Сортировка по двигателю
                break;

        }
        setState(sortedData); // Обновляем состояние с отсортированными данными
    };

    const handleClick = (id) => {
        dispatch(fetchMachineIdRetrieve(id)); // Получаем данные по выбранной машине
        navigate('/autoservice/machine'); // Перенаправляем на страницу машины
    };

    const handleClickMachineModels = (id) => {
        dispatch(fetchMachineModelIdRetrieve(id));
        navigate('/autoservice/machine_model');
    }

    const handleClickEngineModels = (id) => {
        dispatch(fetchEngineModelIdRetrieve(id));
        navigate('/autoservice/engine_model');
    }

    const handleClickTransmissionModels = (id) => {
        dispatch(fetchTransmissionModelIdRetrieve(id));
        navigate('/autoservice/transmission_model');
    }

    const handleClickSteeringAxleModels = (id) => {
        dispatch(fetchSteeringAxleModelIdRetrieve(id));
        navigate('/autoservice/steering_axle_model');
    }

    const handleClickDrivingAxleModels = (id) => {
        dispatch(fetchDrivingAxleModelIdRetrieve(id));
        navigate('/autoservice/driving_axle_model');
    }    

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
            <span>Сортировка:  </span>
            <select value={sortPattern} onChange={(e) => setSortPattern(e.target.value)}>
                <option value='shipment'>по дате</option>
                <option value='machine_num'>по заводскому номеру</option>
                <option value='engine'>по двигателю</option>
                <option value='model'>по модели</option>
                <option value='engine'>по двигателю</option>
            </select>

            {/* Форма для фильтров */}
            <div>
                <input
                    type="text"
                    name="model"
                    value={filters.model}
                    placeholder="Фильтр по модели"
                    onChange={handleFilterChange}
                    className="input-filter"
                />
                <input
                    type="text"
                    name="engine"
                    value={filters.engine}
                    placeholder="Фильтр по двигателю"
                    onChange={handleFilterChange}
                    className="input-filter"
                />
                <input
                    type="text"
                    name="transmission"
                    value={filters.transmission}
                    placeholder="Фильтр по трансмиссии"
                    onChange={handleFilterChange}
                    className="input-filter"
                />
                <input
                    type="text"
                    name="steering_axle"
                    value={filters.steering_axle}
                    onChange={handleFilterChange}
                    placeholder="Фильтр по управляемому мосту"
                    className="input-filter"
                />
                <input
                    type="text"
                    name="driving_axle"
                    value={filters.driving_axle}
                    onChange={handleFilterChange}
                    placeholder="Фильтр по ведущему мосту"
                    className="input-filter"
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
                    <div className="machine-table-block" 
                        onClick={() => handleClick(item.id)}>
                        <h2>Машина №: {item.id}</h2>
                    </div>
                    <div className="machine-table-block">
                        Зав. № машины: {item.machine_factory_num}
                    </div>
                    <div className="machine-table-block" onClick={() => handleClickMachineModels(item.machine_model_details.id)}>
                        Модель: {item.machine_model_details.name}
                    </div>
                    <div className="machine-table-block" onClick={() => handleClickEngineModels(item.engine_model_details.id)}>
                        Двигатель: {item.engine_model_details.name}
                    </div>
                    <div className="machine-table-block" onClick={() => handleClickTransmissionModels(item.transmission_model_details.id)}>
                        Трансмиссия: {item.transmission_model_details.name}
                    </div>
                    <div className="machine-table-block" onClick={() => handleClickSteeringAxleModels(item.steering_axle_model_details.id)}>
                        Управляемый мост: {item.steering_axle_model_details.name}
                    </div>
                    <div className="machine-table-block" onClick={() => handleClickDrivingAxleModels(item.driving_axle_model_details.id)}>
                        Ведущий мост: {item.driving_axle_model_details.name}
                    </div>
                    <div className="machine-table-block">
                        Дата отгрузки: {item.date_of_shipment}
                    </div>
                </div>
            ))}
        </div>
    );
};
