import { GET_COMMENTS, ADD_COMMENTS, GET_ERRORS } from './types'
import { returnErrors } from './errorActions'
import axios from 'axios'

export const getComments = (id) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ id })

  axios.post('/api/getComment', body, config)
    .then(res => {
      dispatch({ type: GET_COMMENTS, payload: res.data })
    })
}

export const sendComments = (userid, comment, teamName, user) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ userid, comment, teamName, user })

  axios.post('/api/comment', body, config)
    .then(res => {
      dispatch({ type: ADD_COMMENTS, payload: res.data })
    })
}
