import { ID } from "appwrite";
import { collections, TCollectionName } from "./collection";
import { database } from "./config";

export const db: {
  [K in TCollectionName]?: any;
} = {};

collections.forEach((collection) => {
  db[collection.name as TCollectionName] = {
    create: async (payload: any, id = ID.unique()) => {
      return await database.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        collection.id,
        id,
        payload
      );
    },
    update: async (id: string, payload: any) => {
      console.log("Updating:", id);
      return await database.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        collection.id,
        id,
        payload
      );
    },
    delete: async (id: string) => {
      return await database.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        collection.id,
        id
      );
    },
    get: async (id: string) => {
      return await database.getDocument(
        import.meta.env.VITE_DATABASE_ID,
        collection.id,
        id
      );
    },
    list: async (queries: any) => {
      return await database.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        collection.id,
        queries
      );
    },
  };
});
