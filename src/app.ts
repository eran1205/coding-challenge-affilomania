import express from 'express';
import { router } from './routes';

const post = process.env.PORT || 3000;

const app = express();

// routes
app.use('/', router);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

app.listen(post, () => {
  console.log(`Server started on port ${post}`);
});
