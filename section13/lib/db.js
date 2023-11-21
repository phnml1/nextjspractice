import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = MongoClient.connect('mongodb+srv://yuju0903:090303@cluster0.usugtsx.mongodb.net/users?retryWrites=true&w=majority'); 
  return client;
}