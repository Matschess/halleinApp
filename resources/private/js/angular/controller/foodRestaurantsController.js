myApp.controller('foodRestaurantsController', function ($scope, $http) {
    $http.get(URL + '/restaurants?get=id,restaurantname')
        .then(function (response) {
            var restaurants = response.data;
            console.log(restaurants);
            var today = new Date();
            var data = {
                date: dateToString(today)
            }
            $http({
                url: URL + '/menus',
                method: 'GET',
                params: data
            }).then(function (response) {
                    var menus = response.data;
                    for(var i = 0; i < menus.length; i++){
                        for(var j = 0; j < restaurants.length; j++){
                            if(!restaurants[j].mainImg){
                                restaurants[j].mainImg = {
                                    filename: 'assets/imgs/local1.jpg'
                                };
                            }
                            if(menus[i].restaurant == restaurants[j].id){
                                restaurants[j].menu = menus[i];
                            }
                        }
                        if(i == menus.length - 1){
                            $scope.restaurants = restaurants;
                        }
                    }
                })
        })
});
