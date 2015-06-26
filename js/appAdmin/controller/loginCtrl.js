app.controller('LoginCtrl',function($scope,$http) {
  $scope.submit=function(){
    var data={
              username:$scope.account,
              passwd:$scope.password,
              remember:$scope.remember
    }
    $http.post('http://192.168.40.252/webService/Api/GetLogin',data).
    success(function(data, status, headers, config) {
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.category=data.info;
      };
      
    }).
    error(function(data, status, headers, config) {
      $scope.error='登录失败！';
    });
  }
});