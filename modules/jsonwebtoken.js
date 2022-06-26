const jwt = require("jsonwebtoken");                     // here we import jsonwebtoken
const knex = require("../config/Database_connection");

const createToken = ({id}) =>{
    return jwt.sign(id,"uytrewqsrtyuilkuytrewsdrsdrtyuj")
};


const tokenverify = async (req, res, next) => {
    if (req.headers.cookie){
        const token = (req.headers.cookie).split("=")[1]
        const id = jwt.verify(token, "uytrewqsrtyuilkuytrewsdrsdrtyuj")
        const user = await knex("user").where({id})
        req.userData = user;
        next();
    }
    else{
        res.send("Token Expired")
    }
}

module.exports = {createToken, tokenverify}