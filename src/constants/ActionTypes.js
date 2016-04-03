import keymirror from 'keymirror'

export default {

  GET_PROFILES_LIST_URL: 'https://raw.githubusercontent.com/oh-my-github/web-service/develop/resource/profile/registry.json',

  ActionTypes: keymirror({
    REQUEST_PROFILE_DATA: null,
    RECEIVE_PROFILE_DATA: null,
    FILTER_PROFILE_DATA: null,
    SORT_PROFILE_DATA: null,

    SET_ERROR_MESSAGE: null,
    RESET_ERROR_MESSAGE: null,
  }),
}
