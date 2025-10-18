import  express, { Router }  from 'express';
import { UserRouter } from '../modules/user/user.router';


const routes:Router = express.Router();

const mainRoutes =[
    {
        path:"/",
        route:UserRouter
    },
];

mainRoutes.forEach((route) =>routes.use(route.path,route.route))
export default routes;