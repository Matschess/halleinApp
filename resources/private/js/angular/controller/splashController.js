myApp.controller('splashController', function ($cordovaPreferences, $location) {
    document.addEventListener("deviceready", function () {
        $cordovaPreferences.fetch('setupDone')
            .success(function (value) {
                if(value) $location.path('/home');
                else $location.path('/welcome');
            })
    }, false);
});