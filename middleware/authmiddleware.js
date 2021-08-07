require('dotenv').config()

const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');

            }else{
                console.log(decodedToken.id);
                req.user_id = decodedToken;
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

// const checkUser = async (req,res) => {
//     const token = req.cookie.jwt;
//     jwt.verify(token,'sam secret',(err,decodedToken) => {
//         if(err){
//             console.log("fix me i am checkuser in middlewar")
//         }else{
//             console.log(decodedToken)
//             const checkEmail = await pool.query(`SELECT * FROM users WHERE email = $1`,[decodedToken.email]);

//             res.json(checkEmail);
//         }
//     })
// }

module.exports = {requireAuth}