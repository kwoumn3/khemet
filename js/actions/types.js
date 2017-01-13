
export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string, passProps:any }
    | { type: 'POP_ROUTE', passProps:any }
    | { type: 'RESET_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string, passProps:any }
    | { type: 'REPLACE_ROUTE', route: string, passProps:any }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string, passProps:any }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | {type: 'ADD_FIRST_NAME', firstName: string}
    | {type: 'ADD_LAST_NAME', lastName: string}
    | {type: 'ADD_EMAIL_ADDRESS', emailAddress: string}
    | {type: 'ADD_PASSWORD', password: string}
    | {type: 'ADD_ORGANIZATION', organization: string}

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
