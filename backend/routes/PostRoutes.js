const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

// Rota para criar uma nova postagem
router.post('/posts', postController.createPost);

module.exports = router;