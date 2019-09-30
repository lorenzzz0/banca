$(document).ready(function () {
    $("#icon_prefix1").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#botonIngresa").click();
        }
    });
	$("#botonIngresa").click(function(){		
		ClienteAWSCognito.funAutenticarUsuario($("#icon_prefix").val(), $("#icon_prefix1").val(), undefined, ClienteAWSCognito.modoAutenticar.Normal);
	});

	$("#botonConfimar").click(function(){
        	ClienteAWSCognito.funAutenticarUsuario($("#icon_prefix").val(), $("#icon_prefix1").val(), $("#icon_prefix_confirm").val(), ClienteAWSCognito.modoAutenticar.Actualizar);
    });


});



