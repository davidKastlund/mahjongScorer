(function () {
    "use strict";
    angular.module('app')
        .component('nav', {
            templateUrl: '/nav/nav.html',
            controllerAs: "vm",
            controller: function ($firebaseObject, fbRef) {
                var vm = this;
                vm.loaded = false;
                vm.userPreferences = $firebaseObject(fbRef.getPreferencesRef());

                vm.userPreferences.$loaded().then(function () {
                    vm.loaded = true;
                });


            }
        });
})();