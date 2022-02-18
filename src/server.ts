import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
// import sequelize from './util/database';
import userRoutes from './routes/users';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { createConnection } from "./db";
import { options } from "./swaggerOptions";
import dbInit from "./dbInit";

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const specs = swaggerJsDoc(options);


app.use(express.json());
app.use(morgan("dev"));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users',userRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
 // createConnection();

(async () =>{
    try {
        // await sequelize.sync(
        //     {force: true}
        // );
        await dbInit();
        await createConnection();
        console.log("test");
        app.listen(process.env.EXTERNAL_PORT || 8000);
    } catch (error) {
        console.error(error);
    }
})();
export default app;
