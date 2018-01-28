import { Action } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';

export interface ActionWithPayload extends Action {
  payload?: any;
}

export interface State {
  appState: AppState;
}

export interface AppState {
  elements: SimpleElement[]
}

const InitialState: AppState = {
  elements: [
    {
      elementId: 'input',
      enable: true,
      elementIndex: 0,
      elementValue: null,
      options: null
    },
    {
      elementId: 'segment',
      enable: true,
      elementIndex: 1,
      elementValue: null,
      options: [
        {
          value: 1,
          title: 'button1'
        },
        {
          value: 2,
          title: 'button2'
        },
        {
          value: 3,
          title: 'button3'
        }
      ]
    }
  ]
};

export const reducer = (state: AppState = InitialState, action: ActionWithPayload): AppState => {
  switch (action.type) {
      case 'SIMPLE_ELEMENT_ACTION':
          return { elements: applyValueChange(state.elements, action.payload) };

      case 'COMPLEX_ELEMENT_ACTION':
          const enableElement = action.payload.value !== 3;

          let changedElements = toggleElement(state.elements, 0, enableElement);

          // Return new state, created with new array created through Array.map
          return { elements: applyValueChange(changedElements || state.elements, action.payload) };

      default:
          return state;
  }
};

const applyValueChange = (elements: SimpleElement[], payload: any): SimpleElement[] =>
elements.map(
  (element, i) => (i === payload.elementIndex) ? {...element, elementValue: payload.value} : element
);

// To update value in child array, you can create a new reference to entire array through Array.map.
const toggleElement = (elements: SimpleElement[], elementIndex: number, status: boolean): SimpleElement[] => elements.map(
  // If current element index matching passed index, create a new object and...
  (element, i) => (i === elementIndex) ? {
    // copy exisiting properties...
    ...element,
    // and new properies which we want to have in new state.
    enable: status,
    elementValue: status ? element.elementValue : null
  // If index doesn't match, than just map element to inself.
  } : element
);

export const rootReducer: ActionReducerMap<State> = {
  appState: reducer
};

export interface SimpleElement {
  elementId: string;
  enable: boolean;
  elementIndex: number;
  elementValue: any;
  options: Option[];
}

export interface Option {
  value: any;
  title: string;
}
