import {MongoClient} from 'mongodb'
export async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://yuju0903:password@cluster0.usugtsx.mongodb.net/events?retryWrites=true&w=majority');

    return client;
}

export async function insertDocument(client, collection, document) {

    const db = client.db();

    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection,sort,filter={}){
    const db = client.db();
    //내림차순 _id:-1
    const documents = await db
      .collection(collection)
      .find(filter)
      .sort(sort)
      .toArray();
      return documents;
}