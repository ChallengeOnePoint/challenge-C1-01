'use strict';

var express = require( 'express' );
var mongoose = require( 'mongoose' );
var DbUrl = 'mongodb://localhost:27017/test';
var Adress = require( './app/models/adress' );

var geocoderProvider = 'google';
var httpAdapter = 'https';

var extra = {
    apiKey: 'AIzaSyAlvp2uz8PA8uE9yO2qX9ckKr51F46d9ec',
    formatter: null
};

var geocoder = require( 'node-geocoder' )( geocoderProvider, httpAdapter, extra );


module.exports = class Server {

    constructor( opt ) {
        this.setApp();
        this.setStaticFolder();
        this.setRoute();
        this.app.listen( opt.port );
        console.log( 'Server started on http://localhost:' + opt.port );
        this.setMongo();
    }

    setApp() {
        this.app = express();
    }

    setStaticFolder() {
        this.app.use( express.static( __dirname + '/www/' ) );
    }

    setRoute() {
        this.app.post( '/api/import', function( req, res ) {
            var jsonString = ''
            req.on( 'data', function( data ) {
                jsonString += data;
            } );
            req.on( 'end', function() {
                var adresses = JSON.parse( jsonString );

                function insert( adresses ) {
                    var adress = adresses.shift();
                    var search = adress.number + ' ' + adress.street + ' ' + adress.city;

                    geocoder.geocode( search ).then( function( res ) {
                        adress.loc = {
                            type: "Point",
                            coordinates: [
                                res[ 0 ].latitude,
                                res[ 0 ].longitude
                            ]
                        };
                        new Adress( adress ).save();
                        if ( adresses.length ) setTimeout( insert( adresses ), 1000 );
                    } ).catch( function( err ) {
                        console.log( err );
                    } );
                }

                insert( adresses );
            } );
        } ).get( '/*', function( req, res ) {
            res.sendFile( __dirname + '/www/index.html' );
        } );
    }

    setMongo() {
        mongoose.connect( DbUrl )
        console.log( "Connected correctly to MongoDb server." );
    }

};
