var okToSwipeBack = false;
var okToSwipeNext = false;
var touchSwipeSetup = false;

 function setupTouchSwipe()  {

      //Enable swiping...

      if(touchSwipeSetup == false) { 
        $("#div_Slide").swipe( {

        //Generic swipe handler for all directions

        swipe:function(event, direction, distance, duration, fingerCount) {

                      console.log("You swiped " + direction );  

                      if( direction === 'right' && okToSwipeBack=== true){

                                          // swipe right - go next

                                         
		       cpCmndPreviousSlide = 1;

                      } else {
		 if( direction === 'left' && okToSwipeNext=== true){
                                          // swipe left - go prev

                                         
			cpCmndNextSlide = 1;
		}
                      }
 },

        //Default is 75px, set to 0 for demo so any distance triggers swipe

         threshold:25

      });
console.log("touch events enabled for CGEE Oyster");
touchSwipeSetup = true;
      }
    }

  