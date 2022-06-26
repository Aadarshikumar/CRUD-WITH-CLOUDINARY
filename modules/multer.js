const multer = require("multer");
const path = require("path")

const upload = multer({
    storage: multer.diskStorage({
        filename: ((req, file, cd) => {
            let ext = path.extname(file.originalname);
            if (ext != ".jpg" && ext != ".jpeg" && ext != ".pdf" && ext != ".pnb") {
                cd (new Error("file type is not support"), false)
                return;
            }
            cd(null, "true")
        })
    })
})


module.exports = upload


