const express = require('express');
const app = express();
const {v4:uuidv4} = require('uuid');
const path = require('path');
const methodOverride = require('method-override')
const port = 8080;

app.set("view engine","ejs");
app.use(express.urlencoded({extended : true}));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));


app.listen(port,() => {
    console.log("app is listening at port 8080")
})

let data = [
    {
        id : uuidv4(),
        username : "doraemon",
        caption : "Hello I am a robo",
        image : 'https://static.turbosquid.com/Preview/2015/07/01__07_00_44/d00.jpg51979e6b-755c-4f03-9a16-d8114f0e2058Zoom.jpg'
    },
    {
        id : uuidv4(),
        username : "apple",
        caption : "iPhone 15 Launched",
        image : "https://mobilepriceall.com/wp-content/uploads/2022/09/Apple-iPhone-14-1024x1024.jpg"
    }
]

app.get("/home",(req,res) => {
    res.render("index.ejs",{data});
});

app.get("/home/create",(req,res) => {
    res.render("create.ejs")
})

app.post("/home",(req,res) => {
    let {username,image,caption} = req.body;
    let id = uuidv4();
    data.push({id,username,image,caption});
    res.redirect("http://localhost:8080/home");
})


app.get("/home/:username/:id/edit", (req, res) => {
    const { id, username } = req.params;
    const user = data.find(item => item.id === id && item.username === username);

    if (!user) {
        return res.send("User not found");
    }

    res.render("view.ejs", user);
});


app.patch("/home/:username/:id/edit",(req,res) => {
    const { id, username } = req.params;
    const user = data.find(item => item.id === id && item.username === username);

    if (!user) {
        return res.send("User not found");
    }
    let newCaption = req.body.caption;
    user.caption = newCaption;
    console.log(newCaption);
    res.redirect("/home");
})

app.delete("/home/:username/:id",(req,res) => {
    const { id, username } = req.params;
    data = data.filter(item => item.id !== id && item.username !== username);

    res.redirect("/home");
})

