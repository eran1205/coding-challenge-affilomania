import express from 'express';
import { router } from './routes/products';
import DataSingelton from './DataSingelton';
import bodyParser from "body-parser";

const post = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// Initialize routes
app.use('/products', router);

// Init global set up
DataSingelton.getInstance();

app.listen(post, () => {
  console.log(`Server started on port ${post}`);
});
