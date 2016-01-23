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
