// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 production: false,
  API_URL:"http://localhost:8080",
  firebaseConfig : {
    apiKey: "AIzaSyCcBiwwA_xpwZUY8WocJJKeI11v7RWVFbM",
    authDomain: "audio-firebase.firebaseapp.com",
    projectId: "audio-firebase",
    storageBucket: "audio-firebase.appspot.com",
    messagingSenderId: "528133429381",
    appId: "1:528133429381:web:91e0c6b6b4a091607a31ec",
    measurementId: "G-ERXYQ9P3K4"
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
