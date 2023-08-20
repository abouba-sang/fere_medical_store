import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const generateToken = id => jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });

export default generateToken;
