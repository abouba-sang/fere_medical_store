import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import LogoImg from '../../../assets/logo/logo-3.png';
import './style.css';

const PatientNavbar = () => {
      const { logout, auth: { user } } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    if(user) {
      logout();
      navigate('/');
    }
  }

  const { nom, prenom} = user;
  console.log(nom, prenom);
  console.log(user);

  return (
    <nav className="patient__navbar">
      <div className="patient__navbar-logo">
        <img src={LogoImg} alt="Logo" />
      </div>
      <div className="patient__medecin_profile">
        <span className="patient__medecin_welcome">
          Bienvenue au medecin
        </span>
        <span className="patient__medecin_name">
          {`${user.prenom} ${user.nom}` }
        </span>
      </div>
      <div className="patient__navbar-links">
        <button className="patient__logout-button" onClick={handleLogout}>
          Se deconnecter
        </button>
      </div>
    </nav>
  );
}

export default PatientNavbar;