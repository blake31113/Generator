$(function() {

    $j('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
$(function() {
    $j(window).bind("load resize", function() {
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $j('div.sidebar-collapse').addClass('collapse')
        } else {
            $j('div.sidebar-collapse').removeClass('collapse')
        }
    })
})
