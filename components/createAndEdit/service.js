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
