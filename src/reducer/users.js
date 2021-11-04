import {MODIFY_USER} from '../actions/users'
import {ADD_USER,REMOVE_USER} from '../actions/users'

export default function users(state={}, action){
    switch(action.type){
        case MODIFY_USER:
            // return{
            //     ...state,
            //     ...action.users
            // }
            break;
            case ADD_USER:
            //     const { authedUser, id,answer } = action;
            // return{
            //     ...state,
            // [authedUser]: {
            //   ...state[authedUser],
            //   answers: {
            //     ...state[authedUser].answers,
            //     [id]: answer
            //   }
            // }
            // }
            break;

            case REMOVE_USER:
            //     const author= action.question.author; 

            // return{

            //         ...state,
            //         [author]: {
            //           ...state[author],
            //           questions: state[author].questions.concat([action.question.id])
            //         }
                  
            // }
            break;

        default:
            return state
    }
}