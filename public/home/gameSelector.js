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
            controller: function ($firebaseObject, fbRef, $scope, $firebaseArray) {
                var vm = this;

                var unbind;
                vm.selectGame = function (game) {

                    if (game) {
                        unbind && unbind();

                        $firebaseObject(fbRef.getGamesRef().child(game.$id)).$bindTo($scope, "vm.selectedGame")
                            .then(function (unbinder) {
                                vm.gameIsSelected({ game: vm.selectedGame });
                                unbind = unbinder;
                            });
                    }
                }

                vm.removeSelectedGame = function () {

                    if (vm.selectedGame) {
                         $firebaseArray(fbRef.getRoundsRef().child(vm.selectedGame.$id)).$loaded().then(function (roundsToRemove) {
                        console.info(roundsToRemove);
                        angular.forEach(roundsToRemove, function (r) {
                            roundsToRemove.$remove(r);
                        });
                    });

                    var id = vm.selectedGame.$id;

                    unbind && unbind();

                    vm.selectedGame = null;

                    $firebaseObject(fbRef.getGamesRef().child(id)).$remove()
                        .then(function () {
                            console.info("spelet är borttaget!");
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