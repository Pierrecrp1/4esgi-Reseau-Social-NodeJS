const jwt = require("jsonwebtoken");
const Post = require("./../model/post.model.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

//Fait par Arthur et Hugo
exports.create = async(req,res) => {
    if (!req.body.text || req.body.text === "") {
            return res.status(400).json({ message: "Veuillez remplir le texte du post" })
        };
        const token = req.headers?.authorization?.split(" ")[1];
        req.token = jwt.verify(token, process.env.JWT_KEY);
        
        let post = await Post.create({
            text: req.body.text,
            file: req.file ? './picture/' + req.file.filename : null,
            author: req.token._id
        });
        res.status(201).json(post);
}

//Fait par Arthur
exports.getAll = async (req, res) => {
    let postList = await Post.find();
    if (!postList) {
        return res.status(404).json({ error: "post non trouvés" });
    }
    return res.status(200).json(postList);
}

//Fait par Hugo et arthur
exports.update = async (req, res) => {
    let post = await Post.findOne({ _id: req.params.id });
    if (!post) {
        return res.status(404).json({ error: "Le post n'existe pas" });
    }
    if (req.body.text) {
        post.text = req.body.text;
    }
    if(req.file){
        post.file = './picture/' + req.file.filename;
    }
    try {
        await post.save();
        return res.status(201).json(post);
    }catch(e){
        return res.status(500).json({error: ""})
    }
}

//Fait par Hugo
exports.delete = async (req, res) => {
    let post = await Post.findOne({ _id: req.params.id });
    if(!post) {
        return res.status(404).json({ error: "Le post n'existe pas" });
    }
    
    const token = req.headers?.authorization?.split(" ")[1];
    req.token = jwt.verify(token, process.env.JWT_KEY);
    
    if(req.token._id !== post.author){
        return res.status(404).json({ error: "Vous n'etes pas l'auteur du post"});
    }

    let result = await Post.deleteOne({
        _id: req.params.id,
        author: req.token._id
    });
    
    return res.status(200).json({ message: "Votre post a été ssupprimé" });
}