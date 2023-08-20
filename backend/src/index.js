import express from 'express';
import cors from 'cors';
import { SERVER_PORT } from './config/config.js';
// import connectorDb from './models/DatabaseConnector.js';
import authRoutes from './routes/authRoutes.js';

// Create the Express app
const app = express();

// cors
app.use(cors());

// Parse JSON bodies for POST requests
app.use(express.json());

// Using routes
app.use('/api/auth', authRoutes);

// MySQL connection setup
// const [medecins] = await connectorDb.query('SELECT * FROM medecin');
// console.log(medecins);

// Define your routes and middleware here

// Start the server
const PORT = SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
