const express = require('express');

const projectModel = require('../data/helpers/projectModel.js')
const router = express.Router();

//this route for GET /api/projects
router.get('/', (req, res) => {
    projectModel.get().then(projects =>{
      res.status(200).json({message: "Success", data: [...projects]})
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
          message: 'Internal Error Getting The Projects',
      });
    })
});

//this route for GET /api/projects/:id
router.get('/:id', (req, res) => {
    console.log('Parameter ID:',req.params.id)
    projectModel.get(Number(req.params.id)).then(project =>{
        (project) ? 
      res.status(200).json({message: "Success", data: [{...project}]}) :
      res.status(404).json({message: "User Not Found"})
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
          message: 'Internal Error Getting Project',
      });
    })
});

//this route for POST /api/projects
router.post('/', (req, res) => {
    console.log('Parameter ID:',req.body)
    projectModel.insert(req.body).then(project =>{
      res.status(200).json({message: "Success", data: [{...project}]}) 
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
          message: 'Internal Error Adding Project',
      });
    })
});

//this route for DELETE /api/projects/:id
router.delete('/:id', (req, res) => {
    projectModel.remove(req.params.id)
    .then(user => {
      (user > 0) ? 
      res.status(200).json({message: "Successfully Deleted"}) :
      res.status(404).json({message: "Project Not Found"})
    })
    
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
          message: 'Internal Deleting The Project',
      });
    })
  });

router.put('/:id', (req, res) => {
    const changes = req.body;
    (changes.name === '' || changes.description === '' || changes.completed === '') ? 
    res.status(400).json({message: 'required field name cannot be empty'}) :
    projectModel.update(req.params.id, changes)
    .then(project => {
        console.log(project);
        (project) ?
        res.status(200).json({message: "Successfully Updated", project: {...project}}) :
        res.status(404).json({message: "Could Not Find Project To Update"})
    })
    .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Internal Editing The project',
        });
    })
});
module.exports = router;
