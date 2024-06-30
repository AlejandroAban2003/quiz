// controllers/questionController.js
const Question = require('../models/Question');

// Obtener todas las preguntas
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una pregunta por ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva pregunta
exports.createQuestion = async (req, res) => {
    const { questionText, options, correctAnswer } = req.body;
    const newQuestion = new Question({
        questionText,
        options,
        correctAnswer
    });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una pregunta por ID
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una pregunta por ID
exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.status(200).json({ message: 'Pregunta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
