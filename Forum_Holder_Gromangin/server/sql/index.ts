import mysql from "mysql2/promise";
import bluebird from "bluebird";
const connection = await mysql.createConnection({
  host: "localhost",
  user: "projet",
  password: "projet",
  database: "projet",
  Promise: bluebird,
});
export default connection;
