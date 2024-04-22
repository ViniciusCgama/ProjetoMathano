const Joi = require('joi');
const Post = require('../models/Post');

const postValidationSchema = Joi.object({
  content: Joi.string().min(1).max(280).required(),
  author: Joi.string().required()
});

const createPost = async (req, res) => {
  try {
    const { error } = postValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newPost = new Post(req.body);

    await newPost.save();

    res.status(201).json({ message: 'Postagem criada com sucesso!', post: newPost });
  } catch (err) {
    console.error('Erro ao criar postagem:', err);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
  }
};

module.exports = {
  createPost
};