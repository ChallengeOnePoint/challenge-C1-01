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
                var adresses = JSON.parse( jsonString ),
                    adress = adresses[ 0 ].number + ' ' + adresses[ 0 ].street + ' ' + adresses[ 0 ].city;

                geocoder.geocode( adress ).then( function( res ) {
                    adresses[ 0 ].loc = {
                        type: "Point",
                        coordinates: [
                            res[ 0 ].latitude,
                            res[ 0 ].longitude
                        ]
                    };
                    console.log( adresses[ 0 ] );
                    Adress.create( adresses[ 0 ] );
                } ).catch( function( err ) {
                    console.log( err );
                } );
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
