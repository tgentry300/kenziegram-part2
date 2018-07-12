const express = require("express")
const multer = require("multer");
const fs = require("fs");
const path = require("path")

const publicPath = 'public/';
const uploadPath = './public/uploads';

const port = 3000;

const app = express();

const photoObject = {
    photoArray: []
}

app.set('view engine', 'pug')
// app.set('view options', { layout: false })
app.set("views", path.join(__dirname, "views"));

app.use(express.static(publicPath));
const upload = multer({
    dest: uploadPath
});


app.post('/public/uploads', upload.single('myFile'), function (req, res, next) {
    res.render('uploads')
})



app.get("/", (req, res) => {
    fs.readdir(uploadPath, (err, items) => {
        
        items.forEach(image => {
            photoObject.photoArray.push(image)
        });
        
    })
    res.render('index', {items: photoObject.photoArray})
    //     `<link rel="stylesheet" href="index.css">
    //     <body>
    //     <h1>KenzieGram</h1>
    //     <form action="/public/uploads" enctype="multipart/form-data" method="POST">
    //     <input type="file" name="myFile">
    //     <input type="submit">

    //     </form>
    //     ${photoArray}
    //     </body>
    //     `
})


app.listen(port)