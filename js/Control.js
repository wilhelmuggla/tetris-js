
class Control {
	constructor(document){
		this.document = document;
	}
	
	//diffrent key presses
	add_control(){
		this.document.addEventListener('keydown', event => {
		        const player = tetris.player;
		        if(pause !== true) {
		            if (event.keyCode === 37) {
		                player.move(-1);
		            } else if (event.keyCode === 39) {
		                player.move(1);
		            } else if (event.keyCode === 40) {
		                player.drop();
		            } else if (event.keyCode === 81 || event.keyCode === 38) {
		                player.rotate(-1);
		            } else if (event.keyCode === 87) {
		                player.rotate(1);
		            }  else if (event.keyCode === 32) {
		               player.dropBottom();
		            }  else if (event.keyCode === 67) {
		            	player.hold();
		            } 
		        }	
		        if (event.keyCode === 80) {
		           tetris.pause_game();
		        }
		});


		//if pause button is clicked
		this.document.getElementById("pause").addEventListener("click", tetris.pause_game);
	}


}