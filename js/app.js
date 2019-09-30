$(document).ready(function(){
	
	AppSamTeSesion.EsSessionActiva(function(){
		window.op;
		Banca.funcGetDataUser(function(callback){
			}, function (e){
				console.log('okassssssssss1');
			}, function(data){
				console.log('okassssss2');
		});

		$('#save').click(function(){
			$('#content').css('filter','blur(10px)');
			$('.content-modal').show();
			$('#cantidad').focus();
			$('#cantidad').val("");
			window.op = 'depositar'; 
		});
		$('#get').click(function(){
			$('#content').css('filter','blur(10px)');
			$('.content-modal').show();
			$('#cantidad').focus();
			$('#cantidad').val("");
			window.op = 'retirar'; 
		});
		$('#cancelSave').click(function(){
			$('#cantidad').val("");
			$('#content').css('filter','blur(0px)');
			$('.content-modal').hide();
			console.log( window.op );

		});
		$('#aceptar').click(function(){
			var cantidad 		= $('#cantidad').val();
			var limite 			= $('.select').attr("attr-limit-account");
			var creditoUSado 	= $('.select').attr("attr-credit-used-account");	 
			var tipo 			= $('.select').attr("attr-type-account");
			var balance 		= $('.select').attr("attr-balance-account");
			if($.isNumeric(cantidad)){
				if( cantidad != 0 ){
					if( tipo == 'DEBITO' ){
						if( window.op ==  'retirar'){
							console.log( balance );
							console.log( cantidad );
							if( parseInt(balance) >= parseInt(cantidad) && parseInt(balance) != '' ){
								Banca.funcGetMoney(function(callback){
										}, function (e){
										}, function(data){
									});	
							}else{
								alert('El monto excede el saldo disponible.');
							}
						}else{
							Banca.funcSaveMoney(function(callback){
								}, function (e){
								}, function(data){
							});
						}
						
					}else if( tipo == 'CREDITO' ){
						if( window.op ==  'retirar'){
							if( parseInt(balance) < parseInt(cantidad) ){
								alert('El monto excede el credito disponible.');
							}else{
								if( confirm('Se cobrará 20% de interes sobre el monto retirado.') ){
									Banca.funcGetMoney(function(callback){
										}, function (e){
										}, function(data){
									});	
								}
								
							}
						}else{
							var total = parseInt(cantidad) + parseInt(balance);
							if( total <= parseInt(limite) ){
								Banca.funcSaveMoney(function(callback){
									}, function (e){
									}, function(data){
								});
							}else{
								alert('La cantidad excede el limite del credito.')
							}
						}
						
					}
				}else{
					alert('La cantidad debe ser mayor a cero.')
				}
			}else{
				alert('El valor debe ser númerico.');
			}
			console.log(cantidad);
		});


		});


});
