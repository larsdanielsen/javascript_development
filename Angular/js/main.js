$(document).ready(function () {
    HandleMobileMenu();
});

var app = angular.module('menuApp', []);

app.controller('MenuCtrl', function ($scope, $compile) {
//$sce.trustAsUrl('http://diabetesforeningen.local.pragmasoft.dk/diabetes-1.aspx?altTemplate=RunMacro&macroAlias=DiabetesLeftMenu2&Mode=branch')

    $scope.model = {
        hostname: 'http://diabetesforeningen.local.pragmasoft.dk',
        getMenuParams: {
            altTemplate: 'RunMacro',
            macroAlias: 'DiabetesLeftMenu2',
            Mode: 'branch'
        }
    };
  
    $scope.GetMenu = function (element, url) {
        $.ajax({
            url: $scope.model.hostname + url,
            data: $scope.model.getMenuParams,
            success: function (data) {
                element.append(data);
                element.find('a').each(function () {
                    var $this = $(this);
                    if ($this.attr('data-haschildren') == '1') {
                        $('<a href="#"/>')
                            .text('>')
                            .bind('click', function (e) {
                                e.preventDefault();                
                                var newMenu = angular.element($('<div class="submenu" submenu="' + $this.attr('data-href') + '"></div>'));
                                var el = $compile( newMenu )( $scope );
                                angular.element($('#MobileMenu')).append(newMenu);
                                $scope.insertHere = el;
                            })
                            .insertBefore($this);
                    }
                });
            }
        });
    };
  
});

app.directive('submenu', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.GetMenu(element, attrs.submenu);
        }
    }
});


function HandleMobileMenu() {
    $('#MobileMenuButton').click(function (e){
        e.preventDefault();
        $('#MenuPusher').toggleClass('open');
    });
}



