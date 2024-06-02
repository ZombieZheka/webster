import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pkg from '@adyen/api-library';
const { Config, Client, CheckoutAPI, hmacValidator } = pkg;

import corsOptions from './config/corsOptions.js';
import router from './routes/api.js';
import userRouter from './routes/userRoutes.js';
import verifyJWT from './middleware/verifyJWT.js';
import { v4 as uuidv4 } from 'uuid';

import dotenv from "dotenv";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: './.env' });
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Uivent', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors(corsOptions))

// setup request logging
app.use(morgan("dev"));
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Serve client from build folder
app.use(express.static(join(__dirname, "public")));

app.use('/api', router)
app.use('/dash', verifyJWT, userRouter)
app.use((err, req, res, next)=>{
    res.status(422).send({err: err.message})
})


const config = new Config();
config.apiKey = process.env.ADYEN_API_KEY;
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);
const validator = new hmacValidator();

const paymentStore = {};

const determineHostUrl = (req) => {
    let {
        "x-forwarded-proto": forwardedProto,
        "x-forwarded-host": forwardedHost,
    } = req.headers

    if (forwardedProto && forwardedHost) {
        if (forwardedProto.includes(",")) {
            [forwardedProto,] = forwardedProto.split(",")
        }

        return `${forwardedProto}://${forwardedHost}`
    }

    return "http://localhost:8080"
}

app.listen(process.env.port || 4000, '0.0.0.0', ()=>{
    console.log("Now listening for requests")
})
