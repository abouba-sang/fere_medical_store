import connectorDb from './DatabaseConnector.js';

class Medecin {
  static async getAllMedecins() {
    const [rows] = await connectorDb.query('SELECT * FROM medecin');
    return rows;
  }

  static async getMedecin(id) {
    const [rows] = await connectorDb.query('SELECT * FROM medecin WHERE medecin_id = ?', [id]);
    return rows.length ? rows[0] : null;
  }

  static async createMedecin(userData) {
    const { nom, prenom, specialite, telephone, email, motdepasse, hopital, autres_details } = userData;
    const [result] = await connectorDb.query(
      'INSERT INTO medecin (nom, prenom, specialite, telephone, email, motdepasse, hopital, autres_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nom, prenom, specialite, telephone, email, motdepasse, hopital, autres_details],
    );
    // eslint-disable-next-line no-return-await
    return await Medecin.getMedecin(result.insertId);
  }

  static async getMedecinByEmail(email) {
    const [rows] = await connectorDb.query('SELECT * FROM medecin WHERE email = ?', [email]);
    return rows.length ? rows[0] : null;
  }

  static async getMedecinByTelephone(telephone) {
    const [rows] = await connectorDb.query('SELECT * FROM medecin WHERE telephone = ?', [telephone]);
    return rows.length ? rows[0] : null;
  }
}

export default Medecin;
