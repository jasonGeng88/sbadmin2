var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/login', {
            controller : 'LoginCtrl',
            templateUrl : 'login.html',
        })
        .when('/category', {//分类
            controller : 'CategoryCtrl',
            templateUrl : 'category.html',
        })
        .when('/station/index',{//店长首页
            controller : 'StationIndexCtrl',
            templateUrl : 'station/index.html',
        })
        .when('/station/wbill',{
            controller : 'StationIndexCtrl',
            templateUrl : 'template/tplAdmin/station/wbill.html',
        })
        .otherwise({
            controller : 'LoginCtrl',
            templateUrl : 'login.html'
        });
}]);
var apiIp="http://192.168.2.115/webService/index.php/Api";
// var apiIp="http://192.168.40.252/webService-finance/Api";
