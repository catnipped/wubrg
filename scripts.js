let carddata = new Object();
let local = false;
let page = 1;
let hasmore = false;

function toggleLocal() {
	$("[name=local]").change(function () {
		if (this.checked) {
			$("[name=path]").val("file.json");
			local = true;
		} else {
			$("[name=path]").val("t:shapeshifter+s:mh1");
			local = false;
		};
	})
}
var urlHash = getUrlHash();
function setUpPath() {
	if (local) {
		$("[name=local]").prop("checked", true);
	}
	if (urlHash != null) {
		$("[name=path]").val(urlHash);
	}
}

function generateUrl() {
	var path = $('[name = path]').val()
	var link = ""
	if (!local) {
		link = ('?' + path)
	} else {
		link = ('?l=' + path)
	}
	let domain = window.location.href;
	if (domain.includes('?')) domain = window.location.href.slice(0, window.location.href.indexOf('?'));
	window.location.href = domain + link;
}

function changePage(set, changeInt) {
	page += changeInt;
	if (page == 0) {
		page = 1
	}
	renderCards(set)
	if (page == 1) {
		$("#previousPage").addClass('.hide');
	} else {
		$("#previousPage").removeClass('.hide');
	}
	if (!hasmore) {
		$("#nextPage").addClass('.hide');
	} else {
		$("#nextPage").removeClass('.hide');
	}
}

function renderCards() {
	if (local) {
		$.getJSON(urlHash, function (json) {
			carddata = json.cards;
			showAllCards();
		});
	} else {
		let url = 'https://api.scryfall.com/cards/search?q=' + urlHash;
		fetchCardData(url)
	}
}

function fetchCardData(url) {
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest()

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', url, true)

	request.onload = function () {
		cards = JSON.parse(this.response);
		console.log(cards)
		hasmore = cards.hasmore;
		carddata = cards.data
		showAllCards();
	}

	// Send request
	request.send()
};

function addCard(id) {
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
	if (card.image_uris != undefined) {
		illustration = '<div class="illustration" style="background-image: url(' + card.image_uris.art_crop + '); background-size:cover; background-position: top;"></div>'
	} else if (card.imageName != undefined) {
		illustration = '<div class="illustration" style="background-image: url(' + card.imageName + '); background-size:cover; background-position: top;"></div>'
	};

	let flavor = '';
	if (card.flavor_text != undefined) {
		flavor = '<span class="flavor">' + card.flavor_text + '</span>'
	};

	let cost = '';
	if (card.mana_cost != undefined) {
		cost = '<span class="cost">' + card.mana_cost + '</span>'
	};

	let stats = '';
	if (card.power != undefined && card.toughness != undefined) {
		stats = '<span class="stats">' + card.power + '/' + card.toughness + '</span>';
	} else if (card.loyalty != undefined) {
		stats = '<span class="stats">' + card.loyalty + '</span>';
	}
	let illus = '';
	if (card.artist != undefined) {
		illus = '<span class="illus">Illus. ' + card.artist + '</span>'
	}

	let text = '';
	if (card.oracle_text != undefined) {
		text = '<table class="text_wrapper"><td class="text"><span>' + card.oracle_text + '<br/>' + flavor + '</span></td></table>'
	} else {
		text = '<table class="text_wrapper"><td class="text">' + flavor + '</td></table>'
	}

	let types = '';
	if (card.type_line != undefined) {
		types = '<span class="types">' + card.type_line + '</span>'
	}

	let name = '';
	if (card.name != undefined) {
		name = '<span class="name">' + card.name + cost + '</span>'
	}

	let color = "Artifact";
	if (card.colors != undefined) {
		if (card.colors.length > 1) {
			color = 'Gold'
		} else if (card.type_line.includes("Artifact")) {
			color = "Artifact";
		} else if (card.type_line.includes("Land")) {
			color = "Land"
			if (card.color_identity.length == 1) {
				color = "Land" + card.color_identity[0]
			}
		} else if (card.colors.length > 0) {
			color = card.colors[0]
		}
	}
	let setsymbol = '<span class="set ' + card.rarity + '"> <i class="ss ss-pmtg1"></i></span>'

	let newHtml = ('<div class="card ' + color + '">' + illustration + '<div class="frame">' + name + types + setsymbol + text + illus + stats + '</div></div>');
	$('#cards').append(newHtml);
	replaceInlineSymbol(/\{0}/g, '<img class="symbol" src="assets/symbols/0.svg"/>');
	replaceInlineSymbol(/\{1}/g, '<img class="symbol" src="assets/symbols/1.svg"/>');
	replaceInlineSymbol(/\{2}/g, '<img class="symbol" src="assets/symbols/2.svg"/>');
	replaceInlineSymbol(/\{3}/g, '<img class="symbol" src="assets/symbols/3.svg"/>');
	replaceInlineSymbol(/\{4}/g, '<img class="symbol" src="assets/symbols/4.svg"/>');
	replaceInlineSymbol(/\{5}/g, '<img class="symbol" src="assets/symbols/5.svg"/>');
	replaceInlineSymbol(/\{6}/g, '<img class="symbol" src="assets/symbols/6.svg"/>');
	replaceInlineSymbol(/\{7}/g, '<img class="symbol" src="assets/symbols/7.svg"/>');
	replaceInlineSymbol(/\{8}/g, '<img class="symbol" src="assets/symbols/8.svg"/>');
	replaceInlineSymbol(/\{9}/g, '<img class="symbol" src="assets/symbols/9.svg"/>');
	replaceInlineSymbol(/\{10}/g, '<img class="symbol" src="assets/symbols/10.svg"/>');
	replaceInlineSymbol(/\{11}/g, '<img class="symbol" src="assets/symbols/11.svg"/>');
	replaceInlineSymbol(/\{12}/g, '<img class="symbol" src="assets/symbols/12.svg"/>');
	replaceInlineSymbol(/\{13}/g, '<img class="symbol" src="assets/symbols/13.svg"/>');
	replaceInlineSymbol(/\{14}/g, '<img class="symbol" src="assets/symbols/14.svg"/>');
	replaceInlineSymbol(/\{15}/g, '<img class="symbol" src="assets/symbols/15.svg"/>');
	replaceInlineSymbol(/\{16}/g, '<img class="symbol" src="assets/symbols/16.svg"/>');
	replaceInlineSymbol(/\{17}/g, '<img class="symbol" src="assets/symbols/17.svg"/>');
	replaceInlineSymbol(/\{18}/g, '<img class="symbol" src="assets/symbols/18.svg"/>');
	replaceInlineSymbol(/\{19}/g, '<img class="symbol" src="assets/symbols/19.svg"/>');
	replaceInlineSymbol(/\{20}/g, '<img class="symbol" src="assets/symbols/20.svg"/>');

	replaceInlineSymbol(/\{X}/g, '<img class="symbol" src="assets/symbols/X.svg"/>');

	replaceInlineSymbol(/\{C}/g, '<img class="symbol" src="assets/symbols/C.svg"/>');

	replaceInlineSymbol(/\{S}/g, '<img class="symbol" src="assets/symbols/S.svg"/>');

	replaceInlineSymbol(/\{W}/g, '<img class="symbol" src="assets/symbols/W.svg"/>');
	replaceInlineSymbol(/\{U}/g, '<img class="symbol" src="assets/symbols/U.svg"/>');
	replaceInlineSymbol(/\{R}/g, '<img class="symbol" src="assets/symbols/R.svg"/>');
	replaceInlineSymbol(/\{B}/g, '<img class="symbol" src="assets/symbols/B.svg"/>');
	replaceInlineSymbol(/\{G}/g, '<img class="symbol" src="assets/symbols/G.svg"/>');

	replaceInlineSymbol(/\{W\/U}/g, '<img class="symbol" src="assets/symbols/WU.svg"/>');
	replaceInlineSymbol(/\{W\/B}/g, '<img class="symbol" src="assets/symbols/WB.svg"/>');
	replaceInlineSymbol(/\{U\/B}/g, '<img class="symbol" src="assets/symbols/UB.svg"/>');
	replaceInlineSymbol(/\{U\/R}/g, '<img class="symbol" src="assets/symbols/UR.svg"/>');
	replaceInlineSymbol(/\{B\/R}/g, '<img class="symbol" src="assets/symbols/BR.svg"/>');
	replaceInlineSymbol(/\{B\/G}/g, '<img class="symbol" src="assets/symbols/BG.svg"/>');
	replaceInlineSymbol(/\{R\/W}/g, '<img class="symbol" src="assets/symbols/RW.svg"/>');
	replaceInlineSymbol(/\{G\/W}/g, '<img class="symbol" src="assets/symbols/GW.svg"/>');
	replaceInlineSymbol(/\{G\/U}/g, '<img class="symbol" src="assets/symbols/GU.svg"/>');
	replaceInlineSymbol(/\{2\/W}/g, '<img class="symbol" src="assets/symbols/2W.svg"/>');
	replaceInlineSymbol(/\{2\/U}/g, '<img class="symbol" src="assets/symbols/2U.svg"/>');
	replaceInlineSymbol(/\{2\/B}/g, '<img class="symbol" src="assets/symbols/2B.svg"/>');
	replaceInlineSymbol(/\{2\/R}/g, '<img class="symbol" src="assets/symbols/2R.svg"/>');
	replaceInlineSymbol(/\{2\/G}/g, '<img class="symbol" src="assets/symbols/2G.svg"/>');
	replaceInlineSymbol(/\{W\/P}/g, '<img class="symbol" src="assets/symbols/WP.svg"/>');
	replaceInlineSymbol(/\{U\/P}/g, '<img class="symbol" src="assets/symbols/UP.svg"/>');
	replaceInlineSymbol(/\{B\/P}/g, '<img class="symbol" src="assets/symbols/BP.svg"/>');
	replaceInlineSymbol(/\{R\/P}/g, '<img class="symbol" src="assets/symbols/RP.svg"/>');
	replaceInlineSymbol(/\{G\/P}/g, '<img class="symbol" src="assets/symbols/GP.svg"/>');

	replaceInlineSymbol(/\{T}/g, '<img class="symbol" src="assets/symbols/T.svg"/>');
	replaceInlineSymbol(/\{Q}/g, '<img class="symbol" src="assets/symbols/Q.svg"/>');
	replaceInlineSymbol(/\{E}/g, '<img class="symbol" src="assets/symbols/E.svg"/>');
	replaceInlineSymbol(/\(/g, '<i>(');
	replaceInlineSymbol(/\)/g, ')</i>');
	replaceInlineSymbol(/\undefined/g, '');
	replaceInlineSymbol(/\n/g, '<hr>');
}

function replaceInlineSymbol(symbol, symbol_img) {
	$('.card:last-of-type span').html(function (i, text) {
		return text.replace(symbol, symbol_img);
	});
}

function submitCards() {
	let cards = $('[name=cards]').val();
	console.log(cards);
	let listOfCards = JSON.parse("[" + cards + "]");
	console.log(listOfCards);
	console.log(listOfCards.length);
	for (let i = 0; i < (listOfCards.length); i++) {
		let id = '' + listOfCards[i] + '';
		console.log(id);
		addCard(id);
		dynamicTextHeight();
	};
};

function showAllCards() {
	$('#cards').empty()
	for (let i = 0; i < (carddata.length); i++) {
		addCard(i);
		dynamicTextHeight(i);
	};
}

function dynamicTextHeight() {
	if ($('.card:last-of-type .text span:first-child').height() > 85) {
		let current_size = $('.card:last-of-type .text span:first-child').css('font-size')
		let current_height = $('.card:last-of-type .text span:first-child').css('line-height')
		current_height = parseFloat(current_height);
		current_height = current_height - 0.5;
		// console.log(current_height);
		current_size = parseFloat(current_size);
		current_size = current_size - 0.5;
		current_size = Math.max(current_size, 4);
		// console.log(current_size);
		$('.card:last-of-type .text span:first-child').css('line-height', current_height + 'px');
		$('.card:last-of-type .text span:first-child').css('font-size', current_size + 'px');
		dynamicTextHeight();
	}
};

function toggleLowInk() {
	$("[name=lowInk]").change(function () {
		if (this.checked) {
			$(".card").addClass('low-ink');
		} else {
			$('.low-ink').removeClass('low-ink');
		};
	})
};

function toggleThermalPrint() {
	$("[name=thermalPrint]").change(function () {
		if (this.checked) {
			$("body").addClass('thermal-print');
		} else {
			$('body').removeClass('thermal-print');
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
		local = true;
	}

	function receivedText(e) {
		lines = e.target.result;
		var newArr = JSON.parse(lines);
		console.log(newArr)
		carddata = newArr.cards;
		showAllCards();
	}


}

function getUrlHash() {
	if (!window.location.href.includes('?')) return null;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);

	if (hashes.includes("l=")) {
		local = true
		console.log("slashing hash")
		hashes = hashes.slice(2)
	}
	console.log(hashes);
	return hashes;
}