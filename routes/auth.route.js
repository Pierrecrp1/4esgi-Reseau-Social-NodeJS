const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");

router.post('/signin', async (req, res) => {
    let user = await User.create(req.body);
    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(401).json({error: "login ou mot de passe incorrect"});
    }
    if(req.body.password !== user.password){
        return res.status(401).json({error: "login ou mot de passe incorrect"});
    }
    return res.status(200).json(user);
});

router.get('/:id',async (req,res) => {
    let user = await User.findOne({_id: req.params.id});
    res.status(200).json(user);
});

router.get('/',async (req,res) => {
    let userList = await User.find();
    return res.status(200).json(userList);
});

router.put('/:id',async (req,res) => {
    let user = await User.findOne({_id: req.params.id});
    Object.assign(user, req.body);
    await user.save();
    res.status(201).json(user);
});

router.delete('/:id',async (req,res) => {
    let result = await User.deleteOne({_id: req.params.id});
    res.status(200).json({message: "Utilisateur supprimé"});
});



module.exports = router;