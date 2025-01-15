// import dependencies, including routers from express and the controller functions, which perform the functions when the api end points are called
import { Router } from 'express';
const router = Router();
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} from '../../controllers/UserController.js';

// initial endpoint to get and post (get all users or create a user)
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// get, update, or delete a user using a users object ID in the params
router.route('/:userPId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// add or remove a friend to a user by using initially the users object ID in the params, and then the friends object ID in the params
router.route('/:userPId/friends/:friendPId')
    .post(addFriend)
    .delete(deleteFriend);

export { router as userRouter };