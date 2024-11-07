import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MachineDetail } from './components/Main/Machine/MachineDetail';
import { MaintenanceDetail } from './components/Main/Maintenance/MaintenanceDetail';
import { ComplaintDetail } from './components/Main/Complaints/ComplaintsDetail';
// import { FailureNodeDetail } from './components/OtherDetail/FailureNodeDetail/FailureNodeDetail';
import { MachineModels,
  SteeringAxleModels,
  EngineModels,
  DrivingAxleDetails,
  TransmissionDetails,

 } from './components/Main/OtherModels/OtherModels';
// import { RecoveryMethodDetail } from './components/OtherDetail/RecoveryMethodDetail/RecoveryMethodDetail';
// import { ServiceCompanyDetail } from './components/OtherDetail/ServiceCompanyDetail/ServiceCompanyDetail';
// import { TMTypeDetail } from './components/OtherDetail/TMTypeDetail/TMTypeDetail';
// import { Unauthorized } from './components/Unauthorized/Unauthorized';
import './App.css';
import { Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className='global'>
      <Header/>
      <div className='main'>
        <Routes>
          <Route path='' element={<Main/>}/>
          <Route path='/autoservice/machine' element={<MachineDetail/>}/>
          <Route path='/autoservice/maintenance' element={<MaintenanceDetail/>}/>
          <Route path='/autoservice/complaint' element={<ComplaintDetail/>}/>
          <Route path='/autoservice/steering_axle_model' element={<SteeringAxleModels/>}/>
          <Route path='/autoservice/engine_model' element={<EngineModels/>}/>
          <Route path='/autoservice/driving_axle_model' element={<DrivingAxleDetails/>}/>
          <Route path='/autoservice/transmission_model' element={<TransmissionDetails/>}/>
          <Route path='/autoservice/machine_model' element={<MachineModels/>}/>

{/* 
          <Route path='/autoservice/control' element={<ControlDetail/>}/>
          <Route path='/autoservice/engine' element={<EngineDetail/>}/>
          <Route path='/autoservice/failurenode' element={<FailureNodeDetail/>}/>
          <Route path='/autoservice/lead' element={<LeadDetail/>}/>

          <Route path='/autoservice/recoverymethod' element={<RecoveryMethodDetail/>}/>
          <Route path='/autoservice/servicecompany' element={<ServiceCompanyDetail/>}/>
          <Route path='/autoservice/tmtype' element={<TMTypeDetail/>}/>
          <Route path='/autoservice/transmission' element={<TransmissionDetail/>}/>
          <Route path='/autoservice/unauthorized' element={<Unauthorized/>}/> */}
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
