const express = require('express')
const router = express.Router()
const apiKey = process.env.API_KEY
import generateRes from '../../utils/genAi'
router.post('/testing',(req,res)=>{
    console.log(req.body);
})
