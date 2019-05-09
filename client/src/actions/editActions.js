import { DESCRIPTION_SUCCESS, DESCRIPTION_FAIL, UPDATEPOINT_SUCCESS, UPDATEPOINT_FAIL } from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'
import axios from 'axios'

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

export const updatePoints = (point, { _id }) => (dispatch, getState) => {
  const body = JSON.stringify({ point, _id })

  return axios.post('/api/edit/points', body, tokenConfig(getState))
    .then(res => {
      console.log(res.data)
      dispatch({ type: UPDATEPOINT_SUCCESS, payload: res.data })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'UPDATEPOINT_FAIL'))
      dispatch({
        type: UPDATEPOINT_FAIL
      })
    })
}
