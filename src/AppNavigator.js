import { StackNavigator } from 'react-navigation';

import Splash from '@screens/Splash';
import Home from '@screens/Home';
import Player from '@screens/Player';

const AppNavigator = StackNavigator({
  splash: { screen: Splash },
  home: { screen: Home },
  player: { screen: Player },
}, {
  initialRouteName: 'splash',
  navigationOptions: {
    header: null,
    cardStack: { gesturesEnabled: false },
  },
  headerMode: 'screen',
  lazyLoad: true,
});

export default AppNavigator;
