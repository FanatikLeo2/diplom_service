import {useSelector} from "react-redux";
import './OtherModels.css'
import { useEffect,useState } from "react";


export const MachineModels = function() {
    const reduxState = useSelector(state => state.id.machineModel)
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(reduxState); 
    }, [reduxState]);  

    return (
        <div className='otherModels'>
            <h2>{reduxState?.description}</h2>
        </div>
    );
};

export const EngineModels = function() {
    const reduxState = useSelector(state => state.id.engine)
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(reduxState); 
    }, [reduxState]); 

    return (
        <div className='otherModels'>
            <h2>{reduxState?.description}</h2>
        </div>
    );
};

export const SteeringAxleModels = function() {
    const reduxState = useSelector(state => state.id.steering)
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(reduxState); 
    }, [reduxState]); 

    return (
        <div className='otherModels'>
            <h2>{reduxState?.description}</h2>
        </div>
    );
};

export const DrivingAxleDetails = function() {
    const reduxState = useSelector(state => state.id.driving)
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(reduxState); 
    }, [reduxState]); 

    return (
        <div className='otherModels'>
            <h2>{reduxState?.description}</h2>
        </div>
    );
};

export const TransmissionDetails = function() {
    const reduxState = useSelector(state => state.id.transmission)
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(reduxState); 
    }, [reduxState]); 

    return (
        <div className='otherModels'>
            <h2>{reduxState?.description}</h2>
        </div>
    );
};