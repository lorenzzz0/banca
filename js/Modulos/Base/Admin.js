

var Banca = (function(){

	var config = AppParametros.config;
	var body = AppParametros.body;
	

	var _funcGetDataUser =  function(callback, errorCallback){

	    var token = ClienteAWSCognito.funcObtenerToken();
	    if(token)
	    {
	      config.sessionToken = token;
	    }

	    var userCognito = ClienteAWSCognito.funcObtenerUserId();
	    var idUsuario;

	    userCognito.getUserAttributes(function(err, result) {
	        if (err) {
	            alert(err);
	            return;
	        }
	        for (i = 0; i < result.length; i++) {
	            if( result[i].getName() == 'sub'){
	            	idUsuario = result[i].getValue();

			   		AppParametros.fnRequest(AppParametros.awsGetDataUser, 'POST', token, '{ "opid":"001","usr" : "'+idUsuario+'"  }', function(result){
			   			$("#custLoader").hide();
						cuentas = result['cuentas']['Items']; 
						var html;
			   			$.each( cuentas, function( index, value ) {
			   				if( value.type["S"] == "CREDITO" )
			   					html = '<div class="colum5 F-left card" attr-balance-account="'+value.balance["N"]+'" attr-credit-used-account="'+value.credit_used["N"]+'" attr-limit-account="'+value.limit["N"]+'" attr-type-account="'+value.type["S"]+'"  attr-id-account="'+value.account_id["S"]+'"><ul><li>ID: '+value.account_id["S"]+'</li><li>Tipo: '+value.type["S"]+'</li><li>Limite: '+value.limit["N"]+'</li><li>Credito usado: '+value.credit_used["N"]+'</li><li>Credito disponible: <strong>'+value.balance["N"]+'</strong></li></ul></div>';
			   				else
			   					html = '<div class="colum5 F-left card" attr-balance-account="'+value.balance["N"]+'" attr-credit-used-account="'+value.credit_used["N"]+'" attr-limit-account="'+value.limit["N"]+'" attr-type-account="'+value.type["S"]+'" attr-id-account="'+value.account_id["S"]+'"><ul><li>ID: '+value.account_id["S"]+'</li><li>Tipo: '+value.type["S"]+'</li><li>Saldo: <strong>'+value.balance["N"]+'</strong></li></ul></div>';
			   				$('#container').append(html);

						});
						$(".card").click(function(){
							if( $(this).hasClass( 'select' ) ){
								$(".card").removeClass('select');
								$('.title-mov').hide();
								$('#save').hide();
								$('#get').hide();
								$('.table').remove();
							}else{
								var account_id = $(this).attr("attr-id-account");
								$('#save').show();
								$('#get').show();
								$('.table').remove();
								$(".card").removeClass('select');
								$(this).addClass("select");
								_funcGetTransactions();
								
								$('.title-mov').show();

							}	
							
						});
			   		}, function(jqXHR, textStatus, errorThrown){
						console.log(jqXHR);
					});
	            } 
	        }
    	});
    	callback();
    }

    var _funcSaveMoney =  function(callback, errorCallback){

	    var token = ClienteAWSCognito.funcObtenerToken();
	    if(token)
	    {
	      config.sessionToken = token;
	    }

	    var userCognito = ClienteAWSCognito.funcObtenerUserId();
	    var idUsuario;
	    var cantidad = $('#cantidad').val();
	    var idCuenta = $('.select').attr("attr-id-account");

	    userCognito.getUserAttributes(function(err, result) {
	        if (err) {
	            alert(err);
	            return;
	        }
	        for (i = 0; i < result.length; i++) {
	            if( result[i].getName() == 'sub'){
	            	idUsuario = result[i].getValue();

			   		AppParametros.fnRequest(AppParametros.awsSaveMoney, 'POST', token, '{ "opid":"002","usr" : "'+idUsuario+'", "cantidad":'+cantidad+',"idCuenta":"'+idCuenta+'" }', function(result){
			   			$("#custLoader").hide();
			   			$('#cantidad').val("");
			   			var tipo = $('.select').attr("attr-type-account")
			   			
						if( tipo == 'CREDITO' ){
							var creditoUsado = $('.select').attr("attr-credit-used-account");
							var total =  parseInt(creditoUsado) -  parseInt(cantidad)
							var element 	= $('.select').children().children()[3];
							var elemnt2  	= $(element)[0];
							html = '<li>Credito usado: <strong>'+total+'</strong></li>';
							$(elemnt2).html(html);
							$('.select').attr("attr-credit-used-account",total);

							var value = parseInt(cantidad) +  parseInt( $('.select').attr("attr-balance-account") )
				   			var element 	= $('.select').children().children()[4];
							var elemnt2  	= $(element)[0];
							html = '<li>Credito disponible: <strong>'+value+'</strong></li>';
							$(elemnt2).html(html);
							$('.select').attr("attr-balance-account",value);

						}else{
							var value = parseInt(cantidad) +  parseInt( $('.select').attr("attr-balance-account") )
				   			var element 	= $('.select').children().children()[2];
							var elemnt2  	= $(element)[0];
							html = '<li>Saldo: <strong>'+value+'</strong></li>';
							$('.select').attr("attr-balance-account",value);
							$(elemnt2).html(html);
						}

						_funcGetTransactions();

			   		}, function(jqXHR, textStatus, errorThrown){
						console.log(jqXHR);
					});
	            } 
	        }
    	});
    	callback();
    }
    
     var _funcGetMoney =  function(callback, errorCallback){

	    var token = ClienteAWSCognito.funcObtenerToken();
	    if(token)
	    {
	      config.sessionToken = token;
	    }

	    var userCognito = ClienteAWSCognito.funcObtenerUserId();
	    var idUsuario;
	    var cantidad = $('#cantidad').val();
	    var idCuenta = $('.select').attr("attr-id-account");

	    userCognito.getUserAttributes(function(err, result) {
	        if (err) {
	            alert(err);
	            return;
	        }
	        for (i = 0; i < result.length; i++) {
	            if( result[i].getName() == 'sub'){
	            	idUsuario = result[i].getValue();

			   		AppParametros.fnRequest(AppParametros.awsGetMoney, 'POST', token, '{ "opid":"004","usr" : "'+idUsuario+'", "cantidad":'+cantidad+',"idCuenta":"'+idCuenta+'" }', function(result){
			   			$("#custLoader").hide();
			   			$('#cantidad').val("");
			   			var tipo = $('.select').attr("attr-type-account")
			   			
						if( tipo == 'CREDITO' ){
							var creditoUsado = $('.select').attr("attr-credit-used-account");
							var total =  parseInt(creditoUsado) +  parseInt(cantidad)
							var element 	= $('.select').children().children()[3];
							var elemnt2  	= $(element)[0];
							html = '<li>Credito usado: <strong>'+total+'</strong></li>';
							$(elemnt2).html(html);
							$('.select').attr("attr-credit-used-account",total);

							var value = parseInt( $('.select').attr("attr-balance-account") ) - parseInt(cantidad)
				   			var element 	= $('.select').children().children()[4];
							var elemnt2  	= $(element)[0];
							html = '<li>Credito disponible: <strong>'+value+'</strong></li>';
							$(elemnt2).html(html);
							$('.select').attr("attr-balance-account",value);
						}else{
							var value =  parseInt( $('.select').attr("attr-balance-account") ) - parseInt(cantidad)
				   			var element 	= $('.select').children().children()[2];
							var elemnt2  	= $(element)[0];
							html = '<li>Saldo: <strong>'+value+'</strong></li>';
							$(elemnt2).html(html);
							$('.select').attr("attr-balance-account",value);
						}

						_funcGetTransactions();

			   		}, function(jqXHR, textStatus, errorThrown){
						console.log(jqXHR);
					});
	            } 
	        }
    	});
    	callback();
    }

    var _funcGetTransactions =  function(callback, errorCallback){

	    var token = ClienteAWSCognito.funcObtenerToken();
	    if(token)
	    {
	      config.sessionToken = token;
	    }

	    var userCognito = ClienteAWSCognito.funcObtenerUserId();
	    var idUsuario;	    
	    var idCuenta = $('.select').attr("attr-id-account");

	    userCognito.getUserAttributes(function(err, result) {
	        if (err) {
	            alert(err);
	            return;
	        }
	        for (i = 0; i < result.length; i++) {
	            if( result[i].getName() == 'sub'){
	            	idUsuario = result[i].getValue();

			   		AppParametros.fnRequest(AppParametros.awsGetTransactions, 'POST', token, '{ "opid":"003","usr" : "'+idUsuario+'","idCuenta":"'+idCuenta+'" }', function(result){
			   			html = '<table id="table-m" class="table"><thead><tr><th scope="col">Id movimiento</th><th scope="col">Tipo</th><th scope="col">Cantidad</th><th scope="col">Fecha</th></tr></thead><tbody>';	
			   			$.each( result['cuentas']['Items'], function( index, value ) {
			   				html += '<tr><th scope="row">'+value['transactions_id']['S']+'</th><td>'+value['type']['S']+'</td><td>'+value['amount']['N']+'</td><td>'+value['date']['S']+'</td></tr>';
			   				
			   				console.log( value );
			   			});
			   			html += '</tbody></table>';
			   			$('#table-m').remove();
			   			$("#custLoader").hide();
			   			$('#cantidad').val("");
			   			$('#container-mov').append(html);
			   		}, function(jqXHR, textStatus, errorThrown){
						console.log(jqXHR);
					});
	            } 
	        }
    	});

    }

	return {
		funcGetDataUser:_funcGetDataUser,
		funcSaveMoney:_funcSaveMoney,
		funcGetTransactions:_funcGetTransactions,
		funcGetMoney:_funcGetMoney
  	};

})();

