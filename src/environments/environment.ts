// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //Logo
  partnerLogo: "../assets/Rudra_logos/Rudra-logo-black@2x.png",
  loginpageBackground: "../assets/Email_background.png",
  appTheme: "maroon",
  //on-boarding steps images.
  stepImages: {
    stepOne: './assets/RegistrationPagesImages/Step-1.png',
    stepTwo: './assets/RegistrationPagesImages/Step-2.png',
    stepThree: './assets/RegistrationPagesImages/Step-3.png',
    stepFour: './assets/RegistrationPagesImages/Step-4.png',
    stepFive: './assets/RegistrationPagesImages/Step-5.png',
    stepSix: './assets/RegistrationPagesImages/Step-6.png',
    stepSeven: './assets/RegistrationPagesImages/Step-7.png'
  },
  apiUrl: 'http://10.0.12.65:3000/',
  useMockApi: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
