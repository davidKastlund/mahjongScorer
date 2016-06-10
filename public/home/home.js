(function () {
    "use strict";
    angular.module("app")
        .component('home', {
            templateUrl: 'home/home.html',
            bindings: {
                expensesInOrder: "=",
                games: "="
            },
            controllerAs: "vm",
            controller: function (fbRef, $firebaseArray, $firebaseObject, $scope) {
                var vm = this;
                vm.createExpense = function (expenseData) {
                    vm.expensesInOrder.$add(expenseData);
                }
                
                vm.editExpense = function (expense) {
                    vm.editedExpense = expense;
                }
                vm.saveEditedExpense = function () {
                    vm.expensesInOrder.$save(vm.editedExpense);
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
                    })
                }
                function getSelectedGamesRounds() {
                    return $firebaseArray(fbRef.getRoundsRef().child(vm.selectedGame.$id));
                }

                var unbind;
                vm.selectGame = function (game) {
                    resetPoints();
                    
                    unbind && unbind();

                    $firebaseObject(fbRef.getGamesRef().child(game.$id)).$bindTo($scope, "vm.selectedGame")
                        .then(function (unbinder) {
                            vm.rounds = getSelectedGamesRounds();
                            unbind = unbinder;
                        });
                }

                function getScoreForPlayer(playerNr) {
                    var myPoints = parseInt(vm["player" + playerNr + "Score"]);
                    var isWinner = parseInt(vm.winner) === playerNr;
                    var isWind = vm.selectedGame.whoIsWind === playerNr;
                    var score = 0;
                    for (var i = 1; i < 5; i++) {
                        if (i != playerNr) {
                            var otherPlayer = {
                                points: parseInt(vm["player" + i + "Score"]),
                                isWinner: parseInt(vm.winner) === i,
                                isWind: vm.selectedGame.whoIsWind === i
                            };
                            var points = 0;
                            if (isWinner) {
                                points = myPoints;
                            } else if (otherPlayer.isWinner) {
                                points = 0 - otherPlayer.points;
                            } else {
                                points = myPoints - otherPlayer.points;
                            }

                            if (isWind || otherPlayer.isWind) {
                                points = points * 2;
                            }
                            score += points;
                        }
                    }
                    return score;
                }
                
                function getTotalScore(playerNr) {
                    var totalScore = 0;
                    var scoreThisRound = getScoreForPlayer(playerNr);
                    if (vm.rounds && vm.rounds.length) {
                        var lastRound = vm.rounds[vm.rounds.length - 1];
                        var scoreLastRound = lastRound["player" + playerNr].totalScore;
                        totalScore = scoreLastRound + scoreThisRound;
                    } else {
                        totalScore = scoreThisRound;
                    }
                    
                    return totalScore;
                    
                }
                
                function resetPoints() {
                    vm.player1Score = 0;
                    vm.player2Score = 0;
                    vm.player3Score = 0;
                    vm.player4Score = 0;
                    vm.winner = vm.winner || "1";
                }

                vm.addNewRound = function () {


                    getSelectedGamesRounds().$add({
                        player1: {
                            points: vm.player1Score,
                            winner: vm.winner === "1",
                            isWind: vm.selectedGame.whoIsWind == 1,
                            score: getScoreForPlayer(1),
                            totalScore: getTotalScore(1)
                        },
                        player2: {
                            points: vm.player2Score,
                            winner: vm.winner === "2",
                            isWind: vm.selectedGame.whoIsWind == 2,
                            score: getScoreForPlayer(2),
                            totalScore: getTotalScore(2)
                        },
                        player3: {
                            points: vm.player3Score,
                            winner: vm.winner === "3",
                            isWind: vm.selectedGame.whoIsWind == 3,
                            score: getScoreForPlayer(3),
                            totalScore: getTotalScore(3)
                        },
                        player4: {
                            points: vm.player4Score,
                            winner: vm.winner === "4",
                            isWind: vm.selectedGame.whoIsWind == 4,
                            score: getScoreForPlayer(4),
                            totalScore: getTotalScore(4)
                        }
                    });

                    if (vm.selectedGame.whoIsWind !== parseInt(vm.winner)) {
                        vm.selectedGame.whoIsWind = vm.selectedGame.whoIsWind + 1;
                        if (vm.selectedGame.whoIsWind === 5) {
                            vm.selectedGame.whoIsWind = 1
                        }
                    }
                }

            }
        });
})();