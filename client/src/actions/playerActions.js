import { GET_PLAYER, PLAYER_LOADING, FAILD_LOADING_PLAYER } from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'
import axios from 'axios'

export const getPlayers = ({ _id }) => (dispatch, getState) => {
  dispatch(setPlayerLoading())

  const body = JSON.stringify({ _id })

  return axios.post('/api/players', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: GET_PLAYER, payload: res.data })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'FAILD_LOADING_PLAYER'))
      dispatch({
        type: FAILD_LOADING_PLAYER
      })
    })
}

export const updatePlayer = (user, trainplayer) => (dispatch, getState) => {
  dispatch(setPlayerLoading())

  const body = JSON.stringify({ user, trainplayer })

  return axios.post('/api/players/update', body, tokenConfig(getState))
    .then(res => {
      console.log(res)
    })
}

export const setPlayerLoading = () => {
  return {
    type: PLAYER_LOADING
  }
}
