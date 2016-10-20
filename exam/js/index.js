/*
* 首页核心js文件
* */
//jQuery事件
$(function () {
    //左侧导航的动画效果
    $(".baseUI>li>a").off("click")
    $(".baseUI>li>a").on("click",function () {
        $(".baseUI>li>ul").slideUp();
        $(this).next().slideDown(300);
    });
    //模拟点击第一个标签
    //默认收起全部，展示第一个
    $(".baseUI>li>ul").slideUp();
    $(".baseUI>li>a").eq(0).trigger("click");
    $(".baseUI>li>ul>li").off("click")
    $(".baseUI>li>ul>li").on("click",function () {
        $(this).siblings().removeClass("current")
        $(this).addClass("current")
    });
    $(".baseUI>li>ul>li>a").eq(0).trigger("click")
});

//核心模块
angular.module("app",["ng","ngRoute","app.subject","app.paper"])
    .controller("mainCtrl",["$scope",function ($scope) {

    }])
    .config(["$routeProvider",function ($routeProvider) {
        $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/subject/subjectList.html",
            controller:"subjectController"
        }).when("/addSubject",{
            templateUrl:"tpl/subject/addSubject.html",
            controller:"subjectController"
        }).when("/subjectDel/id/:id",{
            templateUrl:"tpl/subject/SubjectList.html",
            controller:"subjectDelController"
        }).when("/checkSubject/id/:id/checkState/:checkState", {
            templateUrl: "tpl/subject/SubjectList.html",
            controller: "checkSubjectController"
        }).when("/PaperList", {
            templateUrl: "tpl/paper/paperManager.html",
            controller: "paperListController"
        }).when("/PaperAdd/id/:id/type/:type/stem/:stem/level/:level/topic/:topic/depart/:depart", {
            templateUrl: "tpl/paper/paperAdd.html",
            controller: "paperAddController"
        }).when("/PaperSubjectList",{
            templateUrl:"tpl/paper/subjectList.html",
            controller:"subjectController"
        })
    }])
