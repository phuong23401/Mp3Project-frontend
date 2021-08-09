// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 production: false,
  API_URL:"http://localhost:8080",
  firebaseConfig : {
    apiKey: "AIzaSyD9psQN3gJxrRMS5orOKiEtguz9cpHbqOI",
    authDomain: "karaoke-1ebd1.firebaseapp.com",
    projectId: "karaoke-1ebd1",
    storageBucket: "karaoke-1ebd1.appspot.com",
    messagingSenderId: "133698472914",
    appId: "1:133698472914:web:b57e9881aade27696ad60b"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
