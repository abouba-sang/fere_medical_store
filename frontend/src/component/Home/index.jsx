import { Link } from 'react-router-dom'
import Logo from '../../assets/logo/logo-3.png';
import './style.css';

const Home = () => {
  return (
    <div className="home">
        <div className="home__container">
            <div className='home__welcome'>
                <p className='home__welcome_text'>Bienvenue sur notre application de gestion médicale de pointe, votre meilleur allié pour suivre et gérer les antécédents médicaux à travers tout le territoire malien!</p>
                <ul>
                    <li className='home__description_title'>
                        Enregistrer les antécédents médicaux des patients.
                    </li>
                    <li className='home__description_title'>
                        Collaborer avec les professionnels de la santé pour une bonne gestion.
                    </li>
                    <li className='home__description_title'>
                        Sécurité les données des patients.
                    </li>
                </ul>
            </div>
            <div className='home__logo'>
                <img src={Logo} alt="FERE MEDICAL LOGO IMG"/>
            </div>
            <div className='home__buttons'>
                <Link to='/user/login' className=''>Se connecter</Link>
                <Link to='/user/register' className=''>S&apos;enregistrer</Link>
            </div>
        </div>
    </div>
  )
}

export default Home