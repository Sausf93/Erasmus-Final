var mapOptions = {
	center: new google.maps.LatLng(40.774807, 55.795573),
	zoom: 3,
	mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("mapa"),
	mapOptions)
var arraycheck = new Array()
var arrayciudad = new Array()
var arrayCiclo = new Array()
var arrayTipo = new Array()
var arrayLatitud = new Array()
var arrayLongitud = new Array()
function comprueba() {

	var toggle = document.getElementById("toggle")
	var resu
	if (toggle.checked) {
		resu = 0
	} else
		resu = 1

	cargar(resu)
}

function cargar(resu) { //optimizar el for pa cuando busca por ciclos o por paises.
	var array = new Array()
	var cont = 0
	if (resu == 0) {
		//Filtrar el combobox por el primer select.
		var padreBoton = document.getElementById("enviar")
		padreBoton.innerHTML = " "
		var select = document.getElementById("select")
		var textoSelect = select.value
		var table = document.getElementById("check")
		table.innerHTML = " "
		var padrediv = document.getElementById("div")
		padrediv.innerHTML = " "
		if (textoSelect == "Todos") {
			for (var i in json) {
				cont = 0
				for (var g = 0; g <= array.length; g++) {
					if (array[g] == json[i].pais)
						cont++
				}
				if (cont == 0)
					array.push(json[i].pais.toString())
			}
			var select = generica("select", "select", padrediv)
			select.setAttribute("class", "form-control form-control-lg")
			for (var k = 0; k <= array.length - 1; k++) {
				var option = generica("option", "option", select)
				var texto = document.createTextNode(array[k])
				option.appendChild(texto)
				select.setAttribute("id", "select2")
			}
		} else {
			var introducir
			for (var i in json) {
				cont = 0
				introducir = false
				for (var g = 0; g <= array.length; g++) {
					if (array[g] == json[i].pais)
						cont++
					if (json[i].tipo == textoSelect)
						introducir = true
				}
				if ((cont == 0) && (introducir))
					array.push(json[i].pais.toString())
			}
			var select = generica("select", "select", padrediv)
			select.setAttribute("id", "select2")
			select.setAttribute("class", "form-control form-control-lg")
			for (var k = 0; k <= array.length - 1; k++) {
				var option = generica("option", "option", select)
				var texto = document.createTextNode(array[k])
				option.appendChild(texto)
				option.setAttribute("id", texto)
			}
		}

	} else {
		var padreBoton = document.getElementById("enviar")
		padreBoton.innerHTML = " "
		var div = document.getElementById("div")
		div.innerHTML = " "
		var check = document.getElementById("check")
		check.innerHTML = " "
		var marcarTodos = generica("button", "button", div)
		marcarTodos.setAttribute("class", "btn btn-primary")
		var text1 = document.createTextNode("Marcar todos")
		marcarTodos.appendChild(text1)
		marcarTodos.setAttribute("type", "button")
		marcarTodos.addEventListener("click", function () {
			marcar(true)
		}, false)
		var desmarcarTodos = generica("button", "button", div)
		desmarcarTodos.setAttribute("class", "btn btn-primary")
		var text2 = document.createTextNode("Desmarcar todos")
		desmarcarTodos.appendChild(text2)
		desmarcarTodos.setAttribute("type", "button")
		desmarcarTodos.addEventListener("click", function () {
			marcar(false)
		}, false)
		var padre = document.getElementById("check")
		for (var i in json) {
			cont = 0
			for (var g = 0; g <= array.length; g++) {
				if (array[g] == json[i].ciclo)
					cont++
			}
			if (cont == 0)
				array.push(json[i].ciclo.toString())
		}
		for (var j = 0; j <= array.length - 1; j++) {
			if (j % 5 == 0)
				var tr = generica("tr", "tr", padre)
			var td = generica("td", "td", tr)
			var texto = document.createTextNode(array[j])
			td.appendChild(texto)
			var check = generica("input", "input", td)
			check.setAttribute("type", "checkbox")
			arraycheck.push(array[j])

		}
	}
	padreBoton = document.getElementById("enviar")
	var submit = generica("button", "button", padreBoton)
	submit.setAttribute("class", "btn btn-primary")
	var textoBoton = document.createTextNode("Mapa")
	submit.appendChild(textoBoton)
	submit.setAttribute("type", "button")
	submit.addEventListener("click", function () {
		mapa(resu, array)
	}, false)
}


function generica(nombre, tipo, padre, texto, atributo) { //funcion generica para crear los nodos.
	nombre = document.createElement(tipo)
	if (texto != null)
		nombre.innerHTML = texto
	if (atributo != null)
		nombre.setAttribute("id", atributo)
	if (padre != null)
		padre.appendChild(nombre)
	return nombre
}

function marcar(marcar) { //Mirar porque cuando acaba el evento me borra el div.
	var checks = document.getElementsByTagName("input")

	for (var i = 1; i <= checks.length - 1; i++) {
		checks[i].checked = marcar
	}
}
function mapa(resu) {
	window.scrollTo(0,document.body.scrollHeight)
	if (resu == 0) {
		var select = document.getElementById("select2")
		var pais = select.value
		var selectCiclo = document.getElementById("select")
		var movilidad = selectCiclo.value

		for (var i in json) {
			for (var g = 0; g <= arrayciudad.length; g++) {
				cont = 0
				if (movilidad == "Todos")
					cont++
				if (arrayciudad[g] != json[i].ciudad)
					cont++
				if (json[i].pais == pais)
					cont++
				if (json[i].tipo == movilidad)
					cont++
			}
			if (cont == 3) {
				arrayciudad.push(json[i].ciudad)
				arrayCiclo.push(json[i].ciclo)
				arrayTipo.push(json[i].tipo)
				arrayLatitud.push(json[i].latitud)
				arrayLongitud.push(json[i].longitud)
			}

		}

	} else {
		var arrayCiclos = new Array()
		var checks = document.getElementsByTagName("input")

		for (var h = 1; h <= checks.length - 1; h++) {
			if (checks[h].checked)
				arrayCiclos.push(arraycheck[h - 1])
		}
		var bool =false
		for (var i in json) {
			for(var j = 0 ; j<= arrayCiclos.length-1; j++){
				bool=false
				if(arrayCiclos[j]== json[i].ciclo)
					bool=true
				if (bool) {
					arrayciudad.push(json[i].ciudad)
					arrayCiclo.push(json[i].ciclo)
					arrayTipo.push(json[i].tipo)
					arrayLatitud.push(json[i].latitud)
					arrayLongitud.push(json[i].longitud)
				}
			}
			

		}
	}
	for (var k = 0; k <= arrayciudad.length - 1; k++) {
		var contentString = "Ciclo: " + arrayCiclo[k] + "<br> Tipo: " + arrayTipo[k]
		var myLarlng = new google.maps.LatLng(arrayLatitud[k], arrayLongitud[k])
		var marker = new google.maps.Marker({
			position: myLarlng,
			title: arrayciudad[k],
			animation: google.maps.Animation.BOUNCE,
		})
		marker.setMap(map)
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		})
		marker.addListener("click", function () {
			infowindow.open(map, marker)
		})
	}

}