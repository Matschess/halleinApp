var myApp = angular.module('myApp', ['ngRoute', 'ngCordova', 'ngTouch', 'mn', 'pascalprecht.translate']);

var URL = 'http://46.38.236.5:443';

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'content/splash.html',
            controller: 'splashController'
        })
        .when('/welcome', {
            templateUrl: 'content/welcome.html'
        })
        .when('/establishment', {
            templateUrl: 'content/establishment.html',
            controller: 'establishmentController'
        })
        .when('/interests', {
            templateUrl: 'content/interests.html',
            controller: 'interestsController'
        })
        .when('/newsletter', {
            templateUrl: 'content/newsletter.html',
            controller: 'newsletterController'
        })
        .when('/home', {
            templateUrl: 'content/home.html',
            controller: 'homeController'
        })
        .when('/food/restaurants/detail/:restaurant', {
            templateUrl: 'content/restaurantDetail.html',
            controller: 'restaurantDetailController'
        })
        .otherwise({
            redirectTo: "/"
        });
});

// Translations
myApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en_US');
}]);
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
myApp.controller('foodController', function ($scope) {
    $scope.arrows = {
        top: {
            color: 'white',
            text: 'Restaurants'
        },
        bottom: {
            color: 'white',
            text: 'Feedback'
        }
    }
});
myApp.controller('foodFeedbackController', function ($scope, $http) {
    var firstScroll = true;
    $('.bubbles').on('touchstart', function(e){
        if(firstScroll || $('.bubbles').scrollTop() > 0) {
            e.stopPropagation();
            firstScroll = false;
        }
    });

    getFeedback('-created');

    $scope.feedbackSlider = {
        current: 0,
        option: [
            {name: 'Neueste', orderBy:'-created'},
            {name: 'Beste', orderBy:'-rating'}
        ]
    }
    $scope.feedbacksliderUp = function () {
        if ($scope.feedbackSlider.current == 0) {
            $scope.feedbackSlider.current = $scope.feedbackSlider.option.length -1;

        }
        else {
            $scope.feedbackSlider.current--

        }
        getFeedback($scope.feedbackSlider.option[$scope.feedbackSlider.current].orderBy);

    }

    function getFeedback(orderBy) {
        $http.get(URL + '/feedback?get=restaurant,rating,text&status=2&orderBy=' + orderBy)
        .then(function (response) {
            $scope.bubbles = response.data;
        })
    }
});

myApp.controller('foodRestaurantsController', function ($scope, $http) {
    $http.get(URL + '/restaurants?get=id,restaurantname')
        .then(function (response) {
            var restaurants = response.data;
            var today = new Date();
            var data = {
                date: dateToString(today)
            }
            for(var j = 0; j < restaurants.length; j++) {
                if (!restaurants[j].mainImg) {
                    restaurants[j].mainImg = {
                        url: 'assets/imgs/local1.jpg'
                    };
                }
            }
            $http({
                url: URL + '/menus',
                method: 'GET',
                params: data
            }).then(function (response) {
                    var menus = response.data;
                    for(var i = 0; i < menus.length; i++){
                        for(var j = 0; j < restaurants.length; j++){
                            if(menus[i].restaurant == restaurants[j].id){
                                restaurants[j].menu = menus[i];
                            }
                        }
                    }
                    $scope.restaurants = restaurants;
                }, function() {
                $scope.restaurants = restaurants;
            })
        })
});

myApp.controller('homeController', function ($scope, $http) {
    /*
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=Hallein&appid=643bed1f37977f3f065cd32dfcc6bd5f')
        .then(function (response) {
            $scope.weather = response.data.weather[0].description;
        })
    */

    var swiperStartHorizontal = new Swiper('.swiper-container-start-horizontal', {
        direction: 'horizontal',
        initialSlide: 1
    })
    var swiperStartVertical = new Swiper('.swiper-container-start-vertical', {
        direction: 'vertical'
    })
    var swiperFoodVertical = new Swiper('.swiper-container-food-vertical', {
        direction: 'vertical',
        initialSlide: 1
    })
    swiperStartHorizontal.on('slideChangeStart', function () {
        var currentSlide = swiperStartHorizontal.realIndex;
        switch (currentSlide) {
            case 0:
                swiperStartHorizontal.lockSwipeToPrev();
                break;
            case 2:
                swiperStartHorizontal.lockSwipeToNext();
                break;
            default:
                swiperStartHorizontal.unlockSwipeToPrev();
                swiperStartHorizontal.unlockSwipeToNext();
        }
    });
    swiperFoodVertical.on('slideChangeStart', function () {
        var currentSlide = swiperFoodVertical.realIndex;
        switch (currentSlide) {
            case 0:
                swiperStartHorizontal.lockSwipeToPrev();
                swiperStartHorizontal.lockSwipeToNext();
                swiperFoodVertical.lockSwipeToPrev();
                break;
            case 2:
                swiperStartHorizontal.lockSwipeToPrev();
                swiperStartHorizontal.lockSwipeToNext();
                swiperFoodVertical.lockSwipeToNext();
                break;
            default:
                swiperStartHorizontal.unlockSwipeToPrev();
                swiperFoodVertical.unlockSwipeToPrev();
                swiperFoodVertical.unlockSwipeToNext();
        }
    });
    swiperStartVertical.on('slideChangeStart', function () {
        var currentSlide = swiperStartVertical.realIndex;
        switch (currentSlide) {
            case 1:
                swiperStartHorizontal.lockSwipeToPrev();
                swiperStartHorizontal.lockSwipeToNext();
                swiperStartVertical.lockSwipeToNext();
                break;
            default:
                swiperStartHorizontal.unlockSwipeToPrev();
                swiperStartHorizontal.unlockSwipeToNext();
                swiperStartVertical.unlockSwipeToNext();
        }
    });
    $scope.exitSettings = function () {
        swiperStartVertical.slideTo(0);
    }
});
myApp.controller('interestsController', function ($scope, $cordovaPreferences) {
    $scope.interests = [
        {name: 'News', active: true},
        {name: 'Vegetarisches', type: 'food'},
        {name: 'Pizza', type: 'food'},
        {name: 'Burger', type: 'food'},
        {name: 'Salate', type: 'food'},
        {name: 'Pommes', type: 'food'},
        {name: 'Nudelgerichte', type: 'food'},
        {name: 'Wild', type: 'food'},
        {name: 'Fisch', type: 'food'}
    ]

    $scope.save = function () {
        $cordovaPreferences.store('interests', $scope.interests).then(function () {
            slide('#/newsletter');
        });
    }
});
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
myApp.controller('newsletterController', function ($scope, $cordovaToast, $cordovaPreferences, $http) {
    $scope.input = {};
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
        var email = $scope.input.email;
        var newsletter = {
            active: true,
            email: email
        }
        $cordovaPreferences.store('newsletter', newsletter).then(function(){
            $cordovaPreferences.store('setupDone', true).then(function(){
                slide('#/home');
                // Joomla-Newsletter
                $http({
                    method: 'GET',
                    url: 'https://www.hallein.com/index.php?option=com_acymailing&gtask=sub&task=optin&hiddenlists=1&user[email]=' + email
                });
            })
        });
    }

    $scope.cancel = function(){
        $cordovaPreferences.store('setupDone', true).then(function(){
            slide('#/home');
        })
    }
});
myApp.controller('restaurantDetailController', function ($scope, $routeParams, $http, $timeout, $translate, $cordovaToast, $cordovaDialogs) {
    var swiperTabs = new Swiper('.swiper-container-tabs', {
        direction: 'horizontal'
    })
    var today = new Date();
    var weekday = today.getDay();
    var swiperMenus = new Swiper('.swiper-container-menus', {
        direction: 'horizontal',
        initialSlide: weekday,
        speed: 100,
        loop: true,
        slidesPerView: 2,
        centeredSlides: true,
        slideToClickedSlide: true
    })

    $scope.prevDay = function () {
        swiperMenus.slidePrev();
    }

    $scope.nextDay = function () {
        swiperMenus.slideNext();
    }

    var restaurant = $routeParams.restaurant;
    $http.get(URL + '/restaurants?id=' + restaurant)
        .then(function (response) {
            $scope.data = response.data[0];
            if($translate.use() == 'en_US' && $scope.data.description_en) {
                $scope.data.description = $scope.data.description_en;
            }
            if(!$scope.data.imgs){
                $scope.slider = {
                    current: 0,
                    images: [
                        'assets/imgs/local1.jpg'
                    ]
                }
            }
            else {
                $scope.slider = {
                    current: 0,
                    images: $scope.data.imgs
                }
            }
            if($scope.data.color){
                var color = $scope.data.color;
                $('.restaurantDetailWrapper .content .tabs .tab').css('border-color', color);
                $('.restaurantDetailWrapper .content .right.border').css('border-color', color);
                $('.restaurantDetailWrapper .content .feedback .bubbles .rating').css('color', color);
            }
            $scope.data.websiteFormatted = $scope.data.website;
            if ($scope.data.websiteFormatted.startsWith('http://')) {
                $scope.data.websiteFormatted = $scope.data.websiteFormatted.substring(7)

            }
            else if ($scope.data.websiteFormatted.startsWith('https://')) {
                $scope.data.websiteFormatted = $scope.data.websiteFormatted.substring(8)
            }
            if ($scope.data.websiteFormatted.endsWith('/')) {
                $scope.data.websiteFormatted = $scope.data.websiteFormatted.substring(0, $scope.data.websiteFormatted.length - 1)

            }
            if ($scope.data.websiteFormatted.length > 14) {
                $scope.data.websiteFormatted = "Website"
            }
        })

    $scope.showToast = function(text) {
        $cordovaToast.showShortBottom(text);
    }

    getFeedback();

    function getFeedback() {
        $http.get(URL + '/feedback?orderBy=-created&restaurant=' + restaurant + '&status=2')
            .then(function (response) {
                $scope.bubbles = response.data;
            })
    }

    getMenu();
    function getMenu(date) {
        var day = date;
        if (!date) day = today;
        var data = {
            restaurant: restaurant,
            date: dateToString(day)
        }
        $http({
            url: URL + '/menus',
            method: 'GET',
            params: data
        }).then(function (response) {
            $scope.menu = response.data[0];
        }, function () {
            delete $scope.menu;
        });
    }

    swiperMenus.on('onSlideChangeStart', function () {
        var currentSlide = swiperMenus.realIndex - weekday;
        var date = new Date();
        date.setDate(date.getDate() + currentSlide);
        getMenu(date);
    });


    var countUp = function () {
        if ($scope.slider.current == $scope.slider.images.length - 1) {
            $scope.slider.current = 0;
        }
        else {
            $scope.slider.current++;
        }
        $timeout(countUp, 3000);
    }

    $timeout(countUp, 3000);

    $scope.tabSwitcher = {
        active: 0,
        tabs: [
            {icon: 'info_outline', link: '#general'},
            {icon: 'restaurant', link: '#menus'},
            {icon: 'room', link: '#location'},
            {icon: 'star_border', link: '#feedback'},
        ]
    };

    $http.get(URL + '/openingTimes?get=opens,closes&weekday=' + weekday + '&restaurant=' + restaurant)
        .then(function (response) {
            var times = response.data[0];
            $scope.openingTimes = {
                times: {
                    opens: timeStringToDate(times.opens),
                    closes: timeStringToDate(times.closes)
                }
            };
            analyzeOpeningTimes($scope.openingTimes);
        })

    function analyzeOpeningTimes(openingTimes) {
        var now = new Date();
        if (openingTimes.times.opens - now > 0 && (openingTimes.times.opens - now) / 60000 <= 60) {
            $scope.openingTimes.status = 'openingSoon';
        }
        else if (openingTimes.times.closesHalf - now > 0 && (openingTimes.times.closesHalf - now) / 60000 <= 60) {
            $scope.openingTimes.status = 'closingSoon';
        }
        else if (openingTimes.times.opensHalf - now > 0 && (openingTimes.times.opensHalf - now) / 60000 <= 60) {
            $scope.openingTimes.status = 'openingSoon';
        }
        else if (openingTimes.times.closes - now > 0 && (openingTimes.times.closes - now) / 60000 <= 60) {
            $scope.openingTimes.status = 'closingSoon';
        }
        else if (openingTimes.times.opens < now && openingTimes.times.closes > now) {
            $scope.openingTimes.status = 'opened';
        }
        else {
            $scope.openingTimes.status = 'closed';
        }
    }

    $scope.tabGoTo = function (index) {
        swiperTabs.slideTo(index);
        $scope.tabSwitcher.active = index;
    }

    swiperTabs.on('onSlideChangeStart', function () {
        var currentSlide = swiperTabs.realIndex;
        $scope.tabSwitcher.active = currentSlide;
        $('.tab').removeClass('active');
        $('.tab').eq(currentSlide).addClass('active');
    });

    $scope.giveFeedback = function () {
        $cordovaDialogs.prompt('', 'Feedback geben', ['Senden', 'Abbrechen'], '')
            .then(function (result) {
                var text = result.input1;
                var data = {
                    restaurant: restaurant,
                    rating: 5,
                    text: text
                }
                $http({
                    url: URL + '/feedback',
                    method: 'POST',
                    params: data
                }).then(function (response) {
                    var data = response.data;
                    if(data.status == 'published') {
                        $cordovaToast.showShortBottom('Danke! Feedback veröffentlicht.');
                        getFeedback();
                    }
                    else if(data.status == 'queue'){
                        $cordovaToast.showShortBottom('Danke! Feedack wartet auf Freigabe.');
                    }
                });
            });
    }
});
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
myApp.controller('splashController', function ($cordovaPreferences, $location) {
    document.addEventListener("deviceready", function () {
        $cordovaPreferences.fetch('setupDone')
            .success(function (value) {
                if(value) $location.path('/home');
                else $location.path('/welcome');
            })
    }, false);
});
myApp.controller('startController', function ($scope, $rootScope, $translate) {
    $scope.arrows = {
        left: {
            color: 'purple',
            text: $translate.instant('TAXI'),
            link: {
                swiper: 'startHorizontal',
                slide: 0
            }
        },
        bottom: {
            color: 'grey',
            text: $translate.instant('SETTINGS'),
            link: {
                swiper: 'startVertical',
                slide: 1
            }
        },
        right: {
            color: 'red',
            text: $translate.instant('CULINARY'),
            link: {
                swiper: 'startHorizontal',
                slide: 2
            }
        }
    }

    $rootScope.$on('$translateChangeSuccess', function () {
        $scope.arrows.left.text = $translate.instant('TAXI');
        $scope.arrows.bottom.text = $translate.instant('SETTINGS');
        $scope.arrows.right.text = $translate.instant('CULINARY');
    });
});
myApp.controller('taxiController', function ($scope) {
    $scope.taxiList = {
        taxis: [
            {name: 'City Taxi', phone: '+43 6245 82030', phoneDisplay: '82030'},
            {name: "Taxi Comfortline", phone: '+43 6245 70370', phoneDisplay: '70370'},
            {name: "Abdinghoff Taxi", phone: '+43 6245 84400', phoneDisplay: '84400'},
            {name: "DES IS'A TAXI", phone: '+43 6245 70400', phoneDisplay: '70400'},
            {name: 'Taxi Resul', phone: '+43 6245 71111', phoneDisplay: '71111'},
            {name: "Taxi Steiner", phone: '+43 6245 70775', phoneDisplay: '70775'},
            {name: "Alfred Aschauer", phone: '+43 6245 85195', phoneDisplay: '85195'}
        ]
    }

    $scope.showPhone = function(index){
        if($scope.taxiList.showPhone != index){
            $scope.taxiList.showPhone = index;
        }
        else delete $scope.taxiList.showPhone;
    }

    $scope.random = function(array) {
        return array.sort(function() {
            return .5 - Math.random();
        });
    }
});
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
function timeStringToDate(date) {
    var hours = date.substr(0, 2);
    var minutes = date.substr(3, 2);
    var seconds = date.substr(6);
    date = new Date();
    date.setHours(hours, minutes, seconds);
    return date;
}

function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    date = year + '-' + month + '-' + day
    return date;
}

function slide(href, direction) {
    if(!direction) direction = 'left';
    window.plugins.nativepagetransitions.slide({
        "direction" : direction,
        "href" : href,
        "androiddelay": 0
    });
}

var options = {
    "duration"       :  1000, // in milliseconds (ms), default 400
    "slowdownfactor" :    1, // overlap views (higher number is more) or no overlap (1), default 3
    "iosdelay"       :  0, // ms to wait for the iOS webview to update before animation kicks in, default 50
    "androiddelay"   :  0  // same as above but for Android, default 50
};

// wait for deviceready..
document.addEventListener("deviceready", function() {
    // then override any default you want
    window.plugins.nativepagetransitions.globalOptions.duration = 400;
    window.plugins.nativepagetransitions.globalOptions.iosdelay = 0;
    window.plugins.nativepagetransitions.globalOptions.androiddelay = 0;
    window.plugins.nativepagetransitions.globalOptions.winphonedelay = 0;
    window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
    // these are used for slide left/right only currently
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;

    // Should work on Andriod
    if(StatusBar && statusbarTransparent) {
        // Enable translucent statusbar
        statusbarTransparent.enable();

        // Get the bar back
        StatusBar.show();
    }
    // iOS only
    else if (StatusBar) {
        // Get the bar back
        StatusBar.show();
    }
}, false);