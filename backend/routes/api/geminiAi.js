const express = require('express')
const { restoreUser, requireAuth } = require('../../utils/auth')
const { generateRes } = require('../../utils/genAi')

const router = express.Router()

router.post('/',async (req,res)=>{
    const {prompt,selectedText} = req.body
    console.log('gemini route',req)
    if(!prompt) res.status(404).json({'message':'prompt required'})
    const response = await generateRes(prompt,selectedText)

    res.json({"AIResponse":response})
})
module.exports = router
