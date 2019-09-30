var AppUtilerias = (function(){

	var _funcValidarCampoCorreo = function (correo){
		var correoRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

		return correoRegex.test(correo);
	};

	var _funcValidarSeleccionSelect = function(valor){

		return (valor.toUpperCase() == "SELECCIONAR");
	}
	

	return {
		funcValidarCampoCorreo: _funcValidarCampoCorreo,
		funcValidarSeleccionSelect : _funcValidarSeleccionSelect
	}
})();