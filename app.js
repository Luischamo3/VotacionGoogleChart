
var lista = new Array();
var n = "";
var obj = new Object();



function loadPage() {

    var arr = JSON.parse(localStorage.getItem('peliculas'));
    if (arr == null) {
        arr = peliculas;
        localStorage.setItem('peliculas', JSON.stringify(arr));
    }

   
    //Cargar Imágenes Slider
    var li = $('.slides').find('li');
    $(arr).each(function (i, element) {
        var caption = $('<div class="caption center-align text-flow" ></div>');
        var a = element;
        var img = $(`<img alt="${element.nombre}"  src="${element.slideimg}" alt="" class="materialboxed" style="opacity:0.8" name="${element.nombre}">`);
        var h3 = $(`<h3 class="red-text text-accent-4">${element.nombre}</h3>`);
        // var h5 = $(`<h5  class=" white-text text-darken-10 truncate">${element.sinopsis}</h5>`);
        caption.append(h3);
        // caption.append(h5);
        $(li[i]).append(img);
        $(li[i]).append(caption);
    });

    
    arr.forEach(function (e) {
        $('.materialboxed').materialbox();
        //Lista de Carteles
        var principal = $('<div class="col s6 m4 l3  center-align"></div>');
        var card = $(' <div class="card hoverable"></div>');
        var cardimage = $('<div class="card-image materialboxed"></div>');
        var cardcontent = $(`<div class="card-content truncate ">${e.nombre}</div>`);
        var cardaction = $('<div class="card-action ">');
        var btn = $(`<a class=" waves-effect waves-light btn " href="registro.html" onclick="setLocalStorageIdPelicula(${e.id})" name="${e.nombre}" aria-label="Votar por ${e.nombre}" >Votar</a>`);
        var img = $(`<img class=" " src="${e.src}" alt="${e.nombre}" name="${e.nombre}">`);

        $(".carteles").append(principal);
        $(principal).append(card);
        $(card).append(cardimage);
        $(card).append(cardcontent);
        $(card).append(cardaction);
        $(cardimage).append(img);
        $(cardaction).append(btn);
    });

}

function setLocalStorageIdPelicula(id) {
    var obj = { id: id };
    localStorage.setItem('idPelicula', JSON.stringify(obj));
}

// Tarjeta Segunda Página
function loadMovie() {
    var idsave = JSON.parse(localStorage.getItem('idPelicula'));
    var titulo = peliculas[idsave.id].nombre;
    var video = peliculas[idsave.id].url;
    var src = peliculas[idsave.id].src;
    var sinopsis = peliculas[idsave.id].sinopsis;
    document.getElementById('titulo').innerText = titulo;
    document.getElementById('video').setAttribute('src', 'https://www.youtube.com/embed/' + video);
    document.getElementById('imagen').setAttribute('src', src);
    document.getElementById('imagen').setAttribute('style', 'width:80%');
    document.getElementById('sinopsis').innerText = sinopsis;
}



google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart(index) {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Votos');
    var peliculas = JSON.parse(localStorage.getItem('peliculas'));

    peliculas.forEach(element => {
        // console.log(element);
        data.addRows([
            [element.nombre, element.votos]
        ]);
    });

    if (index == 0) {
        var options = {
            title: 'Resultados votacion',
            'width': 800,
            'height': 500,
            chartArea: { width: '60%' },
            hAxis: {
                title: 'Pelicula',
                minValue: 0,
                maxValue: 20
            },
            vAxis: {
                title: 'Votos'
            }
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    } else if (index == 1) {
        // Set chart options
        var options = {
            'title': 'Resultados votacion',
            'width': 800,
            'height': 500,
            pieHole: 0.4,
            
        };

        
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    } else if (index == 2) {
        // Set chart options
        var options = {
            'title': 'Resultados votacion',
            'width': 800,
            'height': 500,
            is3D: true,
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    document.getElementById("char_div").focus();
}


function saveVote() {
    /// pasar el id de la pelicula al registro
    var idsave = JSON.parse(localStorage.getItem('idPelicula')).id;
    /// en el registro crear objeto usuario y guardarlo en localstorage

    // recoger el nombre
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;

    var usuario = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email,
        voto: idsave
    }

    /// mirar si existe el array de usuarios en local storage?
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (usuarios == null) {
        usuarios = [];
    }
  
    usuarios.push(usuario);
   
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    var peliculas = JSON.parse(localStorage.getItem('peliculas'));

    peliculas.forEach(element => {
        if (element.id == idsave) {
            element.votos++;
        }
    });
    localStorage.setItem('peliculas', JSON.stringify(peliculas));

    
}

