const express = require('express');
const todos = require('../controllers/todos');
const { requireAuth } = require('../middleware/authmiddleware');


const todoRoutes = express.Router();

todoRoutes.get('/todos',requireAuth,todos.todos);
todoRoutes.post('/todo',requireAuth,todos.createtodo);
todoRoutes.get('/todo/:id',requireAuth,todos.todo);

todoRoutes.put('/todo/:id',requireAuth,todos.updatetodo);

todoRoutes.delete('/todo/:id',requireAuth,todos.deletetodo);

module.exports = todoRoutes;