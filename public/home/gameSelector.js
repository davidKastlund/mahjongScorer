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
                        player1: {
                            name: "Spelare 1"
                        },
                        player2: {
                            name: "Spelare 2"
                        },
                        player3: {
                            name: "Spelare 3"
                        },
                        player4: {
                            name: "Spelare 4"
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