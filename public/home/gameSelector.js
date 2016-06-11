(function () {
    'use strict';

    angular.module('app')
        .component('gameSelector', {
            templateUrl: '/home/gameSelector.html',
            bindings: {
                selectedGame: '=',
                games: "=",
                gameIsSelected: "&"
            },
            controllerAs: 'vm',
            controller: function ($firebaseObject, fbRef, $scope) {
                var vm = this;

                var unbind;
                vm.selectGame = function (game) {

                    if (game) {
                        unbind && unbind();

                        $firebaseObject(fbRef.getGamesRef().child(game.$id)).$bindTo($scope, "vm.selectedGame")
                            .then(function (unbinder) {
                                vm.gameIsSelected({game: vm.selectedGame});
                                unbind = unbinder;
                            });
                    }
                }

                vm.addNewGame = function () {
                    vm.games.$add({
                        title: "",
                        createdDate: new Date().toLocaleDateString(),
                        whoIsWind: 1,
                        player1: {
                            name: "Kajsa"
                        },
                        player2: {
                            name: "David"
                        },
                        player3: {
                            name: "Klara"
                        },
                        player4: {
                            name: "Hampus"
                        }
                    }).then(function (ref) {
                        var id = ref.key();
                        var index = vm.games.$indexFor(id); // returns location in the array
                        vm.selectGame(vm.games[index]);
                    });

                }   
            }
        });
})();