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

    } catch (error) {

    }
};

export default { redux };