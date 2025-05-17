import { config } from 'dotenv';

config();

export const env = {
  PORT: process.env.PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
};
