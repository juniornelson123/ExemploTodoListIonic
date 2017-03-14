// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('scotch-todo', ['ionic','LocalStorageModule'])

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('scotch-todo');
  });

app.controller('main', function ($scope, $ionicModal, localStorageService) { 
  //store the entities name in a variable var taskData = 'task';
  var taskData = 'task'
  //initialize the tasks scope with empty array
  $scope.tasks = [];

  //initialize the task scope with empty object
  $scope.task = {};

  //configure the ionic modal before use
  $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.newTaskModal = modal;
  });


  $scope.doRefresh = function() {
    try {
      getTasksValues()
    }
    catch(err) {

    } 
    finally {
       $scope.$broadcast('scroll.refreshComplete');
    }
       // Stop the ion-refresher from spinning
  };

  var getTasksValues = function(){
   if (localStorageService.get(taskData)) {
        $scope.tasks = localStorageService.get(taskData);
    } else {
        $scope.tasks = [];
    }
  }


  $scope.openModal = function() {
    $scope.newTaskModal.show();
  };
  $scope.closeModal = function() {
    $scope.newTaskModal.hide();
  };

  $scope.getTasks = function () {
    if (localStorageService.get(taskData)) {
        $scope.tasks = localStorageService.get(taskData);
    } else {
        $scope.tasks = [];
    }
      
  }
  $scope.createTask = function () {
    $scope.tasks.push($scope.task);
    localStorageService.set(taskData, $scope.tasks);
    $scope.task = {};
    //close new task modal
    $scope.newTaskModal.hide();
      
  }
  $scope.removeTask = function (index) {
    $scope.tasks.splice(index, 1);
    localStorageService.set(taskData, $scope.tasks);
      //removes a task
      
  }
  $scope.completeTask = function (index) { 
 //updates a task as completed 
   if (index !== -1) {
    $scope.tasks[index].completed = true; 
   } 

    localStorageService.set(taskData, $scope.tasks); 
  }
})
