import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port, // default PostgreSQL port
});
db.connect();
export default db;
