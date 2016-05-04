"use strict";

var appFramework 		= 	null;
var best_developer 		=	'Lenus Media';


alert('Sono nel file main.js');
alert('Verifico JQuery');
alert('Quanti wrapper ci sono?' + $('#wrapper').length());



document.addEventListener("deviceready", function () {
	alert('Il device è pronto all\'azione.... device ready.');
}, false);

appFramework = AppFramework.init();