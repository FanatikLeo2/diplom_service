import { fetchComplaints } from '../../reducers/complaintReducer/fetchComplaints';
import { fetchMachines } from "../../reducers/machineReducer/fetchMachines";
import { fetchMaintenances } from '../../reducers/maintenanceReducer/fetchMaintenances';
import { useDispatch, useSelector } from "react-redux";
import './Main.css'
import { useEffect, useState } from "react";
import { Machine } from "./Machine/Machine";
import { Maintenance } from "./Maintenance/Maintenance";
import { Complaints } from "./Complaints/Complaints";
import { getUser } from "../../reducers/currentUserReducer/login";
import { 
    getMachineModel, 
    getEngineModel,
    getTransmissionModel,
    getSteeringAxleModel,
    getDrivingAxleModel,
    getServiceCompanyModel,
    getUserAll,
    getMaintenanceTypeModel,
    } from "../../reducers/otherModelsReducer/fetchOtherModels"

export const Main = function() {
    const reduxState = useSelector(state => state.user)
    const reduxStateOtherModels = useSelector(state => state.otherModels)
    const dispatch = useDispatch()
    const [machines, setMachines] = useState(false)
    const [мaintenance, setMaintenance] = useState(false)
    const [complaints, setComplaints] = useState(false)

    const switchFunc = (btn) => {
        switch (btn) {
            case 'info':
                setMachines(true)
                setMaintenance(false)
                setComplaints(false)
                break;
            case 'мaintenance':
                setMachines(false)
                setMaintenance(true)
                setComplaints(false)
                break;
            case 'complaint':
                setMachines(false)
                setMaintenance(false)
                setComplaints(true)
                break;
        }
    }

    useEffect(() => {
        dispatch(fetchMaintenances())
        dispatch(fetchMachines())
        dispatch(fetchComplaints())
        dispatch(getUser())
        dispatch(getMachineModel())
        dispatch(getEngineModel())
        dispatch(getTransmissionModel())
        dispatch(getSteeringAxleModel())
        dispatch(getDrivingAxleModel())
        dispatch(getUserAll())
        dispatch(getServiceCompanyModel())
        dispatch(getMaintenanceTypeModel())
        console.log(localStorage.getItem('silantToken'))
    }, [dispatch])

    return(
        <div className="main-content-cont">
            <span>Информация о комплектации и технических характеристиках вашей техники</span>
            <hr />

            {reduxState.username
            ?
                <div className="switches-cont">
                    <button 
                        className={machines ? "switch-button switch-button-active" : "switch-button"}
                        onClick={() => switchFunc('info')}
                    >Общая инфо</button>
                    <button 
                        className={мaintenance ? "switch-button switch-button-active" : "switch-button"}
                        onClick={() => switchFunc('мaintenance')}
                    >Техническое обслуживание</button>
                    <button 
                        className={complaints ? "switch-button switch-button-active" : "switch-button"}
                        onClick={() => switchFunc('complaint')}
                    >Рекламации</button>
                </div>
            :
                null
            }
            <hr/>
            <div>
                {machines ? <Machine/> : null}
                {мaintenance ? <Maintenance/> : null}
                {complaints ? <Complaints/> : null}
            </div>
        </div>
    )
}