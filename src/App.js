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
import MedecinDisponibilites from './Pages/Medecin/MedecinDisponibilites';
import MedecinHistorique from './Pages/Medecin/MedecinHistorique';
import AdminHome from './Pages/Admin/AdminHome';
import AdminProfile from './Pages/Admin/AdminProfile';
import PatientsList from './Pages/Admin/AdminPatient';
import Medecinlist from './Pages/Admin/AdminMedecin';


// import AdminMedecin from './Pages/Admin/AdminMedecin';
// import AdminPatient from './Pages/Admin/AdminPatient';
import AdminRendezvous from './Pages/Admin/AdminAppointment';
import OrdonnanceAdmin from './Pages/Admin/AdminOrdonnances';
// import AdminHistorique from './Pages/Admin/AdminHistorique';
import AdminLayout from './Pages/Admin/LayoutAdmin';
import SpecialitesAndVillesManager from './Pages/Admin/AdminSpecVilles';

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
          <Route path="dispo" element={<MedecinDisponibilites />} />
          <Route path="histori" element={<MedecinHistorique />} />
        </Route>  
          
          {/* admin */} 
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminHome />} /> 
          <Route path="profile" element={<AdminProfile />} />
          <Route path="document" element={<OrdonnanceAdmin />} />
          <Route path="rendezvous" element={<AdminRendezvous />} />
          <Route path="medecins" element={<Medecinlist />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="specville" element={<SpecialitesAndVillesManager />} />
            {/* C’est /admin/profile */} 
          {/* <Route path="medecins" element={<AdminMedecin />} /> 
          <Route path="patients" element={<AdminPatient />} /> 
          <Route path="rendezvous" element={<AdminRendezvous />} /> 
          <Route path="ordonnances" element={<AdminOrdonnance />} /> 
          <Route path="historique" element={<AdminHistorique />} /> */}
        </Route>

         


      </Routes>
    </Router>
  );
}

export default App;
