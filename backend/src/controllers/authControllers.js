import bcrypt from 'bcrypt';
import Medecin from '../models/Medecin.model.js';
import hashPassword from '../utils/hashPassword.js';
import generateToken from '../utils/generateToken.js';

const authController = {
  register: async (req, res) => {
    try {
      const { nom, prenom, specialite, telephone, email, motdepasse, hopital, autres_details } = req.body;

      let userExists;
      userExists = await Medecin.getMedecinByEmail(email);
      if (userExists) {
        return res.status(400).json({ message: "L'utilisateur avec cet email exist deja" });
      }

      userExists = await Medecin.getMedecinByTelephone(telephone);
      if (userExists) {
        return res.status(400).json({ message: "L'utilisateur avec cet telephone exist deja" });
      }

      const hashedPassword = await hashPassword(motdepasse);

      const newMedecin = await Medecin.createMedecin({
        nom,
        prenom,
        specialite,
        telephone,
        email,
        motdepasse: hashedPassword,
        hopital,
        autres_details,
      });

      if (newMedecin) {
        return res.status(201).json({
          user: newMedecin,
          token: generateToken(newMedecin.medecin_id),
        });
      }

      return res.status(400).json({ message: 'Les donnees fournies sont invalide' });
    } catch (error) {
      res.status(500).json({ message: "Erreur d'enregistrement des donnees du medecin" });
    }
  },

  login: async (req, res) => {
    try {
      const { telephoneOrEmail, motdepasse } = req.body;

      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(telephoneOrEmail);
      const isPhoneNumber = /^[5-9]\d{7}$/.test(telephoneOrEmail);

      let medecin;
      if (isEmail) {
        medecin = await Medecin.getMedecinByEmail(telephoneOrEmail);
        if (!medecin) {
          return res.status(400).json({ message: "Utilisateur avec cet email n'existe pas!" });
        }
      }

      if (isPhoneNumber) {
        medecin = await Medecin.getMedecinByTelephone(telephoneOrEmail);
        if (!medecin) {
          return res.status(400).json({ message: "Utilisateur avec cet numero de telephone n'existe pas!" });
        }
      }

      const isPasswordValid = await bcrypt.compare(motdepasse, medecin.motdepasse);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Email/Telephone ou Mot de passe invalide!' });
      }

      return res.status(200).json({
        user: medecin,
        token: generateToken(medecin.medecin_id),
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur de connexion au systeme!' });
    }
  },

  me: async (req, res) => {
    const { medecin_id, nom, prenom, email, telephone } = await Medecin.getMedecin(req.user.medecin_id);

    return res.status(200).json({
      id: medecin_id,
      nom,
      prenom,
      email,
      telephone,
    });
  },
};

export default authController;
