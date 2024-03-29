var app = angular.module( 'Application', [ 'ngRoute' ] );

app.config( function( $routeProvider, $locationProvider ) {

    $routeProvider.when( '/', {
        templateUrl: 'templates/home.html'
    } ).otherwise( {
        redirectTo: '/'
    } );

    $locationProvider.html5Mode( {
        enabled: true,
        requireBase: false
    } );

} );

app.factory( 'AppModel', function() {

    return {

        adresses: [ {
            number: "1",
            street: "Rue Saint-Laurent",
            city: "Paris 10e Arrondissement",
            postcode: "75010",
            firstname: "Aaron",
            lastname: "Desamparo"
        }, {
            number: "123",
            street: "Rue Du Faubourg Saint-Martin",
            city: "Paris 10e Arrondissement",
            postcode: "75010",
            firstname: "Abbey",
            lastname: "Desan"
        } ],

        current: {
            number: "",
            street: "",
            city: "",
            postcode: "",
            firstname: "",
            lastname: ""
        }


    };

} );

app.controller( 'createEditCtrl', function( $scope, AppModel, CreateEditService ) {

    $scope.model = AppModel;

} );

app.directive( 'createEdit', function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/createAndEdit/template.html'
    };

} );

app.factory( 'CreateEditService', function( $http, AppModel ) {

    return {

        save: function( adress ) {
            $http.get( '/api/example' ).then( function( resp ) {
                AppModel.example = resp.data.example
            }, function( err ) {
                console.log( err );
            } );
        }

    };

} );

app.controller( 'exampleCtrl', function( $scope, AppModel, ExampleService ) {

    $scope.test = "Example component";

    $scope.model = AppModel;

    ExampleService.getExample();

} );

app.directive( 'example', function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/example/template.html'
    };

} );

app.factory( 'ExampleService', function( $http, AppModel ) {

    return {

        getExample: function() {
            $http.get( '/api/example' ).then( function( resp ) {
                AppModel.example = resp.data.example
            }, function( err ) {
                console.log( err );
            } );
        }

    };

} );

app.controller( 'listCtrl', function( $scope, AppModel, ListService ) {

    $scope.model = AppModel;

    //ListService.getAdresses();

} );

app.directive( 'list', function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/list/template.html'
    };

} );

app.factory( 'ListService', function( $http, AppModel ) {

    return {

        getAdresses: function() {
            $http.get( '/api/all' ).then( function( resp ) {
                AppModel.adresses = resp.data.adresses
            }, function( err ) {
                console.log( err );
            } );
        }

    };

} );

app.controller( 'topbarCtrl', function( $scope, AppModel, TopbarService ) {

} );

app.directive( 'topbar', function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/topbar/template.html'
    };

} );

app.factory( 'TopbarService', function( $http, AppModel ) {

    return {

        import: function( file ) {

            var reader = new FileReader();

            reader.onload = function( e ) {
                var data = e.target.result;

                $http.post( '/api/import', data ).then( function( resp ) {
                    console.log( resp );
                }, function( err ) {
                    console.log( err );
                } );

            }

            reader.readAsText( file );
        }

    };

} );

app.directive( 'uploader', function( TopbarService ) {
    return {
        restrict: 'A',
        link: function( scope, elements, iAttrs ) {

            var input = elements[ 0 ];

            input.addEventListener( 'change', function( e ) {
                TopbarService.import( e.currentTarget.files[ 0 ] );
            } );
        }
    };
} )
