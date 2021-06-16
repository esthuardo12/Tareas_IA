// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
   	if (state=="SUCIO") return "LIMPIO";
   	else if (location=="A") return "DERECHA";
   	else if (location=="B") return "IZQUIERDA";
}

function test(states){
	var location = states[0];		
	var state = states[0] == "A" ? states[1] : states[2];

	if (contador >= 3){ // VALIDANDO EL ENCICLADO
		contador = 0;	// SE REINICIA EL CONTADOR DE ENCICLADO
		random = Math.round(Math.random());
		if (random == 1){
			state = "SUCIO";
			states[1] = state; // MOSTRARLO GRAFICAMENTE
			states[2] = state;
		}
	}

	var action_result = reflex_agent(location, state);
	//console.log("Location: " + location + " | A: " + states[1] + " | B: " + states[2] + " | Action: " + action_result + " | Contador: " + contador);
	document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | A: ").concat(states[1]).concat(" | B: ").concat(states[2]).concat(" | Action: ").concat(action_result);
	if (action_result == "LIMPIO"){
		contador = 0;	// SE REINICIA CONTADOR DE ENCICLADO
		if (location == "A") states[1] = "LIMPIO";
		else if (location == "B") states[2] = "LIMPIO";
	}
	else if (action_result == "DERECHA"){
		states[0] = "B";
		contador+=1; // AUMENTANDO CONTADOR DE ENCICLADO
	}
	else if (action_result == "IZQUIERDA"){
		states[0] = "A";
		contador+=1; // AUMENTANDO CONTADOR DE ENCICLADO
	}
	setTimeout(function(){ test(states); }, 1000);
}

var states = ["A","SUCIO","SUCIO"];
var contador = 0;
test(states);
