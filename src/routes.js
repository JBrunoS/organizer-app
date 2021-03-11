import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage'


import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import CreateIncident from './pages/createIncident'
import IncidentDetails from './pages/incidentDdetails'
import Reports from './pages/reports'
import Archived from './pages/archived'
import ArchivedDetails from './pages/archivedDetails'
import Splash from './pages/splash'

import {AuthContext} from './AuthContext'


export default function Routes(){

    const stack = createStackNavigator();
    const drawer = createDrawerNavigator();

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );
    
      React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await AsyncStorage.getItem('storage');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);
    
      const authContext = React.useMemo(
        () => ({
          signIn: async data => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token

            console.log(data);
    
            dispatch({ type: 'SIGN_IN', token: AsyncStorage.getItem('storage') });
          },
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
          signUp: async data => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: AsyncStorage.getItem('storage') });
          },
        }),
        []
      );

    function Root(){
        return(
            <stack.Navigator headerMode='none' mode='card'>
                <stack.Screen name='home' component={Home}/>
                
                <stack.Screen name='createIncident' component={CreateIncident}/>
                <stack.Screen name='incidentDetails' component={IncidentDetails}/>
                <stack.Screen name='archivedDetails' component={ArchivedDetails}/>
            </stack.Navigator>
        )
    }

    function Drawer(){
        return(
            <drawer.Navigator >
               <drawer.Screen name='Home' component={Root}/>
               <drawer.Screen name='Relatório' component={Reports} />
               <drawer.Screen name='Arquivados' component={Archived} />
            </drawer.Navigator>
        )
    }

    function AuthStack(){
        return(
            <stack.Navigator headerMode='none' mode='modal'>
                <stack.Screen name='login' component={Login}/>
                <stack.Screen name='register' component={Register}/>
        </stack.Navigator>
        )
    }
    

    return(
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                { state.isLoading ? (
                    <stack.Screen name='splash' component={Splash}/>
                ) : 
                state.userToken != null ? (
                    <Drawer />
                ) : (
                    <AuthStack />
                )}
                

            </NavigationContainer>
        </AuthContext.Provider>
    )
}