const systemStateUserSetDetail = 'systemStateUser:SetDetail';

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
        }
    }
};

export const loginSystemState = (data) => async dispatch => {
    try {

    } catch (error) {

    }
};