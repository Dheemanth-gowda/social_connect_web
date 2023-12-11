import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_PROJECT_ID,
  url: import.meta.env.VITE_PROJECT_URL,
  dataBaseId:import.meta.env.VITE_PROJECT_DB_ID,
  savesCollectionId:import.meta.env.VITE_PROJECT_DB_COLLECTION_SAVES,
  userCollectionId:import.meta.env.VITE_PROJECT_DB_COLLECTION_USERS,
  postCollectionId:import.meta.env.VITE_PROJECT_DB_COLLECTION_POSTSs
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
