import express from 'express';
import { router } from './routes/products';
import ServerGlobal from './ServerGlobal';
import bodyParser from "body-parser";

const post = process.env.PORT || 3000;


const app = express();
app.use(bodyParser.json());
app.use('/products', router);

// Init global set up
ServerGlobal.getInstance();

app.listen(post, () => {
  console.log(`Server started on port ${post}`);
});
