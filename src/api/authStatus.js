import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./index"; // 你的 Firebase 初始化位置

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // 只聽一次
      resolve(user); // user 或 null
    });
  });
};
