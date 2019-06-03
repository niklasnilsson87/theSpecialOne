import axios from 'axios'

// loads user for manager-site
export const loadUser = (id) => {
  return axios.get('/api/edit').then(res => {
    return res.data.find(user => user._id === id)
  })
}
