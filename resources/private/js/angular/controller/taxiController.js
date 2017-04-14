myApp.controller('taxiController', function ($scope) {
    $scope.taxiList = {
        taxis: [
            {name: 'City Taxi', phone: '+43 6245 82030', phoneDisplay: '82030'},
            {name: "Taxi Comfortline", phone: '+43 6245 70370', phoneDisplay: '70370'},
            {name: "Abdinghoff Taxi", phone: '+43 6245 84400', phoneDisplay: '84400'},
            {name: "DES IS'A TAXI", phone: '+43 6245 70400', phoneDisplay: '70400'},
            {name: 'Taxi Resul', phone: '+43 6245 71111', phoneDisplay: '71111'},
            {name: "Taxi Steiner", phone: '+43 6245 70775', phoneDisplay: '70775'},
            {name: "Alfred Aschauer", phone: '+43 6245 85195', phoneDisplay: '85195'}
        ]
    }

    $scope.showPhone = function(index){
        if($scope.taxiList.showPhone != index){
            $scope.taxiList.showPhone = index;
        }
        else delete $scope.taxiList.showPhone;
    }

    $scope.random = function(array) {
        return array.sort(function() {
            return .5 - Math.random();
        });
    }
});