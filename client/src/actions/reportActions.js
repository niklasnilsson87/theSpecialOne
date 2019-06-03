import { GET_REPORT, SEND_REPORT, FAILD_REPORT } from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from './authActions'
import axios from 'axios'

export const getReports = () => dispatch => {
  return axios.get('/api/report')
    .then(res => {
      dispatch({ type: GET_REPORT, payload: res.data })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'FAILD_REPORT'))
      dispatch({
        type: FAILD_REPORT
      })
    })
}

export const sendReport = (report) => (dispatch, getState) => {
  const body = JSON.stringify(report)

  axios.post('/api/report', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: SEND_REPORT, payload: res.data })
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'FAILD_REPORT'))
      dispatch({
        type: FAILD_REPORT
      })
    })
}
