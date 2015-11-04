var API_KEY = 'ZJZ4R41VXOVHQNL6P';

$.ajax({type:"GET", dataType: "json", xhrFields: {
               withCredentials: true
          }, url: "http://developer.echonest.com/user/api_key.json"}).then(
              function(data){
                  API_KEY = data.api_key;
                });

(function($){
    $.ajaxSetup({traditional: true, cache: true});
    var templates = {};

    function normalize_args(args){
        var catalog = $('#catalog-select').val();
        var base = {api_key:API_KEY, format:'jsonp', bucket: ['terms', 'biographies']};
        if(catalog){
            base.bucket.push('id:'+catalog);
            base.limit = 'true';
        }
        return _.extend(base, args);
    }

    function artist_name_search(name){
        var args = normalize_args({name: name});
        $.get('http://developer.echonest.com/api/v4/artist/search', args, 
            function(arg){
                if(arg.response.artists.length < 1){
                    alert('No Artist Found with search "'+name+'"');
                    return;
                }
                var artist = arg.response.artists[0];
                artist_id_search(artist.id, artist.name, artist.terms);
            }, 'jsonp');
    }

    function artist_id_search(id, name, terms){
        var terms = _.map(terms, function(t){return t.name;});
        var args = normalize_args({results: 20, id: id});
        $.get('http://developer.echonest.com/api/v4/artist/similar', args, function(data){
            var result_count = $('.result').length+1;
            $('#results').width( result_count*282 + 200);
            $('#results').append(templates.result({artists:data.response.artists, name:name}));
            $('#results-wrapper').animate({scrollLeft: (result_count-1)*292}, 500);
            pairs = _.zip($('#results ul:last li').toArray(), data.response.artists)
            _.each(pairs, function(pair){
                $(pair[0]).data('result', pair[1]);
                var local_terms = _.map(pair[1].terms, function(t){
                    t = t.name
                    if(_.indexOf(terms, t) >= 0){
                        return '<span>'+t+'</span>'
                    }
                    return t
                });
                local_terms = local_terms.slice(0,30);
                $(pair[0]).data('similars', local_terms.join(', '));
            });
        }, 'jsonp');
    }

    $(window).load(function () {
        draw_en_logo('logo');
        $('script[type="underscore/template"]').each(function(){
            templates[$(this).attr("id")] = _.template($(this).text());
        });
        $('#search-form').on('submit', function(event){
            event.preventDefault();
            $('#results').empty();
            artist_name_search($('#search-field').val());
            return false;
        });
        $('#results').on('click', 'a.similar-artist', function(event){
            event.preventDefault();
            var $this = $(this);
            $this.parents('div:first').next().nextAll().remove();
            $this.parents('ul').find('li.selected').removeClass('selected');
            $this.parent().addClass('selected');
            var data = $this.parent().data('result');
            artist_id_search(data.id, data.name, data.terms)
            return false;
        });
        function bio_extract(bios){
            if(bios.length < 1){
                return {bio:'', bio_url:''};
            }
            var src_pref = ['wikipedia', 'aol', 'itunes', 'last.fm'];
            initial_order = _.map(bios, function(b){return b.site;});
            bios = _.sortBy(bios, function(a){
                var pref_loc = _.indexOf(src_pref, a.site);
                if(pref_loc < 0){
                    return 10 + _.indexOf(initial_order, a.site);
                }
                return pref_loc;
            });
            return {bio: bios[0].text.substring(0, 100),
                    bio_url: bios[0].url}
        }
        $('#results').on('hover', 'a.similar-artist', function(event){
            var p = $(this).parent(),
                bio = bio_extract(p.data('result').biographies),
                context = _.extend(bio, {similars:p.data('similars'),
                        name: p.data('result').name, parentname: p.parents('div:first').find('h1').text()});
            $('#artist-info-target').empty().append(templates.artistinfo(context));
        });
    });
})(jQuery);
