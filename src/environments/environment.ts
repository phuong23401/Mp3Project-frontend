// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
 production: false,
  API_URL:"http://localhost:8080",
  firebaseConfig : {
    apiKey: "AIzaSyCgTv62L4nqOUYCQscIZOhBAI99cPXN4ik",
    authDomain: "mp3-karaok.firebaseapp.com",
    projectId: "mp3-karaok",
    storageBucket: "mp3-karaok.appspot.com",
    messagingSenderId: "846713772807",
    appId: "1:846713772807:web:2a4b44371b6b29d50603a2",
    measurementId: "G-KVT7VXK6JJ"
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
