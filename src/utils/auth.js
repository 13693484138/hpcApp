const TOKEN_KEY = "TOKEN_KEY";
const USER_INFO = "USER_INFO";
const STORE = "STORE";
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function setUnionId(UNION_ID) {
    return localStorage.setItem("UNION_ID", UNION_ID);
}
export function setUnionId2(UNION_ID) {
    return localStorage.setItem("UNION_ID2", UNION_ID);
}
export function setOpenId(OPEN_ID) {
    return localStorage.setItem("OPEN_ID", OPEN_ID);
}
export function setOpenId2(OPEN_ID) {
    return localStorage.setItem("OPEN_ID2", OPEN_ID);
}
export function getUnionId() {
    return localStorage.getItem("UNION_ID");
}
export function getUnionId2() {
    return localStorage.getItem("UNION_ID2");
}
export function getOpenId() {
    return localStorage.getItem("OPEN_ID");
}
export function getOpenId2() {
    return localStorage.getItem("OPEN_ID2");
}
export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
}
export function removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
}
export function getUserInfo() {
    let userInfo = localStorage.getItem(USER_INFO);
    return userInfo ? JSON.parse(userInfo) : {};
}
export function setStore(store) {
    return localStorage.setItem(STORE, JSON.stringify(store));
}
export function setUserInfo(userData) {
    return localStorage.setItem(USER_INFO, JSON.stringify(userData));
}
export function getStore() {
    return localStorage.getItem(STORE);
}
export function removeUserInfo() {
    return localStorage.removeItem(USER_INFO);
}