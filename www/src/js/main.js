"use strict";

var appFramework 		= 	null;
var best_developer 		=	'Lenus Media';


alert('Sono nel file main.js');
alert($().jquery);




document.addEventListener("deviceready", function () {
	alert('Il device è pronto all\'azione.... device ready.');
	appFramework = AppFramework.init();
}, false);

