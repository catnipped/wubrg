let carddata = new Object();

function fetchCardData() {
	$.getJSON('assets/DOM.json', function(data){
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
			illustration = '<div class="illustration" style="background-image: url(' + card.imageName + '); background-size:cover; background-position: center;"></div>'
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
		} else if (card.loyalty != undefined) {
			stats = '<span class="stats">' + card.loyalty + '</span>';
		}
		let illus ='';
		if (card.artist != undefined) {
			illus = '<span class="illus">Illus. ' + card.artist + '</span>'
		}

    let text = '';
    if (card.text != undefined) {
      text = '<table class="text_wrapper"><td class="text"><span>' + card.text + '<br/>'+ flavor + '</span></td></table>'
    }else{
			text = '<table class="text_wrapper"><td class="text">' + flavor + '</td></table>'
		}

		let types = '';
		if (card.type != undefined) {
				types = '<span class="types">' + card.type +'</span>'
		}

		let name = '';
		if (card.name != undefined) {
				name = '<span class="name">' + card.name + cost +'</span>'
		}

		let color = 'Artifact';
		if (card.types == "Land") {
			color = card.types
			 if (card.colorIdentity.length == 1) {
						color = card.types + card.colorIdentity
			 }
		}
		if (card.colors != undefined) {
            if (card.colors.length > 1) {
								  color = 'Gold'
            } else {
								 color = card.colors
            }
		}
		let setsymbol = '<span class="set ' + card.rarity + '"> <i class="ss ss-pmtg1"></i></span>'

	let newHtml = ('<div class="card ' + color + '">'+ illustration + '<div class="frame">' + name + types + setsymbol + text + illus + stats + '</div></div>');
	$('#cards').append( newHtml );
    replaceInlineSymbol(/\{0}/g,'<img class="symbol" src="assets/symbols/0.svg"/>');
    replaceInlineSymbol(/\{1}/g,'<img class="symbol" src="assets/symbols/1.svg"/>');
	replaceInlineSymbol(/\{2}/g,'<img class="symbol" src="assets/symbols/2.svg"/>');
	replaceInlineSymbol(/\{3}/g,'<img class="symbol" src="assets/symbols/3.svg"/>');
	replaceInlineSymbol(/\{4}/g,'<img class="symbol" src="assets/symbols/4.svg"/>');
	replaceInlineSymbol(/\{5}/g,'<img class="symbol" src="assets/symbols/5.svg"/>');
	replaceInlineSymbol(/\{6}/g,'<img class="symbol" src="assets/symbols/6.svg"/>');
	replaceInlineSymbol(/\{7}/g,'<img class="symbol" src="assets/symbols/7.svg"/>');
	replaceInlineSymbol(/\{8}/g,'<img class="symbol" src="assets/symbols/8.svg"/>');
	replaceInlineSymbol(/\{9}/g,'<img class="symbol" src="assets/symbols/9.svg"/>');
	replaceInlineSymbol(/\{10}/g,'<img class="symbol" src="assets/symbols/10.svg"/>');
	replaceInlineSymbol(/\{11}/g,'<img class="symbol" src="assets/symbols/11.svg"/>');
	replaceInlineSymbol(/\{12}/g,'<img class="symbol" src="assets/symbols/12.svg"/>');
	replaceInlineSymbol(/\{13}/g,'<img class="symbol" src="assets/symbols/13.svg"/>');
	replaceInlineSymbol(/\{14}/g,'<img class="symbol" src="assets/symbols/14.svg"/>');
	replaceInlineSymbol(/\{15}/g,'<img class="symbol" src="assets/symbols/15.svg"/>');
	replaceInlineSymbol(/\{16}/g,'<img class="symbol" src="assets/symbols/16.svg"/>');
	replaceInlineSymbol(/\{17}/g,'<img class="symbol" src="assets/symbols/17.svg"/>');
	replaceInlineSymbol(/\{18}/g,'<img class="symbol" src="assets/symbols/18.svg"/>');
	replaceInlineSymbol(/\{19}/g,'<img class="symbol" src="assets/symbols/19.svg"/>');
	replaceInlineSymbol(/\{20}/g,'<img class="symbol" src="assets/symbols/20.svg"/>');

	replaceInlineSymbol(/\{X}/g,'<img class="symbol" src="assets/symbols/X.svg"/>');

	replaceInlineSymbol(/\{C}/g,'<img class="symbol" src="assets/symbols/C.svg"/>');

	replaceInlineSymbol(/\{S}/g,'<img class="symbol" src="assets/symbols/S.svg"/>');

	replaceInlineSymbol(/\{W}/g,'<img class="symbol" src="assets/symbols/W.svg"/>');
	replaceInlineSymbol(/\{U}/g,'<img class="symbol" src="assets/symbols/U.svg"/>');
	replaceInlineSymbol(/\{R}/g,'<img class="symbol" src="assets/symbols/R.svg"/>');
	replaceInlineSymbol(/\{B}/g,'<img class="symbol" src="assets/symbols/B.svg"/>');
	replaceInlineSymbol(/\{G}/g,'<img class="symbol" src="assets/symbols/G.svg"/>');

	replaceInlineSymbol(/\{WU}/g,'<img class="symbol" src="assets/symbols/WU.svg"/>');
	replaceInlineSymbol(/\{WB}/g,'<img class="symbol" src="assets/symbols/WB.svg"/>');
	replaceInlineSymbol(/\{UB}/g,'<img class="symbol" src="assets/symbols/UB.svg"/>');
	replaceInlineSymbol(/\{UR}/g,'<img class="symbol" src="assets/symbols/UR.svg"/>');
	replaceInlineSymbol(/\{BR}/g,'<img class="symbol" src="assets/symbols/BR.svg"/>');
	replaceInlineSymbol(/\{BG}/g,'<img class="symbol" src="assets/symbols/BG.svg"/>');
	replaceInlineSymbol(/\{RW}/g,'<img class="symbol" src="assets/symbols/RW.svg"/>');
	replaceInlineSymbol(/\{GW}/g,'<img class="symbol" src="assets/symbols/GW.svg"/>');
	replaceInlineSymbol(/\{GU}/g,'<img class="symbol" src="assets/symbols/GU.svg"/>');
	replaceInlineSymbol(/\{2W}/g,'<img class="symbol" src="assets/symbols/2W.svg"/>');
	replaceInlineSymbol(/\{2U}/g,'<img class="symbol" src="assets/symbols/2U.svg"/>');
	replaceInlineSymbol(/\{2B}/g,'<img class="symbol" src="assets/symbols/2B.svg"/>');
	replaceInlineSymbol(/\{2R}/g,'<img class="symbol" src="assets/symbols/2R.svg"/>');
	replaceInlineSymbol(/\{2G}/g,'<img class="symbol" src="assets/symbols/2G.svg"/>');
	replaceInlineSymbol(/\{WP}/g,'<img class="symbol" src="assets/symbols/WP.svg"/>');
	replaceInlineSymbol(/\{UP}/g,'<img class="symbol" src="assets/symbols/UP.svg"/>');
	replaceInlineSymbol(/\{BP}/g,'<img class="symbol" src="assets/symbols/BP.svg"/>');
	replaceInlineSymbol(/\{RP}/g,'<img class="symbol" src="assets/symbols/RP.svg"/>');
	replaceInlineSymbol(/\{GP}/g,'<img class="symbol" src="assets/symbols/GP.svg"/>');

	replaceInlineSymbol(/\{T}/g,'<img class="symbol" src="assets/symbols/T.svg"/>');
	replaceInlineSymbol(/\{Q}/g,'<img class="symbol" src="assets/symbols/Q.svg"/>');
	replaceInlineSymbol(/\{E}/g,'<img class="symbol" src="assets/symbols/E.svg"/>');
  replaceInlineSymbol(/\(/g,'<i>(');
  replaceInlineSymbol(/\)/g,')</i>');
  replaceInlineSymbol(/\undefined/g,'');
  replaceInlineSymbol(/\n/g,'<hr>');
}

function replaceInlineSymbol (symbol, symbol_img) {
    $('.card:last-of-type span').html(function(i, text) {
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
		$('#cards').empty()
	for (let i = 0; i < (carddata.length) ; i++) {
			addCard(i);
			dynamicTextHeight(i);
	};
}

function dynamicTextHeight(id) {
    if ($('.card:last-of-type .text span:first-child').height() > 85) {
        let current_height = $('.card:last-of-type .text span:first-child').css('line-height');
        current_height = current_height[0]+current_height[1];
        current_height = parseInt(current_height);
        current_height = current_height - 1;
        console.log(current_height);
        $('.card:last-of-type .text span:first-child').css('line-height', current_height + 'px');
        $('.card:last-of-type .text span.flavor').css('line-height', (current_height-1) + 'px');

        $('.card:last-of-type .text span:first-child').css('font-size', '6pt');
        $('.card:last-of-type .text span:first-child.flavor').css('font-size', '5px');
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

function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      lines = e.target.result;
      var newArr = JSON.parse(lines);
			console.log(newArr)
			carddata = newArr.cards;
			showAllCards();
    }


  }
