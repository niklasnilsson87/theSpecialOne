import { DESCRIPTION_SUCCESS, DESCRIPTION_FAIL, UPDATEPOINT_SUCCESS, UPDATEPOINT_FAIL } from './types'
import { returnErrors } from './errorActions'
import axios from 'axios'

export const updateDescription = (desc, favPlayer, favTeam, email) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ desc, favPlayer, favTeam, email })

  return axios.post('/api/edit', body, config)
    .then(res => {
      dispatch({ type: DESCRIPTION_SUCCESS, payload: res.data })
    }).catch(err => {
      (dispatch({ type: DESCRIPTION_FAIL, payload: err }))
    })
}

export const updatePoints = (point, { _id }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ point, _id })

  return axios.post('/api/edit/points', body, config)
    .then(res => {
      console.log(res.data)
      dispatch({ type: UPDATEPOINT_SUCCESS, payload: res.data })
    }).catch(err => {
      (dispatch({ type: UPDATEPOINT_FAIL, payload: err }))
    })
}
