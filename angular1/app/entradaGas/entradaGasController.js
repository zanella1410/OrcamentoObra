(function () {
    angular.module('consumoApp').controller('EntradaGasCtrl', [
        //'$scope',
        '$http',
        '$location',
        'msgs',
        'tabs',
        // 'consts',
        EntradaGasController
    ])


    function EntradaGasController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/entradaGases'

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 8}&limit=8`).then(function (response) {
                vm.entradaGas = {}
                vm.entradaGases = response.data

                $http.get(`${url}/count`).then(function (response) {
                    vm.pages = Math.ceil(response.data.value / 8)
                    tabs.show(vm, { tabList: true, tabCreate: true })
                }) 
            })

        }

        vm.create = function () {
            $http.post(url, vm.entradaGas).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function (resp) {
                msgs.addError(resp.data.errors)
            })
        }


        vm.showTabUpdate = function (entradaGas) {
            vm.entradaGas = entradaGas
            //initCreditsAndDebts()
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function (entradaGas) {
            vm.entradaGas = entradaGas
            // initCreditsAndDebts()
            tabs.show(vm, { tabDelete: true })
        }


        vm.update = function () {
            const updateUrl = `${url}/${vm.entradaGas._id}`
            $http.put(updateUrl, vm.entradaGas).then(function (response) {
                vm.refresh()
                //initCreditsAndDebts()
                //$scope.getBillingCycles()
                //tabs.show($scope, {tabList: true, tabCreate: true})
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function (resp) {
                msgs.addError(resp.data.errors)
            })
        }


        vm.delete = function () {
            const deleteUrl = `${url}/${vm.entradaGas._id}`
            $http.delete(deleteUrl, vm.entradaGas).then(function (response) {
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

