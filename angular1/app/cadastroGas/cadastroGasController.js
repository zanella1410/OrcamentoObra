(function () {
    angular.module('consumoApp').controller('CadastroGasCtrl', [
        //'$scope',
        '$http',
        '$location',
        'msgs',
        'tabs',
        // 'consts',
        CadastroGasController
    ])


    function CadastroGasController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/cadastroGases'

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 8}&limit=8`).then(function (response) {
                vm.cadastroGas = {}
                vm.cadastroGases = response.data
               
                $http.get(`${url}/count`).then(function (response) {
                    vm.pages = Math.ceil(response.data.value / 8)
                    tabs.show(vm, { tabList: true, tabCreate: true })
                }) 

            })

        }

        vm.create = function () {
            $http.post(url, vm.cadastroGas).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function (resp) {
                msgs.addError(resp.data.errors)
            })
        }


        vm.showTabUpdate = function (cadastroGas) {
            vm.cadastroGas = cadastroGas
            //initCreditsAndDebts()
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function (cadastroGas) {
            vm.cadastroGas = cadastroGas
            // initCreditsAndDebts()
            tabs.show(vm, { tabDelete: true })
        }


        vm.update = function () {
            const updateUrl = `${url}/${vm.cadastroGas._id}`
            $http.put(updateUrl, vm.cadastroGas).then(function (response) {
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
            const deleteUrl = `${url}/${vm.cadastroGas._id}`
            $http.delete(deleteUrl, vm.cadastroGas).then(function (response) {
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

