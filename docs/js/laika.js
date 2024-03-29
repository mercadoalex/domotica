// Laika by Fercho 2018
 
var idioma = "Spanish Latin American Female";
//document.oncontextmenu = function(){return false} // inhabilita el boton derech


// luces pre establecidas
 var rojo = {b: 0, g: 0, r: 255};
 var verde = {b: 0, g: 255, r: 0};
 var azul = {b: 255, g: 0, r: 0};
 var amarillo = {b: 0, g: 255, r: 247};
 var blanco = {b: 255, g: 255, r: 255};


$(document).ready(function(){
  
	startContinuousArtyom();
	artyom.addCommands([
	    {
	        indexes:["control", "asistente","Laika", "laika"],
	        action:function(){
	          	
	          	 //artyom.say("¿en qué te puedo ayudar?");
	          	 responde('¿En qué te puedo ayudar?', 'si, dime!' , 'Que quieres?');
	          	
	        }
	    },

		{
	        indexes:["prende foco 1" , "prende el foco 1", "prende la luz de la sala"],
	        action:function(){
	        	 db.ref('casa1').update({ foco1: "on"});
	        	 responde('ok, foco prendido','foco prendido!','listo, he prendido el foco');
	           
	        }
	    },	

	    {
	        indexes:["apaga foco 1", "apaga el foco 1", "apaga la luz de la sala"],
	        action:function(){
	        	 db.ref('casa1').update({ foco1: "off"});
	        	 responde('Listo!, foco apagado','Foco apagado','El foco se ha apagado!');
	           
	        }
	    },	

	    // leds

	    {
	        indexes:["activa luz roja", "pon luz roja","activar luz roja","activa luz rojo"],
	        action:function(){
	        	  db.ref('casa1').update({ rgb: rojo });
	        	 responde('He puesto la luz roja!','Luz roja activada','Ok!');
	           
	        }
	    },	

	    {
	        indexes:["activa luz verde", "pon luz verde","activar luz verde","activa luz verde"],
	        action:function(){
	        	  db.ref('casa1').update({ rgb: verde });
	        	 responde('He puesto la luz verde!','Luz verde activada','Ok!');
	           
	        }
	    },

	    {
	        indexes:["activa luz azul", "pon luz azul","activar luz azul","activa luz azul"],
	        action:function(){
	        	  db.ref('casa1').update({ rgb: azul });
	        	 responde('He puesto la luz azul!','Luz azul activada','Ok!');
	           
	        }
	    },

	    {
	        indexes:["activa luz amarilla", "pon luz amarilla","activar luz amarilla","activa luz amarilla"],
	        action:function(){
	        	  db.ref('casa1').update({ rgb: amarillo });
	        	 responde('He puesto la luz amarilla!','Luz amarilla activada','Ok!');
	           
	        }
	    },

	    {
	        indexes:["activa luz blanca", "pon luz blanca","activar luz blanca","activa luz blanca"],
	        action:function(){
	        	  db.ref('casa1').update({ rgb: blanco });
	        	 responde('He puesto la luz blanca!','Luz blanca activada','Ok!');
	           
	        }
	    },

	    {
	        indexes:["activa sensor de movimiento", "activa la alarma","activa sensor de presencia"],
	        action:function(){
	        	 db.ref('casa1').update({ alarma: 'on' });
	        	 responde('Ok, alarma activada','Sensor de movimiento activado','Sensor de presencia activado');
	           
	        }
	    },

	    {
	        indexes:["desactiva sensor de movimiento", "apaga la alarma","apaga el sensor de presencia"],
	        action:function(){
	        	 db.ref('casa1').update({ alarma: 'off' });
	        	 responde('Alarma desactivada','Alarma desactivada','He apagado la alarma');
	           
	        }
	    },


	    {
	        indexes:["dime la temperatura", "dame la temperatura","temperatura y humedad"],
	        action:function(){
	        	 var h = humFin.toString()
	        	 var t = temFin.toString()

	        	 responde(
	        	 	"la temperatura es de: "+ t + " " + "°C " + "y " + h +" " + "de Humedad. " ,
	        	 	"la temperatura es de: "+ t + " " + "°C " + "y " + h +" " + "de Humedad. " ,
	        	 	"la temperatura es de: "+ t + " " + "°C " + "y " + h +" " + "de Humedad. " 
	        	 	);
	        	 
	        }
	    },	
	    	// dimmer
	    {
	        indexes:["baja el brillo del foco", "baja el brillo","baja la luz"],
	        action:function(){
	        	 db.ref('casa1').update({ dimmer: 70 });
	        	 responde('He bajado el brillo del foco','Ok,','Luz ténue');
	           
	        }
	    },

	    {
	        indexes:["sube el brillo del foco","máximo brillo", "sube el brillo","sube la luz"],
	        action:function(){
	        	 db.ref('casa1').update({ dimmer: 255 });
	        	 responde('He subido el brillo del foco','Ok,','el foco esta al máximo');
	           
	        }
	    },


	]); // end comandos 



	function responde(r1, r2, r3){
		
		$('#modal').fadeIn();
		
		var myArray = [r1, r2, r3]; // recibe las posibles respuestas
		var rand = Math.floor(Math.random() * myArray.length);
		var respuesta = myArray[rand];

		setTimeout(function() {
			
			var app = document.getElementById('resText');
			var typewriter = new Typewriter(app, {
			    loop: false
			});

			typewriter.typeString(respuesta)
				.pauseFor(3000)
				.deleteAll()
			    .start();
		
		}, 500);

		responsiveVoice.speak(respuesta, idioma , {onstart: stopArtyom, onend: startContinuousArtyom});
	}// end responde




	// Esta funcion inicia artyom en el reconocimiento continuo y obedecera comandos por siempre (requiere conexión https para prevenir el dialogo de permiso de microfono continuo)
	function startContinuousArtyom(){
	  	
	    $('#modal').delay(2000).fadeOut();
			    

		artyom.initialize({
				lang: "es-ES",
				continuous:true,// Reconoce 1 solo comando y para de escuchar
	            listen:true, // Iniciar !
	            debug:true, // Muestra un informe en la consola
	            speed:1 // Habla normalmente
			});
	}


	// Stop libreria;
	function stopArtyom(){	
			artyom.fatality();// Detener cualquier instancia previa
			
		};


//artyom.simulateInstruction("Hello");

});