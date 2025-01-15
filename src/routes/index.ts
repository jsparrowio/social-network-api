// import routers from express and api routes
import { Router } from 'express';
import apiRoutes from './api/index.js';
const router = Router();

// set up base api end point
router.use('/api', apiRoutes);

// export router to be used elsewhere
export default router;