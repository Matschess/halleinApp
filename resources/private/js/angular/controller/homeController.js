myApp.controller('homeController', function ($scope, $http) {
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=Hallein&appid=643bed1f37977f3f065cd32dfcc6bd5f')
        .then(function (response) {
            $scope.weather = response.data.weather[0].description;
        })

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