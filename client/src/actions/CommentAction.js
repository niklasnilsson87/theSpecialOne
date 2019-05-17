import { GET_COMMENTS, ADD_COMMENTS } from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'
import axios from 'axios'

export const getComments = (id) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify({ id })

  axios.post('/api/comment/getComment', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: GET_COMMENTS, payload: res.data })
    })
}

export const sendComments = (sendTo, userid, comment, teamName, user) => (dispatch, getState) => {
  const body = JSON.stringify({ sendTo, userid, comment, teamName, user })

  axios.post('/api/comment', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_COMMENTS, payload: res.data })
    })
}
