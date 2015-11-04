var express = require('express');
var router = express.Router();
var request = require('request');

var apiKey = 'ZJZ4R41VXOVHQNL6P';

// create a function to fetch the images
function fetchImages(artist) {
    var url = 'http://developer.echonest.com/api/v4/artist/images';

    var args = { 
            format:'json', 
            api_key: apiKey,
            name: artist,
            results: 100, 
    }; 

    info("Fetching images for " + artist);
// There is a built-in function in jQuery named getJSON. Here we are using it to get the JSON based on the variables above, url and args
    $.getJSON(url, args,
            function(data) {
                $("#results").empty();
                if (! ('images' in data.response)) {
                    error("Can't find any images for " + artist);
                } else {
                    // if there are results, show them in the element with the id="results"
                    $("#results").show();
                    $.each(data.response.images, function(index, item) {
                        var div = formatItem(index, item);
                        $("#results").append(div);
                    });
                    info("Showing " + data.response.images.length + " of " + data.response.total + " images for " + artist);
                }
            },
            function() {
                error("Trouble getting images for " + artist);
            }
        );
}

function formatItem(which, item) {
    // for each image wrap it in a div and give it class="image-container span3" 
    var img = $("<div>");
    img.addClass("image-container span3");
    // make the background image of the image div the image by its URL
    img.css("background-image", "url(" +item.url + ")");

    // add the header attribution label when the image is hovered
    var attribution = $("<span class='label'>")
        .text(item.license.attribution)
        .hide();

    img.append(attribution);
    img.hover( 
        function(evt) {
            img.find('.label').show();
        },
        function(evt) {
            img.find('.label').hide();
        }
    );
    return img;
}

function go() {
    var artist = $.trim($("#artist").val());
    if (artist.length  > 0) {
        fetchImages(artist);
    } else {
        info("Type an artist name first");
    }
}

function info(s) {
    $("#info").removeClass();
    if (s.length > 0) {
        $("#info").addClass("alert alert-info");
    }
    $("#info").text(s);
}

function error(s) {
    $("#info").removeClass();
    if (s.length > 0) {
        $("#info").addClass("alert alert-error");
    }
    $("#info").text(s);
}

// after the webpage has loaded then run fetchApiKey from the linked javascript
$(document).ready(function() {
    // fetchApiKey will fetch the Echo Nest demo key for demos
    // hosted on The Echo Nest, otherwise it fetch an empty key
    fetchApiKey( function(api_key, isLoggedIn) {
        if (!api_key) {
            api_key = 'var apiKey = 'ZJZ4R41VXOVHQNL6P';

// create a function to fetch the images
function fetchImages(artist) {
    var url = 'http://developer.echonest.com/api/v4/artist/images';

    var args = { 
            format:'json', 
            api_key: apiKey,
            name: artist,
            results: 100, 
    }; 

    info("Fetching images for " + artist);
// There is a built-in function in jQuery named getJSON. Here we are using it to get the JSON based on the variables above, url and args
    $.getJSON(url, args,
            function(data) {
                $("#results").empty();
                if (! ('images' in data.response)) {
                    error("Can't find any images for " + artist);
                } else {
                    // if there are results, show them in the element with the id="results"
                    $("#results").show();
                    $.each(data.response.images, function(index, item) {
                        var div = formatItem(index, item);
                        $("#results").append(div);
                    });
                    info("Showing " + data.response.images.length + " of " + data.response.total + " images for " + artist);
                }
            },
            function() {
                error("Trouble getting images for " + artist);
            }
        );
}

function formatItem(which, item) {
    // for each image wrap it in a div and give it class="image-container span3" 
    var img = $("<div>");
    img.addClass("image-container span3");
    // make the background image of the image div the image by its URL
    img.css("background-image", "url(" +item.url + ")");

    // add the header attribution label when the image is hovered
    var attribution = $("<span class='label'>")
        .text(item.license.attribution)
        .hide();

    img.append(attribution);
    img.hover( 
        function(evt) {
            img.find('.label').show();
        },
        function(evt) {
            img.find('.label').hide();
        }
    );
    return img;
}

function go() {
    var artist = $.trim($("#artist").val());
    if (artist.length  > 0) {
        fetchImages(artist);
    } else {
        info("Type an artist name first");
    }
}

function info(s) {
    $("#info").removeClass();
    if (s.length > 0) {
        $("#info").addClass("alert alert-info");
    }
    $("#info").text(s);
}

function error(s) {
    $("#info").removeClass();
    if (s.length > 0) {
        $("#info").addClass("alert alert-error");
    }
    $("#info").text(s);
}

// after the webpage has loaded then run fetchApiKey from the linked javascript
$(document).ready(function() {
    // fetchApiKey will fetch the Echo Nest demo key for demos
    // hosted on The Echo Nest, otherwise it fetch an empty key
    fetchApiKey( function(api_key, isLoggedIn) {
        if (!api_key) {
            api_key = 'ZJZ4R41VXOVHQNL6P';
        }
        apiKey = api_key;
        $("#go").click(go);
        $("#artist").change(go);
    });
});
        }
        apiKey = api_key;
        $("#go").click(go);
        $("#artist").change(go);
);
});
