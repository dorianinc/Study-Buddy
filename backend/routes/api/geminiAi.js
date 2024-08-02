const express = require('express')
const { restoreUser, requireAuth } = require('../../utils/auth')
const { generateRes } = require('../../utils/genAi')

const router = express.Router()

router.post('/',[restoreUser,requireAuth],async (req,res)=>{
    const {prompt} = req.body
    if(!prompt) res.status(403).json({'message':'prompt required'})

    const response = await generateRes('rephrase this paragraph: ',prompt)
    if(response.ok) res.json(response)
    res.status(404).json(response)
})
module.exports = router
