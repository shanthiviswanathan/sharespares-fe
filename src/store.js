import React from 'react';

const initialState = {};
const store = React.createContext(initialState);
const { Provider } = store;
const actions = {
    MODIFY_GROUP: "MODIFY_GROUP",
    CREATE_ITEM: "CREATE_ITEM"
};

function reducer (state = initialState, action) {
    switch(action.type) {
        case actions.MANAGE_GROUP:
          const newState = {...state, group: action.value}
          return newState;
        default:
          throw new Error();
    }
}
const StoreProvider = ( { children } ) => {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StoreProvider }