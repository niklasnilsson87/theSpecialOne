import { DESCRIPTION_SUCCESS, DESCRIPTION_FAIL, UPDATEPOINT_SUCCESS, UPDATEPOINT_FAIL } from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'
import axios from 'axios'

// Updates Description.
export const updateDescription = (desc, favPlayer, favTeam, email) => (dispatch, getState) => {
  const body = JSON.stringify({ desc, favPlayer, favTeam, email })

  return axios.post('/api/edit', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: DESCRIPTION_SUCCESS, payload: res.data })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'DESCRIPTION_FAIL'))
      dispatch({
        type: DESCRIPTION_FAIL
      })
    })
}

// Updates Points and last played game.
export const updatePoints = (homeTeam, awayTeam, point, lastGame, decider) => (dispatch, getState) => {
  const body = JSON.stringify({ homeTeam, awayTeam, lastGame, point, decider })

  return axios.post('/api/edit/points', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATEPOINT_SUCCESS, payload: res.data })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'UPDATEPOINT_FAIL'))
      dispatch({
        type: UPDATEPOINT_FAIL
      })
    })
}
