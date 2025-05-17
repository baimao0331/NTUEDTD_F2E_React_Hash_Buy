import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../api";

export const registerUser = async (email, password, nickname) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: nickname });
  await sendEmailVerification(user);
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    nickname,
    emailVerified: user.emailVerified,
    createdAt: new Date(),
  });

  return user;
};
