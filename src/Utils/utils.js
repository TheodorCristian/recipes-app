import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../firebaseAuthConfig";


export const createId = (arg) => {
  return arg.split(" ").join("-");
};

export const getAccount = async (id) => {
  let accounts = [];
  let account = {};
  const accountRef = collection(db, "accounts");
  const q = query(accountRef, where("uid", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    account.data = doc.data();
    account.accountRef = doc.id;
    accounts.push(account);
  });

  return accounts[0];
};

export const adminDashboardFetch = async (collectionName) => {
  let arr = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => arr.push(doc.data()));
  return arr;
}

