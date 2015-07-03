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
      console.log(data);
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.name=data.info.name;
        $scope.mlist=data.info.res;
        console.log(data.info.nums);
        console.log(data.info.res);
        console.log(data.info.res.roleid);
        console.log(data.info.name);
        var infostr=JSON.stringify(data.info.res);
        if (data.info.res.roleid==41) {//网点
          $location.path("/station/index").search({uname:$scope.name,mlist:infostr,nums:JSON.stringify(data.info.nums)});
        }else if (data.info.res.roleid==42) {
          $location.path("/finance/index").search({uname:$scope.name,mlist:infostr,nums:JSON.stringify(data.info.nums)});
        };
        // $location.path("/category").search({info: [111,222],name: 333});
        // $location.path("/category").search({info: infostr,name: data.info.name});
      };
      
    }).
    error(function(data, status, headers, config) {
      $scope.error='登录失败！';
    });
  };
});
//目录
// app.controller('CategoryCtrl',function($scope,$http,$location) {
//   console.log($location.search().name);
//   $scope.roleids=JSON.parse($location.search().info);
//   $scope.uname=$location.search().name;
//   $scope.entrance=function(e){
//     var roleid=e.target.getAttribute('_entrancepro');
//     console.log(roleid);
//     if (roleid==45) {
//       $http.post(apiIp+'/GetFinance').
//         success(function(data, status, headers, config) {
//           console.log(data);
//           if (data.status==0) {
//             $scope.error=data.info;
//           } else if (data.status==1) {
//             console.log(data.info);
//             if (data.info.roleid==41) {
//               var infostr=JSON.stringify(data.info);
//               $location.path("/station/index").search({uname:$scope.uname,mlist:infostr});
//             };
//             if (data.info.roleid==42) {
//               var infostr=JSON.stringify(data.info);
//               $location.path("/finance/index").search({uname:$scope.uname,mlist:infostr});
//             };
//           };
//         }).
//         error(function(data, status, headers, config) {
//           console.log('error!');
//           $scope.error='操作失败！';
//         });
//     };
//     // var entraPro=clickEvent.getAttribute('_entrancepro');
//     // var entraPro=$(this).attr('_entrancepro');
//     // alert(entraPro);
//   }
// });
//网点index
app.controller('StationIndexCtrl',function($scope,$http,$location,userInfoService) {
  $scope.nums=JSON.parse($location.search().nums);
  console.log($location.search().nums);
  console.log(userInfoService.mlist);
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  $scope.entrance=function(e){
    var category=e.target.getAttribute('_categoryDetail');
    console.log(category);
    $location.path("/station/"+category).search({uname:$scope.uname,mlist:$scope.mliststr});
  }
});
//网点today
app.controller('StationTodayCtrl',function($scope,$http,$location,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  console.log($scope.mlist.stationId);
  var data={
          stationid:$scope.mlist.stationId,
          roleid:userInfoService.mlist.roleid
      };
  $http.post(apiIp+'/GetXiaogeInfo',data).
    success(function(data, status, headers, config) {
      console.log(data);
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.xgsummary=data.info.res;
        $scope.billres=data.info.billres;
      };
    }).
    error(function(data, status, headers, config) {
      console.log('error');
      $scope.error='操作失败！';
    });
});
//网点小哥明细
// app.controller('StationDetailCtrl',function($scope,$http,$location,userInfoService){
//   $scope.mlist=userInfoService.mlist;
//   $scope.mliststr=userInfoService.mliststr;
//   $scope.uname=userInfoService.uname;
// });
app.controller('StationDetailCtrl',function($scope,$http,$location,$routeParams,$timeout,userInfoService,expression){
  console.log($routeParams);
  $scope.add=expression.specialadd;
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  //获取小哥订单所有订单
  var data={
          userId:$routeParams.userid,
          stationId:userInfoService.mlist.stationId,
          roleId:userInfoService.mlist.roleid,
      };
  console.log(data);
  $http.post(apiIp+'/GetOrderInfo',data).
    success(function(data){
      console.log(data);
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.orderInfo=data.info;
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
  //日历
  $scope.datetimepicker=function(){
    $('.form_date').datetimepicker({
      format:  'yyyy-MM-dd',
      language:  'fr',
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      minView: 2,
      forceParse: 0
    });
  }
  //纸质代金券提交
  $scope.paperSubmit=function(index){
    var orderid=$("input[name='orderid']")[index].value;
    var ctime=document.getElementsByName('ctime')[index].innerHTML;
    console.log(ctime);
    var amount=$("input[name='amount']")[index].value;
    var realamount=$("input[name='realamount']")[index].value;
    var startvaltime=$("input[name='startvaltime']")[index].value;
    var endvaltime=$("input[name='endvaltime']")[index].value;
    var orderdatetime=$("input[name='orderdatetime']")[index].value;
    var data={
            'orderid': orderid,
            'stationid': userInfoService.mlist.stationId,
            'amount': amount,
            'realamount': realamount,
            'starttime': startvaltime,
            'orderdatetime': orderdatetime,
            'createtime': ctime,
            'endtime': endvaltime,
            'operatorid': $routeParams.userid,
        };
    console.log(data);
    
    $http.post(apiIp+'/InputPaperCoupon',data).
      success(function(data){
        console.log(data);
        if (data.status==0) {
          $scope.pinfo=data.info;
          $scope.notify='danger';
        } else if (data.status==1) {
          $scope.pinfo=data.info.info;
          $scope.notify='success';
          $scope.pcoupon=data.info.price;
          $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 //enter key
            $('.modal').trigger(e);
          },500);
        };
      }).
      error(function(data){
        console.log('error');
        $scope.notify='danger';
        $scope.pinfo='操作失败！';
      });
  }
  //质疑查看
  $scope.probleminfo=function(id){
    console.log(id);
    var data={
            orderId : id,
        };
    $http.post(apiIp+'/GetProblemInfo',data).
      success(function(data){
        if (data.status==1) {
          console.log(data.info);
          $scope.problemList=data.info;
          $('#problem'+id).modal('show'); 
        };
        console.log(data);
      }).
      error(function(data){
        console.log('error');
        $scope.error='操作失败！';
      });
  }
  //质疑提交
  $scope.problemSubmit=function(index){
    var orderid=$("input[name='porderid']")[index].value;
    var orderdatetime=$("input[name='porderdatetime']")[index].value;
    var problemDescribe=$("textarea[name='problemDescribe']")[index].value;
    var data={
            'orderid' : orderid,
            'orderdatetime' : orderdatetime,
            'stationid' : userInfoService.mlist.stationId,
            'operatorid': $routeParams.userid,
            'mark' : problemDescribe,
            'roleid' : userInfoService.mlist.roleid,
          };
    console.log(data);
    $http.post(apiIp+'/InputProblemBill',data).
      success(function(data){
        console.log(data);
        if (data.status==0) {
          console.log(data.info);
          $scope.qinfo=data.info;
          $scope.notify='danger';
        } else if (data.status==1) {
          console.log(data.info);
          $scope.qinfo=data.info;
          $scope.infosbt='已提交';
          $scope.notify='success';
          $scope.addnum=index;
          $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 //enter key
            $('.modal').trigger(e);
          },500);
        };
      }).
      error(function(data){
        console.log('error');
        $scope.notify='danger';
        $scope.qinfo='操作失败！';
      });
    }
  //确认提交
  $scope.confirmSubmit=function(index){
    console.log(index);
    var orderid=$("input[name='corderid']")[index].value;
    var confirmDescribe=$("textarea[name='confirmDescribe']")[index].value;
    var orderdatetime=$("input[name='corderdatetime']")[index].value;

    var data={
            orderId : orderid,
            roleId : userInfoService.mlist.roleid,
            userId :　$routeParams.userid,
            stationId : userInfoService.mlist.stationId,
            mark : confirmDescribe,
            orderDatetime : orderdatetime,
        };
    console.log(data);

    $http.post(apiIp+'/ConfirmSubmit',data).
      success(function(data){
        console.log(data);
        if (data.status==1) {
          $scope.cerror=data.info;
          console.log(data.info);
          $scope.cinfo=data.info;
          $scope.notify='success';
          $scope.csuccess=index;
          $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 //enter key
            $('.modal').trigger(e);
          },500);
        } else if (data.status==0) {
          console.log(data.info);
          $scope.cinfo=data.info;
          $scope.notify='danger';
        };
      }).
      error(function(data){
        console.log('error');
        $scope.cerror=data.info;
        $scope.cinfo='服务器异常！';
        $scope.notify='danger';
      });
  }
});
//网点history
app.controller('StationHistoryCtrl',function($scope,$http,$location,userInfoService){
  $scope.mlist=userInfoService.mlist;
  console.log($scope.mlist);
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  var data = {
            stationId : $scope.mlist.stationId,
      };
  console.log(data);
  $http.post(apiIp+'/SearchBillOfStation',data).
    success(function(data){
      console.log(data);
      if (data.status==1) {
        $scope.bill=data.info;
      } else if (data.status==0) {
        $scope.error='操作失败！';
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
});
//网点对账单详情
app.controller('StationHistoryDetailCtrl',function($scope,$http,$location,$routeParams,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  console.log(userInfoService.mlist);
  console.log($routeParams.billid);
  var data = {
          billId : $routeParams.billid
      };
  $http.post(apiIp+'/CheckBillDetail',data).
    success(function(data){
      console.log(data);
      if (data.status==1) {
        $scope.billdetail=data.info;
      }else if (data.status==0) {
        $scope.error='操作失败！';
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
});
//财务index
app.controller('FinanceIndexCtrl',function($scope,$http,$location,userInfoService){
  $scope.nums=JSON.parse($location.search().nums);
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  console.log(userInfoService.mlist);
});
//财务todayrpt
app.controller('FinanceTodayrptCtrl',function($scope,$http,$location,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  console.log(userInfoService.mlist);
  var data={
          'cityId':userInfoService.mlist.cityId
      };
  $http.post(apiIp+'/GetStationInfo',data).
    success(function(data){
      console.log(data);
      if (data.status==0) {
        console.log(data.info);
        $scope.error=data.info;
      } else if (data.status==1) {
        console.log(data.info);
        $scope.sinfo=data.info;
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
});
//财务网点详情
app.controller('FStationDetailCtrl',function($scope,$http,$location,$timeout,$routeParams,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.stationid=$routeParams.stationid;
  $scope.uname=userInfoService.uname;
  console.log(userInfoService.mlist);
  console.log($routeParams.stationid);
  console.log($routeParams);
  //获取小哥信息
  var data={
          stationid:$routeParams.stationid,
          roleid:userInfoService.mlist.roleid
      };
  $http.post(apiIp+'/GetXiaogeInfo',data).
    success(function(data){
      console.log(data);
      if (data.status==0) {
        console.log(data.info);
        $scope.error=data.info;
      } else if (data.status==1) {
        console.log(data.info);
        $scope.sdinfo=data.info.res;
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
  //判断是否可以提交入库
  var data={
          stationId:$routeParams.stationid,
      };
  $http.post(apiIp+'/IsSubmitTable',data).
    success(function(data){
      console.log(data);
      if (data.status==0) {
        console.log(data.info);
        $scope.saveTable=false;
      } else if (data.status==1) {
        console.log(data.info);
        if (data.info==1) {
          $scope.saveTable=true;
        } else if (data.info==2) {
          $scope.saveTable=false;
          $scope.submitted=true;
        };
      };
    }).
    error(function(data){
      console.log('error');
      $scope.saveTable=false;
    });
  //数据迁移
  $scope.importTable=function(){
    var billDescribe=$("textarea[name='billDescribe']")[0].value;
    var data={
          stationId:$routeParams.stationid,
          mark : billDescribe
      };
      console.log(data);
    $http.post(apiIp+'/ImportData',data).
    success(function(data){
      console.log(data);
      if (data.status==0) {
        console.log(data.info);
        $scope.importinfo=data.info;
        $scope.importnotify='danger';
      } else if (data.status==1) {
        console.log(data.info);
        $scope.importinfo=data.info;
        $scope.importnotify='success';
        $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 //enter key
            $('.modal').trigger(e);
          },500);
      };
    }).
    error(function(data){
      console.log('error');
    });
  }
});
//财务网点下小哥详情
app.controller('FXgDetailCtrl',function($scope,$http,$location,$routeParams,$timeout,userInfoService,expression){
  $scope.add = expression.specialadd;
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  $scope.stationid=$routeParams.stationid;
  console.log(userInfoService.mlist);
  console.log($routeParams.userid);
  console.log($routeParams.stationid);
  var data={
          userId:$routeParams.userid,
          stationId:$routeParams.stationid,
          roleId:userInfoService.mlist.roleid,
      };
  $http.post(apiIp+'/GetOrderInfo ',data).
    success(function(data){
      console.log(data);
      if (data.status==0) {
        console.log(data.info);
        $scope.error=data.info;
      } else if (data.status==1) {
        console.log(data.info);
        $scope.xdinfo=data.info;
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
  $scope.probleminfo=function(id){
    console.log(id);
    var data={
            orderId : id,
        };
    $http.post(apiIp+'/GetProblemInfo',data).
      success(function(data){
        if (data.status==1) {
          console.log(data.info);
          $scope.problemList=data.info;
          $('#problem'+id).modal('show'); 
        };
        console.log(data);
      }).
      error(function(data){
        console.log('error');
        $scope.error='操作失败！';
      });
  }
  //质疑提交
  $scope.problemSubmit=function(index){
    var orderid=$("input[name='porderid']")[index].value;
    var orderdatetime=$("input[name='porderdatetime']")[index].value;
    var problemDescribe=$("textarea[name='problemDescribe']")[index].value;
    var data={
            'orderid' : orderid,
            'orderdatetime' : orderdatetime,
            'stationid' : $routeParams.stationid,
            'operatorid': $routeParams.userid,
            'mark' : problemDescribe,
            'roleid' : userInfoService.mlist.roleid,
          };
    console.log(data);
    $http.post(apiIp+'/InputProblemBill',data).
      success(function(data){
        console.log(data);
        if (data.status==0) {
          console.log(data.info);
          $scope.qinfo=data.info;
          $scope.notify='danger';
        } else if (data.status==1) {
          console.log(data.info);
          $scope.qinfo=data.info;
          $scope.infosbt='已提交';
          $scope.addnum=index;
          console.log($scope.addnum);
          $scope.notify='success';
          $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 //enter key
            $('.modal').trigger(e);
          },500);
        };
      }).
      error(function(data){
        console.log('error');
        $scope.notify='danger';
        $scope.qinfo='操作失败！';
      });
    }
  //确认提交
  $scope.confirmSubmit=function(index){
    console.log(index);
    var orderid=$("input[name='corderid']")[index].value;
    var confirmDescribe=$("textarea[name='confirmDescribe']")[index].value;
    var orderdatetime=$("input[name='corderdatetime']")[index].value;

    var data={
            orderId : orderid,
            roleId : userInfoService.mlist.roleid,
            stationId : $routeParams.stationid,
            mark : confirmDescribe,
            orderDatetime : orderdatetime,
        };
    console.log(data);

    $http.post(apiIp+'/ConfirmSubmit',data).
      success(function(data){
        console.log(data);
        if (data.status==1) {
          $scope.cerror=data.info;
          console.log(data.info);
          $scope.cinfo=data.info;
          $scope.notify='success';
          $scope.csuccess=index;
          $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 ;//enter key
            $('.modal').trigger(e);
          },500);
        } else if (data.status==0) {
          console.log(data.info);
          $scope.cinfo=data.info;
          $scope.notify='danger';
        };
      }).
      error(function(data){
        console.log('error');
        $scope.cerror=data.info;
        $scope.cinfo='服务器异常！';
        $scope.notify='danger';
      });
  }
});
//财务对账单
app.controller('FinanceHistoryCtrl',function($scope,$http,$location,userInfoService){
  $scope.mlist=userInfoService.mlist;
  console.log($scope.mlist);
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  var data = {
            cityId : $scope.mlist.cityId,
      };
  console.log(data);
  $http.post(apiIp+'/GetBillStation',data).
    success(function(data){
      console.log(data);
      if (data.status==1) {
        $scope.station=data.info;
      } else if (data.status==0) {
        $scope.error='操作失败！';
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
});
//财务对账单-网点
app.controller('FinanceHistoryStationCtrl',function($scope,$http,$location,$routeParams,userInfoService){
  $scope.mlist=userInfoService.mlist;
  console.log($scope.mlist);
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  var data = {
            stationId : $routeParams.stationid,
      };
  console.log(data);
  $http.post(apiIp+'/SearchBillOfStation',data).
    success(function(data){
      console.log(data);
      if (data.status==1) {
        $scope.bill=data.info;
      } else if (data.status==0) {
        $scope.error='操作失败！';
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
});
//财务对账单详情
app.controller('FinanceHistoryDetailCtrl',function($scope,$http,$location,$routeParams,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  console.log(userInfoService.mlist);
  console.log($routeParams.billid);
  var data = {
          billId : $routeParams.billid
      };
  console.log(data);
  $http.post(apiIp+'/CheckBillDetail',data).
    success(function(data){
      console.log(data);
      if (data.status==1) {
        $scope.billdetail=data.info;
      }else if (data.status==0) {
        $scope.error='操作失败！';
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
});





