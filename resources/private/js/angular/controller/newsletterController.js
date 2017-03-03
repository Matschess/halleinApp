myApp.controller('newsletterController', function ($scope, $cordovaToast, $cordovaPreferences) {
    $scope.input = {};
    $scope.planer = 'sfsd';
    var permissions = cordova.plugins.permissions;
    permissions.hasPermission(permissions.GET_ACCOUNTS, checkPermissionCallback, null);

    function checkPermissionCallback(status) {
        //alert(alert(JSON.stringify(status, null, 4)));
        if(status.hasPermission) {
           getEmail();
        }
        else {
           getPermission();
        }
    }

    function getPermission() {
        permissions.requestPermission(
            permissions.GET_ACCOUNTS,
            getEmail,
            null);
    }

    function getEmail() {
        window.plugins.DeviceAccounts.getEmail(function (email) {
            // accounts is an array with objects containing name and type attributes
            //alert(email);
            $scope.input.email = email;
            $scope.$apply();
        });
    }

    $scope.subscribe = function () {
        if(!$scope.newsletterForm.email.$valid) {
            $cordovaToast.showShortBottom('Bitte gültige Email eingeben');
            return;
        }
        if(!$scope.input.email) {
            $cordovaToast.showShortBottom('Bitte Email eingeben');
            return;
        }
        var newsletter = {
            active: true,
            email: $scope.input.email
        }
        $cordovaPreferences.store('newsletter', newsletter).then(function(){
            $cordovaPreferences.store('setupDone', true).then(function(){
                slide('#/home');
            })
        });
    }

    $scope.cancel = function(){
        $cordovaPreferences.store('setupDone', true).then(function(){
            slide('#/home');
        })
    }
});