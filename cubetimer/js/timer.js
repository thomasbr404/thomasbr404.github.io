/*
 *		timer.js 
 */

var Timer = function(DOM_element, DOM_scramble){
	
	this.start_t = null;
	this.interval = null;
	this.DOM = DOM_element;
	this.DOM_scramble = DOM_scramble;
	
	/**
	 * toggle start stop of current timer
	 */
	this.toggle = function(){
		this.interval==null? this.start() : this.end();
	}

	/**
	 * start timer ticking
	 */
	this.start = function(){
		
		// create the starting point
		this.start_t = new Date();
		
		// store this in another reference to be accessible from update function
		var myself = this;
		
		// updating document with time
		var inline_update = function(){ myself.update(); }
		
		// execute this function every 10 milliseconds to give the speed effect
		this.interval = setInterval( inline_update, 10);
	}

	/**
	 * generate scrambling 
	 */
	 this.scramble = function(){
		 
		// predefine faces and other arrays
		var moves = ['R','L','U','D','F','B'];
		var prime = ['','`'];
		var repeat = ['','2'];
		var numberOfSteps = 25;

		// let's scrumble
		var scrambles = '';
		var lastMove = -1;

		// generate 25 moves
		for( var i=0; i<numberOfSteps; i++ ){
			
			// make sure the next move is not the same as the last
			do{
				var thisMove = Math.floor(Math.random()*moves.length);
			}while( thisMove==lastMove );
			// set lastMove with thisMove
			lastMove = thisMove;
			
			// will it be counter clockwise or clockwise
			var thisPrime = Math.floor(Math.random()*prime.length);
			
			// will be repeated ? in case of it is not prime
			var thisRepeat = thisPrime==0 
				? Math.floor(Math.random()*repeat.length)
				: 0;
			
			// add the new move to the scrambling array
			scrambles += moves[thisMove]+prime[thisPrime]+repeat[thisRepeat]+' ';
			
		}

		this.DOM_scramble.innerHTML = scrambles;
	 }
	 
	/**
	 * stop updating the DOM and clear the interval from object
	 */
	this.end = function(){
		clearInterval(this.interval);
		this.interval = null;
		timer_obj.scramble();
	}
	
	 this.update = function(){
			// get the ellapsed milliseconds
			var ellapsed = ( (new Date()-this.start_t)/1000 );
			// calculate minutes
			var minutes  = ellapsed<60 ? 0 : Math.floor(Math.floor(ellapsed)/60);
			// fix to 3 digits after the floating point
			ellapsed = (ellapsed%60).toFixed( 3 );
			// get teh time element
			// set minutes : seconds.milliseconds 
			this.DOM.innerHTML = minutes.toString() + ':' + ellapsed;
	}
}
