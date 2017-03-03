myApp.controller('startController', function ($scope) {
    $scope.arrows = {
        left: {
            color: 'purple',
            text: 'Taxi',
            link: {
                swiper: 'startHorizontal',
                slide: 0
            }
        },
        bottom: {
            color: 'grey',
            text: 'Einstellungen',
            link: {
                swiper: 'startVertical',
                slide: 1
            }
        },
        right: {
            color: 'red',
            text: 'Essen',
            link: {
                swiper: 'startHorizontal',
                slide: 2
            }
        }
    }
});