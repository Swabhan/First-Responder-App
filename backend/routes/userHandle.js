const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/users', async (req,res)=>{
    const users = Schemas.users;

    const usersAccounts = await users.find({}).populate("user").exec((err,userData)=>{
        if (err) throw err;
        if(userData){
            res.end(JSON.stringify(userData));
        } else{
            res.end();
        }
    })
});

router.post('/user/name', async (req, res) => {
    try {
        const { username, name } = req.body;
        
        if (!username || !name) {
            res.status(400).send('Missing required fields');
            return;
        }
  
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(409).send('Username already taken');
            return;
        }

        const newUser = await User.create({ username, name });
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.put('/addUser:id', async (req, res) => {
    const user = {};
    user.username = req.body.username;
    user.name = req.body.name;
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save(async (err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });

    } catch (err) {
        console.log(err);
        res.end('User not added!');
    }

});

router.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username } = req.body;
        
        const user = await User.findById(id);
        
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        
        if (name) {
            user.name = name;
        }
        
        if (username) {
            user.username = username;
        }

        await user.save();
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.delete('/users/remove', async (req, res) => {
    try {
        const { id } = req.body;
        
        const user = await User.findById(id);
        
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        
        await user.remove();
        res.send('User deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;