angular.module('orcamentoApp').config([
    '$stateProvider',
    '$urlRouterProvider',
    //'$httpProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html"
      }).state('orcamentoObra', {
        url: "/orcamentoObra?page",
        templateUrl: "orcamentoObra/tabs.html"
      })
  
      $urlRouterProvider.otherwise('/dashboard')
 
      }
    ])
  