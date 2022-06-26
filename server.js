const express = require("express")
const { tokenverify } = require("./modules/jsonwebtoken")
const { Register, Login, Read, Update, Delete, Postimage, Putimage, Readimage, Deleteimage} = require('./router/router')
const app = express()
const { validate , valiUpdate} = require("./modules/validator")
const dotenv = require("dotenv")
const upload = require("./modules/multer")
dotenv.config()
const port = process.env.port || 2020


app.use(express.json())

app.post("/register", Register)

app.get("/login", Login)

app.get("/read", tokenverify, Read)

app.put("/update", valiUpdate, tokenverify, Update)

app.delete("/delete", tokenverify, Delete)


// MULTER

app.post("/Postimage", tokenverify, upload.single("image"), Postimage)

app.put("/Imageupdate", tokenverify, upload.single("image"), Putimage)

app.get("/Readimage", tokenverify, Readimage)

app.delete("/Deleteimage", tokenverify, Deleteimage)

app.listen(port, () => {
    console.log("Your port is Working");
})