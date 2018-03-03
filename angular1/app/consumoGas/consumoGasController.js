(function () {
    angular.module('consumoApp').controller('ConsumoGasCtrl', [
        //'$scope',
        '$http',
        //'$location',
        'msgs',
        'tabs',
        // 'consts',
        ConsumoGasController
    ])


    function ConsumoGasController($http, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/consumoGases'

        vm.refresh = function () {

            $http.get(url).then(function (response) {
                vm.consumoGas = {}
                vm.consumoGases = response.data
                tabs.show(vm, { tabList: true, tabCreate: true })

                /*
             $http.get(url).then(function(response) {
              vm.consumoGas = {}
              vm.consumoGases = response.data
               */

            })

        }

        vm.create = function () {
            $http.post(url, vm.consumoGas).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function (resp) {
                msgs.addError(resp.data.errors)
            })
        }


        vm.showTabUpdate = function (consumoGas) {
            vm.consumoGas = consumoGas
            //initCreditsAndDebts()
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function (consumoGas) {
            vm.consumoGas = consumoGas
            // initCreditsAndDebts()
            tabs.show(vm, { tabDelete: true })
        }


        vm.update = function() {
            const updateUrl = `${url}/${vm.consumoGas._id}`
            $http.put(updateUrl, vm.consumoGas).then(function(response) {
              vm.refresh()
              //initCreditsAndDebts()
              //$scope.getBillingCycles()
              //tabs.show($scope, {tabList: true, tabCreate: true})
              msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(resp) {
              msgs.addError(resp.data.errors)
            })
          }


        vm.delete = function () {
            const deleteUrl = `${url}/${vm.consumoGas._id}`
            $http.delete(deleteUrl, vm.consumoGas).then(function (response) {
                vm.refresh()
                //initCreditsAndDebts()
               // $scope.getBillingCycles()
                //tabs.show($scope, { tabList: true, tabCreate: true })
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (resp) {
                msgs.addError(resp.data.errors)
            })

        }



        vm.refresh()
    }

})()

