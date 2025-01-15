// import routers
import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { thoughtRouter } from './thoughtRoutes.js';

// set up a router object variable using the router function from express
const router = Router();

// set end points
router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

// export the router to be used elsewhere
export default router;