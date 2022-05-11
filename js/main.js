//global variabels
let pause = true;
let lastTime = 0;

	//loading canvas
	const canvas = document.getElementById('tetris');
	const holder = document.getElementById('holder');


	//main class 
	const tetris = new Tetris(canvas, holder);

	//controllers class
	const control = new Control(document).add_control();


//main loop
function update(time = 0) {
	if (pause !== true) {

	const deltaTime = time - lastTime;
	tetris.player.update(deltaTime);
	lastTime = time;
	tetris.draw();
		requestAnimationFrame(update);


	}
}


//running main loop
update();

