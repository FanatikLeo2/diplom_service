import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaintIdRetrieve } from '../../../reducers/idRetrieveReducer/fetchIdRetrieve';
import { useNavigate } from 'react-router-dom';

export const Complaints = function() {
    const reduxState = useSelector(state => state.complaint)
    const reduxStateUser = useSelector(state => state.user); // Состояние пользователя
    const [state, setState] = useState([])
    const [createForm, setCreateForm] = useState(false); // Состояние для формы создания машины
    const [sortPattern, setSortPattern] = useState('refusal_date'); // Параметр сортировки
    const [filters, setFilters] = useState({
        failure_node: '', // Фильтр по узлу отказа
        recovery_method: '', // Фильтр по способу восстановления
        service_company: '', // Фильтр по сервисной компании
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Функция для фильтрации состояния
    const filterState = () => {
        let filteredData = [...reduxState]; // Копируем исходный массив
        // Фильтрация по узлу отказа
        if (filters.failure_node) {
            filteredData = filteredData.filter(item => item.failure_node_details.name.toLowerCase().includes(filters.failure_node.toLowerCase()));
        }
        // Фильтрация по способу восстановления
        if (filters.recovery_method) {
            filteredData = filteredData.filter(item => item.recovery_method_details.name.toLowerCase().includes(filters.recovery_method.toLowerCase()));
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
            case 'refusal_date':
                sortedData = sortedData.sort((a, b) => new Date(a.refusal_date) - new Date(b.refusal_date)); // Сортировка по дате отказа
                break;
            case 'recovery_date':
                sortedData = sortedData.sort((a, b) => new Date(a.recovery_date) - new Date(b.recovery_date)); // Сортировка по дате восстановления
                break;    
            case 'equipment_downtime':
                sortedData = sortedData.sort((a, b) => a.equipment_downtime - b.equipment_downtime); // Сортировка по времени простоя
                break;
        }
        setState(sortedData); // Обновляем состояние с отсортированными данными
    };

    const handleClick = (id) => {
        dispatch(fetchComplaintIdRetrieve(id))
        navigate('/autoservice/complaint')
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
                <option value='refusal_date'>по дате отказа</option>
                <option value='recovery_date'>по дате восстановления</option>
                <option value='equipment_downtime'>по времени простоя</option>
            </select>

            {/* Форма для фильтров */}
            <div>
                <input
                    type="text"
                    name="failure_node"
                    value={filters.failure_node}
                    placeholder="Фильтр по узлу отказа"
                    onChange={handleFilterChange}
                    className="input-filter"
                />
                <input
                    type="text"
                    name="recovery_method"
                    value={filters.recovery_method}
                    placeholder="Фильтр по способу восстановления"
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

            {state.map(item => (
                <div key={item.id} className="item">
                    <div className="machine-table-block" 
                        onClick={() => handleClick(item.id)}>
                        <h2>Рекламация №: {item.id}</h2>
                    </div>
                    <div className="machine-table-block">
                        Дата отказа: {item.refusal_date}
                    </div>
                    <div className="machine-table-block">
                        Наработка: {item.operating_time} м/ч
                    </div>
                    <div className="machine-table-block">
                        Узел отказа: {item.failure_node_details.name}
                    </div>
                    <div className="machine-table-block">
                        Описание отказа: {item.failure_description}
                    </div>
                    <div className="machine-table-block">
                        Способ восстановления: {item.recovery_method_details.name}
                    </div>
                    <div className="machine-table-block">
                        {item.spare_parts_used ? 
                        `Используемые запасные части: ${item.spare_parts_used}` : 
                        "Запасные части не использовались"}
                    </div>
                    <div className="machine-table-block">
                        Mашина: {item.machine_details.machine_factory_num}
                    </div>
                </div>
            ))}
        </div>
    );
};
