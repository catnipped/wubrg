let carddata = new Object();

$(document).ready(function() {
	fetchCardData();
	showAllCards();
});

function fetchCardData() {
	$.getJSON('assets/USG.json', function(data){
		carddata = data.cards;
	});
};

function addCard (id) {
    let cardnr = undefined;
    // for (let i = 0; i < (carddata.size - 1) ; i++) {
    //     if (carddata.records[i].id == id || carddata.records[i].name == id || carddata.records[i].name_canonical == id) {
    //         cardnr = i;
    //         break;
    //     };
    // };

    let card = carddata[id];
    console.log(card);

		let illustration = '';
		if (card.imageName != undefined) {
			illustration = '<div class="illustration" style="background-image: url( ' + card.imageName + ');"></div>'
		};

    let flavor = '';
    if (card.flavor != undefined ) {
        flavor = '<span class="flavor">' + card.flavor + '</span>'
    };

    let cost = '';
    if (card.manaCost != undefined) {
        cost = '<span class="cost">' + card.manaCost + '</span>'
    };

		let stats = '';
		if (card.power != undefined && card.toughness != undefined) {
			stats = '<span class="stats">' + card.power + '/' + card.toughness + '</span>';
		}

    let text = '';
    if (card.text != undefined) {
        text = '<span class="text">' + card.text + '<br/>'+ flavor + '</span>'
    }

		let types = '';
		if (card.type != undefined) {
				types = '<span class="types">' + card.type +'</span>'
		}

		let name = '';
		if (card.name != undefined) {
				name = '<span class="name">' + card.name + cost +'</span>'
		}

		let color = '';
		if (card.colorIdentity != undefined) {
			color = card.colorIdentity
		}

	let newHtml = ('<div class="card ' + color + '">' + name + illustration + types + text + stats + ' </div>');
	$('#cards').append( newHtml );
  replaceInlineSymbol(/\{0}/g,'<span class="mana small s0 shadow"></span>');
  replaceInlineSymbol(/\{1}/g,'<span class="mana small s1 shadow"></span>');
	replaceInlineSymbol(/\{2}/g,'<span class="mana small s2 shadow"></span>');
	replaceInlineSymbol(/\{3}/g,'<span class="mana small s3 shadow"></span>');
	replaceInlineSymbol(/\{4}/g,'<span class="mana small s4 shadow"></span>');
	replaceInlineSymbol(/\{5}/g,'<span class="mana small s5 shadow"></span>');
	replaceInlineSymbol(/\{6}/g,'<span class="mana small s6 shadow"></span>');
	replaceInlineSymbol(/\{7}/g,'<span class="mana small s7 shadow"></span>');
	replaceInlineSymbol(/\{8}/g,'<span class="mana small s8 shadow"></span>');
	replaceInlineSymbol(/\{9}/g,'<span class="mana small s9 shadow"></span>');
	replaceInlineSymbol(/\{10}/g,'<span class="mana small s10 shadow"></span>');
	replaceInlineSymbol(/\{11}/g,'<span class="mana small s11 shadow"></span>');
	replaceInlineSymbol(/\{12}/g,'<span class="mana small s12 shadow"></span>');
	replaceInlineSymbol(/\{13}/g,'<span class="mana small s13 shadow"></span>');
	replaceInlineSymbol(/\{14}/g,'<span class="mana small s14 shadow"></span>');
	replaceInlineSymbol(/\{15}/g,'<span class="mana small s15 shadow"></span>');
	replaceInlineSymbol(/\{16}/g,'<span class="mana small s16 shadow"></span>');
	replaceInlineSymbol(/\{17}/g,'<span class="mana small s17 shadow"></span>');
	replaceInlineSymbol(/\{18}/g,'<span class="mana small s18 shadow"></span>');
	replaceInlineSymbol(/\{19}/g,'<span class="mana small s19 shadow"></span>');
	replaceInlineSymbol(/\{20}/g,'<span class="mana small s20 shadow"></span>');

	replaceInlineSymbol(/\{X}/g,'<span class="mana small sx shadow"></span>');
	replaceInlineSymbol(/\{Y}/g,'<span class="mana small sy shadow"></span>');
	replaceInlineSymbol(/\{Z}/g,'<span class="mana small sz shadow"></span>');

	replaceInlineSymbol(/\{C}/g,'<span class="mana small sc shadow"></span>');

	replaceInlineSymbol(/\{S}/g,'<span class="mana small ss shadow"></span>');

	replaceInlineSymbol(/\{W}/g,'<span class="mana small sw shadow"></span>');
	replaceInlineSymbol(/\{U}/g,'<span class="mana small su shadow"></span>');
	replaceInlineSymbol(/\{R}/g,'<span class="mana small sr shadow"></span>');
	replaceInlineSymbol(/\{B}/g,'<span class="mana small sb shadow"></span>');
	replaceInlineSymbol(/\{G}/g,'<span class="mana small sg shadow"></span>');

	replaceInlineSymbol(/\{WU}/g,'<span class="mana small swu shadow"></span>');
	replaceInlineSymbol(/\{WB}/g,'<span class="mana small swb shadow"></span>');
	replaceInlineSymbol(/\{UB}/g,'<span class="mana small sub shadow"></span>');
	replaceInlineSymbol(/\{UR}/g,'<span class="mana small sur shadow"></span>');
	replaceInlineSymbol(/\{BR}/g,'<span class="mana small sbr shadow"></span>');
	replaceInlineSymbol(/\{BG}/g,'<span class="mana small sbg shadow"></span>');
	replaceInlineSymbol(/\{RW}/g,'<span class="mana small srw shadow"></span>');
	replaceInlineSymbol(/\{GW}/g,'<span class="mana small sgw shadow"></span>');
	replaceInlineSymbol(/\{GU}/g,'<span class="mana small sgu shadow"></span>');
	replaceInlineSymbol(/\{2W}/g,'<span class="mana small s2w shadow"></span>');
	replaceInlineSymbol(/\{2U}/g,'<span class="mana small s2u shadow"></span>');
	replaceInlineSymbol(/\{2B}/g,'<span class="mana small s2b shadow"></span>');
	replaceInlineSymbol(/\{2R}/g,'<span class="mana small s2r shadow"></span>');
	replaceInlineSymbol(/\{2G}/g,'<span class="mana small s2g shadow"></span>');
	replaceInlineSymbol(/\{WP}/g,'<span class="mana small swp shadow"></span>');
	replaceInlineSymbol(/\{UP}/g,'<span class="mana small sup shadow"></span>');
	replaceInlineSymbol(/\{BP}/g,'<span class="mana small sbp shadow"></span>');
	replaceInlineSymbol(/\{RP}/g,'<span class="mana small srp shadow"></span>');
	replaceInlineSymbol(/\{GP}/g,'<span class="mana small sgp shadow"></span>');

	replaceInlineSymbol(/\{T}/g,'<span class="mana small st shadow"></span>');
	replaceInlineSymbol(/\{Q}/g,'<span class="mana small sq shadow"></span>');
	replaceInlineSymbol(/\{E}/g,'<span class="mana small se shadow"></span>');

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

function showAllCards() {
	for (let i = 10; i < (35) ; i++) {
			addCard(i);
			dynamicTextHeight(i);
	};
}

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
