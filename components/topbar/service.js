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
