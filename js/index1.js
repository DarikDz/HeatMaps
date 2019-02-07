var overlay,heatmap;
USGSOverlay.prototype = new google.maps.OverlayView();


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 19.436281, lng: -99.186285},
    mapTypeId: 'satellite'
  });


  var bounds = new google.maps.LatLngBounds(
    /////////////////////Punto Inferior  Derecho///////////////////////
      new google.maps.LatLng(19.436350 , -99.186843),
    /////////////////////Punto superior izquierdo//////////////////////
      new google.maps.LatLng(19.43757, -99.186340));

  var srcImage = './src/images/prueba1.png';

  overlay = new USGSOverlay(bounds, srcImage, map);
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function getPoints() {
  return [

  ];
}

function USGSOverlay(bounds, image, map) {
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  this.div_ = null;

  this.setMap(map);
}

USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {

  var overlayProjection = this.getProjection();

  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};

function sub(puntos) {
  var puntos1 = puntos;
  //console.log(puntos1);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 19.436281, lng: -99.186285},
    mapTypeId: 'satellite'
  });


  var bounds = new google.maps.LatLngBounds(
    /////////////////////Punto Inferior  Derecho///////////////////////
      new google.maps.LatLng(19.436350 , -99.186843),
    /////////////////////Punto superior izquierdo//////////////////////
      new google.maps.LatLng(19.43757, -99.186340));

  var srcImage = './src/images/prueba1.png';

  overlay = new USGSOverlay(bounds, srcImage, map);
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints1(puntos1),
    map: map
  });
}





google.maps.event.addDomListener(window, 'load', initMap);



function getPoints1(puntos1) {
  var miArray = puntos1;
  var misPuntitos=null;var valor=0;var q=0;
  var txt1 ;
  //console.log(puntos1.length);
  for (i = 0; i < puntos1.length; i++) {
  console.log(i);
  txt1=new google.maps.LatLng(puntos1[i][0] , puntos1[i][1]);
  //txt1+=",";
  //console.log(txt1);

  var resultados = miArray.map(function(x))
  }
  //txt1+= new google.maps.LatLng(puntos1[1][0] , puntos1[1][1]);
  return [
    txt1

    /*for(q=0;q<puntos.length-1;q++){
      valor=0;
      misPuntitos=misPuntitos+"new google.maps.LatLng("+puntos1[q][valor++]+","+puntos1[q][valor]+"),";
    }*/
    //new google.maps.LatLng(19.436350 , -99.186843)

    /*
    miArray.forEach( function(valor, indice, array) {
    console.log("new google.maps.LatLng(" + valor + "),");
    })
    */

    //new google.maps.LatLng(valor)
    //print(new google.maps.LatLng(19.436350 , -99.186843),)
    //myWindow.blur(new google.maps.LatLng(19.436350 , -99.186843))
    //window.print("evos");
    //new google.maps.LatLng(19.436350 , -99.186843)
    //document.write(puntos1)
  ];
}


/**
* Logica de negocio para consulta de datos del formulario de registros
*/
$(document).ready(function (e) {

  $('#btnFiltrar').click(function(e) {
    cargaDatosScans();
  });
});

function cargaDatosScans() {
  var request = {};
  var params = [];

  var param1 = {};
  var param2 = {};
  var param3 = {};
  var param4 = {};

  param1.key = "FECHA_INICIO";
  param1.value = $('#txtFechaInicio').val();

  param2.key = "HORA_INICIO";
  param2.value = $('#txtHoraInicio').val();

  param3.key = "FECHA_FIN";
  param3.value = $('#txtFechaFin').val();

  param4.key = "HORA_FIN";
  param4.value = $('#txtHoraFin').val();

  params.push(param1);
  params.push(param2);
  params.push(param3);
  params.push(param4);

  request.params = params;

  var strRequest = JSON.stringify(request);

  $.ajax({
    url: 'http://localhost:9000/service/findAggregatedScans',
    method: 'POST',
    data: strRequest,
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      var statOp = data.statusOperation;

      if (statOp.code === 0) {
        var scansAggregated = data.scansAggregated;
        var puntos = buildTable(scansAggregated);
        //console.log(puntos);
        sub(puntos);
      } else {
        $('#lblMensaje').text(statOp.description);
        console.log(statOp.code + ' - ' + statOp.description);
      }
    }
  });
}

/**
* Crea la tabla de datos
*/
function buildTable(scansAggregated) {

  var latitude = new Array(scansAggregated.length);
  var longitude = new Array(scansAggregated.length);
  var longla = new Array(scansAggregated.length);
  var objetos ="";
  for (var i = 0; i < scansAggregated.length; i++) {
    //console.log(scansAggregated.length+"haber");
    var scan = scansAggregated[i];
    latitude[i] = scan.locationLatitude;
    longitude[i] = scan.locationLongitude;
    longla[i] = [latitude[i],longitude[i]];
    //objetos=objetos+"new google.maps.LatLng("+scan.locationLatitude+","+scan.locationLongitude+"),";
    //console.log(objetos);
  }
  //objetos=objetos+"new google.maps.LatLng(0,0)";
  //console.log(objetos);

  return longla;
}
