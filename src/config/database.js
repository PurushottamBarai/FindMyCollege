const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (!uri) {
      const host = process.env.MONGOHOST || 'localhost';
      const port = process.env.MONGOPORT || '27017';
      const dbName = process.env.DB_NAME || 'findmycollege';
      const user = process.env.MONGOUSER;
      const pass = process.env.MONGOPASSWORD;

      if (user && pass) {
        uri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}`;
      } else {
        uri = `mongodb://${host}:${port}/${dbName}`;
      }
    }

    console.log('*** Using Mongo URI:', uri);

    const conn = await mongoose.connect(uri, { authSource: 'admin' });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;