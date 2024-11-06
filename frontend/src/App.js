import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { MachineDetail } from './components/Main/Machine/MachineDetail';
import { MaintenanceDetail } from './components/Main/Maintenance/MaintenanceDetail';
// import { ComplaintDetail } from './components/ComplaintDetail/ComplaintDetail';
// import { ControlDetail } from './components/OtherDetail/ControlDetail/ControlDetail';
// import { EngineDetail } from './components/OtherDetail/EngineDetail/EngineDetail';
// import { FailureNodeDetail } from './components/OtherDetail/FailureNodeDetail/FailureNodeDetail';
// import { LeadDetail } from './components/OtherDetail/LeadDetail/LeadDetail';
// import { MachineModelDetail } from './components/OtherDetail/MachineModelDetail/MachineModelDetail';
// import { RecoveryMethodDetail } from './components/OtherDetail/RecoveryMethodDetail/RecoveryMethodDetail';
// import { ServiceCompanyDetail } from './components/OtherDetail/ServiceCompanyDetail/ServiceCompanyDetail';
// import { TMTypeDetail } from './components/OtherDetail/TMTypeDetail/TMTypeDetail';
// import { TransmissionDetail } from './components/OtherDetail/TransmissionDetail/TransmissionDetail';
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
 {/* <Route path='/main/complaint' element={<ComplaintDetail/>}/>
          <Route path='/main/control' element={<ControlDetail/>}/>
          <Route path='/main/engine' element={<EngineDetail/>}/>
          <Route path='/main/failurenode' element={<FailureNodeDetail/>}/>
          <Route path='/main/lead' element={<LeadDetail/>}/>
          <Route path='/main/machinemodel' element={<MachineModelDetail/>}/>
          <Route path='/main/recoverymethod' element={<RecoveryMethodDetail/>}/>
          <Route path='/main/servicecompany' element={<ServiceCompanyDetail/>}/>
          <Route path='/main/tmtype' element={<TMTypeDetail/>}/>
          <Route path='/main/transmission' element={<TransmissionDetail/>}/>
          <Route path='/main/unauthorized' element={<Unauthorized/>}/> */}
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
