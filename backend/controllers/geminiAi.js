const express = require('express')
const { generateRes } = require('../../utils/genAi')

const router = express.Router()

router.post('/',async (req,res)=>{
    const {prompt} = req.body
    if(!prompt) res.status(403).json({'message':'prompt required'})

    const response = await generateRes('rephrase this paragraph: ',prompt)

    res.json({"AIResponse":response})
})
module.exports = router
