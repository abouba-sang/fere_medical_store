import MedecinDetails from "../../MedecinDetails";
import PatientNavbar from "../Navbar";
import './style.css';

const PatientHome = () => {
  return (
    <div className="patient__home">
        <PatientNavbar />
        <MedecinDetails />
        <div>
          <div className="patient__details_buttons">
            <button>Lire le formulaire d&apos;un patient</button>
            <button>Creer le formulaire d&apos;un patient</button>
            <button>Mettre a jour le formulaire d&apos;un patient</button>
            <button>Supprimer une formulaire d&apos;un patient</button>
          </div>
          <div className="patient__details_content">
              
          </div>
        </div>
    </div>
  )
}

export default PatientHome;