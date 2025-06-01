import { T } from "./common";

const systemStateUserSetDetail = 'systemStateUser:SetDetail';
const systemStateMenusSetList = 'systemStateMenus:SetList';
const systemStateThemeSetAlgor = 'systemStateTheme:SetAlgor';
const redux = {
    parent: 'systemState',
    reducers: {
        userReducer: (state = { user: null }, action) => {
            switch (action.type) {
                case systemStateUserSetDetail:
                    return { ...state, ...action.payload };
                default:
                    return state;
            }
        },
        menusReducer: (state = { menus: {} }, action) => {
            switch (action.type) {
                case systemStateMenusSetList:
                    return { ...state, ...action.payload };
                default:
                    return state;
            }
        },
        themeReducer: (state = { theme: 'white' }, action) => {
            switch (action.type) {
                case systemStateThemeSetAlgor:
                    return { ...state, ...action.payload };
                default:
                    return state;
            }
        }
    }
};

export const loginSystemState = (data) => async dispatch => {
    try {
        const { token, user = {} } = await T.client.post('/auth/login', data);
        T.message.success('Đăng nhập thành công');
        T.localStorage.storage('token', token);
        dispatch({ type: systemStateUserSetDetail, payload: { user } });
        return user;
    } catch (error) {
        T.message.error(error);
        return false;
    }
};

export const signUpSystemState = async (data) => {
    try {
        const user = await T.client.post('/users', data);
        T.message.success('Đăng ký thành công');
        return user;
    } catch (error) {
        T.message.error(error);
        return false;
    }
};

export default { redux };