(function () {
     "use strict";
     angular.module("app")
     .component("expenseListDisplay", {
         templateUrl: "/expenses/expenseListDisplay.html",
         bindings: {
             expenses: "=expenseData",
             selectExpense: "&"
         },
         controllerAs: "vm",
         controller: function () {
             var vm = this;
             vm.deleteExpense = function (expense) {
                 vm.expenses.$remove(expense);
             }
             
             vm.clickRow = function (expense) {
                 vm.selectExpense({expense: expense})
             }
         }
     })
})();