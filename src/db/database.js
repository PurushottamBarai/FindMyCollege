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

    // Mongoose connection options/configuration (ORM config & pooling)
    const options = {
      authSource: 'admin',
      // Mongoose / MongoDB connection pool settings
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2,  // Keep at least 2 connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      heartbeatFrequencyMS: 10000, // Check server status every 10 seconds
    };

    const conn = await mongoose.connect(uri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Listen for connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection established to MongoDB Atlas/Local.');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected.');
});

// Capture App termination/restart events for clean cleanup
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination.');
  process.exit(0);
});

export default connectDatabase;
