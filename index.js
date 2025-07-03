const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const setupSwagger = require('./config/swagger');
setupSwagger(app);

const cors = require('cors');
app.use(cors());


require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Carambar 🍬');
});

const sequelize = require('./config/database');
const Joke = require('./models/joke');

sequelize.sync() 
  .then(() => {
    console.log('Base de données synchronisée ✅');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation ❌', err);
  });

const jokesRouter = require('./routes/jokes');
app.use('/api/v1/jokes', jokesRouter);


app.listen(PORT, () => { 
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
