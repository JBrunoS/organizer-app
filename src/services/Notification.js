import PushNotification from 'react-native-push-notification'

export default {
    configure(){
        PushNotification.configure({
            onRegister: function (token) {
              console.log("TOKEN:", token);
            },
        
            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);
            },
          
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },

            popInitialNotification: true,
            requestPermissions : Platform . OS  ===  'ios'
          });

          
          return PushNotification;
    },

    checkPermissions(cbk) {
      return PushNotification.checkPermissions(cbk);
    },

    requestPermissions() {
      return PushNotification.requestPermissions();
    }
}