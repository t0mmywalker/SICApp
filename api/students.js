const admin = require('firebase-admin');

// Initialiseer Firebase Admin alleen als er nog geen instantie bestaat.
if (!admin.apps.length) {
  // Zorg dat dit pad klopt: het serviceaccount JSON-bestand staat in de root van de repo.
  const serviceAccount = require('../school-webap-firebase-adminsdk-xnwek-7551db5a29.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://school-webap-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

const database = admin.database();

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    // Haal alle studenten op
    try {
      const snapshot = await database.ref('students').once('value');
      const data = snapshot.val();
      res.status(200).json(data || {});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  } else if (req.method === 'POST') {
    // Voeg een nieuwe student toe
    try {
      const { name, age, grade } = req.body;
      if (!name || !age || !grade) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const newStudentRef = database.ref('students').push();
      await newStudentRef.set({ name, age, grade });
      res.status(201).json({ id: newStudentRef.key, name, age, grade });
    } catch (error) {
      res.status(500).json({ message: 'Error adding student', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};