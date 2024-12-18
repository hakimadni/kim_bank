"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async (data: signInProps) => {
    const {email,password} =
    data;
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email,password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (data: SignUpParams) => {
    const {firstName,lastName, email,password} =
    data;
  try {
    //Create user in Appwrrite
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(),
     email, password, 
     `${firstName} ${lastName}`);

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount)
  } catch (error) {
    console.log(error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return user;
  } catch (error) {
    console.log(error);
    ;
  }
}

export const logoutAccount = async ()=> {
  try {
    const { account } = await createSessionClient();
     // Delete session
    await account.deleteSession('current');

    // Clear cookies (adjust based on your framework or library)
    const cookieStore = await cookies();
    cookieStore.delete('appwrite-session');
    return true;
  } catch (error) {
    return null;
  }
}