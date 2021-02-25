export default {
    state: {
        token: null, //用户TOKEN
        systemInfo: null,
        InviterId: "", //推荐人ID
        isAppend: "",
        appToken: "",
        showLoading: true,
        userId: "",
        version: "" //版本号
    },
    mutations: {
        setSystemInfo(state, systemInfo) {
            state.systemInfo = systemInfo;
        },
        setToken(state, token) {
            state.token = token;
        },
        setInviterId(state, token) {
            state.InviterId = token;
        },
        setisApp(state, token) {
            state.isAppend = token;
        },
        setAppToken(state, token) {
            state.appToken = token;
        },
        setUserId(state, token) {
            state.userId = token;
        },
        setVersion(state, token) {
            state.version = token;
        }
    },
};