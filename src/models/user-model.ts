import database, { escape, isQueryError } from '../services/database';

const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const [users] = await database.execute<User[]>(`
      SELECT *
      FROM users
      WHERE email = ${escape(email)};
    `);

    return users[0] ?? null;
  } catch (error) {
    // TODO: suvienodinti klaidas viena kalba
    if (isQueryError(error)) {
      if (error.code === 'ER_NO_SUCH_TABLE') {
        throw new Error('Duomenų bazės klaida: nėra tokios lentelės');
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

const UserModel = {
  findUserByEmail,
};

export default UserModel;
