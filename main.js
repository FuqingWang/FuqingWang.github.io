$(document).ready(function(){
    
    $(window).scroll(function(){
        $('.hide').each(function(){
            var bottom_object = $(this).offset().top + $(this).outerHeight()-400;
            var bottom_window = $(window).scrollTop() + $(window).height();
            
            if(bottom_window > bottom_object){
                console.log(bottom_window+" "+bottom_object);
                $(this).animate({'opacity':'1'}, 800);
            }
        });
    });
});