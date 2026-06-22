export const createStore = () => {
  console.warn("store disabled in browser");
  return {};
};

export const db = {};
export const watch = () => {};
export const sendMessage = () => {};
export const registerSource = () => {};
export const isRenderer = () => true;
