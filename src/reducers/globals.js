import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';
import Global from '@src/global';

export const initialState = Immutable({
  networkState: true,
  spinnerVisible: false,
  radios: [],
  genres: [],
  locations: [],
  detail: null,
  radioId: -1,
  playerStatus: Global.STOPPED,
});
const networkState = (state, action) => ({
  ...state,
  networkState: action.networkState,
});
const spinnerVisible = (state, action) => ({
  ...state,
  spinnerVisible: action.spinnerVisible,
});
const setRadios = (state, action) => ({
  ...state,
  radios: action.radios,
});
const setGenres = (state, action) => ({
  ...state,
  genres: action.genres,
});
const setLocations = (state, action) => ({
  ...state,
  locations: action.locations,
});
const setDetail = (state, action) => ({
  ...state,
  detail: action.detail,
});
const setRadioId = (state, action) => ({
  ...state,
  radioId: action.radioId,
});
const setPlayerStatus = (state, action) => ({
  ...state,
  playerStatus: action.playerStatus,
});

const actionHandlers = {
  [Types.SET_NETWORK_STATE]: networkState,
  [Types.SET_SPINNER_VISIBLE]: spinnerVisible,
  [Types.SET_RADIOS]: setRadios,
  [Types.SET_GENRES]: setGenres,
  [Types.SET_LOCATIONS]: setLocations,
  [Types.SET_DETAIL]: setDetail,
  [Types.SET_RADIO_ID]: setRadioId,
  [Types.SET_PLAYER_STATUS]: setPlayerStatus,
};
export default createReducer(initialState, actionHandlers);
