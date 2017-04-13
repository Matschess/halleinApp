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