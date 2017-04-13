myApp.controller('establishmentController', function ($scope, $cordovaToast, $cordovaPreferences) {
    $scope.sexes = {};
    $scope.input = {};

    $scope.save = function () {
        console.log($scope.sexes);
        if (!Number.isInteger($scope.sexes.active)) {
            $cordovaToast.showShortBottom('Bitte Geschlecht angeben');
            return;
        }
        if (!$scope.input.birthday) {
            $cordovaToast.showShortBottom('Bitte Geburtstag angeben');
            return;
        }
        $scope.input.sex = $scope.sexes.active;
        $scope.input.notifications = true;
        $cordovaPreferences.store('general', $scope.input).then(function () {
            slide('#/interests');
        });
    }
});