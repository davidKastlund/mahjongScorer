(function () {
    'use strict';

    angular.module('app')
        .component('gameDiagram', {
            templateUrl: 'diagrams/gameDiagram.html',
            bindings: {
                rounds: "<",
                game: "<"
            },
            controllerAs: 'vm',
            controller: function ($scope) {
                var vm = this;

                function getScoreDataForPlayer(player) {
                    return vm.rounds.map(function (r) {
                        return r[player].totalScore
                    });
                }

                $scope.$watch(function () {
                    return vm.game;
                }, function (value) {
                    vm.series = [
                            vm.game.player1.name,
                            vm.game.player2.name,
                            vm.game.player3.name,
                            vm.game.player4.name
                        ];
                })

                $scope.$watch(function () {
                    return vm.rounds;
                }, function (value) {
                    if (value) {
                        vm.labels = vm.rounds.map(function (r, ind) {
                            return ind + 1
                        });
                        vm.data = [
                            getScoreDataForPlayer("player1"),
                            getScoreDataForPlayer("player2"),
                            getScoreDataForPlayer("player3"),
                            getScoreDataForPlayer("player4")
                        ];
                    }
                }, true);
            }
        });
})();