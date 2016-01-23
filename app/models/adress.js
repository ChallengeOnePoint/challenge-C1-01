var mongoose = require( 'mongoose' );

var adressSchema = mongoose.Schema( {
    number: Number,
    street: String,
    city: String,
    postcode: Number,
    firstname: String,
    lastname: String
    loc: {
        type: {
            type: String
        },
        coordinates: []
    },
} );

adressSchema.index( {
    loc: '2dsphere'
} );

module.exports = mongoose.model( 'Adress', adressSchema );