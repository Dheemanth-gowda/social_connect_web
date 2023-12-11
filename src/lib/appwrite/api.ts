import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatar, databases } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    console.log(user);
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatar.getInitials(user.name);

    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      userName: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDatabase(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  userName?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.dataBaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.dataBaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentAccount) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
