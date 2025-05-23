// 儲存 Redux state 到 localStorage
export const saveToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("appState", serialized);
  } catch (err) {
    console.error("無法儲存到 localStorage", err);
  }
};

// 從 localStorage 載入 Redux state
export const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem("appState");
    if (serialized === null) return undefined; // 回傳 undefined 讓 Redux 用預設值
    return JSON.parse(serialized);
  } catch (err) {
    console.error("無法載入 localStorage 資料", err);
    return undefined;
  }
};