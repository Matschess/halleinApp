myApp.controller('restaurantDetailController', function ($scope, $routeParams, $http, $timeout, $cordovaToast, $cordovaDialogs) {
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
            console.log($scope.data);
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
            $scope.openingTimes.status = 'opensSoon';
            $scope.openingTimes.text = 'Öffnet bald';
        }
        else if (openingTimes.times.closes - now > 0 && (openingTimes.times.closes - now) / 60000 <= 60) {
            $scope.openingTimes.status = 'closesSoon';
            $scope.openingTimes.text = 'Schließt bald';
        }
        else if (openingTimes.times.opens < now && openingTimes.times.closes > now) {
            $scope.openingTimes.status = 'opened';
            $scope.openingTimes.text = 'Jetzt geöffnet';
        }
        else {
            $scope.openingTimes.status = 'closed';
            $scope.openingTimes.text = 'Jetzt geschlossen';
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
                }).then(function () {
                    getFeedback();
                });
            });
    }
});