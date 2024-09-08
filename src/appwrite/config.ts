import { Account, Client, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const account = new Account(client);
export const database = new Databases(client);
