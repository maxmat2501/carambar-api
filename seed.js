const sequelize = require('./config/database');
const Joke = require('./models/joke');

const jokesData = [
  { question: "Quelle est la femelle du hamster ?", answer: "L’Amsterdam" },
  { question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?", answer: "Parce que sinon ils tombent dans le bateau." },
  { question: "Que fait une fraise sur un cheval ?", answer: "Tagada tagada" },
  
];

async function seed() {
  try {
    await sequelize.sync()
    await Joke.bulkCreate(jokesData);
    console.log('Blagues ajoutées en base !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur de seed :', error);
    process.exit(1);
  }
}

seed();
