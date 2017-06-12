import { NavigationActions } from 'react-navigation';

const Utils = {
  getResetAction(routeName) {
    return NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
  },
  getFullURL(MODE, url) {
    if (MODE === 'DEVELOPMENT') {
      return `http://192.0.0.33:3000${url}`;
    }
    return `https://www.info${url}`;
  },
};

export default Utils;
