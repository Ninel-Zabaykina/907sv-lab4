export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'del',
  CHECKED: 'checked',
  FILTER: 'filter'
};

export interface IActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface IActionDel {
  type: typeof ACTION_TYPES.DELETE;
  payload: string;
}

export interface IActionCheck {
  type: typeof ACTION_TYPES.CHECKED;
  payload: string;
}

export interface IActionFilter {
  type: typeof ACTION_TYPES.FILTER;
}

export interface Item {
  id: string;
  title: string;
  isChecked: boolean;
}

export type IAction = IActionAdd | IActionDel | IActionCheck | IActionFilter;

export type State = { list: Item[]; Filter: boolean; searchBar: string };

export const initialState: { Filter: boolean; list: any[] } = {
  list: [],
  Filter: false
};

export const reducer = function (action: IAction, prevState = initialState): State {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const newEl = {
        id: Math.random().toString(),
        title: action.payload,
        isChecked: false
      };
      return [...prevState, newEl];
    }
    case ACTION_TYPES.DELETE: {
      return [...prevState.filter(list => list.id !== action.payload)];
    }

    case ACTION_TYPES.CHECKED: {
      return [
        ...prevState.map(function (list) {
          if (list.id === action.payload) {
            return { ...list, isChecked: !list.isChecked };
          }
          return list;
        })
      ];
    }
    case ACTION_TYPES.FILTER: {
      return { ...prevState, isChecked: !filteredList().isChecked };
    }
    default:
      return [...prevState];
  }
}

const filteredListSelector = state => {
  if (state.filterChecked) {
    return state.list.filter(item => item.isChecked);
  }
  return state.list;
}

export function filteredList(list, mark) {
  if (!mark) return list;

  return list.filter(list => list.isChecked);
}
