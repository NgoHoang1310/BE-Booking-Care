const { stringify } = require('uuid');

require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": "Hoangutt72@",
    "port": process.env.DB_PORT,
    "database": process.env.DB_DATABASE_NAME,
    "host": "db.zaoqnodfkmzidxbtutzv.supabase.co",

    "dialect": "postgres",
    "logging": false,
    "timezone": "+07:00",
    "query": {
      "raw": true
    }

  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
