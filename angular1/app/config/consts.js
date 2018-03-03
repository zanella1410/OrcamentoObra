angular.module('consumoApp').constant('consts', {
  appName: 'Gas Sulmeta',
  version: '1.0',
  owner: 'Marcos-Sulmeta TI',
  year: '2018',
  site: 'http://sulmeta.com.br',
  apiUrl: 'http://localhost:3003/api',
  oapiUrl: 'http://localhost:3003/oapi',
  userKey: '_consumo_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
