/**
 * set login response to localstorage
 * @param data response login
 */
const setLoginLocalStorage = (data: any) => {
  localStorage.setItem("userId", data?.userId);
  localStorage.setItem("sessionData", data?.sessionData);
  localStorage.setItem("email", data?.email);
  localStorage.setItem("avatar", data?.profile_image);
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("atk", data?.atk);
};

/**
 * Load user infor from localstorage
 * @returns infor User
 */
const loadUserData = () => {
  try {
    const userInfo = localStorage.getItem("user");
    if (userInfo === null) return undefined;
    return JSON.parse(userInfo);
  } catch (e) {
    return undefined;
  }
};
/**
 * Remove data login in local storage
 */
const signOutLocalStorage = () => {
  localStorage.clear();
};

/**
 * check login or not
 */
const isLoggedIn: boolean = localStorage.getItem("userId") ? true : false;
/**
 * User info from local storage
 */
const persistedUser = loadUserData();

export { setLoginLocalStorage, persistedUser, isLoggedIn, signOutLocalStorage };
