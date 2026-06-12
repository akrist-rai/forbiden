import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongo(): Promise<void> {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    dbName: 'forbidden',
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
  console.log('[mongo] Connected');

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('[mongo] Disconnected — will reconnect automatically');
  });
}

export function getMongoClient() {
  return mongoose.connection.getClient();
}
