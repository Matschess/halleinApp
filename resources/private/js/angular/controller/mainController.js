myApp.controller('mainController', function ($scope, $cordovaPreferences, $http) {
    var nineOClock = new Date();
    nineOClock.setHours(9,0,0,0);

    $http.get(URL + '/menus')
        .then(function (response) {
            var todayMenus = response.data;
            var todayMenu = todayMenus[0].mainCourse.description;
            document.addEventListener("deviceready", function () {
                $cordovaPreferences.fetch('general')
                    .success(function (value) {
                        if (value.notifications) {
                            cordova.plugins.notification.local.schedule({
                                id: 1,
                                at: nineOClock,
                                every: 'minute',
                                title: 'Dein Lieblingsgericht',
                                text: todayMenu,
                                icon: 'res://icon.png',
                                smallIcon: 'res://notification.png',
                                led: '4CA49D'
                            });
                        }
                    });
            }, false);
        })

    $scope.slide = function(href, direction) {
        slide(href, direction);
    }
});