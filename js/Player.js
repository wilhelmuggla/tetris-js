
//piece class
class Player {

	constructor (tetris, shadow = false){

		//if pice is shadowpice
		this.shadow = shadow;

		//loading main class
		this.tetris = tetris;

		//loading arena
		this.arena  = tetris.arena;


		this.dropCounter = 0;
		this.dropInterval = 1000;
		this.hold_matrix = null;
	    this.pos = {x: 0, y: 0};
	    this.matrix = null;
	    this.score = 0;
	    this.reset();
		
	}

	//returns array of pice
	createPiece(type){

	    if (type === 'I') {
	        return [
	            [0, 1, 0, 0],
	            [0, 1, 0, 0],
	            [0, 1, 0, 0],
	            [0, 1, 0, 0],
	        ];
	    } else if (type === 'L') {
	        return [
	            [0, 2, 0],
	            [0, 2, 0],
	            [0, 2, 2],
	        ];
	    } else if (type === 'J') {
	        return [
	            [0, 3, 0],
	            [0, 3, 0],
	            [3, 3, 0],
	        ];
	    } else if (type === 'O') {
	        return [
	            [4, 4],
	            [4, 4],
	        ];
	    } else if (type === 'Z') {
	        return [
	            [5, 5, 0],
	            [0, 5, 5],
	            [0, 0, 0],
	        ];
	    } else if (type === 'S') {
	        return [
	            [0, 6, 6],
	            [6, 6, 0],
	            [0, 0, 0],
	        ];
	    } else if (type === 'T') {
	        return [
	            [0, 7, 0],
	            [7, 7, 7],
	            [0, 0, 0],
	        ];
	    }
	}

	//drops pice one pos 
	drop() {
	    this.pos.y++;
	    if (this.arena.collide(this)) {
	        this.pos.y--;
	        this.arena.merge(this);
	        this.reset();
	        //this.rotate_matrix(this.matrix, -1);
	        this.tetris.updateScore();
	    }
	    this.dropCounter = 0;

	}

	//drop pice until collision
	dropBottom() {
	 while(!this.arena.collide(this)){
	     this.pos.y++;
	    }
	    this.pos.y--;
	    this.arena.merge(this);
	    this.reset();
	    this.arena.sweep(this);
	    this.tetris.updateScore();

	}

	//takes care of the shadow pice
	shadow_bottom() {
	 while(!this.arena.collide(this)){
	     this.pos.y++;
	    }
	    this.pos.y--;
	}
	  

	//moves the pice
	 move(dir) {
	    this.pos.x += dir;
	    if (this.arena.collide(this)) {
	        this.pos.x -= dir;
	    }
	}

	//creating new pice
	 reset(hold_matrix = null) {
	    const pieces = 'TJLOSZI';
	    
	    if(hold_matrix != null){
	    	this.matrix = hold_matrix;

	    } else {
	    	this.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
		}

	    this.pos.y = 0;
	    this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
	                   (this.matrix[0].length / 2 | 0);
	    if (this.arena.collide(this)) {
	        this.arena.matrix.forEach(row => row.fill(0));
	        this.score = 0;
	        this.tetris.updateScore();
	    }


	}

	//hold pice in the other canvas, sets this.hold_matrix
	hold () {
		if(this.hold_matrix != null ) {
			let new_hold_matrix = this.matrix;
			this.reset(this.hold_matrix);
			this.hold_matrix = new_hold_matrix;
		} else {
			this.hold_matrix = this.matrix;
			this.reset();
		}
	}


	//rotate pice
	rotate (dir) {
		const pos = this.pos.x;
		let offset = 1;
		this.rotate_matrix(this.matrix, dir);
		while(this.arena.collide(this)){
			this.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > this.martix[0].length){
				rotate(player.matrix, -dir);
				this.pos.x = pos;
				return;
			}


		}

	}

	//rotate pice
	rotate_matrix(matrix, dir) {
	    for (let y = 0; y < matrix.length; ++y) {
	        for (let x = 0; x < y; ++x) {
	            [
	                matrix[x][y],
	                matrix[y][x],
	            ] = [
	                matrix[y][x],
	                matrix[x][y],
	            ];
	        }
	    }

	    if (dir > 0) {
	        matrix.forEach(row => row.reverse());
	    } else {
	        matrix.reverse();
	    }
	}


	update(deltaTime){
	  	this.dropCounter += deltaTime;
	    if (this.dropCounter > this.dropInterval) {
	        this.drop();
	        if (this.shadow === true) {
	       		this.shadow_bottom();

	        }
	    } 

	}


}
