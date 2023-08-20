import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import Logo from '../../assets/logo/logo-3.png';
import { loginValidationSchema } from '../../utils/ValidationSchema';
import './style.css';

const LoginForm = () => {
  const { setAuth, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/medecin/actions';

  const [formData, setFormData] = useState({
    telephoneOrEmail: '',
    motdepasse: ''
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const { telephoneOrEmail, motdepasse } = formData;

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
    loginValidationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        await login(formData).then((response) => {
          setAuth({ user: response.user, token: response.token });
          localStorage.setItem('fere_user', JSON.stringify({ ...response.user, [motdepasse]: response.user.motdepasse }));
          localStorage.setItem('fere_token', JSON.stringify(response.token));
          navigate(from, {replace: true});
        }).catch((err) => {
          setError(err?.response?.data?.error)
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
    <div className="login__form_container">
      <img src={Logo} alt="Logo" className="login__form_logo" />
      <form className="login__form_registration-form" onSubmit={onSubmit}>
        <h2>Forme de connexion au portail pour les medecins par Telephone ou Email</h2>
        <div className="login__form_form-group">
          <input
            type="text"
            name='telephoneOrEmail'
            value={telephoneOrEmail}
            placeholder="Telephone ou Email"
            autoComplete='off'
            onChange={onChange}
          />
          {errors.telephoneOrEmail && <span className='login__form_error'>{errors.telephoneOrEmail}</span>}
        </div>
        <div className="login__form_form-group">
          <input
            type="password"
            name='motdepasse'
            value={motdepasse}
            placeholder="Mot de passe"
            onChange={onChange}
          />
          {errors.motdepasse && <span className='login__form_error'>{errors.motdepasse}</span>}
        </div>
        <button className='login__form_button' type="submit">Se connecter</button>
        <div className='login__form_last'>
          <span>Vous n&apos;avez pas un compte?</span>
          <Link to='/user/register'>S&apos;enregistrer</Link>
        </div>
      </form>
      {error && <div className='login__form_error_form'>{error}</div>}
    </div>
  )
}

export default LoginForm