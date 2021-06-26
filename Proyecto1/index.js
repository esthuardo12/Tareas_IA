
function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
     var sURLVariables = sPaginaURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
          return sParametro[1];
        }
      }
     return null;
}
var turno = obtenerValorParametro('turno');
var estado = obtenerValorParametro('estado');
body = document.body.innerText = turno;
console.log("Turno: " + turno);
console.log("Estado: " + estado);
//body=document.body.innerTex = " Estado" + estado;
//body = document.body.innerText = 35;
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var players=["NEGRAS","BLANCAS"];

var player;
var op;

var cadTablero=''

var board=[];

function ToArray(){
  board=[];
  for (var c of cadTablero) {
    board.push(c);    
  }
  console.log(cadTablero);
}

function printTablero(tablero){
  let cadTemp='';
  let indiceX=0;
  for (var i = 0; i <tablero.length; i++) {
    if (i%8==0 && i!=0) {
      console.log(indiceX,cadTemp+'|');
      cadTemp='';
      indiceX++;
    }
    cadTemp+='|'+tablero[i];      
  }
  console.log(indiceX,cadTemp);
}

function getop(player) {
  return player==1?1:0;
}

function getX(pos){return pos % 8;}
function getY(pos){return Math.floor(pos / 8);}


function logica(tablero,depth){
  if (depth >= max_depth || !isEmpty(tablero))
        return {
            score: (countPieces(tablero)[actual_color]),
            movement: undefined
        };
    let valid_moves = validadorMovimientos(tablero, actual_color);
    if (valid_moves == null || valid_moves.length == 0)
        return {
            score: (countPieces(tablero)[actual_color]),
            movement: undefined
        };
    let new_boards = [];
    for (let i = 0; i < valid_moves.length; i++) {
        let move = valid_moves[i];
        let next = newBoard(tablero, actual_color, move);
        new_boards.push({ next: next, movement: move });
    }
    let next_color = (actual_color == black) ? white : black;
    if (color == actual_color)
        return getMax(new_boards, color, next_color, depth, max, min);
    else
        return getMin(new_boards, color, next_color, depth, max, min);
}



function getmov(tablero,indice,pos){
  let new_color = (color == black) ? white : black;
    let dirs = {
        up: -1,
        up_right: board_size - 1,
        right: board_size,
        down_right: board_size + 1,
        down: 1,
        down_left: (-1) * board_size + 1,
        left: (-1) * board_size,
        up_left: (-1) * board_size - 1
    };
    let lefts = [dirs.left, dirs.down_left, dirs.up_left];
    let rights = [dirs.right, dirs.down_right, dirs.up_right];
    let marks = [];
    for (let dir in dirs) {
        let move = dirs[dir];
        let actual_pos = pos;
        let flip_positions = [];
        let found_flag = false;
        let change_flag = false;
        while (actual_pos >= 0 && actual_pos < (board_size * board_size)) {
            if (actual_pos !== pos) {
                if (tablero[actual_pos] == new_color) {
                    flip_positions.push(actual_pos);
                    change_flag = true;
                } else if (change_flag) {
                    found_flag = tablero[actual_pos] !== empty;
                    break;
                }
            }
            if ((actual_pos % board_size == 0 && lefts.indexOf(move) > -1) || ((actual_pos % board_size == board_size - 1) && rights.indexOf(move) > -1))
                break;
            actual_pos += move;
        }
        if (found_flag)
            for (let i = 0; i < flip_positions.length; i++)
                marks.push(flip_positions[i]);
    }
    return marks;
}



function start(tab){
  
  let val = logica(tab,0,true,0);
  let retornar=ObtenerValor1(val[1])+''+ObtenerValor2(val[1]);
  return retornar;
  
}


app.get('/', (req, res) => {
  valor1 = req.query.turno;
  valor2 = req.query.estado;
  console.log(valor1,valor2);
  player=turno;
  op=player==1?0:1;
  cadTablero=valor2;
  convertCadToArray();
  printTablero(board);
  let resultado =start(board);  
  //let s= allPosibleMovements(board,player);
  //let cad= getY(s[0][1])+''+getX(s[0][1]);
  //console.log("Final ",cad);
  console.log(player,"op: ",op);

  res.send(resultado)
})

app.listen(port, () => {
  console.log(` Running on port :${port}`)
});