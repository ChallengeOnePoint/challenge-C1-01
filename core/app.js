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
