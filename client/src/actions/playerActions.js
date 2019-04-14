import { GET_PLAYER, PLAYER_LOADING } from './types'
import axios from 'axios'

export const getPlayers = () => dispatch => {
  dispatch(setPlayerLoading())

  axios.get('/api/players')
    .then(res => dispatch({
      type: GET_PLAYER,
      payload: res.data
    }))
}

export const setPlayerLoading = () => {
  return {
    type: PLAYER_LOADING
  }
}
