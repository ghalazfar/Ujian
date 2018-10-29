import { createBottomTabNavigator } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';

export default createBottomTabNavigator(
    {
        Home: {
            screen: Home
        },
        Profile: {
            screen: Profile
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);
