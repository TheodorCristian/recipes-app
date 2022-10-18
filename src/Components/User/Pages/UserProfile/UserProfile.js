import React, { useEffect, useState, useRef } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../../../firebaseAuthConfig";

const UserProfile = () => {
  // let [firstName, setFirstName] = useState();
  // let [lastName, setLastName] = useState();
  // let [email, setEmail] = useState();

  // async function getAccountDetails() {
  //   console.log(sessionStorage.getItem("currentUser"));
  //   const accountRef = collection(db, "accounts");
  //   const q = query(
  //     accountRef,
  //     where("uid", "==", sessionStorage.getItem("currentUser"))
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setFirstName(doc.data().first_name);
  //     setLastName(doc.data().last_name);
  //     setEmail(doc.data().email);
  //   });
  // }

  useEffect(() => {
    // getAccountDetails();
  }, []);

  return (
    <div className="account__container">
      {/*<div className="account__avatar"></div>
      <h3>Edit account details</h3>
      <div className="account__details">
        <label htmlFor="firstName">First name</label>
        <input type="text" id="firstName" value={firstName} />
        <label htmlFor="firstName">Last name</label>
        <input type="text" id="lastName" value={lastName} />
        <label htmlFor="firstName">Email</label>
        <input type="text" id="email" value={email} disabled />
  </div>*/}
    </div>
  );
};

export default UserProfile;
