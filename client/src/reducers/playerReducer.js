import uuid from 'uuid'
import { GET_PLAYER } from '../actions/types'

const initialState = {
  players: [
    { id: uuid(), name: 'Alex Nilsson' },
    { id: uuid(), name: 'Niklas' },
    { id: uuid(), name: 'Kalle' },
    { id: uuid(), name: 'Hampus' }
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PLAYER:
      return {
        ...state
      }
    default:
      return state
  }
}
