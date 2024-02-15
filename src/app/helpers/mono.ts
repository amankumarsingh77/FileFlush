import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI||"mongodb://localhost:27017/FileFlush";
declare const global: {
    _mongoClientPromise?: Promise<MongoClient>;
};

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== "production") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
}

export default clientPromise;
