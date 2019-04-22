import { GET_PLAYER, PLAYER_LOADING, GET_ERRORS } from './types'
import { returnErrors } from './errorActions'
import axios from 'axios'

export const getPlayers = ({ id }) => dispatch => {
  dispatch(setPlayerLoading())

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ id })

  return axios.post('/api/players', body, config)
    .then(res => {
      dispatch({ type: GET_PLAYER, payload: res.data })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: GET_ERRORS
      })
    })
}

export const setPlayerLoading = () => {
  return {
    type: PLAYER_LOADING
  }
}
