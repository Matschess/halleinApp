var myApp = angular.module('myApp', ['ngRoute', 'ngCordova', 'ngTouch', 'mn', 'ngColorThief']);

var URL = 'http://46.38.236.5:443';

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'content/welcome.html',
            controller: 'welcomeController',
            resolve: {
                'authenticate': function ($location, $cordovaPreferences) {
                    document.addEventListener("deviceready", function () {
                        $cordovaPreferences.fetch('setupDone')
                            .success(function (value) {
                                if(value == true) $location.path('/home');
                            });
                    }, false);
                }
            }
        })
        .when('/interests', {
            templateUrl: 'content/interests.html',
            controller: 'interestsController',
        })
        .when('/newsletter', {
            templateUrl: 'content/newsletter.html',
            controller: 'newsletterController',
        })
        .when('/food', {
            templateUrl: 'content/food.html',
            controller: 'foodController',
        })
        .when('/food/restaurants', {
            templateUrl: 'content/food-restaurants.html',
            controller: 'foodRestaurantsController',
        })
        .when('/food/feedback', {
            templateUrl: 'content/food-feedback.html',
            controller: 'foodFeedbackController',
        })
        .when('/home', {
            templateUrl: 'content/home.html',
            controller: 'homeController',
        })
        .when('/start', {
            templateUrl: 'content/start.html',
            controller: 'startController',
        })
        .when('/food/restaurants/detail/:restaurant', {
            templateUrl: 'content/restaurantDetail.html',
            controller: 'restaurantDetailController',
        })
        .when('/establishment', {
            templateUrl: 'content/establishment.html',
            controller: 'establishmentController'
        })
        .when('/settings', {
            templateUrl: 'content/settings.html',
            controller: 'settingsController',
        })
        .otherwise({
            redirectTo: "/"
        });
});