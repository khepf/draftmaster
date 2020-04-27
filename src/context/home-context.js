import React, { useReducer, createContext } from 'react';

export const HomeContext = createContext([]);

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
        ...state,
        tabName: action.payload
      }
    case 'IS_LOADING':
      return {
        loading: action.payload
      }
    case 'ERR_MSG':
      return {
        error: action.payload
      }
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