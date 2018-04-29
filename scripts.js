let carddata = new Object();

function fetchCardData() {
	$.ajax({
	    url:'https://api.fiveringsdb.com/cards',
	    type:'GET',
	    async: true,
	    error: function() {
            console.log("error: can't fetch from fiveringsdb");
            carddata = "empty"
        },
	    success: function(data) {
            carddata = data;
            console.log(data);
	    }
	});
};


function getCard(id) {
    return carddata.records[id];
}

function addCard (id) {
    let cardnr = undefined;
    for (let i = 0; i < (carddata.size - 1) ; i++) {
        if (carddata.records[i].id == id || carddata.records[i].name == id || carddata.records[i].name_canonical == id) {
            cardnr = i;
            break;
        };
    };

    let card = getCard(cardnr);
    console.log(card);

    let uniqueness = '';
	if (card.unicity) {
		uniqueness = '❃ '
	};

    let clan_svg = '<img class="title_clan"  src="https://fiveringsdb.com/static/svg/clan/' + card.clan + '.svg" </>'

    let clan_textbox_svg = '<img class="text_clan"  src="https://fiveringsdb.com/static/svg/clan/' + card.clan + '.svg" </>'

    let set = card.pack_cards[0].pack.id[0];
    for (let i=0; i < card.pack_cards[0].pack.id.length ; i++) {
         if (card.pack_cards[0].pack.id[i] == '-') {
            set = set + card.pack_cards[0].pack.id[i+1];
         }
    };

    let flavor = '';
    if (card.pack_cards[0].flavor != undefined ) {
        flavor = '<span class="flavor">' + card.pack_cards[0].flavor + '</span>'
    };

    let cost = '';
    if (card.cost != undefined) {
        cost = '<div class="top_symbol">🌸</div><span class="cost">' + card.cost + '</span>'
    };

    let glory = '';
    if (card.glory != undefined) {
        glory = '<span class="glory">' + card.glory + '</span>'
    };

    let military = '';
    let political = '';

    if (card.type == 'character') {
        military = '<span class="military">-</span>'
         political = '<span class="political">-</span>'
    };

    if (card.military != undefined) {
        military = '<span class="military">' + card.military + '</span>'
    };

    if (card.political != undefined) {
        political = '<span class="political">' + card.political + '</span>'
    };



    let military_bonus = '';
    if (card.military_bonus != undefined) {
        military_bonus = '<span class="military_bonus">' + card.military_bonus + '</span>'
    };

    let political_bonus = '';
    if (card.political_bonus != undefined) {
        political_bonus = '<span class="political_bonus">' + card.political_bonus + '</span>'
    };


    let element = '';
    if (card.element == 'fire') {
        element = '<img class="element" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/3/30/Fire.png">'
    };
    if (card.element == 'air') {
        element = '<img class="element" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/5/5f/Air.png">'
    };

     if (card.element == 'water') {
        element = '<img class="element" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/9/9d/Water.png">'
    };

     if (card.element == 'earth') {
        element = '<img class="element" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/1/1e/Earth.png">'
    };

     if (card.element == 'void') {
        element = '<img class="element" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/4/46/Void.png">'
    };

    let strength = '';
    if (card.strength != undefined) {
        strength = '<div class="top_symbol">🏯</div><span class="strength">' + card.strength + '</span>'
    };

    let strength_bonus = '';
    if (card.strength_bonus != undefined) {
        strength_bonus = '<div class="top_symbol">🏯</div><span class="strength_bonus">' + card.strength_bonus + '</span>'
    };

    let influence = '';
    if (card.influence_cost != undefined) {
        for (let i=0; i < card.influence_cost ; i++) {
            influence = influence + '🎋';
        };
        influence = '<span class="influence">' + influence + ' </span>'
    }

    let influence_pool = '';
    if (card.influence_pool != undefined) {
        influence_pool = '<span class="influence_pool">🎋' + card.influence_pool + '</span>'
    }

    let fate = '';
    if (card.fate != undefined) {
        fate = '<div class="stronghold_symbol">🌸</div><span class="fate">+' + card.fate + '</span>'
    }

    let honor = '';
    if (card.honor != undefined) {
        honor = '<div class="stronghold_symbol"></div><span class="honor">💮' + card.honor + '</span>'
    }

    let traits = '';
    if (card.traits != undefined) {
        for (let i=0; i < card.traits.length ; i++) {
            traits = traits + card.traits[i] + '. ';
        }
        traits = '<span class="traits">' + traits + '</span>'
    };
    let text = ''
    if (card.text != undefined) {
        text = '<span class="text">' + card.text + '<br/>'+ flavor + '</span>'
    }


	let newHtml = ('<div class="card ' + card.type + '"><div class="illustration" style="background-image: url( ' + card.pack_cards[0].image_url + ');"></div><div class="clan_top ' + card.clan + '"></div><div class="clan_bottom ' + card.clan + '"></div><img class="template" src="'+ card.type + '.svg"><span class="title">' + uniqueness + card.name  + '</span>' + clan_svg + cost + strength + strength_bonus + '<span class="type">' + card.type + '</span>' + military + military_bonus + political + political_bonus + clan_textbox_svg + glory + traits + text + '<span class="artist">illus. ' + card.pack_cards[0].illustrator + '</span>' + fate + honor + influence_pool + element  +'<span class="setid">' + influence + set + ':' + card.pack_cards[0].position + '</span>');
	$('#cards').append( newHtml );
    replaceInlineSymbol(/\[conflict-military]/g,'<img class="inline-symbol" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/8/86/Military.png" />');
    replaceInlineSymbol(/\[conflict-political]/g,'<img class="inline-symbol" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/e/e3/Political.png" />');
    replaceInlineSymbol(/\[element-air]/g,'<img class="inline-symbol" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/5/5f/Air.png" />');
    replaceInlineSymbol(/\[element-water]/g,'<img class="inline-symbol" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/9/9d/Water.png" />');
    replaceInlineSymbol(/\[element-void]/g,'<img class="inline-symbol" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/4/46/Void.png" />');
    replaceInlineSymbol(/\[element-earth]/g,'<img class="inline-symbol" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/1/1e/Earth.png" />');
    replaceInlineSymbol(/\[element-fire]/g,'<img class="inline-symbol" src="https://d1u5p3l4wpay3k.cloudfront.net/l5r_gamepedia_en/3/30/Fire.png" />');
    replaceInlineSymbol(/\[clan-lion]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/lion.svg" />');
    replaceInlineSymbol(/\[clan-unicorn]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/unicorn.svg" />');
    replaceInlineSymbol(/\[clan-crab]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/crab.svg" />');
    replaceInlineSymbol(/\[clan-crane]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/crane.svg" />');
    replaceInlineSymbol(/\[clan-phoenix]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/phoenix.svg" />');
    replaceInlineSymbol(/\[clan-dragon]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/dragon.svg" />');
    replaceInlineSymbol(/\[clan-scorpion]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/scorpion.svg" />');
    replaceInlineSymbol(/\[clan-neutral]/g,'<img class="inline-symbol" src="https://fiveringsdb.com/static/svg/clan/neutral.svg" />');
    replaceInlineSymbol(/\undefined/g,'');
    replaceInlineSymbol(/\n/g,'<hr>');
}

function replaceInlineSymbol (symbol, symbol_img) {
    $('span').html(function(i, text) {
    return text.replace(symbol, symbol_img);
    });
}

function submitCards() {
    let cards = $('[name=cards]').val();
    console.log(cards);
    let listOfCards = JSON.parse("[" + cards + "]");
    console.log(listOfCards);
    console.log (listOfCards.length);
    for (let i = 0; i < (listOfCards.length) ; i++) {
        let id = '' + listOfCards[i] + '';
        console.log(id);
        addCard(id);
        dynamicTextHeight(i);
    };
};

function dynamicTextHeight(id) {
    if ($('#cards div:nth-child('+id+') span.text').height() > 85) {
        let current_height = $('#cards div:nth-child('+id+') span.text').css('line-height');
        current_height = current_height[0]+current_height[1];
        current_height = parseInt(current_height);
        current_height = current_height - 1;
        console.log(current_height);
        $('#cards div:nth-child('+id+') span.text').css('line-height', current_height + 'px');
        $('#cards div:nth-child('+id+') span.text.flavor').css('line-height', (current_height-1) + 'px');
        dynamicTextHeight(id);
    }
};

function toggleLowInk() {
    $("[name=lowInk]").change(function(){
        if ( this.checked ){
            $(".card").addClass('low-ink');
        } else {
            $('.low-ink').removeClass('low-ink');
        };
    })
};
