const express = require('express');
const router = express.Router()



const Model = require('../models/model');

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        email: req.body.email,
        points: req.body.points,
        teams: req.body.teams,
        company: req.body.company
        
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method with Pagination
router.get('/getAll', async (req, res) => {
    try{
        
        const {page = 1, limit = 5} = req.query;
        const data = await Model.find()
        .limit(limit *1)
        .skip((page - 1) * limit);
        
        //response
        res.status(200).json({total:data.length, data})
        

        // Mass Change
        const change = () => {
        for (const x of data) {
            
                
            let id = x.email;
                Model.findOneAndUpdate({email: id },{ points:100 },(err, resData) => {
                    console.log(resData);

            });
          }}

        //   change();
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get all data without Pagination
router.get('/alldata', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Name Calling
router.get('/name/:name', async (req, res) => {
    try{
        const data = await Model.find({name: req.params.name});
        // print(req.params.name)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Teams Calling
router.get('/teams/:teams', async (req, res) => {
    try{
        const data = await Model.find({teams: req.params.teams});
        // print(req.params.name)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Email Calling
router.get('/email/:email', async (req, res) => {
    try{
        const data = await Model.find({"email":req.params.email});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Points Calling
router.get('/points/:points', async (req, res) => {
    try{
        const data = await Model.find({"points":req.params.points});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// Id Calling
router.get('/id/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;