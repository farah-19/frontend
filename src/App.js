import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LayoutVisiteur from './Visiteurs/Layout';
import LayoutPatient from './Pages/Patient/LayoutPatient';
import PatientHome from './Pages/Patient/PatientHome';
import PatientProfile from './Pages/Patient/PatientProfile';
import PatientDocument from './Pages/Patient/PatientDocument';
import PatientRendezvous from './Pages/Patient/PatientRendezvous';
import PatientMedecins from './Pages/Patient/PatientMedecins';
import PatientHistorique from './Pages/Patient/PatientHistorique';
import LayoutMedecin from './Pages/Medecin/LayoutMedecin';
import MedecinHome from './Pages/Medecin/MedecinHome';
import MedecinProfile from './Pages/Medecin/MedecinProfile';
import MedecinOrdonnances from './Pages/Medecin/MedecinOrdonnances';
import MedecinRendezvous from './Pages/Medecin/MedecinAppointmentList';

// import LayoutMedecin from './Pages/Medecin/Layout';
// import LayoutAdmin from './Pages/Admin/Layout'; 
// import MedecinProfile from './Pages/Medecin/MedecinProfile';
// import MedecinHome from './Pages/Medecin/MedecinHome';
// import AdminHome from './Pages/Admin/AdminHome';
// import AdminProfile from './Pages/Admin/AdminProfile';
// import MedecinList from './Pages/Admin/MedecinList';
// import PatientList from './Pages/Admin/PatientList';
// import AppointmentList from './Pages/Admin/AppointmentList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutVisiteur />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* patient */}
        <Route path="/patient" element={<LayoutPatient />} >
          <Route index element={<PatientHome />} />  {/* C’est /patient */}
          <Route path="profile" element={<PatientProfile />} />  {/* C’est /patient/profile */}
          <Route path="document" element={<PatientDocument />} />
          <Route path="rendezvous" element={<PatientRendezvous />} />
          <Route path="medecin" element={<PatientMedecins />} />
          <Route path="historique" element={<PatientHistorique />} />
        </Route>
        {/* médecin */}
        <Route path="/medecin" element={<LayoutMedecin />} >
          <Route index element={<MedecinHome />} /> 
          <Route path="profile" element={<MedecinProfile />} />  {/* C’est /medecin/profile */} 
          <Route path="document" element={<MedecinOrdonnances />} /> 
          <Route path="rendezvous" element={<MedecinRendezvous />} /> 
          {/* <Route path="historique" element={<MedecinHistorique />} /> */}
        </Route>  
          {/* <Route path="profile" element={<MedecinProfile />} />  {/* C’est /medecin/profile */}
          {/* <Route path="document" element={<MedecinDocument />} />  */}


      </Routes>
    </Router>
  );
}

export default App;
