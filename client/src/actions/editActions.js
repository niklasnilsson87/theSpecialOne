import { DESCRIPTION_SUCCESS, DESCRIPTION_FAIL } from './types'
import { returnErrors } from './errorActions'
import axios from 'axios'

export const updateDescription = (name, email) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email })

  return axios.post('/api/edit', body, config)
    .then(res => {
      dispatch({ type: DESCRIPTION_SUCCESS, payload: res.data.description })
    }).catch(err => {
      (dispatch({ type: DESCRIPTION_FAIL, payload: err }))
    })
}
