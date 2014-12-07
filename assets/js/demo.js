var MainNavToggle = {
};

var FitVids = {
    init: function () {
        $(document).ready(function(){
        // Target your .container, .wrapper, .post, etc.
            $(".video-gallery").fitVids();
        });
    }
};

// Allow anchors to gracefully scroll into view.  Will be removed shortly
var ScrollIntoView = {
};

var DropkickSelect = {
};


var ClickHomepageImage = {
};


var Optimizations = {
};

// Maintain Homepage Grid with offset usage in javascript and jquery
var MaintainHomepageGrid = {
};

//var SlidrCarousel = {
    //init: function (){
        //var s = slidr.create('slidr-hero')
        //var vs = slidr.create('slidr-video')
        //s.add('h', ['one', 'two', 'three', 'one']);
        //s.auto();

        //vs.add('h', ['one', 'two', 'three', 'one']);
        //vs.start();
    //} // End init function
//};

var Overlay = {
    init: function() {

        var triggerBttn = $( '.li-img' ),
        overlay = $( '.overlay' ),
        closeBttn = $( 'button.overlay-close' );

        function toggleOverlay() {
            if( !overlay.hasClass('open')) {
                $('.overlay nav').html( '' );
                overlay.removeClass('close');
                overlay.addClass('open');
                //overlayImage = $(this).find( 'img' )[0];
                //console.log( $(this) );
                //console.log( $(this).find('img')[0] );
                //$(this).clone().appendTo( '.overlay nav' );
                //$( '.overlay nav' ).html(overlayImage);
            }else
            if( overlay.hasClass( 'open' ) ) {
                overlay.addClass('close');
                overlay.removeClass('open');
            }
        }

        $(triggerBttn).on('click', toggleOverlay);
        $(closeBttn).on('click', toggleOverlay);

    }
}

var Fluidbox = {
    init: function() {

        $(' .gallery a ').fluidbox();

    }
}

var ToggleList = {
    init: function() {

        $(' .tab-list li ').on('click', function(){
            $(this).next().slideToggle( "slow", function() {
                // Animation complete.
            });
        });

    }
}


//SlidrCarousel.init();
ToggleList.init();
//Fluidbox.init();
//FitVids.init();
//MainNavToggle.init();
//ScrollIntoView.init();
//DropkickSelect.init();
//ClickHomepageImage.init();
//Optimizations.init();
//MaintainHomepageGrid.init();
