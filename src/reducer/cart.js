import {handleActions} from 'redux-actions';
import {CLEAR_ITEMS, ADD_ITEM, SET_QUANTITY} from 'action/types';
import map from 'lodash/fp/map';

export default handleActions({
  [CLEAR_ITEMS]: () => ({
    items: [],
  }),
  [ADD_ITEM]: (state, {payload: id}) =>
  ({
    ...state,
    items: state.items.some((item) => item.id === id)
            ? [...state.items]
            : [...state.items, {id, quantity: 1}],
  }),

  [SET_QUANTITY]: (state, {payload: {id: target, quantity}}) => ({
    ...state,
    items: (quantity === 0)
            ? state.items.filter((item) => (item.id !== target))
            : map(({id, ...rest}) => (
                target === id ? {id, ...rest, quantity} : {id, ...rest}
              ), state.items),
  }),
}, {
  items: [],
});
