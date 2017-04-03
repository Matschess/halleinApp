myApp.controller('mainController', function ($scope, $cordovaPreferences) {
    var interests = [];

    var now = new Date();
    var nineOClock = new Date();
    nineOClock.setHours(15, 0, 0, 0);
    if (nineOClock < now){
        nineOClock.setDate(nineOClock.getDate() + 1);
    }
    var difference = nineOClock - now;
    window.setTimeout(function() {
        window.setInterval(function() {
            document.addEventListener("deviceready", function () {
                $cordovaPreferences.fetch('interests').success(function (value) {
                    interests = [];
                    for(var i = 0; i < value.length; i++){
                        if(value[i].type == 'food' && value[i].active){
                            interests.push(value[i].name);
                        }
                    }
                });
                $cordovaPreferences.fetch('general')
                    .success(function (value) {
                        if (value.notifications) {
                            var favouriteMeal = getFavouriteMeal();
                            if(favouriteMeal.menu && favouriteMeal.restaurant) {
                                cordova.plugins.notification.local.schedule({
                                    id: 1,
                                    title: 'Dein Lieblingsgericht',
                                    text: 'Heute gibt es ' + favouriteMeal.menu + ' im ' + favouriteMeal.restaurant,
                                    icon: 'res://icon.png',
                                    smallIcon: 'res://notification.png',
                                    led: '4CA49D'
                                });
                            }
                        }
                    });
            }, false);
        }, (1000*60*60*24));
    }, difference)

    function getFavouriteMeal() {
        var menu = false;
        var restaurant = false;
        $.ajax({
            url: URL + '/menus',
            success: function (response) {
                var todayMenus = response;
                if (todayMenus.length) {
                    for (var i = 0; i < todayMenus.length; i++) {
                        for (var j = 0; j < interests.length; j++) {
                            if (todayMenus[i].mainCourse.description.includes(interests[j])) {
                                menu = todayMenus[i].mainCourse.description;
                                restaurant = todayMenus[i].restaurant;
                            }
                        }
                    }
                }
            },
            async: false
        });
        return {
            menu: menu,
            restaurant: restaurant
        };
    }

    $scope.slide = function (href, direction) {
        slide(href, direction);
    }
});