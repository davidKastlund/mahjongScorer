(function () {
    "use strict";
    angular.module("app")
    .component("logout", {
        controller:['auth', '$location', function (auth, $location) {
            auth.$unauth();
            $location.path("/login");
        }]
    })
})();