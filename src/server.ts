import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import sequelize from './util/database';
import userRoutes from './routes/users'

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users',userRoutes);

(async () =>{
    try {
        await sequelize.sync(
            {force: false}
        );
        console.log("test");
        app.listen(process.env.EXTERNAL_PORT || 3000);
    } catch (error) {
        console.error(error);
    }
})();
export default app;
