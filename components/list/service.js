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
