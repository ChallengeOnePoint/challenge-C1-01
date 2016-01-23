app.factory( 'TopbarService', function( $http, AppModel ) {

    return {

        import: function() {
            $http.post( '/api/import' ).then( function( resp ) {
                AppModel.adresses = resp.data.adresses
            }, function( err ) {
                console.log( err );
            } );
        }

    };

} );
