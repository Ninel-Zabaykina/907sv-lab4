export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'del',
  CHECKED: 'checked',
  FILTER: 'filter'
};
export const initialState = {
  list: [],
  filterChecked: false
};

export const SET_FILTER = 'SET_FILTER';

/**
 * @param {type: string, payload: any} action
 * @param prevState
 */
export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const newEl = {
        id: Math.random().toString(),
        title: action.payload,
        isChecked: false
      };
      return { ...prevState, list: [...prevState.list, newEl] };
    }
    case ACTION_TYPES.DELETE: {
      return {
        ...prevState,
        list: [...prevState.list.filter(list => list.id !== action.payload)]
      };
    }

    case ACTION_TYPES.CHECKED: {
      return {
        ...prevState,
        list: [
          ...prevState.list.map(function (list) {
            if (list.id === action.payload) {
              return { ...list, isChecked: !list.isChecked };
            }
            return list;
          })
        ]
      };
    }
    case ACTION_TYPES.FILTER: {
      return { ...prevState, isChecked: !filteredList().isChecked };
    }
    default:
      return prevState;
  }
}

export function filteredList(list, mark) {
  if (!mark) return list;

  return list.filter(list => list.isChecked);
}

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

/*export const filteredListSelector = state => {
  if (state.filterChecked) {
    return state.list.filter(item => item.isChecked);
  }
  return state.list;
};*/
