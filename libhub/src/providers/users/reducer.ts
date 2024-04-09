import { Action, GetUsersAction, UserCount, UserState } from './interface';

type User = UserState[]; 

const userReducer = (state: User[], action: GetUsersAction) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
           if(action.payload) {
            const allusers = action.payload.map((user, index) => {
                return {
                    ...user,
                    studentID: user.studentID,
                    name: user.name,
                    surname: user.surname,
                    emailAddress: user.emailAddress,

                }
            });
            return [...allusers]; 
              }
        default:
            // If the action type is not recognized, return the current state
            return state;
    }
}

const getUserByIdReducer = (state: UserState, action: Action) => {
    switch (action.type) {
        case 'GET_USER_BY_ID':
            return {
                ...state,
                studentId: action.payload.studentID,
                firstName: action.payload.name,
                lastName: action.payload.surname,
                email: action.payload.emailAddress,
            };
        default:
            return state;
    }
};

const getUserCountReducer = (state: number, action: UserCount) => {
    switch (action.type) {
        case 'GET_USER_COUNT':
            return action.payload;
        default:
            return state;
    }
}


export { userReducer, getUserByIdReducer, getUserCountReducer}


