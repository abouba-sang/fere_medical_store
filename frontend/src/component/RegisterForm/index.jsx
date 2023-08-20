import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { registerValidationSchema } from '../../utils/ValidationSchema';
import Logo from '../../assets/logo/logo-3.png';
import './style.css';

const RegisterForm = () => {
  const { setAuth, register } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/valid/doctor';

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    specialite: '',
    telephone: '',
    email: '',
    motdepasse: '',
    hopital: ''
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const { nom, prenom, specialite, telephone, email, motdepasse, hopital } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    setErrors({});
    setError(null);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    registerValidationSchema
      .validate(formData, {abortEarly: false})
      .then(async () => {
          await register(formData).then((response) => {
            setAuth({ user: response.user, token: response.token});
            navigate(from, {replace: true});
          }).catch((err) => {
            setError(err?.response?.data?.message)
          });
      })
      .catch((err) => {
        const validationErrors = {};
        err?.inner?.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      })
  }

  return (
    <div className="register__form_container">
      <img src={Logo} alt="Logo" className="register__form_logo" />
      <form className="register__form_registration-form" onSubmit={onSubmit}>
        <h2>Forme d&apos;enregistrement de medecin</h2>
        <div className="register__form_form-group">
          <input
            type="text"
            name='nom'
            value={nom}
            placeholder="Nom"
            onChange={onChange}
          />
          {errors.nom && <span className='register__form_error'>{errors.nom}</span>}
          <input
            type="text"
            name='prenom'
            value={prenom}
            placeholder="Prenom"
            onChange={onChange}
          />
          {errors.prenom && <span className='register__form_error'>{errors.prenom}</span>}
        </div>
        <div className="register__form_form-group">
          <input
            type="text"
            name='specialite'
            value={specialite}
            placeholder="Specialite"
            onChange={onChange}
          />
          {errors.specialite && <span className='register__form_error'>{errors.specialite}</span>}
          <input
            type="tel"
            name='telephone'
            value={telephone}
            placeholder="Telephone"
            onChange={onChange}
          />
          {errors.telephone && <span className='register__form_error'>{errors.telephone}</span>}
        </div>
        <div className="register__form_form-group">
          <input
            type="email"
            name='email'
            value={email}
            placeholder="Email"
            onChange={onChange}
          />
          {errors.email && <span className='register__form_error'>{errors.email}</span>}
        </div>
        <div className="register__form_form-group">
          <input
            type="password"
            name='motdepasse'
            value={motdepasse}
            placeholder="Mot de passe"
            onChange={onChange}
          />
          {errors.motdepasse && <span className='register__form_error'>{errors.motdepasse}</span>}
          <input
            type="text"
            name='hopital'
            value={hopital}
            placeholder="Hopital"
            onChange={onChange}
          />
          {errors.hopital && <span className='register__form_error'>{errors.hopital}</span>}
        </div>
        <button className='register__form_button' type="submit">S&apos;enregitrer</button>
        <div className='register__form_last'>
          <span>Vous avez deja un compte?</span>
          <Link to='/user/login'>Se connecter</Link>
        </div>
      </form>
      {error && <div className='register__form_error_form'>{error}</div>}
    </div>
  )
}

export default RegisterForm;