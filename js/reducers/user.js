import type { Action } from '../actions/types';
import {ADD_FIRST_NAME, ADD_LAST_NAME, ADD_PASSWORD, ADD_EMAIL_ADDRESS, ADD_ORGANIZATION} from '../actions/user.js'

export type State = {
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
    organization: string
}

const initialState = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  password: "",
  organization: ""
}

export function firstName(state: State = "", action: Action) {
  switch (action.type) {
    case ADD_FIRST_NAME:
      return action.firstName
    default:
      return state
  }
}

export function lastName(state: State = "", action: Action) {
  switch (action.type) {
    case ADD_LAST_NAME:
      return action.lastName
    default:
      return state
  }
}

export function emailAddress(state: State = "", action: Action) {
  switch (action.type) {
    case ADD_EMAIL_ADDRESS:
      return action.emailAddress
    default:
      return state
  }
}

export function password(state: State = "", action: Action) {
  switch (action.type) {
    case ADD_PASSWORD:
      return action.password
    default:
      return state
  }
}

export function organization(state: State = "", action: Action) {
  switch(action.type) {
    case ADD_ORGANIZATION:
      return action.organization
    default:
      return state
  }
}

export function credentials(state: State = initialState, action: Action) {
  return {
    firstName: firstName(state.firstName, action),
    lastName: lastName(state.lastName, action),
    emailAddress: emailAddress(state.emailAddress, action),
    password: password(state.password, action),
    organization: organization(state.organization, action)
  }
}
