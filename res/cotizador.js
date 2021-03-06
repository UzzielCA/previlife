$(document).ready(function() {

  //Ckech mark SVG icon point
  var svg_valid_icon = "21.4,4.7 21.4,4.7 21.4,4.7 18.6,7.5 18.6,7.5 8.7,17.4 3,11.7 0,14.5 5.9,20.2 8.7,23 20.2,11.5 24.2,7.5";

  //Arrow SVG icon point
  var svg_arrow_icon = "17.4,8.7 17.4,8.7 8.7,0 5.9,2.8 14.6,11.5 8.7,17.4 8.8,17.3 5.8,20.1 5.9,20.2 8.7,23 20.2,11.5 20.2,11.5";

  //Form steps number
  var list_elem_count = $("#steps fieldset").length;

  //Steps navigation position
  var navigation_pos;

  //Enable/Disable consecutive click/keypress event
  var clickable_btn = true;

  init();

  function init() {
    add_navigation();

    var next_step_btn_width = $("#navigation li.current_nav").outerWidth();

    var navigation_parent_width = $('#navigation').parent().width();

    navigation_pos = (navigation_parent_width / 2) - ((next_step_btn_width / 2) + 5);

    $('#navigation').css({
      'marginLeft': navigation_pos + 5
    });

    update_progress(1);

    focus_inupt(0);
  }

  //Click next step btn event
  $('#navigation li').on('click', function(e) {
    execute_event($(this).index());
  });

  //Enter keybard press event
  $(document).on('keypress', function(e) {
    var keyCode = e.keyCode || e.which
    if (keyCode === 13) {
      var current_step_idx = $('#navigation li.current_nav').index();
      execute_event(current_step_idx);
    }
});{}

  //Function to start the animation
  function execute_event(idx) {
    if (!clickable_btn || !$('#navigation li').eq(idx).hasClass('current_nav')) {
      return false;
    }
    var inputsValidate = validate_form(idx);
    var error = 0;
    for (var i = 0; i < inputsValidate.length; i++) {
        if (!inputsValidate[i]) {
            show_error(idx, i);
            error ++;
        }
    }
    if (error == 0) {
      clickable_btn = false;
      clear_error();
      if (idx < list_elem_count - 1) {
        navigation_pos = navigation_pos - 20;
      }
      animate_navigation(idx + 1, navigation_pos);
    }
  }

  //Function to animate the clicked button  & the SVG icon
  function animate_navigation(btn_index, new_pos) {
    var s = Snap('.current_nav .arrow');

    $('#navigation li').eq(btn_index - 1).addClass('animate');

    s.stop().animate({
      'points': svg_valid_icon
    }, 150, mina.easeout, function() {
      if (btn_index < list_elem_count) {

        $(".arrow").velocity("fadeOut", {
          delay: 200,
          duration: 200,
          complete: function() {
            update_nav_position(btn_index, new_pos);
            $(this).eq(btn_index).css({
              "opacity": 1
            });
            clickable_btn = true;
          }
        });

      } else if (btn_index == list_elem_count) {

        update_nav_position(btn_index, new_pos);
        form_ready();

      }
    });
  }

  //Update the navigation position
  function update_nav_position(el_index, new_pos) {
    $('#navigation').velocity({
      marginLeft: new_pos
    }, 200);
    $('#navigation li').eq(el_index).addClass('current_nav').siblings().removeClass('current_nav animate');
    $('#navigation li').eq(el_index - 1).addClass('valid');

    if (el_index <= list_elem_count - 1) {
      $('#navigation li').eq(list_elem_count - 1).addClass('submit');
      next_step(el_index);
      focus_inupt(el_index);
    }
  }

  //Function to validte the form
  function validate_form(step_index) {
      var isPortafolios = $("#steps fieldset.current_step").attr("id");
      var currentInputs = $('#steps fieldset.current_step input');
      var valid=[];

      if (isPortafolios == "portafolios") {
          var sum = 0;
          for (var i = 0; i < currentInputs.length; i++) {
              sum += Number($('#steps fieldset.current_step input').eq(i).val());
          }
          if (sum == 100) {
              valid.push(true);
          } else {
              valid.push(false);
          }
          console.log("sumatoria = ", sum);
      } else {
          for (var i = 0; i < currentInputs.length; i++) {
              if ($('#steps fieldset.current_step input').eq(i).attr('required') == 'required') {
                  if ($('#steps fieldset.current_step input').eq(i).val() != '') {
                    valid[i]=true;
                  } else {
                    valid[i] = false;
                  }
              }
              if (valid[i] == true) {
                  if ($('#steps fieldset.current_step input').eq(i).attr('min') != undefined && $('#steps fieldset.current_step input').eq(i).attr('max') != undefined) {
                      if (Number($('#steps fieldset.current_step input').eq(i).val()) >= Number($('#steps fieldset.current_step input').eq(i).attr('min')) &&
                          Number($('#steps fieldset.current_step input').eq(i).val()) <= Number($('#steps fieldset.current_step input').eq(i).attr('max'))) {
                          valid[i] = true;
                      } else {
                          valid[i] = false;
                      }
                  }
              }
          }
      }

      return valid;
  }

  //Function to focus on the form inputs
  function focus_inupt(input_idx) {
      if ($('#steps fieldset input').length != 0) {
      //$('#steps fieldset input').eq(input_idx).focus();
      } else {
          return false;
      }
  }

  //Function to add navigation
  function add_navigation() {
    if (list_elem_count == 0) {
      return false;
    }

    var pag_markup = '<div class="navigation_container"><ul class="clearfix" id="navigation">';
    var icon_markup = '<div class="icon" id="icon_wrapper"><svg x="0px" y="0px" width="24.3px" height="23.2px" viewBox="0 0 24.3 23.2" enable-background="new 0 0 24.3 23.2" xml:space="preserve"><polygon class="arrow" fill="#ffffff" points="' + svg_arrow_icon + '"></svg></div>';

    for (var i = 1; i <= list_elem_count; i++) {
      pag_markup = pag_markup + '<li>' + icon_markup + '</li>';
    };

    $('#steps').after(pag_markup + '</div>');
    $('#navigation li').eq(0).addClass('current_nav');
  }

  //Function to show the next step
  function next_step(idx) {
    $('#steps fieldset').eq(idx - 1).removeClass('current_step');
    $('#steps fieldset').eq(idx).addClass('current_step');
    var isResumen = $("#steps fieldset").eq(idx).attr("id");
    if (isResumen == "resumen") {
        var plazo = $("#selectPlazo").val();
        for (var i = 1; i <= plazo; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < 8; j++) {
                var td = document.createElement("td");
                switch (j) {
                    case 0:
                        td.textContent = i;
                        break;
                    case 1:
                        td.textContent = Number($("#age").val()) + i;
                        break;
                    case 2:
                        td.textContent = "APORTACIÓN ANUAL";
                        break;
                    case 3:
                        td.textContent = "APORTACIÓN ACOOMULADA";
                        break;
                    case 4:
                        td.textContent = "SALDO DEL FONDO";
                        break;
                    case 5:
                        td.textContent = "SALDO DISPONIBLE";
                        break;
                    case 6:
                        td.textContent = "SALDO DISPONIBLE NETO DE RETENCIÓN DE IMPUESTOS DE ALLIANZ";
                        break;
                    case 7:
                        td.textContent = "BENEFICIO DEDUCIBILIDADACUMILADO Y RE-INVERTIDO A TASA 12%";
                        break;
                }
                tr.appendChild(td);
            }
            $("#tableDetalle").append(tr);
        }
    }
    update_progress(idx + 1);
  }

  //Function to show errors on the form & navigation
  function show_error(index, indexInput) {
    $('#navigation li').eq(index).addClass('error animate');
    $('#steps fieldset input').eq(indexInput).addClass('invalid');
  }

  //Function to clear the errors on the form & navigation
  function clear_error() {
    $('#navigation li').removeClass('error');
    $('#steps fieldset input').removeClass('invalid');
  }

  //Function to send the form or show a message
  function form_ready() {
    alert('Thanks for filling up the form!');
  }

  //Function to update step number(visible on small size screens)
  function update_progress(idx) {
    $('.step_nb').text(idx + '/' + list_elem_count);
  }

  var selectPlazo = document.createElement("select");
  selectPlazo.id = "selectPlazo";
  for (var i = 0; i <= 20; i++) {
      var option = document.createElement("option");
      option.value = i + 5;
      option.text = i + 5;
      selectPlazo.add(option);
  }
  $("#divSelectPlazo").append(selectPlazo);
  $('select').material_select();
});

/*
$(document).ready(function() {

 });
*/
