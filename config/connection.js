const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'r1k0ybxgur579e3k',
    process.env.DB_USER || 'rje3uh269xyqaymt',
    process.env.DB_PASSWORD || 'mkjyk1g3c8dd4wgr',
    {
      host: 'z5zm8hebixwywy9d.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;
