import { Link } from "react-router-dom";
import './style.css';

const RegistrationSuccessPage = () => {
  return (
    <div className="registration-success-container">
      <h1>Enregistrement effectue avec succes</h1>
      <p>Votre enregistrement a ete effectue. Vous allez recevoir une confirmation par email bientot et vous pourrez commencer a enregistrer les donnees de patients, les modifier ou les supprimer.</p>
      <Link to="/">Cliquer ici pour aller a la page d&apos;accueil</Link>
    </div>
  );
}

export default RegistrationSuccessPage