var $items = $('.carouselTest img'), // a collection of all of the slides, caching for performance
	$captions = $('.carouselTest figcaption'),
	numItems = $items.length,
	w = $('#parent-carousel-1').width(),
	h = $('#parent-carousel-1').height(),
	myInterval,
	resized_width = new Array(),
	resized_height = new Array(),
	counter = numItems,
	isVertical = true,
	width_to_height_ratio = w/h;
	out = 0;

function calculateResizedWidth()
{
	var i;
	for ( i = 0; i < numItems; i++)
	{
		resized_width[i] = $items.eq(i).width() / ( $items.eq(i).height() / h );
	}
}

function calculateResizedHeight()
{
	var i;
	for ( i = 0; i < numItems; i++)
	{
		resized_height[i] = $items.eq(i).height() / ( $items.eq(i).width() / w );
	}
}


function setupPosition(){
	$items.each(function(){
		$(this).css('left', w + w + 'px');
		$(this).css('opacity', 1);
	})
}

function setupCaption(){
	$captions.each(function(){
		$(this).css('left', w + w + 'px');
	})
}

function increaseCounter(){
	if (counter < 0)
	{
		counter += numItems;
	}
}

function placePictureVertical(n){
	var main_left = ( w - resized_width[n % numItems]) / 2;
	$items.eq(n % numItems).css('top', 0 + 'px');
	$items.eq(n % numItems).css('height', h + 'px');
	$items.eq(n % numItems).css('width', resized_width[n % numItems] + 'px');
	$items.eq(n % numItems).css('left', main_left + 'px');
	$captions.eq(n % numItems).css('left', main_left + 'px');
	$captions.eq(n % numItems).css('width', resized_width[n % numItems] + 'px');

	// Picture to the right
	$items.eq( (n + 1) % numItems).css('height', h + 'px');
	$items.eq( (n + 1) % numItems).css('top', 0 + 'px');
	$items.eq( (n + 1) % numItems).css('width', resized_width[ (n + 1) % numItems] + 'px');
	$items.eq( (n + 1) % numItems).css('left', main_left + resized_width[n % numItems] + 10 + 'px');
	$items.eq( (n + 1) % numItems).css('opacity', 0.3);

	// Another picture to the right
	$items.eq( (n + 2) % numItems).css('height', h + 'px');
	$items.eq( (n + 2) % numItems).css('top', 0 + 'px');
	$items.eq( (n + 2) % numItems).css('width', resized_width[ (n + 2) % numItems] + 'px');
	$items.eq( (n + 2) % numItems).css('left', main_left + resized_width[n % numItems] + resized_width[ ( n + 1 ) % numItems] + 20 + 'px');
	$items.eq( (n + 2) % numItems).css('opacity', 0.1);

	// Picture to the left
	$items.eq( (n - 1) % numItems).css('height', h + 'px');
	$items.eq( (n - 1) % numItems).css('top', 0 + 'px');
	$items.eq( (n - 1) % numItems).css('width', resized_width[ (n - 1 + numItems) % numItems] + 'px');
	$items.eq( (n - 1) % numItems).css('left', main_left - resized_width[ (n - 1 + numItems) % numItems] - 10 + 'px');
	$items.eq( (n - 1) % numItems).css('opacity', 0.3);

	// Another picture to the left
	$items.eq( (n - 2) % numItems).css('height', h + 'px');
	$items.eq( (n - 2) % numItems).css('top', 0 + 'px');
	$items.eq( (n - 2) % numItems).css('width', resized_width[ (n - 2 + numItems) % numItems] + 'px');
	$items.eq( (n - 2) % numItems).css('left', main_left - resized_width[ (n - 1 + numItems) % numItems] - resized_width[ (n - 2 + numItems) % numItems] - 20 + 'px');
	$items.eq( (n - 2) % numItems).css('opacity', 0.1);
}

function placePictureHorizontal(n){

	$items.eq(n % numItems).css('height', resized_height[n % numItems] + 'px');
	$items.eq(n % numItems).css('top', ((h - resized_height[n % numItems])/ 2) + 'px');
	$items.eq(n % numItems).css('width', w + 'px');
	$items.eq(n % numItems).css('left', 0 + 'px');
	$captions.eq(n % numItems).css('left', 0 + 'px');
	$captions.eq(n % numItems).css('width', w + 'px');
}

function checkRatio(n){
	var picture_ratio = $items.eq(n % numItems).width() / $items.eq(n % numItems).height();
	var picture_w = $items.eq(n % numItems).width();
	setupPosition();
	setupCaption();
	if((picture_w > w) && (picture_ratio > width_to_height_ratio)){
		placePictureHorizontal(counter);
	} else if ((picture_w < w) && (picture_ratio > width_to_height_ratio)){
		placePictureHorizontal(counter);
	}
	else{
		placePictureVertical(counter);
	}
	// if (picture_ratio > width_to_height_ratio){
	//
	// 	placePictureHorizontal(counter);
	// }
	// else {
	// 	placePictureVertical(counter);
	// }
}

function moveLeft(){
	counter--;
	increaseCounter();
	setupPosition();
	setupCaption();
	if (isVertical)
	{
		placePictureVertical(counter);
	}
	else
	{
		placePictureHorizontal(counter);
	}
	checkRatio(counter);
}

function moveRight(){
	counter++;
	setupPosition();
	setupCaption();
	if (isVertical)
	{
		placePictureVertical(counter);
	}
	else
	{
		placePictureHorizontal(counter);
	}
	checkRatio(counter);
}


$('#bPlay').on('click', function(){
	myInterval = setInterval(moveRight, 2500);
});

$('#bPause').on('click', function(){
	clearInterval(myInterval);
});

$('.prev').on('click', function(){
	moveLeft();
});

$('.next').on('click', function(){
	moveRight();
});

$('figure').on('swipeleft',function(){
  moveRight();
});

$('figure').on('swiperight',function(){
  moveLeft();
});

function rotate_screen(){
	setupPosition();
	setupCaption();
	if (isVertical)
	{
		isVertical = false;
		placePictureHorizontal(counter);
	}
	else
	{
		isVertical = true;
		placePictureVertical(counter);
	}
}

$('#bSwitch').on('click', function(){
	rotate_screen();
});

$('#bReset').on('click', function(){
	setupPosition();
	setupCaption();
	counter = 0;
	if (isVertical)
	{
		placePictureVertical(counter);
	}
	else
	{
		placePictureHorizontal(counter);
	}
});

$( window ).resize(function(){
	clearTimeout(out);
	out = setTimeout(function(){
		w = $('#parent-carousel-1').width();
		h = $('#parent-carousel-1').height();
		width_to_height_ratio = w/h;
		calculateResizedWidth();
		calculateResizedHeight();
		// setupPosition();
		// setupCaption();
		// if (isVertical)
		// {
		// 	placePictureVertical(counter);
		// }
		// else
		// {
		// 	placePictureHorizontal(counter);
		// }
		checkRatio(counter);
	}, 200);

});

$(document).keydown(function(e) {
    switch(e.which) {
    		case 37: // left
    			moveLeft();
    			break;

    		case 39: // right
    			moveRight();
    			break;
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).ready(function(){
	setupPosition();
	setupCaption();
	calculateResizedWidth();
	calculateResizedHeight();
	checkRatio(counter);
});
