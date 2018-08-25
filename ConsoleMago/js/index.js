//Bazı Ayarlar

var kadi = "";
var sifre = "";
var onay_kodu = "";

// Output Welcome message

	giris_yapma_istegi();

var giris = 0;
// User Commands
function echo (...a) {
  return a.join(' ')
}
function read_data(cmd)
{
	 if (cmd) {
		
   
   
   
						 firebase.database().ref().child("veriler/" + window.onay_kodu).once("value",snapshot => {
				const userData = snapshot.val();
				if (userData){
								// Kulalnıcı VAr 
							
			
				if(userData[cmd] != null){output(cmd + " : " + userData[cmd].data_key);}else{output("Can' find Data as " + cmd)}
				}
				else
				{
					output("An unexpected error occured");	
						//Kullancıı Yok
				}
				
				
			});
   
   
  } else {
    output("**Data Keys:**\n\n");
	
	
			 firebase.database().ref().child("veriler/" + window.onay_kodu).once("value",snapshot => {
				const userData = snapshot.val();
				var diziler = Object.keys(userData);
				for(var i = 0; i < diziler.length; i++){
					output(diziler[i]);
				}
				console.log(userData)
			});
   
  }
}
function push_data(cmd)
{
	if (cmd) {
	var diziler = cmd.toString().split(",");
	var data_key = diziler[0];
	var data_value = diziler[1];
	
	
	var kullanici_ekle = {"data_key":data_value};
var ref = firebase.database().ref().child("veriler/" + window.onay_kodu).child(data_key);
var messageRef = ref.set(kullanici_ekle);
	output("The data has been added");
	}
	else{
		output("You didn't enter data");
	}
}




function events(cmd)
{
	 if (cmd) {
		
   
   
  } else {
    output("**All Events:**\n\n");
	
				var suan = Math.floor(Date.now() / 1000);
			 firebase.database().ref().child("events/" + window.onay_kodu).once("value",snapshot => {
				const userData = snapshot.val();
			
				var diziler = Object.keys(userData);
				for(var i = 0; i < diziler.length; i++){
					
					if(userData[diziler[i]]["time"] > suan)
					{
						
						var tarihcevir = new Date(userData[diziler[i]]["time"]*1000)
						console.log(tarihcevir);
					output(tarihcevir.getDate() + "/" + (tarihcevir.getMonth() + 1) + "/" + tarihcevir.getFullYear() + " - " + userData[diziler[i]]["describe"]);	
					}
					else{
						
						var ref = firebase.database().ref().child("events/" + window.onay_kodu).child(diziler[i]);
						var messageRef = ref.remove();
					}
					
					//console.log(diziler[i]) Keyini Yazdırıyor.
				}
				
			});
   
  }
}

function add_event(cmd)
{
	if (cmd) {
	var diziler = cmd.toString().split(",");
	var time = diziler[1];
	var describe = diziler[0];
	var date = Math.round(new Date(time).getTime()/1000);
	

	
	var kullanici_ekle = {"time":time,"describe":describe,"time":date.toString()};
var ref = firebase.database().ref().child("events/" + window.onay_kodu);
var messageRef = ref.push(kullanici_ekle);
	output("The event has been added");
	}
	else{
		output("You didn't enter event");
	}
}
function delete_data(cmd)
{
	
		if (cmd) {
	
	
	

var ref = firebase.database().ref().child("veriler/" + window.onay_kodu).child(cmd);
var messageRef = ref.remove();
	output("The value has been deleted");
	}
	else{
		output("You didn't enter data name And Key");
	}
		
}

echo.usage = "echo arg [arg ...]"
echo.doc = "Echos to output whatever arguments are input"
add_event.usage = "add_event <2012-05-31><describes>"
add_event.doc = "Adds Event"

var cmds = {
  echo,
  clear,
  help,
  read_data,
  push_data,
  delete_data,
  add_event,
  events
}
function giris_yapma_istegi()
{
	if(window.kadi == "")
	{
		output('Please log-in to system')
		output2('username:')
	}
	else if(window.sifre == "")
	{
		output2('password:')
	}
	
	
}
/*
 * * * * * * * * USER INTERFACE * * * * * * *
 */

function clear () {
  $("#outputs").html("")
}
read_data.usage = "read_data <data_name>";
read_data.doc = "Reads data from database";

push_data.usage = "push_data <data_name>,<data_value>";
push_data.doc = "Writes data from database";

push_data.usage = "delete_data <data_name>";
push_data.doc = "Deletes data from database";

clear.usage = "clear"
clear.doc = "Clears the terminal screen"

function help (cmd) {
  if (cmd) {
    let result = ""
    let usage = cmds[cmd].usage
    let doc = cmds[cmd].doc
    result += (typeof usage === 'function') ? usage() : usage
    result += "\n"
    result += (typeof doc === 'function') ? doc() : doc
    return result
  } else {
    let result = "**Commands:**\n\n"
    print = Object.keys(cmds)
    for (let p of print) {
      result += "- " + p + "\n"
    }
    return result
  }
}
help.usage = () => "help [command]"
help.doc = () => "Without an argument, lists available commands. If used with an argument displays the usage & docs for the command."

// Set Focus to Input
$('.console').click(function() {
  $('.console-input').focus()
})

// Display input to Console
function input() {
  var cmd = $('.console-input').val()
  
  if(window.kadi == "")
	{
		$("#outputs").append("<div class='output-cmd'><font color='#FFF'>" + cmd + "</font></div>")
	}
	else if(window.sifre == "")
	{
		$("#outputs").append("<div class='output-cmd'><font color='#FFF'>********</font></div>")
	}
  else{
	  
	  $("#outputs").append("<div class='output-cmd'><font color='#FFF'>" + cmd + "</font></div>")
  }
 
  $('.console-input').val("")
  autosize.update($('textarea'))
  $("html, body").animate({
    scrollTop: $(document).height()
  }, 300);
  return cmd
}

// Output to Console
function output(print) {
  if (!window.md) {
    window.md = window.markdownit({
      linkify: true,
      breaks: true
    })
  }
  $("#outputs").append(window.md.render(print))  
  $(".console").scrollTop($('.console-inner').height());
}

function output2(print) {
  if (!window.md) {
    window.md = window.markdownit({
      linkify: true,
      breaks: true
    })
  }
  $("#outputs").append("<div id='beforetext'>" + window.md.render(print)+ "<div>")  
  $(".console").scrollTop($('.console-inner').height());
}

// Break Value
var newLine = "<br/> &nbsp;";

autosize($('textarea'))

var cmdHistory = []
var cursor = -1

// Get User Command
$('.console-input').on('keydown', function(event) {
	

	
  if (event.which === 38) {
    // Up Arrow
    cursor = Math.min(++cursor, cmdHistory.length - 1)
    $('.console-input').val(cmdHistory[cursor])
  } else if (event.which === 40) {
    // Down Arrow
    cursor = Math.max(--cursor, -1)
    if (cursor === -1) {
      $('.console-input').val('')
    } else {
      $('.console-input').val(cmdHistory[cursor])
    }
  } else if (event.which === 13) {
	  
	  	
    event.preventDefault();
    cursor = -1
    let text = input()
    let args = getTokens(text)[0]
    let cmd = args.shift().value
    args = args.filter(x => x.type !== 'whitespace').map(x => x.value)
    cmdHistory.unshift(text)
if(window.onay_kodu != "")
		{
	     
   if (typeof cmds[cmd] === 'function') {
      let result = cmds[cmd](...args)
      if (result === void(0)) {
        // output nothing
      } else if (result instanceof Promise) {
        result.then(output)
      } else {
        console.log(result)
        output(result)
      }
    } else if (cmd.trim() === '') {
      output('')
    } else {
      output("Command not found: `" + cmd + "`")
      output("Use 'help' for list of commands.")
    }
	}
	else{
	
		if(window.kadi == "")
		{
			console.log("Bura");
			window.kadi = cmd;
			giris_yapma_istegi()
			$('#console_input').get(0).type = 'password'; // Şifre Görünmesin Diye, Tipini Password'a Çevirdik
			
		}
		else{
			$('#console_input').get(0).type = 'text'; // Tekrar Tipini Yazıya Çevirdik (Text)
			window.sifre = cmd;
			girisYap(window.kadi,window.sifre);
			
		}
	
		
		}
  }



});


function bu_hafta_event_getir()
{
	output("-------\n\n");
	output("***Events which are in this week***");
	
		var suan = Math.floor(Date.now() / 1000);
			 firebase.database().ref().child("events/" + window.onay_kodu).once("value",snapshot => {
				const userData = snapshot.val();
			
				var diziler = Object.keys(userData);
				for(var i = 0; i < diziler.length; i++){
					
					var haftayaki_zaman = parseInt(suan) + 604800;
					console.log(suan + " - " + haftayaki_zaman + " - " + userData[diziler[i]]["time"] );
					if(userData[diziler[i]]["time"] > suan && userData[diziler[i]]["time"] < haftayaki_zaman)
					{
						
						var tarihcevir = new Date(userData[diziler[i]]["time"]*1000)
						console.log(tarihcevir);
					output("-" + tarihcevir.getDate() + "/" + (tarihcevir.getMonth() + 1) + "/" + tarihcevir.getFullYear() + " - " + userData[diziler[i]]["describe"]);	
					}
					
					//console.log(diziler[i]) Keyini Yazdırıyor.
				}
				
			});
			
	
}


//ParticlesBG
particlesJS('particles-js',{'particles':{'number':{'value':50},'color':{'value':'#ffffff'},'shape':{'type':'triangle','polygon':{'nb_sides':5}},'opacity':{'value':0.06,'random':false},'size':{'value':11,'random':true},'line_linked':{'enable':true,'distance':150,'color':'#ffffff','opacity':0.4,'width':1},'move':{'enable':true,'speed':4,'direction':'none','random':false,'straight':false,'out_mode':'out','bounce':false}},'interactivity':{'detect_on':'canvas','events':{'onhover':{'enable':false},'onclick':{'enable':true,'mode':'push'},'resize':true},'modes':{'push':{'particles_nb':4}}},'retina_detect':true},function(){});