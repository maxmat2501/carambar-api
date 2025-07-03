/**
 * @swagger
 * tags:
 *   name: Jokes
 *   description: API pour gérer les blagues
 */

const express = require('express');
const router = express.Router();
const Joke = require('../models/joke');

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Récupérer toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Liste des blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 */

// GET /jokes - toutes les blagues
router.get('/', async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Récupérer une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 */

// GET /jokes/random - blague aléatoire
router.get('/random', async (req, res) => {
  try {
    const count = await Joke.count();
    const randomIndex = Math.floor(Math.random() * count);
    console.log(randomIndex);
    const joke = await Joke.findOne({ offset: randomIndex });
    res.json(joke);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Récupérer une blague par ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la blague
 *     responses:
 *       200:
 *         description: Détails de la blague
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée
 */

// GET /jokes/:id - blague par ID
router.get('/:id', async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (joke) {
      res.json(joke);
    } else {
      res.status(404).json({ error: 'Blague non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JokeInput'
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Mauvaise requête, données manquantes
 */

// POST /jokes - ajouter une nouvelle blague
router.post('/', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question et réponse requises' });
    }
    const newJoke = await Joke.create({ question, answer });
    res.status(201).json(newJoke);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la blague
 *         question:
 *           type: string
 *           description: La question de la blague
 *         answer:
 *           type: string
 *           description: La réponse de la blague
 *       example:
 *         id: 1
 *         question: "Quelle est la femelle du hamster ?"
 *         answer: "L’Amsterdam"
 *     JokeInput:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *       example:
 *         question: "Pourquoi les plongeurs plongent-ils toujours en arrière ?"
 *         answer: "Parce que sinon ils tombent dans le bateau."
 */

module.exports = router;

