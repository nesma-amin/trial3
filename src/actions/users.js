export const MODIFY_USER= 'MODIFY_USER'
export const ADD_USER= 'ADD_USER'
export const REMOVE_USER= 'REMOVE_USER'
export function modifyUser(users){
    return {
        type: MODIFY_USER,
        users,
    }
}

export function addUser(users,id,authedUser){
    return {
        type: ADD_USER,
        users,
        id,
        authedUser:authedUser[0],
    }
}

export function removeUser(users,id,authedUser){
    return {
        type: REMOVE_USER,
        users,
        id,
        authedUser:authedUser[0],
    }
}