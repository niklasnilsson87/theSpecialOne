import { GET_COMMENTS, ADD_COMMENTS, PLAYER_LOADING, FAILD_LOADING_PLAYER, COMMENT_FAIL } from '../actions/types'

const initialState = {
  comments: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      }
    case ADD_COMMENTS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      }
    case PLAYER_LOADING:
      return {
        ...state,
        loading: true
      }
    case FAILD_LOADING_PLAYER:
    case COMMENT_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}
