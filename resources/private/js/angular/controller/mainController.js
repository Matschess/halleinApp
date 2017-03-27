myApp.controller('mainController', function ($scope, $cordovaPreferences) {
    var nineOClock = new Date();
    nineOClock.setHours(20,47,0,0);
    document.addEventListener("deviceready", function () {
        $cordovaPreferences.fetch('general')
            .success(function (value) {
                if (value.notifications) {
                    cordova.plugins.notification.local.schedule({
                        id: 1,
                        at: nineOClock,
                        every: 'day',
                        title: 'Dein Lieblingsgericht',
                        text: "Heute gibt es Burger im Roadhouse. Lass es dir schmecken!",
                        icon: 'res://icon.png',
                        smallIcon: 'res://notification.png',
                        led: '4CA49D'
                    });
                }
            });
    }, false);
    alert('sadf');
});