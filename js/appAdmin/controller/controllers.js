//登录
app.controller('LoginCtrl',function($scope,$http,$location) {
  $scope.src=apiIp+'/GetCode?'+Math.random();
  $scope.changeCode=function(){
    $scope.src=apiIp+'/GetCode?'+Math.random();
  };
  //记住密码
  $http.get(apiIp+'/RememberMe').
  success(function(data){
    if (data.status==1) {
      $scope.username=data.info.username;
      $scope.passwd=data.info.passwd;
      $scope.remember=data.info.remember;
    };
  });
  $scope.submit=function(){
    var data={
              username:$scope.username,
              passwd:$scope.password,
              code:$scope.code,
              remember:$scope.remember
    }
    $http.post(apiIp+'/GetLogin',data).
    success(function(data, status, headers, config) {
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.name=data.info.name;
        $location.path("/category").search({info: data.info.res,name: data.info.name});
      };
      
    }).
    error(function(data, status, headers, config) {
      $scope.error='登录失败！';
    });
  };
});
//目录
app.controller('CategoryCtrl',function($scope,$http,$location) {
  $scope.length=$location.search().info.length;
  $scope.roleids=$location.search().info;
  $scope.name=$location.search().name;
  $scope.entrance=function(e){
    // var roleid=e.target.getAttribute('_entrancepro');
    // var data={
    //           roleid:roleid
    // }
    $http.post(apiIp+'/GetFinance').
    success(function(data, status, headers, config) {
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        if (data.info.roleid==41) {
          $location.path("/station/wbill").search({stationName: data.info.stationName,stationId: data.info.stationId});
        };
      };
      
    }).
    error(function(data, status, headers, config) {
      $scope.error='没有权限！';
    });
    // var entraPro=clickEvent.getAttribute('_entrancepro');
    // var entraPro=$(this).attr('_entrancepro');
    // alert(entraPro);
  }
});
//网点index
app.controller('StationIndexCtrl',function($scope,$http,$location) {
  $scope.stationName=$location.search().stationName;
  $scope.stationId=$location.search().stationId;

});
