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

          return { elements: applyValueChange(changedElements || state.elements, action.payload) };

      default:
          return state;
  }
};

const applyValueChange = (elements: SimpleElement[], payload: any): SimpleElement[] =>
elements.map(
  (element, i) => (i === payload.elementIndex) ? {...element, elementValue: payload.value} : element
);

const toggleElement = (elements: SimpleElement[], elementIndex: number, status: boolean): SimpleElement[] => elements.map(
  (element, i) => (i === elementIndex) ? {
    ...element,
    enable: status,
    elementValue: status ? element.elementValue : null
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
