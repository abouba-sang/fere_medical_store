import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  nom: Yup.string().required('Le nom est requis'),
  prenom: Yup.string().required('Le prenom est requis'),
  specialite: Yup.string().required('La specialite est requise'),
  telephone: Yup.string().matches(/^[5-9]\d{7}$/, 'Numero de telephone invalide').required('Le numero de telephone est requis'),
  email: Yup.string().required('L\'addresse email est requis').email('Veuillez saisir un email valide'),
  motdepasse: Yup.string().required('Le mot de passe est requis').min(6, 'Utilisez un mot de passe de 6 caractere minimum'),
  hopital: Yup.string().required('Le nom de votre hopital de travail est requis')
});

export const loginValidationSchema = Yup.object({
  telephoneOrEmail: Yup.string("Entrez votre email ou numero de telephone")
    .required("L'email ou telephone requis")
    .test('test-name', 'Entrez un numero de telephone ou un email valide',
        function(value) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const telephoneeRegex = /^[5-9]\d{7}$/;
            let isValidEmail = emailRegex.test(value);
            let isValidPhone = telephoneeRegex.test(value);
            if (!isValidEmail && !isValidPhone ){
                return false;
            }
            return true;
        }),
  motdepasse: Yup.string().required('Le mot de passe est requis').min(6, 'Utilisez votre mot de passe de 6 caractere minimum'),
})