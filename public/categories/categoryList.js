(function () {
    "use strict";
    angular.module("app")
    .component("categoryList", {
        templateUrl: "/categories/categoryList.html",
        bindings: {
            categories: "="
        },
        controllerAs: "vm",
        controller: function () {
            var vm = this;
            vm.createNewCategory = function () {
                vm.categories.$add({
                    name: vm.newCategoryName
                });
                
                vm.newCategoryName = "";
            }
        }
    })
})();