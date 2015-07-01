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
        //店长页面
        .when('/station/index',{//店长首页
            controller : 'StationIndexCtrl',
            templateUrl : 'station/index.html',
        })
        .when('/station/todayrpt',{
            controller : 'StationTodayCtrl',
            templateUrl : 'station/todayrpt.html',
        })
        .when('/station/detail/:userid',{
            controller : 'StationDetailCtrl',
            templateUrl : 'station/detail.html',
        })
        .when('/station/historyrpt',{
            controller : 'StationHistoryCtrl',
            templateUrl : 'station/historyrpt.html',
        })
        .when('/station/wbill',{
            controller : 'StationIndexCtrl',
            templateUrl : 'template/tplAdmin/station/wbill.html',
        })
        //财务页面
        .when('/finance/index',{
            controller : 'FinanceIndexCtrl',
            templateUrl : 'finance/index.html',
        })
        .when('/finance/todayrpt',{
            controller : 'FinancetodayrptCtrl',
            templateUrl : 'finance/todayrpt.html',
        })
        .otherwise({
            controller : 'LoginCtrl',
            templateUrl : 'login.html'
        });
}]);
// var apiIp="http://192.168.2.115/webService/index.php/Api";
var apiIp="http://192.168.40.252/webService-finance/Api";
