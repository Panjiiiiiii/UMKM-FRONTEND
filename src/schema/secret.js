const dotenv = require('dotenv');

dotenv.config();

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const TOKEN = process.env.TOKEN_KEY;