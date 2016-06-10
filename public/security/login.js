(function () {
    "use strict";
    angular.module("app")
        .component("login", {
            templateUrl: "/security/login.html",
            bindings:{
                currentAuth: "="
            },
            controllerAs: "vm",
            controller: ['auth', '$location', function (auth, $location) {
                var vm = this;
                
                vm.loggedIn = !!vm.currentAuth;
                
                vm.errorMessage = "";
                vm.anonLogin = function () {
                    auth.$authAnonymously().then(function () {
                        $location.path("/home");
                    }).catch(function (err) {
                        vm.errorMessage = err.code;
                    });
                }
                vm.fbLogin = function () {
                    auth.$authWithOAuthPopup("facebook").then(function () {
                        $location.path("/home");
                    }).catch(function (err) {
                        vm.errorMessage = err.code;
                    });
                }
            }]
        })
})();