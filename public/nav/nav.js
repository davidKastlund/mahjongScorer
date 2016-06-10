(function () {
    "use strict";
    angular.module('app')
        .component('nav', {
            templateUrl: '/nav/nav.html',
            bindings: {
                gameIsSelected: "&selectGame"
            },
            controllerAs: "vm",
            controller: function ($firebaseObject, fbRef, $firebaseArray) {
                var vm = this;
                vm.loaded = false;
                vm.userPreferences = $firebaseObject(fbRef.getPreferencesRef());
                var query = fbRef.getGamesRef();
                vm.games = $firebaseArray(query)

                vm.userPreferences.$loaded().then(function () {
                    vm.games.$loaded().then(function () {
                        vm.loaded = true;
                    })
                });

                vm.selectGame = function (game) {
                    vm.gameIsSelected({game: game});
                }


            }
        });
})();