import express, { type Application, type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import { notfound } from "./app/middlewares/notfound";
import routes from "./app/routes";
const app: Application = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to API',
  });
});

app.use(notfound)
export default app;
