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
        .when('/station/historydetail/:billid',{
            controller : 'StationHistoryDetailCtrl',
            templateUrl : 'station/historydetail.html',
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
            controller : 'FinanceTodayrptCtrl',
            templateUrl : 'finance/todayrpt.html',
        })
        .when('/finance/stationdetail/:stationid',{
            controller : 'FStationDetailCtrl',
            templateUrl : 'finance/stationdetail.html'
        })
        .when('/finance/xgdetail/:userid',{
            controller : 'FXgDetailCtrl',
            templateUrl : 'finance/xgdetail.html'
        })
        .when('/finance/historyrpt',{
            controller : 'FinanceHistoryCtrl',
            templateUrl : 'finance/historyrpt.html',
        })
        .when('/finance/historystation/:stationid',{
            controller : 'FinanceHistoryStationCtrl',
            templateUrl : 'finance/historystation.html',
        })
        .when('/finance/historydetail/:billid',{
            controller : 'FinanceHistoryDetailCtrl',
            templateUrl : 'finance/historydetail.html',
        })
        .otherwise({
            controller : 'LoginCtrl',
            templateUrl : 'login.html'
        });
}]);
// var apiIp="http://192.168.2.115/webService/index.php/Api";
var apiIp="http://192.168.40.252/webService-finance/Api";
