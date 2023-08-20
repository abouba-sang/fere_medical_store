import jwt from 'jsonwebtoken';
import Medecin from '../models/Medecin.model.js';
import { JWT_SECRET } from '../config/config.js';

const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
      // verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      // Get the user
      req.user = await Medecin.getMedecin(decoded.id);

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Non autorise' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorise, pas de token' });
  }
};

export default authenticate;
