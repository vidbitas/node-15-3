import { RowDataPacket } from 'mysql2';

declare global {
  interface User extends RowDataPacket {
    id: string,
    role: 'USER' | 'ADMIN',
    email: string,
    password: string,
  }
}
