var  
  _siguiente
, _anterior
, _tabGenerales
, _tabVerificacion
, _tabPago
, _validateRules 
, _formConstancias
, _input
, _btn_genera_linea
, _btn_pago_linea
, _select_estado
, _select_delMunicipio
, _select_colonia
,_btn_descargar_constancia
,_btn_obtener_constancia
,_btn_imprimir_constancia;

function start()
{
      _siguiente            =  $(".siguiente");
      _anterior             =  $(".anterior");
      _imprimir             =  $(".imprimir");
      _formConstancias      =  $("#formConstancia");
      _tabGenerales         =  $("#lnkTab1");
      _tabVerificacion      =  $("#lnkTab2");
      _tabPago              =  $("#lnkTab3");
      _input                =  $("input[type=text]");
      _btn_genera_linea     =  $("#btn_genera_linea");
      _btn_pago_linea       =  $("#btn_pago_linea");
      _select_estado        =  $("#id_estado");
      _select_delMunicipio  =  $("#id_del_municipio");
      _select_colonia       =  $("#colonia");
      _btn_descargar_constancia = $("#btn-descargar-constancia");
      _btn_obtener_constancia = $("#btnObtenerConstancia");
      _btn_imprimir_constancia = $("#btnImprimirConstancia");

      _validateRules    = 
      {
          nombre  : { required:true},
          paterno : { required:true},
          materno : { required:true},
          email   : { email:true},
          rfc     : { required:true, rfc:true},
          curp    : { required:true, curp:true},
          id_estado: {required:true},
          id_del_municipio: {required:true},
          colonia :{required:true},
          direccion : {required:true, direccion:true}
      }; 
     _formConstancias.validate({ onfocusout: true, rules : _validateRules});
}



//IMRIMIR CONSTANCIA
function imprimirConstancia()
{ 
    reset();
    window.location.href="../pcosntancias/imprimirConstancias.php/";
}

//CONTROLA BOTON SIGUIENTE PARA LA NAVEGACIÃ“N DE TABS
function  siguienteTab()
{
    if($("#tab1").hasClass("active"))
    {
        
        if(!$("#formConstancia").valid())
        return;
        $("#circulo").css("background", "#9F2241");
        $("#text_1").css("color", "#9F2241");
        $("#circulo").html('<i class="fa fa-check">');
          _tabVerificacion.trigger("click");
    }
    else
    
    if($("#tab2").hasClass("active"))
    {
        $("#circulo1").css("background", "#9F2241");
        $("#text_2").css("color", "#9F2241");
        $("#circulo1").html('<i class="fa fa-check">');
       _tabPago.trigger("click");
    }
}

//CONTROLA BOTON ANTERIOR PARA LA NAVEGACIÃ“N DE TABS
function  regresarTab()
{
     if($("#tab2").hasClass("active"))
    {
        $("#circulo").css("background", "#897977");
         $("#circulo1").css("background", "#897977");
         $("#text_1").css("color", "#999999");
         $("#text_2").css("color", "#999999");
         $("#circulo").html('1');
         $("#circulo1").html('2');
      _tabGenerales.trigger("click");
    }
    else
    if($("#tab3").hasClass("active"))
    {
        $("#circulo").css("background", "#897977");
        $("#circulo1").css("background", "#897977");
        $("#circulo2").css("background", "#897977");
        $("#text_1").css("color", "#999999");
        $("#text_2").css("color", "#999999");
        $("#text_3").css("color", "#999999");
        $("#circulo").html('1');
        $("#circulo1").html('2');
        $("#circulo2").html('3');
        _tabVerificacion.trigger("click");
    }
}

//VALIDA QUE LOS DATOS ESTEN CAPTURADOS ANTES DE PASAR A LA SECCION DE VERIFICACIÃ“N
function validateTab()
{
  if(!_formConstancias.valid())    
       return false;
}

//CLONA INFORMACIÃ“N DE LOS CAMPOS GENERALES A VERIFICACIÃ“N
function  clonarInfoSelect()
{
    var element = $(this);
    $("#"+element.attr("name")+"_registrado").val(element.find("option:selected").text());
}
//CLONA INFORMACIÃ“N DE LOS CAMPOS GENERALES A VERIFICACIÃ“N
function  clonarInfo()
{
    var element = $(this);
    $("#"+element.attr("name")+"_registrado").val(element.val());
}
function reset()
{
  $("input[type=text]").val("");
  _tabGenerales.trigger('click');
  
}
//GENERA LINEA DE CAPTURA
function  generaLineaCaptura()
{
  $.ajax({
        type: "POST"
       ,url:"../pcosntanciasc/cControlConstancias.php"
       ,data:$("#formConstancia").serialize()+'&option=1'
       ,dataType: "json"
       ,beforeSend: function (xhr)
       {
         $.blockUI({                                
            baseZ: 10000,
            message: '<h1><img src="../pcosntanciasc/img/ajax-loader.gif"/> Espere, por favor!</h1>'
          });
        }
       ,success : function (data)
               
       {
        $("#circulo2").css("background", "#235B4E");
        $("#text_3").css("color", "#235B4E");
        $("#circulo2").html('<i class="fa fa-check">');

           if(data.file != undefined)
           {
              //reset();
              var e = new Error('No se pudo analizar la entrada'); 
              // e.message es 'No se pudo analizar la entrada'

              $.unblockUI();
              _tabGenerales.trigger("click");
              // alert(data.file);
              window.open("../pcosntanciasc/files/"+data.file,"_blank","toolbar=no,status=no,location=no,scrollbars=yes,resizable=yes,top=100,left=100,width=900,height=800");
              // $.ajax({
              //   type: "POST"
              //   ,url:"../pcosntanciasc/cControlConstancias.php"
              //   ,data:'files='+data.file+'&option=2' 
              //   ,success : function(response)
              //     {
              //       //console.log(response);
              //     }
              // });
              // setTimeout("location.reload(true);",1);
                window.open ("../constancias/index.php");
           } throw e;
       }
  },"json");
}


//OBTIENE DELEGACIONES / MUNICIPIOS
function getDelMunicipios()
{
    if($(this).val()!=="")
    {
      $.ajax({
        type: "POST"
       ,url:"../pcosntanciasc/controlAjax.php"
       ,data:{option:1,idEstado:$(this).val()}
       ,dataType: "json"
       ,beforeSend: function (xhr)
       {
         $.blockUI({                                
            baseZ: 10000,
            message: '<h1><img src="../pcosntanciasc/img/ajax-loader.gif"/> Espere, por favor!</h1>'
          });
       }
       ,success : function (data)
       {
            _select_delMunicipio.html("");
            _select_delMunicipio.append($("<option/>").text("Selecciona una delegación o municipio").val(""));
            for(var i=0;i<data.length;i++)
            {
                var option  = $("<option/>");
                option.val(data[i].id_del_municipio).text(data[i].del_municipio);
                _select_delMunicipio.append(option);
            }
            $.unblockUI();
       }
      },"json");
   }
}

//OBTIENE COLONIAS
function getColonias()
{
    if(_select_estado.val()!=="" && _select_delMunicipio.val()!=="")
    {
        $.ajax({
            type: "POST"
           ,url:"../pcosntanciasc/controlAjax.php"
           ,data:{option:2,idEstado:_select_estado.val(),idDelMunicipio:_select_delMunicipio.val()}
           ,dataType: "json"
           ,beforeSend: function (xhr)
           {
             $.blockUI({                                
                baseZ: 10000,
                message: '<h1><img src="../pcosntanciasc/img/ajax-loader.gif"/> Espere, por favor!</h1>'
              });
           }
           ,success : function (data)
           {
                _select_colonia.html("");
                _select_colonia.append($("<option/>").text("Selecciona una colonia").val(""));
                for(var i=0;i<data.length;i++)
                {
                    var option  = $("<option/>");
                    option.val(data[i].id_colonia).text(data[i].colonia);
                    _select_colonia.append(option);
                }
                $.unblockUI();
           }
          },"json");
    }
}

//MANDA AL LINK PARA OBTENER CONSTANCIAS EN LINEA
function irConstanciasLinea()
{
   window.location.href="../pcosntancias/"; 
}

//METODO PARA VALIDAR EL RFC DEL FORMULARIO
jQuery.validator.addMethod("rfc", function(value, element) {
    return this.optional( element ) || /^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))$/i.test( value );
}, "Porfavor ingrese un RFC vÃ¡lido.");

//METODO PARA VALIDAR EL CURP DEL FORMULARIO
jQuery.validator.addMethod("curp", function(value, element) {
    return this.optional( element ) || /^([a-z]{4})([0-9]{6})([a-z]{6})(([A-Z]|[a-z]|[0-9]){2})$/i.test( value );
}, "Porfavor ingrese un CURP vÃ¡lido.");

//METODO PARA VALIDAR QUE NO EXCEDA MAS DE 300 CARACTERES CALLE Y NUMERO
jQuery.validator.addMethod("direccion", function(value, element) {
   nombre=$('#direccion').val();
   //Comprobamos la longitud de caracteres
	if (nombre.length<301){
		return true;
	}
}, "No debe de exceder los 300 caracteres.");


//MENSAJES VALIDACION
jQuery.extend(jQuery.validator.messages, {
    required: "Campo requerido.",
    email: "Ingrese una dirección de correo válida."
});

$(document).ready(function ()
{
      start();
      _siguiente.on('click',siguienteTab); 
      _anterior.on('click',regresarTab);
      _imprimir.on('click',imprimirConstancia);
      _tabVerificacion.on('click',validateTab);
      _tabPago.on('click',validateTab);
      _input.on('focusout',clonarInfo);
      $("select").on('change',clonarInfoSelect);
      _btn_genera_linea.on("click",generaLineaCaptura);
      _select_estado.on("change",getDelMunicipios);
      _select_delMunicipio .on("change",getColonias);
      _btn_pago_linea.on("click",function (){
          $.blockUI({                                
            baseZ: 10000,
            message: '<h1><img src="../pcosntanciasc/img/ajax-loader.gif"/> Espere, por favor!</h1>'
          });  
          _formConstancias.submit(); 
      });
      
      _btn_descargar_constancia.on('click',function (){
          
          $.blockUI({                                
            baseZ: 10000,
            message: '<h1><img src="../pcosntanciasc/img/ajax-loader.gif"/> Espere, por favor!</h1>'
          });  
      });
    
      _btn_obtener_constancia.on('click',irConstanciasLinea);
      _btn_imprimir_constancia.on('click',imprimirConstancia);
}); 