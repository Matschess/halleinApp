myApp.controller('welcomeController', function ($scope, $translate) {
    $scope.changeLang = function() {
        switch ($translate.use()) {
            case 'de_AT':
                $translate.use('en_US');
                break;
            case 'en_US':
                $translate.use('de_AT');
        }
    }
});