(function () {
    "use strict";
    angular.module("app")
        .component('home', {
            templateUrl: 'home/home.html',
            bindings: {
                games: "="
            },
            controllerAs: "vm",
            controller: function (fbRef, $firebaseArray) {
                var vm = this;
               
                function getSelectedGamesRounds() {
                    return $firebaseArray(fbRef.getRoundsRef().child(vm.selectedGame.$id));
                }

                vm.gameIsSelected = function (game) {
                    vm.selectedGame = game;
                    resetPoints();
                    vm.rounds = getSelectedGamesRounds();
                }

                function getScoreForPlayer(playerNr, winner) {
                    var myPoints = parseInt(vm["player" + playerNr + "Score"]);
                    var isWinner = winner === playerNr;
                    var isWind = vm.selectedGame.whoIsWind === playerNr;
                    var score = 0;
                    for (var i = 1; i < 5; i++) {
                        if (i != playerNr) {
                            var otherPlayer = {
                                points: parseInt(vm["player" + i + "Score"]),
                                isWinner: winner === i,
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

                function getTotalScore(playerNr, winner) {
                    var totalScore = 0;
                    var scoreThisRound = getScoreForPlayer(playerNr, winner);
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
                }

                function getPlayer(playerNumber, playerScore, winner) {
                    return {
                            points: playerScore,
                            winner: winner === playerNumber,
                            isWind: vm.selectedGame.whoIsWind == playerNumber,
                            score: getScoreForPlayer(playerNumber, winner),
                            totalScore: getTotalScore(playerNumber, winner)
                        };
                }

                vm.addNewRound = function (winner) {


                    vm.rounds.$add({
                        player1: getPlayer(1, vm.player1Score, winner),
                        player2: getPlayer(2, vm.player2Score, winner),
                        player3: getPlayer(3, vm.player3Score, winner),
                        player4: getPlayer(4, vm.player4Score, winner),
                    }).then(function () {
                        resetPoints();
                        vm.focusPlayer1Score = true;
                        setTimeout(function() {
                          vm.focusPlayer1Score = false;        
                        }, 1000);
                    });

                    if (vm.selectedGame.whoIsWind !== parseInt(winner)) {
                        vm.selectedGame.whoIsWind = vm.selectedGame.whoIsWind + 1;
                        if (vm.selectedGame.whoIsWind === 5) {
                            vm.selectedGame.whoIsWind = 1
                        }
                    }


                }

            }
        });
})();