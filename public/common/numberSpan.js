(function () {
    "use strict";
    angular.module("app")
    .component("numberSpan", {
        templateUrl: "/common/numberSpan.html",
        bindings: {
            number: "="
        },
        controllerAs: "vm",
        controller: function () {
            
        }
    })
})();