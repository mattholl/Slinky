//Globals
var canvas,
	ctx,
	rings = [],
	centre = {};


function setup() {
	//use dom emthods to attach the canvas to the page
	canvas = document.getElementById("dancer");
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	
    centre = {
    	x : canvas.width / 2,
    	y : canvas.height / 2
    };

    rings[0] = {
    	outerRadius : 100,
    	innerRadius : 50,
    	update : function() {
    		this.outerRadius += 2;
    		this.innerRadius += 1;
    	},
    	display : function() {
    		//console.log(this);
    		ctx.save();

    		ctx.beginPath()
			ctx.arc(centre.x, centre.y, this.outerRadius, 0, 2*Math.PI);
			ctx.fillStyle = '#b4b4b4';
			ctx.fill();

			ctx.globalCompositeOperation = 'destination-out';

			ctx.beginPath();
			ctx.arc(centre.x, centre.y, this.innerRadius, 0, 2*Math.PI);
    		ctx.fillStyle = '#4d4d4d';
    		ctx.fill();

    		ctx.restore();
    	}
    };

    rings[1] = {
    	outerRadius : 10,
    	innerRadius : 5,
    	update : function() {
    		this.outerRadius += 2;
    		this.innerRadius += 1;
    	},
    	display : function() {
    		//console.log(this);
    		ctx.save();

    		ctx.beginPath()
			ctx.arc(centre.x, centre.y, this.outerRadius, 0, 2*Math.PI);
			ctx.fillStyle = '#d4b3c2';
			ctx.fill();

			ctx.globalCompositeOperation = 'destination-out';

			ctx.beginPath();
			ctx.arc(centre.x, centre.y, this.innerRadius, 0, 2*Math.PI);
    		ctx.fillStyle = '#b64400';
    		ctx.fill();

    		ctx.restore();
    	}
    };

    draw();
}

//http://creativejs.com/resources/requestanimationframe/
var fps = 15;
function draw() {

	window.addEventListener('resize', setup, false);

    setTimeout(function() {
        requestAnimationFrame(draw);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        rings[0].update();
        rings[0].display();

        rings[1].update();
        rings[1].display();
       
        
    }, 1000 / fps);
}

window.onload = setup;