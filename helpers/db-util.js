const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://nextjsbackend:Janeal0y@cluster0.ynstvll.mongodb.net/events?retryWrites=true&w=majority";

export const connectDb = async () => {
  const client = await MongoClient.connect(uri);
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
};