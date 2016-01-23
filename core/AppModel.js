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
