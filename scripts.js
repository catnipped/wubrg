let carddata = new Array();

function renderCards() {
	carddata = []
	let input = $('[name = path]').val();
	let card_queries = input.split(';');
	for (const path of card_queries) {
		let url = 'https://api.scryfall.com/cards/named?fuzzy=' + path.replace(' ', '+')
		setTimeout(fetchCardData(url), 100)
	}
}

function fetchCardData(url) {
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest()

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', url, true)

	request.onload = function () {
		card = JSON.parse(this.response);
		console.log(card)
		carddata.push(card)
		showAllCards();
	}

	// Send request
	request.send()
};

function addCard(card_object, id) {
	var card_faces = []
	switch (card_object.layout) {
		case "flip":
		case "omen":
		case "adventure":
		case "split":
		case "modal_dfc":
		case "transform":
			card_faces.push(card_object.card_faces[0])
			card_faces.push(card_object.card_faces[1])
			break;
		default:
			card_faces.push(card_object)
			break;
	}
	if (card_object.layout == "split") {
		let left_card = card_faces[0]
		let right_card = card_faces[1]
		let illustration = '';
		if (card_object.image_uris != undefined) {
			illustration = '<div class="illustration" style="background-image: url(' + card_object.image_uris.art_crop + '); background-size:cover; background-position: center;"></div>'
		} else if (card_object.imageName != undefined) {
			illustration = '<div class="illustration" style="background-image: url(' + card_object.imageName + '); background-size:cover; background-position: center;"></div>'
		};
		let illus = '';
		if (card_object.artist != undefined) {
			illus = '<span class="illus">' + card_object.artist + '</span>'
		}

		let cost_left = '<span class="cost">' + left_card.mana_cost + '</span>'
		let cost_right = '<span class="cost">' + right_card.mana_cost + '</span>'

		let text_left = '<span class="text">' + left_card.oracle_text + '</span>'
		let text_right = '<span class="text">' + right_card.oracle_text + '</span>'

		let types_left = '<span class="types">' + left_card.type_line + '</span>'
		let types_right = '<span class="types">' + right_card.type_line + '</span>'

		let name_left = '<span class="name">' + left_card.name + '</span>'
		let name_right = '<span class="name">' + right_card.name + '</span>'

		let special_class= ''
			if (card_object.type_line.includes('Room')) {
				special_class= 'Room'
			}

		var newHtml = '<div class="card split '+special_class+'"><div class="split-row"><div class="name-cost-flex">' + name_left + cost_left + '</div><div class="name-cost-flex">' + name_right + cost_right + '</div></div><div class="art">' + illus + illustration + '</div><div class="split-row">' + types_left + types_right + '</div><div class="split-row">'+ text_left + text_right + '</div></div></div>';
		$('#cards').append(newHtml);
		replaceSymbols()
	} else if (card_object.layout == "flip") {
		let card = card_faces[0]
		console.log(card)
		let illustration = '';
		if (card_object.image_uris != undefined) {
			illustration = '<div class="illustration" style="background-image: url(' + card_object.image_uris.art_crop + '); background-size:cover; background-position: center;"></div>'
		} else if (card.imageName != undefined) {
			illustration = '<div class="illustration" style="background-image: url(' + card.imageName + '); background-size:cover; background-position: center;"></div>'
		};

		let cost = '';
		if (card.mana_cost != undefined) {
			cost = '<span class="cost">' + card.mana_cost + '</span>'
		};

		let stats = '';
		if (card.power != undefined && card.toughness != undefined) {
			stats = '<span class="stats">' + card.power + '/' + card.toughness + '</span>';
		}

		let illus = '';
		if (card.artist != undefined) {
			illus = '<span class="illus">' + card.artist + '</span>'
		}

		let text = '';
		if (card.oracle_text != undefined) {
			text = '<span class="text">' + card.oracle_text + '</span>'
		}

		let types = '';
		if (card.type_line != undefined) {
			types = '<span class="types">' + card.type_line + '</span>'
		}

		let name = '';
		if (card.name != undefined) {
			name = '<span class="name">' + card.name + '</span>'
		}
		flip = card_faces[1]
		let flip_name = '<span class="name">' + flip.name + '</span>'
		let flip_types = '<span class="types">' + flip.type_line + '</span>'
		let flip_stats = '<span class="stats">' + flip.power + '/' + flip.toughness + '</span>'
		let flip_text = '<span class="text">' + flip.oracle_text + '</span>'
		let flip_cost = '<span class="cost">' + flip.mana_cost + '</span>'

		var newHtml = '<div class="card"><div class="non-flipped"><div class="name-cost-flex">' + name + cost + '</div>' + text + stats + types + '</div><div class="art">' + illus + illustration + '</div><div class="flipped"><div class="name-cost-flex">' + flip_name + flip_cost + '</div>' + flip_text + flip_stats + flip_types + '</div></div>';
		$('#cards').append(newHtml);
		replaceSymbols()
	} else if (card_object.layout == "adventure") {
		let adventure_card = card_faces[0]
		console.log(card)
		let illustration = '';
		if (card_object.image_uris != undefined) {
			illustration = '<div class="illustration" style="background-image: url(' + card_object.image_uris.art_crop + '); background-size:cover; background-position: center;"></div>'
		} else if (adventure_card.imageName != undefined) {
			illustration = '<div class="illustration" style="background-image: url(' + adventure_card.imageName + '); background-size:cover; background-position: center;"></div>'
		};

		let cost = '';
		if (adventure_card.mana_cost != undefined) {
			cost = '<span class="cost">' + adventure_card.mana_cost + '</span>'
		};

		let stats = '';
		if (adventure_card.power != undefined && adventure_card.toughness != undefined) {
			stats = '<span class="stats">' + adventure_card.power + '/' + adventure_card.toughness + '</span>';
		}

		let illus = '';
		if (card.artist != undefined) {
			illus = '<span class="illus">' + adventure_card.artist + '</span>'
		}

		let text = '';
		if (adventure_card.oracle_text != undefined) {
			text = '<span class="text">' + adventure_card.oracle_text + '</span>'
		}

		let types = '';
		if (adventure_card.type_line != undefined) {
			types = '<span class="types">' + adventure_card.type_line + '</span>'
		}

		let name = '';
		if (adventure_card.name != undefined) {
			name = '<span class="name">' + adventure_card.name + '</span>'
		}
		adventure = card_faces[1]
		let adventure_name = '<span class="name">' + adventure.name + '</span>'
		let adventure_types = '<span class="types">' + adventure.type_line + '</span>'
		let adventure_text = '<span class="text">' + adventure.oracle_text + '</span>'
		let adventure_cost = '<span class="cost">' + adventure.mana_cost + '</span>'

		var newHtml = '<div class="card">' + '<div class="name-cost-flex">' + name + cost + '</div>' + '<div class="art">' + illus + illustration + '</div>' + types + '<div class="adventure-layout"><div class="adventure"><div class="name-cost-flex">'+ adventure_name + adventure_cost +'</div>'+adventure_types + adventure_text +'</div><div class="non-adventure">'+ text + stats + '</div></div></div>';
		$('#cards').append(newHtml);
		replaceSymbols()
	} else {
		for (let i = 0; i < (card_faces.length); i++) {
			let card = card_faces[i]
			console.log(card)
			let illustration = '';
			if (card.image_uris != undefined) {
				illustration = '<div class="illustration" style="background-image: url(' + card.image_uris.art_crop + '); background-size:cover; background-position: center;"></div>'
			} else if (card.imageName != undefined) {
				illustration = '<div class="illustration" style="background-image: url(' + card.imageName + '); background-size:cover; background-position: center;"></div>'
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
			} else if (card.defense != undefined) {
				stats = '<span class="stats">' + card.defense + '</span>';
			}
			let illus = '';
			if (card.artist != undefined) {
				illus = '<span class="illus">' + card.artist + '</span>'
			}
			let dfc_info =''
			if (i == 0 && card_faces.length == 2) {
				let dfc_mana_cost = ''
				if (card_faces[1].mana_cost != undefined) {
					dfc_mana_cost = card_faces[1].mana_cost
				}
				let dfc_stats = ''
				if (card_faces[1].power != undefined) {
					dfc_stats = ' ' + card_faces[1].power + '/' + card_faces[1].toughness
				}
				dfc_type_line = card_faces[1].type_line.split('—',1)
				let dfc_type = dfc_type_line[0]
				dfc_info = '<br><span class="dfc_info">'+ dfc_mana_cost + dfc_type_line + dfc_stats +'</span>'
			}
			let text = '';
			if (card.oracle_text != undefined) {
				text = '<span class="text">' + card.oracle_text + dfc_info + '</span>'
			}

			let types = '';
			if (card.type_line != undefined) {
				types = '<span class="types">' + card.type_line + '</span>'
			}

			let name = '';
			if (card.name != undefined) {
				name = '<span class="name">' + card.name + '</span>'
			}
			let special_class= ''
			if (card_object.type_line.includes('Battle')) {
				special_class= 'battle'
			}
			var newHtml = '<div class="card '+special_class+'">' + '<div class="name-cost-flex">' + name + cost + '</div>' + '<div class="art">' + illus + illustration + '</div>' + types + text + stats + '</div>';
			if ( card.type_line.includes('Saga') || card.type_line.includes('Class') || card.type_line.includes('Case') ) {
				newHtml = '<div class="card">' + '<div class="name-cost-flex">' + name + cost + '</div><div class="vertical-layout">' + text + '<div class="art">' + illus + illustration + '</div></div>' + types + '</div>';
			};
			$('#cards').append(newHtml);
			replaceSymbols()
		};
	}
}

function replaceSymbols() {
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
		replaceInlineSymbol(/\n/g, '<br>');
		replaceInlineSymbol('Legendary', 'Leg.');
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
		addCard(carddata[i], i);

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


function toggleHideArt() {
	$("[name=toggleArt]").change(function () {
		if (this.checked) {
			$(".art").addClass('hide');
		} else {
			$(".art").removeClass('hide');
		};
	})
};

function toggleDIYArt() {
	$("[name=toggleDIY]").change(function () {
		if (this.checked) {
			$(".art").addClass('diy');
		} else {
			$(".art").removeClass('diy');
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

	console.log(hashes);
	return hashes;
}

function savePng() {
	html2canvas(document.body).then(function(canvas) {
		document.body.appendChild(canvas);
	});
}