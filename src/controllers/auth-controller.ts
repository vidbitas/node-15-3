import { RequestHandler } from 'express';
import UserModel from '../models/user-model';

export const login: RequestHandler = async (req, res) => {
  const mockEmail = 'us@gmail.com';
  try {
    const foundUser = await UserModel.findUserByEmail(mockEmail);

    if (foundUser === null) throw new Error(`User was not found with email: '${mockEmail}'`);

    res.json(foundUser);
  } catch (error) {
    // TODO: Aprašyti atskirai klaidų valdymą
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Serverio klaida' });
    }
  }
};

export const register: RequestHandler = async (req, res) => {
  res.send('register');
};
