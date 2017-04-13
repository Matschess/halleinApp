myApp.controller('establishmentController', function ($scope, $cordovaToast, $cordovaPreferences) {
    $scope.sexes = {};
    $scope.input = {};

    $scope.validateBirthday = function (date) {
        if (date) {
            return validateBirthday(date);
        }
    }

    function validateBirthday(date) {
        var now = new Date;
        now.setHours(0,0,0,0);
        now = now.getTime();
        date = date.getTime();
        if (date == now) {
            return 'today';
        }
        else if (date < now) {
            return true;
        }
    }

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
        if (validateBirthday($scope.input.birthday) == 'today') {
            $cordovaToast.showShortBottom('Alles Gute zum Geburtstag. Wirklich?');
            return;
        }
        if (!validateBirthday($scope.input.birthday)) {
            $cordovaToast.showShortBottom('Geburtstag muss in der Vergangenheit liegen');
            return;
        }
        $scope.input.sex = $scope.sexes.active;
        $scope.input.notifications = true;
        $cordovaPreferences.store('general', $scope.input).then(function () {
            slide('#/interests');
        });
    }
});