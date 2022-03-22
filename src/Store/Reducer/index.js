//import { CLICK_UPDATE_VALUE } from '../Actions/actions';


const initialState = {
  data: [
    {
      login: "Lucas",
      equipamentos: "Volante"
    }
  ],
}

//Reducer
export const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLICK_UPDATE_VALUE':
      return {
        ...state, data: [...state.data, {
          login: action.login, equipamentos: action.equipamentos
        }]
      }
    default:
      return state;
  }
}
