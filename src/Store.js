export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'del',
  CHECKED: 'checked',
  FILTER: 'filter',
  FILTER_RADIO: 'filter_radio',
  SEARCHBAR: 'search_bar'
};
export const SELECT_TYPES = {
  ALL: '0',
  DONE: '1',
  NOT_DONE: '2'
};

export const initialState = {
  list: [],
  filterChecked: '0',
  searchBar: ''
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
      console.log(action);
      return {
        ...prevState,
        list: [...prevState.list.filter(list => list.id !== action.payload)]
      };
    }

    case ACTION_TYPES.CHECKED: {
      console.log(action);
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
      console.log(action);
      return { ...prevState, filterChecked: !prevState.filterChecked };
    }
    case ACTION_TYPES.FILTER_RADIO: {
      return { ...prevState, filterChecked: action.payload };
    }
    case ACTION_TYPES.SEARCHBAR: {
      return { ...prevState, searchBar: action.payload };
    }
    default:
      return prevState;
  }
}

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const filteredListSelector = state => {
  let some_selected = state.list;
  if (state.filterChecked === SELECT_TYPES.DONE) {
    some_selected = state.list.filter(item => item.isChecked);
  } else if (state.filterChecked === SELECT_TYPES.NOT_DONE) {
    some_selected = state.list.filter(item => !item.isChecked);
  }
  if (state.searchBar !== '') {
    some_selected = some_selected.filter(
      item => item.title.toLowerCase().indexOf(state.searchBar) >= 0
    );
  }
  return some_selected;
};
