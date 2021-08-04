// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL:"http://localhost:8080",
  firebaseConfig : {
    apiKey: "AIzaSyBEdPEplzcK0DVqdenxR_MM2iJIgFYKGKY",
    authDomain: "mp3-karaoke.firebaseapp.com",
    projectId: "mp3-karaoke",
    storageBucket: "mp3-karaoke.appspot.com",
    messagingSenderId: "923059002085",
    appId: "1:923059002085:web:b73f815f97edf80fc9120c",
    measurementId: "G-SX17XJJYT3"
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
