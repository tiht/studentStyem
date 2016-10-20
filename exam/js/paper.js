/*
* 试卷模块
* */
angular.module("app.paper",["ng","app.subject"])
    //查询控制器
    .controller("paperListController",["$scope",'saveSubjectSevice',function ($scope,saveSubjectSevice) {
        saveSubjectSevice.getAllExamPapers(function (data) {
            $scope.AllExamPapers=data
        })
    }])
    //添加控制器
    .controller("paperAddController",["$scope","commonService","$routeParams","savePaper","saveSubjectSevice","$location",function ($scope,commonService,$routeParams,savePaper,saveSubjectSevice,$location) {
            commonService.getAllDepartmentes(function (data) {
                //将所有的方向绑定到dps中
                $scope.dps=data;
            })
        var subjectId=$routeParams.id
        if(subjectId!=0){
                savePaper.addSubjectId(subjectId)
                savePaper.addSubject(angular.copy($routeParams))
            }
        //双向绑定模板
        $scope.pmodel=savePaper.model;
        $scope.submitSubject = function(){
            console.log($scope.pmodel)
            saveSubjectSevice.saveSubjectId($scope.pmodel,function (data) {
                 alert(data)
                savePaper.model={
                    departmentId:1,  //方向
                        title:"",   //试卷标题
                        desc:"",// 试卷描述
                        at:0,   //答题时键
                        total:0, //总分
                        scores:[], //每个题的分值
                        subjectIds:[] , //每个题目的id
                        subjects:[]   //每个题目
                }
                $location.path("/PaperAdd/id/0/type/0/stem/0/level/0 /topic/0/depart/0");
           })
         }

    }])
    //试卷删除控制器
    .controller("paperDelController",["$scope",function ($scope) {

    }])
    .factory("savePaper",function ( $http) {
        return{
            model:{
                departmentId:1,  //方向
                title:"",   //试卷标题
                desc:"",// 试卷描述
                at:0,   //答题时键
                total:0, //总分
                scores:[], //每个题的分值
                subjectIds:[] , //每个题目的id
                subjects:[]   //每个题目
            },
            addSubjectId:function (id) {
                this.model.subjectIds.push(id);
            },
            addSubject:function (subject) {
                this.model.subjects.push(subject);
            }
        }
    })
    .factory("saveSubjectSevice",function ($httpParamSerializer,$http) {
        return{
            saveSubjectId:function (pramas,handler) {
                var obj={}
                for(var key in pramas){
                    var val=pramas[key]
                    switch (key){
                        case "departmentId":
                            obj['paper.department.id']=val;break;
                        case "title":
                            obj['paper.title']=val;break;
                        case "desc":
                            obj['paper.description']=val;break;
                        case "total":
                            obj['paper.totalPoints']=val;break;
                        case "at":
                            obj['paper.answerQuestionTime']=val;break;
                        case "scores":
                            obj['scores']=val;break;
                        case "subjectIds":
                            obj['subjectIds']=val;break;
                    }
                }
                obj=$httpParamSerializer(obj)
                $http.post("http://172.16.0.5:7777/test/exam/manager/saveExamPaper.action",obj,
                    {
                        headers:{"Content-Type":"application/x-www-form-urlencoded"}
                    }).success(function (data) {
                    handler(data)
                })
            },
            getAllExamPapers:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllExamPapers.action").
                    success(function (data) {
                        console.log(data)
                        handler(data)
                })
            }
        }
    })