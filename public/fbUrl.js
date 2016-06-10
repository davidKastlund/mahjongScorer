(function (params) {
    "user strict";
    angular.module("app")
    .constant("FirebaseUrl", "https://glowing-heat-4138.firebaseio.com")
    // .constant("FirebaseUrl", "https://firsttest-87c51.firebaseio.com")
    .service("rootRef", ["FirebaseUrl", Firebase])
})()