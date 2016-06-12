(function () {
    'use strict';

    angular
        .module('app')
        .factory('ModalHelper', ModalHelper);

    ModalHelper.$inject = ['$uibModal'];
    function ModalHelper($uibModal) {
        var service = {
            dkConfirm: dkConfirm
        };

        return service;

        ////////////////
        function dkConfirm(message, title) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/common/dkconfirm.html',
                controller: function ($scope, $uibModalInstance, messageObj) {

                    $scope.messageObj = messageObj;

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'sm',
                resolve: {
                    messageObj: function () {
                        return {
                            message: message,
                            title: title
                        };
                    }
                }
            });

            return modalInstance.result;
        }
    }
})();