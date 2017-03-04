var myApp = angular.module('myApp', ['ngRoute', 'ngCordova', 'ngTouch', 'mn', 'ngColorThief']);

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