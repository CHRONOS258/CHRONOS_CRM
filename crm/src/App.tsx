import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import DashboardDir from './pages/diretor/DashboardDir';
import DashboardGer from './pages/gerente/DashboardGer';
import DashboardCor from './pages/corretor/DashboardCor';
import LeadsCor from './pages/corretor/Leads';
import AgendaCor from './pages/corretor/Agenda';
import FerramentaCor from './pages/corretor/Ferramenta';
import LeadUploadDocs from './pages/corretor/LeadUploadDocs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rotas Privadas */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/diretor" element={<DashboardDir />} />
          <Route path="/gerente" element={<DashboardGer />} />
          <Route path="/corretor" element={<DashboardCor />} />
          <Route path="/corretor/leads" element={<LeadsCor />} />
          <Route path="/corretor/agenda" element={<AgendaCor />} />
          <Route path="/corretor/ferramenta" element={<FerramentaCor />} />
          <Route path="/corretor/lead/:id/docs" element={<LeadUploadDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
