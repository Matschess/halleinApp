myApp.controller('settingsController', function ($scope, $cordovaPreferences, $translate, $cordovaToast) {
    $scope.input = {};

    document.addEventListener("deviceready", function () {
        $cordovaPreferences.fetch('general')
            .success(function (value) {
                $scope.input.general = value;
            });
        $cordovaPreferences.fetch('interests')
            .success(function (value) {
                $scope.input.interests = value;
            });
        $cordovaPreferences.fetch('newsletter')
            .success(function (value) {
                $scope.input.newsletter = value;
            });
    }, false);

    $scope.changeLang = function() {
        switch ($translate.use()) {
            case 'de_AT':
                $translate.use('en_US');
                break;
            case 'en_US':
                $translate.use('de_AT');
        }
    }

    $scope.save = function () {
        $cordovaPreferences.store('general', $scope.input.general).success(function() {
            $cordovaPreferences.store('interests', $scope.input.interests).success(function() {
                $cordovaPreferences.store('newsletter', $scope.input.newsletter).success(function() {
                    $cordovaToast.showShortBottom('Gespeichert!');
                });
            });
        });
    }
});