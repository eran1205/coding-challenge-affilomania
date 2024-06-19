import express, { Request, Response } from 'express';
const app = express();
const APP_PORT = process.env.PORT || 3000;

// routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// some more stuff

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`);
});

// end