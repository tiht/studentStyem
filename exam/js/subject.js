/**
 * Created by Administrator on 2016/9/22.
 * 题目管理的js模块
 */
//angular
angular.module("app.subject",["ng","ngRoute"])
    .controller("subjectDelController",["$routeParams","commonService","$location",function ($routeParams,commonService,$location) {
        var flag=confirm("确认删除吗？")
        if(flag){
            var id=$routeParams.id;
            commonService.delSubject(id,function (data) {
                alert(data);
            })
            //页面跳转)
            $location.path("/AllSubject/a/0/b/0/c/0/d/0")
        }else {
            //页面跳转)
            $location.path("/AllSubject/a/0/b/0/c/0/d/0")
        }
    }])
    .controller("checkSubjectController",["$routeParams","commonService","$location",function ($routeParams,commonService,$location) {
        var id=$routeParams.id;
        var checkState=$routeParams.checkState;
        commonService.checkSubject(id,checkState,function (data) {
            alert(data)
            $location.path("/AllSubject/a/0/b/0/c/0/d/0")
        })

    }])
    .controller("subjectController",["$scope","commonService","$location","$routeParams",function ($scope,commonService,$location,$routeParams) {
        $scope.params=$routeParams
        //添加页面的属性
        $scope.subject={
            typeId:1,
            levelId:1,
            departmentId:1,
            topicId:1,
            stem:"",
            analysis:"",
            answer:"",
            choiceContent:[],
            choiceCorrect:[false,false,false,false]
        }
        $scope.submit=function () {
            commonService.saveSubject($scope.subject,function (data) {
                alert(data)
            })
            //重置作用域中绑定的表单默认值
            var subject={
                typeId:1,
                levelId:1,
                departmentId:1,
                topicId:1,
                stem:"",
                analysis:"",
                answer:"",
                choiceContent:[],
                choiceCorrect:[false,false,false,false]
            }
            angular.copy(subject,$scope.subject)
        }
        $scope.delete=function () {
            commonService.saveSubject($scope.subject,function (data) {
                alert(data)
            })
            $location.path("AllSubject/a/0/b/0/c/0/d/0")
        }
        //console.log( $scope.params)
        $scope.add=function () {
           $location.path("addSubject")
        }
        $scope.arr={
            type:"0"
        }
        $scope.data=function (i) {
            $scope.arr.type=i
        }
        commonService.getAllSubjectType( function (data) {
            $scope.typedata=data;
          // console.log($scope.typedata)
        })
        commonService.getAllDepartmentes(function (data) {
            $scope.deparmentdata=data;
            // console.log($scope.deparmentdata)
        })
        commonService.getAllTopics(function (data) {
            $scope.topicsdata=data;
         // console.log($scope.topicsdata)
            data.forEach(function(arr){
               // console.log(arr.department.id)
                //$scope.part=topic.department
            })
        })
        commonService.getAllSubjectLevel(function (data) {
            $scope.Leveldata=data;
           // console.log($scope.Leveldata)
        })
        commonService.getAllSubjects($routeParams,function (data) {

             data.forEach(function (subject) {
                 if(subject.subjectType!=null){
                //给选项添加 A B C D
                var anwser=[]
                    // console.log(subject)
                //console.log(subject.topic.department.id)
                subject.choices.forEach(function (choice,index) {
                    choice.no=commonService.getIndexToNo(index);
                })
                if(subject.subjectType.id!=3){
                    subject.choices.forEach(function (choice) {
                        if(choice.correct){
                            anwser.push(choice.no)
                        }
                    })
                    subject.answer=anwser.toString();
                       }
                    }
            })

            $scope.subjects=data;
          //  console.log(data)
        })
    }])
    .factory("commonService",["$http","$httpParamSerializer",function ($http,$httpParamSerializer) {
        return{
            getIndexToNo:function(index){
               {
                    switch(index){
                        case 0:return "A";break;
                        case 1:return"B";break;
                        case 2:return "C";break;
                        case 3:return "D";break;
                    }
                }
            },
            getAllSubjectType:function (handler) {
               $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action")
                //$http.get("data/types.json")
                 .then(
                    function (result) {
                        handler(result.data)
                   // console.log(result.data)
                })
            },
            getAllTopics:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action")
                //$http.get("data/topics.json")
                    .then(
                    function (result) {
                        handler(result.data)
                       // console.log(result.data)
                    })
            },
            getAllDepartmentes:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action")
                //$http.get("data/deparmentes.json")
                    .then(
                    function (result) {
                        handler(result.data)
                       // console.log(result.data)
                    })
            },
            getAllSubjectLevel:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action")
               // $http.get("data/level.json")
                    .then(
                    function (result) {
                        handler(result.data)
                        //  console.log(result.data)
                    })
            },
            getAllSubjects:function (params,handler) {
               //console.log(params)
              var  arr={};
                for(var key in params){
                    var val=params[key]
                    if(val!=0){
                        switch (key){
                            case "a":arr['subject.subjectType.id']=val;break;
                            case "b":arr['subject.department.id']=val;break;
                            case "c":arr['subject.topic.id']=val;break;
                            case "d":arr['subject.subjectLevel.id']=val;break;
                        }
                    }
                }
              // console.log(arr)
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
                    params:arr
                }).success(function (data) {
                        handler(data)
                   //    console.log(data)
                    })
            },
            checkSubject:function (id,checkState,handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
                    params:{
                        'subject.id':id,
                        'subject.checkState':checkState
                    }
                }).success(function (data) {
                    handler(data)
                })
            },

            delSubject:function (id,handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
                    params:{
                       'subject.id':id
                   }
                }).success(function (data) {
                    handler(data)
                })
            },
            saveSubject:function (params,handler) {
                var obj={};
                for(var key in params){
                    var val=params[key];
                    switch (key){
                        case"typeId":
                            obj['subject.subjectType.id']=val ;break;
                        case"levelId":
                            obj['subject.subjectLevel.id']=val ;break;
                        case"departmentId":
                            obj['subject.department.id']=val ;break;
                        case"topicId":
                            obj['subject.topic.id']=val ;break;
                        case"stem":
                            obj['subject.stem']=val ;break;
                        case"answer":
                            obj['subject.answer']=val ;break;
                        case"analysis":
                            obj['subject.analysis']=val ;break;
                        case"choiceContent":
                            obj['choiceContent']=val ;break;
                        case"choiceCorrect":
                            obj['choiceCorrect']=val ;break;
                    }
                }
                obj=$httpParamSerializer(obj)
                //对obj对象进行表单格式的序列化，默认为json，我们需要表单格式
                $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",
                 obj,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}
            ).success(function (data) {
                    handler(data)
                })
            }
        }
    }])
    .filter("selectTopics",function () {
        //根据方向选知识点 input遍历内容  id 方向的id
        return function (input,id) {
            if(input){
                var result=input.filter(function (item) {
                    return item.department.id==id;
                })
                return result
            }
            //将过滤后的结果返回
        }
})
    .directive("selectOption",function () {
        return{
            restrict:"A",
            link:function (scope,element) {
                element.on("change",function () {
                    var type=$(this).attr("type")
                    var val=$(this).val()
                    //设置值
                    if(type=="radio"){
                        //重置
                        scope.subject.choiceCorrect=[false,false,false,false]
                        for(var i=0;i<4;i++){
                            if(i==val){
                                scope.subject.choiceCorrect[i]=true
                            }
                        }
                    }else if(type=="checkbox"){
                        for(var i=0;i<4;i++){
                            if(i==val){
                                scope.subject.choiceCorrect[i]=true
                            }
                        }
                    }
                    scope.$digest();
                })
            }
        }
    })
   /* .directive("tdDrictive",function () {
        return{
            compile: function compile(tElement, tAttrs, transclude){
                    return{
                        //pre: function preLink(scope, iElement, iAttrs, controller){},
                        post:function postLink(scope, iElement, iAttrs, controller) {
                           // console.log(iElement)
                            iElement.find("tbody").on("click",function (event) {
                              //  console.log(event.target)
                                angular.element(event.target)
                                    .addClass("active3")
                                    .siblings()
                                    .removeClass("active3")
                            })
                        }
            }
        }
    }
}) */

