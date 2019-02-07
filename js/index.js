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

        buildTable(scansAggregated);
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
  var tableData = document.createElement('table');

  var trHeader = document.createElement('tr');

  var thHeadMac = document.createElement('th');
  var thHeadLat = document.createElement('th');
  var thHeadLong = document.createElement('th');
  var thHeadScans = document.createElement('th');

  thHeadMac.innerHTML = 'Mac Access Point';
  thHeadLat.innerHTML = 'Latitude';
  thHeadLong.innerHTML = 'Longitude';
  thHeadScans.innerHTML = 'Scans';

  trHeader.appendChild(thHeadMac);
  trHeader.appendChild(thHeadLat);
  trHeader.appendChild(thHeadLong);
  trHeader.appendChild(thHeadScans);

  tableData.appendChild(trHeader);

  for (var i = 0; i < scansAggregated.length; i++) {
    var scan = scansAggregated[i];

    var trRow = document.createElement('tr');

    var tdMac = document.createElement('td');
    var tdLat = document.createElement('td');
    var tdLong = document.createElement('td');
    var tdScans = document.createElement('td');

    tdMac.innerHTML = scan.macAp;
    tdLat.innerHTML = scan.locationLatitude;
    tdLong.innerHTML = scan.locationLongitude;
    tdScans.innerHTML = scan.scans;

    trRow.appendChild(tdMac);
    trRow.appendChild(tdLat);
    trRow.appendChild(tdLong);
    trRow.appendChild(tdScans);

    tableData.appendChild(trRow);
  }

  tableData.className = 'table table-responsive';

  var contTblData = document.getElementById('contTblData');

  contTblData.appendChild(tableData);
}
