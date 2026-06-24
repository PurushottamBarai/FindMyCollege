import mongoose from 'mongoose';

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

    const options = {
      authSource: 'admin',
      maxPoolSize: 10, 
      minPoolSize: 2,  
      socketTimeoutMS: 45000, 
      serverSelectionTimeoutMS: 5000, 
      heartbeatFrequencyMS: 10000, 
    };

    const conn = await mongoose.connect(uri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    try {
      const collegesCol = conn.connection.db.collection('colleges');
      const indexes = await collegesCol.indexes();
      for (const index of indexes) {
        if (index.key && index.key['College Code'] !== undefined && index.unique) {
          console.log(`*** Automatically dropping unique index: ${index.name}`);
          await collegesCol.dropIndex(index.name);
        }
      }
    } catch (idxErr) {
      console.log('Skipping index cleanup (collection may not exist yet):', idxErr.message);
    }

    return conn;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection established to MongoDB Atlas/Local.');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected.');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination.');
  process.exit(0);
});

export default connectDatabase;
