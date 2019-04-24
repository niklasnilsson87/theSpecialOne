import { DESCRIPTION_SUCCESS, DESCRIPTION_FAIL } from './types'
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
