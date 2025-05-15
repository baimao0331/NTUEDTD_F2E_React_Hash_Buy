import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../api";

export const registerUser = async (email, password, nickname) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: nickname });
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    nickname,
    createdAt: new Date(),
  });

  return user;
};
