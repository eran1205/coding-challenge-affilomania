import express, { Request, Response } from 'express';

export const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  res.send("What's up doc ?!");
});