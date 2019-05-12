import axios from 'axios'

export const loadUser = (id) => {
  return axios.get('/api/edit').then(res => {
    return res.data.find(user => user._id === id)
  })
}
