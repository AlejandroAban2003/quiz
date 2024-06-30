// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Obtener todas las preguntas
router.get('/', questionController.getAllQuestions);

// Obtener una pregunta por ID
router.get('/:id', questionController.getQuestionById);

// Crear una nueva pregunta
router.post('/', questionController.createQuestion);

// Actualizar una pregunta por ID
router.put('/:id', questionController.updateQuestion);

// Eliminar una pregunta por ID
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
