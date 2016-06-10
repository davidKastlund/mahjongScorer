(function () {
    "use strict";
    angular.module('app')
        .factory("fbRef", function (rootRef, auth) {
            return {
                getPreferencesRef: function () {
                    return rootRef.child("preferences").child(auth.$getAuth().uid);
                },
                getCategoriesRef: function () {
                    return rootRef.child("categories"); 
                },
                getGamesRef: function () {
                    return rootRef.child("games").child(auth.$getAuth().uid);
                },
                getRoundsRef: function () {
                    return rootRef.child("rounds").child(auth.$getAuth().uid);
                },
                 getExpensesRef: function () {
                    return rootRef.child("expenses").child(auth.$getAuth().uid);
                },
              
            }
        })
})()