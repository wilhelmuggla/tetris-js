class Tetris {
	constructor(canvas, holder){

		//loading main canvas
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.context.scale(20, 20);

		//loading holder canvas
		this.holder = holder;
		this.context_holder = this.holder.getContext('2d');
		this.context_holder.scale(20, 20);

		//creates area object
		this.arena = new Arena(12, 20);

		//pice object
		this.player = new Player(this);

		//shadow pice object
		this.shadow = new Player(this, true);


		//colors for the pices
		this.colors = [
		    null,
		    '#FF0D72',
		    '#0DC2FF',
		    '#0DFF72',
		    '#F538FF',
		    '#FF8E0D',
		    '#FFE138',
		    '#3877FF',
		];

		let lastTime = 0;	
		
		this.updateScore();
	}	

	//draw on the canvas in the main loop
	draw() {
		//background for main canvas
	    this.context.fillStyle = '#000';
	    this.context.fillRect(0, 0, canvas.width, canvas.height);

	    //draw out the arena
	    this.drawMatrix(this.arena.matrix, {x: 0, y: 0}, this.context);

	    //draw out the pice
	    this.drawMatrix(this.player.matrix, this.player.pos, this.context);

	    //if holding pice is set, draw i out
	    if(this.player.hold_matrix != null){
	    	this.context_holder.fillStyle = '#000';
	    	this.context_holder.fillRect(0, 0, holder.width, holder.height);
		   	this.drawMatrix(this.player.hold_matrix, {x: 0.2, y: 0.2}, this.context_holder);
		}


		//draw out the shadow pice
	    this.drawMatrix(this.shadow.matrix, this.shadow.pos, this.context, true);
	    this.shadow.pos.x = this.player.pos.x;
	    this.shadow.shadow_bottom();
	    this.shadow.matrix = this.player.matrix;
	}

	//converts array matrix into pice 
	drawMatrix(matrix, offset, context, shadow_mode = false) {
	    matrix.forEach((row, y) => {
	        row.forEach((value, x) => {
	            if (value !== 0) {
	                context.fillStyle = this.colors[value];
	                //separate color for the shadow pices
	                if (shadow_mode == true) {
	                    context.fillStyle = "rgba(114, 126, 140, 0.5)";
	                } 
	                context.fillRect(x + offset.x,
	                                 y + offset.y,
	                                 1, 1);
	               
	            }
	        });
	    });
	}
	//pause game 
	pause_game() {
	    if(pause == false) {
	        pause = true;
	    }
	    else {
	        pause = false;
	    }
	update();
	}

	//update score
	updateScore() {
	    document.getElementById('score').innerText = "score: " + this.player.score;
	}


}