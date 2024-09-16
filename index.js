const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors');




const app = express();

app.use(cors());

// connection
// mongodb://localhost:27017/

const url = 'mongodb://localhost:27017/musiconlysbb'; // default URL if MongoDB is on the same machine

mongoose.connect(url)
.then(()=>{
    console.log("mongoDB connected");
}).catch(err =>{
    console.log("Mongo error");
});



// Schema
const songSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    img:{
        type:String,

    },
    artist:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required: true,
    },
    songlink:{
        type:String,
        
    }
   
});

// MODEL

const Song = mongoose.model("song", songSchema)


// middleware - plugin

app.use(express.urlencoded({extended: false}));



// ROUTES
app.get("/api",(req,res)=>{

    return res.json({message:"hello from server"});
});

app.get("/api/allsong", async(req,res)=>{

    const allsongs = await Song.find({});

    if(!allsongs){
        return res.json({message:"hello from server unable to record it"});
    }
    return res.json(allsongs);
});


app.post("/api/allsong", async (req,res)=>{

    const body = req.body;

    console.log(body);
    console.log(body.title);

    if( !body || !body.title || !body.img || !body.artist || !body.duration || !body.songlink){
        return res.json({message:"hello from server unable to record it"});
    }

    const result = await Song.create({
        title : body.title,
        img : body.img,
        artist : body.artist,
        duration : body.duration,
        songlink : body.songlink,
    });
    console.log(result);

    return res.status(201).json({message:"success"});

});




app.get("/api/owner",(req,res)=>{

    return res.json({message:"hello from server x1 "});
});


// server 
app.listen(8027,()=>{
    console.log("server started..");
});
