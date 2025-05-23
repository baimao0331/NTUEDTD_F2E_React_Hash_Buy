import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../api";

export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: displayName });
  await sendEmailVerification(user);
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName,
    emailVerified: user.emailVerified,
    createdAt: new Date(),
    familyName:"",
    givenName:"",
    gender:"",
    birthday:"",
    tel:"",
    cityId: 0,
    cityName: "",
    districtId:0,
    districtName: "",
    address:"",
  });

  return user;
};
