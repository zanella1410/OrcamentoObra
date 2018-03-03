(function () {
    angular.module('consumoApp').controller('LeituraGasCtrl', [
        //'$scope',
        '$http',
        '$location',
        'msgs',
        'tabs',
        // 'consts',
        LeituraGasController
    ])



    function LeituraGasController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/leituraGases'

        vm.refresh = function () {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 8}&limit=8`).then(function (response) {
                vm.leituraGas = {}
                vm.leituraGases = response.data
                

                $http.get(`${url}/count`).then(function (response) {
                    vm.pages = Math.ceil(response.data.value / 8)
                    tabs.show(vm, { tabList: true, tabCreate: true })
                })
            })

        }


        vm.create = function () {
            $http.post(url, vm.leituraGas).then(function (response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!!')
            }).catch(function (resp) {
                msgs.addError(resp.data.errors)
            })
        }


        vm.showTabUpdate = function (leituraGas) {
            vm.leituraGas = leituraGas
            //initCreditsAndDebts()
            tabs.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function (leituraGas) {
            vm.leituraGas = leituraGas
            // initCreditsAndDebts()
            tabs.show(vm, { tabDelete: true })
        }


        vm.update = function () {
            const updateUrl = `${url}/${vm.leituraGas._id}`
            $http.put(updateUrl, vm.leituraGas).then(function (response) {
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
            const deleteUrl = `${url}/${vm.leituraoGas._id}`
            $http.delete(deleteUrl, vm.leituraGas).then(function (response) {
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

