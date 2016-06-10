(function () {
    "use strict";
    angular.module("app")
    .component("playerForRound", {
        templateUrl: "/common/playerForRound.html",
        bindings: {
            player: "=",
            showAll: "="
        },
        controllerAs: "vm",
        controller: function () {
            
        }
    })
})();