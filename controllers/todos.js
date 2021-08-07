const pool = require('../models/db')

//create a todo
const createtodo = async (req,res) =>{
    try{
        const { description } = req.body;
        const user_id = req.user_id.id;
        const newTod = await pool.query(

            "insert into todo (description,user_id) values($1,$2)",[description,user_id]
        );
        res.json(newTod[0])
        
    }catch(err){
        console.log(err.message);
    }
}
// get all todo
const todos = async (req,res) =>{
    try{
        
        const user_id = req.user_id.id;
        const allTods = await pool.query("select * from todo where user_id = $1", [user_id]);
    
        res.json(allTods.rows);
    }catch(err){
        console.log(err.message);
    }
}

// get a todo
const todo = async (req,res) =>{
    try{
        const { id } = req.params;
        const user_id = req.user_id.id;

        const todo = await pool.query("select * from todo where todo_id = $1", [id]);
        if (todo.rows[0].user_id == user_id) {
            res.json(todo.rows[0]);

        } else {
            res.json("")
        }
    }catch(err){
        console.log(err.message);
    }
}

// update todo
const updatetodo = async (req,res) =>{
    try{
        const { id } = req.params;
        const { description } = req.body;
        const user_id = req.user_id.id;
        const todo = await pool.query("select * from todo where todo_id = $1", [id]);
        if (todo.rows[0].user_id == user_id) {
            const updateTodo = await pool.query(
        "update todo set description = $1 where todo_id = $2",[description,id]);
        res.json("todo was updated"); 
        }else {
            res.json("fail to update")
        }

        
    }catch(err){
        console.log(err.message);
    }
}

// delete todo
const deletetodo = async (req,res) =>{
    try{
        const { id } = req.params;

        const user_id = req.user_id.id;
        const todo = await pool.query("select * from todo where todo_id = $1", [id]);
        if (todo.rows[0].user_id == user_id) {
            const deleletTodo = await pool.query("delete from todo where todo_id=$1",[id]);
            res.json("Todo was deleted!"); 
        }else {
            res.json("fail to delete")
        }
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {
    createtodo,todos , todo , updatetodo , deletetodo
}