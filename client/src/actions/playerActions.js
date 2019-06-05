import {
  GET_PLAYER,
  FAILD_LOADING_PLAYER,
  UPDATE_MANAGER_POINT_SUCCESS
} from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'
import axios from 'axios'

export const getPlayers = ({ _id }) => (dispatch, getState) => {
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

export const updatePlayer = (user, trainplayer, traningPoints) => (dispatch, getState) => {
  const body = JSON.stringify({ user, trainplayer, traningPoints })

  return axios.post('/api/players/update', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_MANAGER_POINT_SUCCESS, payload: res.data })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_MANAGER_POINT_FAIL'))
    })
}
