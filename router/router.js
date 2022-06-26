const { createToken } = require("../modules/jsonwebtoken")
const knex = require("../config/Database_connection")
const uplode = require("../modules/multer")
const cloudinary = require("../modules/cloudinary")    // automatic create when we create a token in line 23


// LOGIN, SIGNUP, WORK
const Register = (req, res) => {
    knex("user").where({email: req.body.email}).then((result) => {
        if (result.length == 0){
            knex("user").insert(req.body).then((result) => {
                res.send("Done")
            })
        }
        else{
            res.send("Try Again")
        }
    })
}

const Login = (req, res) =>{
    knex("user").where({email: req.body.email, password: req.body.password}).then((result) => {
        const token = createToken(result[0])
        res.cookie("Cookie", token)                //"Cookie" is as a key
        res.send("Login Successfully")
    }).catch((err) =>{
        res.send("Your EMAIL or may be PASSWORD is wrong")
    })
}


const Update = (req, res) =>{
    knex("user").where({email: req.userData[0].email}).update(req.body).then((result) =>{
        res.send("Your Data is Updated")
    })
}

const Read = (req, res) =>{
    res.send(`${req.userData[0].name},\n${req.userData[0].email},\n${req.userData[0].password}`)
}

const Delete = (req, res) =>{
    knex("user").where({email: req.userData.email}).del().then((result) =>{
        res.send("Your Data is DELETED")
    })
}

// IMAGE WORK

const Postimage = (req, res) =>{
    cloudinary.uploader.upload(req.file.path).then((result) =>{
        knex("gallery").insert({testingId: req.userData[0].id, avatar: result.secure_url, cloudinary_id: result.public_id}).then((result) =>{
            res.send("Data Inserted")
        })
    })
}




const Putimage = async (req, res) =>{
    const find = await knex("gallery").where({testingId: req.userData[0].id})
    const del_url = await cloudinary.uploader.destroy(find[0].cloudinary_id)
    const Update_url = await cloudinary.uploader.upload(req.file.path)
    const updat = await knex("gallery").where({testingId: req.userData[0].id}).update({avatar: Update_url.secure_url  || find.secure_url, cloudinary_id: Update_url.public_id  || find.public_id})
    res.send("Updated")
}


const Readimage = async (req, res) => {
    const find = await knex("gallery").where({testingId: req.userData[0].id})
    res.json(find[0])
}



const Deleteimage = async (req, res) => {
    const find = await knex("gallery").where({testingId: req.userData[0].id})
    const del_url = await cloudinary.uploader.destroy(find[0].cloudinary_id)
    const del = await knex("gallery").where({testingId: req.userData[0].id}).del()
    res.send("deleted")
}

module.exports = {Register, Login, Read, Update, Delete, Postimage, Putimage, Readimage, Deleteimage}