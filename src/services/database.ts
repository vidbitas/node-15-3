import mysql, { QueryError } from 'mysql2/promise';
import config from '../config';

const database = mysql.createPool(config.database);

export const escape = mysql.escape.bind(mysql);

// Predicate - prielaida tai varototjo sukurtas būdas patikrinti TS tipus
// naudojant JS. Tai tiesiog yra funkcija kuri grąžina Boolean reikšmę.
// Jeigu Grąžinama reikšmė yra 'true', tokiu atveju gautam parametrui yra priskiriamas
// prilaidos tipas (šiuo atveju QueryError), priešingu atveju iš parametrui nurodytos
// tipų aibės, šis 'spėjamas' tipas yra atmetamas.
export const isQueryError = (error: unknown): error is QueryError => {
  const possibleQueryError = error as QueryError;
  return possibleQueryError.code !== undefined;
};

export const checkConnection = async (
  callback?: (err: Error | undefined) => void,
): Promise<Error | undefined> => {
  try {
    await database.query('Select 1');
    if (callback) callback(undefined);
    return undefined;
  } catch (error) {
    if (callback) callback(error as Error);
    return error as Error;
  }
};

export default database;
