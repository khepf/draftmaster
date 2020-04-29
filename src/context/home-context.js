import React, { useReducer, createContext } from 'react';

export const HomeContext = createContext();

const initialState = {
  username: '',
  email: '',
  tabName: 'account',
  loading: true,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TAB_NAME_CHANGE':
      return {
        tabName: action.payload,
      };
    case 'IS_LOADING':
      console.log('jmk IS_LOADING action.payload', action.payload);
      console.log('jmk IS_LOADING state', state);
      return {
        loading: action.payload,
      };
    case 'ERR_MSG':
      return {
        error: action.payload,
      };
    case 'EMAIL':
      console.log('jmk EMAIL action.payload', action.payload);
      console.log('jmk EMAIL state', state);
      return {
        email: action.payload,
      };
    case 'USERNAME':
      return {
        username: action.payload,
      };
    default:
      throw new Error();
  }
}

export const HomeContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HomeContext.Provider value={[state, dispatch]}>
      {props.children}
    </HomeContext.Provider>
  );
};