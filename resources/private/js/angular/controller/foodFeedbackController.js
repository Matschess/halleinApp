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
