const express = require('express');
const userRouter = express.Router();


userRouter.route('/auth')
    .post((req, res) => {
        const {username, password} = req.body
        res.json({message: `Bienvenido ${username}!`})
    })

module.exports = userRouter;