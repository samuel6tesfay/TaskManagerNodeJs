require('dotenv').config()


const pool = require('../models/db')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    const userid = { "id": id }
    return jwt.sign(userid,process.env.ACCESS_TOKEN_SECRET,{expiresIn:maxAge});
}

validateUser = (user) =>{
   
    var errors = [];

    if (!user.name || !user.email || !user.password) {
        errors.push({ message: "Please enter all fields" });
    }

    if (user.password.length < 6) {
        errors.push({ message: "Password must be a least 6 characters long" });
      }


    if(errors.length > 0){
        console.log(errors)
        return false;
        
    }else{
        return true;
    }

}

const signup = async (req,res) => {
    try{

        if(validateUser(req.body)){

            const {name , email , password} = req.body;

            const checkEmail = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
            // console.log(checkEmail.rows);
            if(checkEmail.rows.length == 0){
                // const salt = await bcrypt.genSalt();
                hashedPassword = await bcrypt.hash(password,10);
                const ser = await pool.query(
                    "insert into users (name,email,password) values($1,$2,$3)",[name,email,hashedPassword]
                );
                const token = createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({ user: user.id });
            }else{
                res.json("email already exist")
            }
            
        }else{
            res.json(errors);
            errors = []
        }
        
    }catch(err){
        console.log(err.message);
    }
}

const login = async(req,res) => {
    
    try{
        const {email , password} = req.body;
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])

        if (user.rows.length > 0) {
            console.log(user.rows[0].id);
            const token = createToken(user.rows[0].id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user.id });
            try{
               const auth = await bcrypt.compare(password,user.password);
                res.json(auth)
            }catch(err){
                res.json(err);
            }
        }
        
        res.render('user login');
    }catch(err){
        console.log(err.message);

    }
}

const loginget = async(req,res) =>{
    res.json("fill email and password in the body and post it to localhost/3000/todo")
}

const logout = (req,res) => {
    res.cookie('jwt',"",{ maxAge: 1 });
    res.redirect('/login');
}

module.exports = {
    signup, login ,logout,loginget
}