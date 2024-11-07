import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { patchComplaint} from "../../../reducers/patchRequest/patchComplaint";
import { fetchComplaintIdRetrieve } from "../../../reducers/idRetrieveReducer/fetchIdRetrieve";
import Select from 'react-select'
import './ComplaintsDetail.css'

export const ComplaintDetail = () => {
    const reduxStateModels = useSelector(state => state.otherModels);
    const reduxState = useSelector(state => state.id.complaint)
    const reduxStateMachine = useSelector(state => state.machine)
    const reduxStateUser = useSelector(state => state.user)
    
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [operatingTimeError, setOperatingTimeError] = useState('');

    const [refusalDate, setRefusalDate] = useState('');
    const [operatingTime, setOperatingTime] = useState('');
    const [failureDescription, setFailureDescription] = useState('');
    const [sparePartsUsed, setSparePartsUsed] = useState('');
    const [recoveryDate, setRecoveryDate] = useState('');

    const failure_node_details = Object.values(reduxStateModels.failureNodeModel || {}).map(item => ({id: item.id, label: item.name}));
    const recovery_method_details = Object.values(reduxStateModels.recoveryMethodModel || {}).map(item => ({id: item.id, label: item.name}));
    const machine_details = Object.values(reduxStateMachine || {}).map(item => ({id: item.id, label: item.machine_factory_num}));
    const service_company_details = Object.values(reduxStateModels.serviceCompany || {}).map(item => ({id: item.id, label: item.name}));
    
    const [selectedFailureNodeDetails, setSelectedFailureNodeDetails] = useState(null);
    const [selectedRecoveryMethodDetails, setSelectedRecoveryMethodDetails] = useState(null);
    const [selectedMachineDetails, setselectedMachineDetails] = useState(null);
    const [selectedServiceCompanyModelDetails, setSelectedServiceCompanyModelDetails] = useState(null);
    
    const handleSubmit = async() => {
        if (refusalDate ||
            operatingTime ||
            selectedFailureNodeDetails ||
            failureDescription ||
            selectedRecoveryMethodDetails ||
            sparePartsUsed ||
            recoveryDate ||
            selectedMachineDetails ||
            selectedServiceCompanyModelDetails
            ) {

            setError('');
            setOperatingTimeError('');

            if (operatingTime.trim() !== '' && isNaN(operatingTime)) {
                setOperatingTimeError('Введите корректное значение для наработки.');
                return;
            }
            await patchComplaint(reduxState.id,
                                    refusalDate,
                                    operatingTime,
                                    selectedFailureNodeDetails?.id,
                                    failureDescription,
                                    selectedRecoveryMethodDetails?.id,
                                    sparePartsUsed,
                                    recoveryDate,
                                    selectedMachineDetails?.id,
                                    selectedServiceCompanyModelDetails?.id,
            );
            dispatch(fetchComplaintIdRetrieve(reduxState.id))
        } else {
            setError('Пожалуйста, заполните хотя бы одно поле.');
            return;
        }
    };

    return (
        
        <div>
        {reduxState ?
        <div className="main-complaint-detail-cont">
            <h1>ТО {reduxState.id}</h1>
            <div className="complaint-detail-row">
                <div className="complaint-detail-table-block">
                    <span>Дата отказа: </span>
                    <span>{reduxState.refusal_date} </span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <input
                        className="input"
                        type="date"
                        value={refusalDate}
                        onChange={(e) => {setRefusalDate(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Наработка: </span>
                    <span>{reduxState.operating_time} </span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <input
                        className="input"
                        type="text"
                        placeholder="operatingTime"
                        value={operatingTime}
                        onChange={(e) => {setOperatingTime(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Узел отказа: </span>
                    <span>{reduxState.failure_node_details.name}</span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <Select 
                        options={failure_node_details}
                        value={selectedFailureNodeDetails}
                        onChange={(option) => setSelectedFailureNodeDetails(option)}
                        placeholder="Выберите узел отказа"
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Описание отказа: </span>
                    <span>{reduxState.failure_description} </span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <input
                        className="input"
                        type="text"
                        value={failureDescription}
                        onChange={(e) => {setFailureDescription(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Способ восстановления: </span>
                    <span>{reduxState.recovery_method_details.name}</span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <Select 
                        options={recovery_method_details}
                        value={selectedRecoveryMethodDetails}
                        onChange={(option) => setSelectedRecoveryMethodDetails(option)}
                        placeholder="Выберите cпособ восстановления"
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Используемые запасные части: </span>
                    <span>{reduxState.spare_parts_used} </span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <input
                        className="input"
                        type="text"
                        value={sparePartsUsed}
                        onChange={(e) => {setSparePartsUsed(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Дата восстановления: </span>
                    <span>{reduxState.recovery_date} </span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <input
                        className="input"
                        type="date"
                        value={recoveryDate}
                        onChange={(e) => {setRecoveryDate(e.target.value)}}
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Mашина: </span>
                    <span>{reduxState.machine_details.machine_factory_num} </span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <Select 
                        options={machine_details}
                        value={selectedMachineDetails}
                        onChange={(option) => setselectedMachineDetails(option)}
                        placeholder="Выберите машину"
                    />
                    : null}
                </div>
                <div className="complaint-detail-table-block">
                    <span>Cервисная компания: </span>
                    <span>{reduxState.service_company_details.name} </span>
                    {(reduxStateUser.groups_details[0]?.name === "Managers" || reduxStateUser.groups_details[0]?.name === "Service company")?
                    <Select 
                        options={service_company_details}
                        value={selectedServiceCompanyModelDetails}
                        onChange={(option) => setSelectedServiceCompanyModelDetails(option)}
                        placeholder="Выберите сервисную компанию"
                    />
                    : null}
                </div>
            </div>
            <button onClick={handleSubmit} className="signin-input">Сохранить</button>
            {operatingTimeError && <div className="error-message" style={{color: 'red'}}>{operatingTimeError}</div>}
            {error && <div className="error-message" style={{color: 'red'}}>{error}</div>}
        </div>
        :
        <div className="main-complaint-detail-cont">
            <span className="complaint-detail-header">загрузка</span>
            <span className="complaint-detail-hint">
                {"(если вы перешли на эту страницу не посредством клинка на конкретную рекламацию то тут ничего не появится)"}
            </span>
        </div>
        }

        </div>
    )    
}