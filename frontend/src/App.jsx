import Home from "./component/Home";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import PatientPage from "./component/PatientPage";
import RegistrationSuccessPage from "./component/RegistrationSuccessPage";
import ProtectedRoute from "./component/ProtectedRoute";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Page404 from "./component/Page404";
import { useEffect } from 'react';
import { useAuth } from "./contexts/authContext";

function App() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/medecin/actions';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('fere_user'));
    const storedToken = JSON.parse(localStorage.getItem('fere_token'));

    if(storedUser && storedToken) {
        setAuth({user: storedUser, token: storedToken});
        navigate(from, {replace: true});
    }

  }, [setAuth, from, navigate]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/user/login" element={<LoginForm />} />
      <Route path="/user/register" element={<RegisterForm />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/valid/doctor" element={<RegistrationSuccessPage />} />
        <Route path="/medecin/actions" element={<PatientPage />} />
      </Route>

      <Route path="/*" element={<Page404 />} />
    </Routes>
  )
}

export default App
