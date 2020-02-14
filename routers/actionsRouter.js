const express = require('express');

const actionModel = require('../data/helpers/actionModel.js')
const projectModel = require('../data/helpers/projectModel.js')
const router = express.Router();

//this route for GET /api/actions
router.get('/', (req, res) => {
    actionModel.get().then(projects => {
        res.status(200).json({ message: "Success", data: [...projects] })
    })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Internal Error Getting The Projects',
            });
        })
});

//this route for GET /api/actions/:id
router.get('/:id', (req, res) => {
    console.log('Parameter ID:', req.params.id)
    actionModel.get(Number(req.params.id)).then(project => {
        (project) ?
            res.status(200).json({ message: "Success", data: [{ ...project }] }) :
            res.status(404).json({ message: "Action Not Found" })
    })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Internal Error Getting Project',
            });
        })
});

//this route for POST /api/actions
router.post('/', (req, res) => {
    console.log('Parameter ID:', req.body)
    projectModel.get(req.body.project_id) //finds project by project_id value
        .then(project => {
            (project) ? //checks if project
                actionModel.insert(req.body)
                    .then(action => {
                        console.log(action);
                        res.status(200).json({ message: "Success", data: [{ ...action }] })
                    })
                    .catch(error => {
                        // log error to database
                        console.log(error);
                        res.status(500).json({
                            message: 'Internal Server Error Adding Model',
                        });
                    }) :
                res.status(404).json({ message: "Project_id Param Does Not Match Any Project" })
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error Finding Project',
            });
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Internal Error Adding Project',
            });
        })
});

//this route for DELETE /api/actions/:id
router.delete('/:id', (req, res) => {
    actionModel.remove(req.params.id)
        .then(user => {
            (user > 0) ?
                res.status(200).json({ message: "Successfully Deleted" }) :
                res.status(404).json({ message: "Action Not Found" })
        })

        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Internal Deleting The Action',
            });
        })
});
//this route for PUT /api/actions/:id
router.put('/:id', (req, res) => {
    const changes = req.body;

    (changes.name === '' || changes.description === '' || changes.completed === '' || (Object.entries(changes).length === 0 && changes.constructor === Object)) ?
        res.status(400).json({ message: 'required fields cannot be empty' }) :
        actionModel.update(req.params.id, changes)
            .then(project => {
                console.log(project);
                (project) ?
                    res.status(200).json({ message: "Successfully Updated", project: { ...project } }) :
                    res.status(404).json({ message: "Could Not Find Project To Update" })
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
