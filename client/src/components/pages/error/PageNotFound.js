import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = props => (
  <div>
    <h1 className='text-center'>404</h1>
    <h4 className='text-center mb-5'>Page not found</h4>

    <Link to='/home'><button className='btn-color'>Home</button></Link>
  </div>
)

export default PageNotFound
