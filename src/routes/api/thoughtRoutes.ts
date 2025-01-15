// import dependencies, including routers from express and the controller functions, which perform the functions when the api end points are called
import { Router } from 'express';
const router = Router();
import {
    addReaction,
    createThought,
    deleteThought,
    getAllThoughts,
    getThoughtById,
    removeReaction,
    updateThought
} from '../../controllers/ThoughtController.js';

// initial endpoint to get and post (get all thoughts or create a thought)
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// get, update, or delete a thought using a thoughts object ID in the params
router.route('/:thoughtPId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// add or remove a reaction from a thought using the thoughts object ID in the params, and then add or delete a reaction using JSON body data
router.route('/:thoughtPId/reactions')
    .post(addReaction)
    .delete(removeReaction);

export { router as thoughtRouter };