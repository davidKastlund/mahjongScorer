(function () {
    "use strict";
    angular.module("app")
    .factory("auth", ['$firebaseAuth', 'rootRef', 
    function ($firebaseAuth, rootRef) {
        return $firebaseAuth(rootRef);
    }])
})();