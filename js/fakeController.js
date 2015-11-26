app.controller('fakeController', function ($scope, $http) {
    $scope.searchText = "";
    $scope.urlStart = "http://wsse.seccionamarilla.com/SearchEngine.svc/REST/PUNCTUALSEARCHLISTING/";
    $scope.urlEnd = "/20.7082399/-100.4455277/80/1/40/0/1/android/U1oxSzhJRm9JaVlYaFEvLzk1N3pTUT09";
    //http://wsse.seccionamarilla.com/SearchEngine.svc/REST/PUNCTUALSEARCHLISTING/antros/20.7082399/-100.4455277/80/1/40/0/1/android/U1oxSzhJRm9JaVlYaFEvLzk1N3pTUT09
    $scope.dataAvailable = false;

    $scope.asyncData = function (getURL) {
        var request = $http({
            method: 'GET',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: getURL
        }).then(function successCallback(response) {
            return response;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            return response;
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        return request;
    };

    $scope.search = function () {
        var searchURL = $scope.urlStart + $scope.searchText + $scope.urlEnd;
        $scope.asyncData(searchURL).then(function (promise) {
            console.log(promise.data);
            if(promise.data.totalResultsNum > 0) {
                $scope.searchResult = promise.data.ListRes;
                $scope.dataAvailable = true;
            } else {
                $scope.dataAvailable = false;
                alert("No data available");
            }
        });
    };
});