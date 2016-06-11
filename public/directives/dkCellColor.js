(function() {
    'use strict';

    angular
        .module('app')
        .directive('dkCellColor', dkCellColor);

    dkCellColor.$inject = [];
    function dkCellColor() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: xController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
                player: "=dkCellColor"
            }
        };
        return directive;
        
        function link(scope, element, attrs, vm) {
             if (vm.player.isWind && vm.player.winner) {
                 element.addClass("super-success");
             } else if (vm.player.isWind) {
                 element.addClass("warning");
             } else if (vm.player.winner) {
                 element.addClass("success");
             }
       
        }
    }
    /* @ngInject */
    function xController () {
        var vm = this;
    }
})();