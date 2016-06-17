$(document).ready(function() {
    var selectPlazo = document.createElement("select");
    for (var i = 0; i <= 20; i++) {
        var option = document.createElement("option");
        option.value = i + 5;
        option.text = i + 5;
        selectPlazo.add(option);
    }
    $("#divSelectPlazo").append(selectPlazo);
    $('select').material_select();
 });
