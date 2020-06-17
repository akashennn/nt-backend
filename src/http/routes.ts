import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {corsUrl} from '../config/config';
import UserService from "../services/user";

const routes = express();
routes.use(bodyParser.json({limit: '10mb'}));
routes.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 50000}));
routes.use(cors({origin: corsUrl, optionsSuccessStatus: 200}));

// API version prefix
const router = express()
routes.use('/v1.0', router);

router.get('/users/:user_id/favourites', (req, res) => {
    UserService.GetUserFavourite(req, res)
});

router.delete('/users/:user_id/favourites/posts/:post_id', (req, res) => {
    UserService.DeleteUserFavourite(req, res)
});

router.patch('/users/:user_id/favourites', (req, res) => {
    UserService.UpdateUserFavourite(req, res)
});

export default routes;
