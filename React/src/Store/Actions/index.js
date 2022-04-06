import { CLICK_UPDATE_VALUE } from './actions';


export const clickButton = value => ({
  type: CLICK_UPDATE_VALUE,
  newValue: value
});
