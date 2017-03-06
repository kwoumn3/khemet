import type { Action } from './types';

export const ADD_FIRST_NAME = 'ADD_FIRST_NAME';
export const ADD_LAST_NAME = 'ADD_LAST_NAME';
export const ADD_EMAIL_ADDRESS = 'ADD_EMAIL_ADDRESS';
export const ADD_PASSWORD = 'ADD_PASSWORD';
export const ADD_ORGANIZATION = 'ADD_ORGANIZATION';

export function addFirstName(firstName:string):Action {
  return {
    type: ADD_FIRST_NAME,
    firstName
  };
}

export function addLastName(lastName:string):Action {
  return {
    type: ADD_LAST_NAME,
    lastName
  };
}

export function addEmailAddress(emailAddress:string):Action {
  return {
    type: ADD_EMAIL_ADDRESS,
    emailAddress
  };
}

export function addPassword(password:string):Action {
  return {
    type: ADD_PASSWORD,
    password
  };
}

export function addOrganization(organization:string):Action {
  return {
    type: ADD_ORGANIZATION,
    organization
  };
}
