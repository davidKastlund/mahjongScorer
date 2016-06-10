(function () {
    "use strict";
    angular.module("app")
        .component("editExpense", {
            templateUrl: "/expenses/editExpense.html",
            bindings: {
                categories: "=",
                createNewExpense: "&",
                editedExpense: "=",
                updateExpense: "&"
            },
            controllerAs: "vm",
            controller: function ($scope) {


                var vm = this;

                $scope.$watch("vm.editedExpense", function (newData) {
                    if (!!newData) {
                        vm.editing = true;
                        vm.amount = newData.amount;
                        vm.description = newData.description;
                        vm.payee = newData.payee;
                        var date = new Date(newData.date);
                        vm.date = date.toLocaleDateString();
                        vm.selectedCategory = vm.categories[vm.categories.$indexFor(newData.category.id)];
                    }
                })

                vm.save = function () {
                    vm.editedExpense.amount = parseFloat(vm.amount);
                    vm.editedExpense.description = vm.description;
                    vm.editedExpense.payee = vm.payee;
                    vm.editedExpense.category = {
                        name: vm.selectedCategory.name,
                        id: vm.selectedCategory.$id
                    };
                    vm.editedExpense.date = new Date(vm.date).toJSON();
                    vm.updateExpense();
                    vm.setDefaults();
                    vm.editing = false;
                    vm.editedExpense = null;
                }
                
                vm.cancel = function () {
                     vm.setDefaults();
                    vm.editing = false;
                    vm.editedExpense = null;
                }

                vm.setDefaults = function () {
                    vm.amount = "";
                    vm.description = "";
                    vm.payee = "";
                    vm.date = new Date("3/3/1985").toLocaleDateString();
                    vm.selectedCategory = vm.categories[0];
                }
                vm.setDefaults();

                vm.create = function () {
                    vm.expenseData = {
                        amount: parseFloat(vm.amount),
                        description: vm.description,
                        payee: vm.payee,
                        category: {
                            name: vm.selectedCategory.name,
                            id: vm.selectedCategory.$id
                        },
                        date: new Date(vm.date).toJSON()
                    }
                    vm.setDefaults();
                    //save the data
                    vm.createNewExpense({ expenseData: vm.expenseData })
                }
            }
        })
})();