myApp.controller('mainController', function ($scope, $cordovaPreferences) {
    var nineOClock = new Date();
    nineOClock.setHours(9, 0, 0, 0);
    var interests = {};

    document.addEventListener("deviceready", function () {
        $cordovaPreferences.fetch('interests').success(function (value) {
            interests = value;
        });
        $cordovaPreferences.fetch('general')
            .success(function (value) {
                if (value.notifications) {
                    cordova.plugins.notification.local.schedule({
                        id: 1,
                        at: nineOClock,
                        //every: 'minute',
                        title: 'Dein Lieblingsgericht',
                        text: getFavouriteMeal(),
                        icon: 'res://icon.png',
                        smallIcon: 'res://notification.png',
                        led: '4CA49D'
                    });
                }
            });
    }, false);

    function getFavouriteMeal() {
        var menu;
        $.ajax({
            url: URL + '/menus',
            success: function (response) {
                var todayMenus = response;
                if (todayMenus.length) {
                    for (var i = 0; i < todayMenus.length; i++) {
                        for (var j = 0; j < interests.length; j++) {
                            if (todayMenus[i].mainCourse.description.includes(interests[j].name)) {
                                menu = todayMenus[i].mainCourse.description;
                            }
                        }
                    }
                }
            },
            async: false
        });
        return 'Heute gibt es ' + menu;
    }

    $scope.slide = function (href, direction) {
        slide(href, direction);
    }
});