import Types from './actionTypes';

export const setNetworkState = networkState =>
  ({ type: Types.SET_NETWORK_STATE, networkState });
export const setSpinnerVisible = spinnerVisible =>
  ({ type: Types.SET_SPINNER_VISIBLE, spinnerVisible });
export const setRadios = radios =>
  ({ type: Types.SET_RADIOS, radios });
export const setRadiosPage = radiosPage =>
  ({ type: Types.SET_RADIOS_PAGE, radiosPage });
export const setRadioSearchKeys = radioSearchKeys =>
  ({ type: Types.SET_RADIO_SEARCH_KEYS, radioSearchKeys });
export const setLocations = locations =>
  ({ type: Types.SET_LOCATIONS, locations });
export const setGenres = genres =>
  ({ type: Types.SET_GENRES, genres });
export const setGenreIds = genreIds =>
  ({ type: Types.SET_GENRE_IDS, genreIds });
export const setDetail = detail =>
  ({ type: Types.SET_DETAIL, detail });
export const setRadioId = radioId =>
  ({ type: Types.SET_RADIO_ID, radioId });
export const setPlayerStatus = playerStatus =>
  ({ type: Types.SET_PLAYER_STATUS, playerStatus });
