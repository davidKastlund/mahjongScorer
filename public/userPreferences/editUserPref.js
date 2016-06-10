(function () {
    "user strict";
    angular.module("app")
    .component("editUserPref", {
        templateUrl: '/userPreferences/editUserPref.html',
        bindings: {
            userPrefData: "=userPreferences"
        },
        controllerAs: "vm",
        controller: function (fbRef, $scope, $location) {
            var vm = this;
            vm.themes = [
                "light",
                "dark"
            ]; 
            
            vm.userPrefData.$bindTo($scope, "vm.userPreferences").then(function () {
                if (!vm.userPreferences.theme) {
                    vm.userPreferences.theme = vm.themes[0]; 
                }
            })
        }
    })
})();