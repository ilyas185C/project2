// Nous sommes maintenant prêts à configurer notre base de données à l'intérieur de notre API. Alors
// allons-y. Nous sommes donc de retour dans index.js et nous allons d'abord importer quelques éléments.

import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true
});

// bodyparser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// routes setup
routes(app);

// Définir un endpoint /
app.get('/', (req, res) => {
    // Message à afficher dans le navigateur
    res.send(`Node and Express server is running on port ${PORT}`);
});
// server startup
app.listen(PORT, () => {
    console.log(`Votre serveur fonctionne sur le port ${PORT}`);
});