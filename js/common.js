// Прижимаем футер к низу страницы
function footer_bottom() {
	if($("footer").is(".footer_main")){ 
		var footer_h = $(".footer_main").outerHeight();
		$(".wrapper").css("padding-bottom", footer_h);
	}
}
// Прижимаем футер к низу страницы
function header_top() {
	var header_h = $(".main_header").outerHeight();
	$(".body_chocolate").css("min-height", $(window).height() - header_h);
	// alert(header_h);
}
// Выполняем при загрузке и при ресайзе
$(document).ready(function(){
	function onResize(){
		// footer_bottom(); // функция кот. выполняется
		header_top(); 
		// setTimeout(function(){}, 200);
		footer_bottom();
	}onResize();
	$(window).resize(onResize);
});





// параллакс фона
$(".wrapper").mousemove(function(e) {
	var win_w = $(window).width();
	if(win_w > 768){
		parallaxIt(e, ".background_choco .img_1", -100);
		parallaxIt(e, ".background_choco .img_2", -50);
	}
	// parallaxIt(e, ".slide2", -180);
	// parallaxIt(e, ".slide3", -230);
	// parallaxIt(e, ".slide4", -130);
	// parallaxIt(e, ".slide5", -330);
});

function parallaxIt(e, target, movement) {
	var $this = $(".wrapper");
	var relX = e.pageX - $this.offset().left;
	var relY = e.pageY - $this.offset().top;

	TweenMax.to(target, 1, {
		x: (relX - $this.width() / 2) / $this.width() * movement,
		y: (relY - $this.height() / 2) / $this.height() * movement
	});
}






// тест для демонстрации добавления класса active
$(".quest").on("click", function(){
	$(this).toggleClass("active");
})











// функция для открытия всплывающей формы
function show_popup(form_number){
	$("[data-flag="+form_number+"]").css("display","inline-block");
	$(".popup_bg").css('display','block').delay(100).queue(function () {  // delay() позволяет сделать паузу 
		$(".popup_bg").css('opacity', '1');
		$("body").css('overflow-y','hidden'); 
		$(".popup_bg").dequeue(); //должно применяться к тому же элементу что и .queue
	});
	// alert(form_number);
}
// функция для закрытия всплывающей формы
function close_popup(){
	$(".popup_bg").css('opacity','0').delay(200).queue(function () {  // delay() позволяет сделать паузу между изменениями свойств
		$(".popup_bg").css('display', 'none');
		$("body").css('overflow-y','auto'); 
		$(".popup_bg .popup_block").css("display","none");
		$(".popup_bg").dequeue(); //должно применяться к тому же элементу что и .queue
		// $(".popup_form").css("display","none");
		//$("[data-form-ident="+form_number+"]").css("display","none"); заменил на верхнее если что пробуем этот вариант
	}); 
};

// При клике открываем попап
$(".open_form").on("click",function() {
	var form_number = $(this).data("form");
	show_popup(form_number);
});

// Закрываем попап
$(".popup_bg, .close_popup").on("click", function(){
	close_popup();
}).children().click(function(e){        // вешаем на потомков
	e.stopPropagation();   // предотвращаем распространение на потомков
});



// видео rutube
$(function(){
	if($("iframe").is("#video_player")){

		var player = document.getElementById('video_player');
		setTimeout(function(){
			// смена цвета проигрывателя
			player.contentWindow.postMessage(JSON.stringify({
					type: 'player:setSkinColor',
					data: {
						color: 'F2403E'
					}
			}), '*');
		},500);	

		// ставим на паузу при загрузке
		player.contentWindow.postMessage(JSON.stringify({
			type: 'player:pause',
		}), '*');

		$(".popup_bg, .close_popup").on("click", function(){
			player.contentWindow.postMessage(JSON.stringify({
				type: 'player:pause',
			}), '*');
		});	
		
	}//if
})





// механизм переключения блоков
$(".show_block").on("click",function(){
	var id = $(this).data("id");
	change_block(id);

});

// функция отвечающая за переключение блоков на главной 
function change_block(id){
	if(!$("#"+ id +"").hasClass('active_block')){
		$('.active_block').css('opacity','0').delay(150).queue(function () {
			$(this).removeClass("active_block");
			$(this).css('display', 'none').dequeue();

			$("#"+ id +"").css('display','inline-block').delay(150).queue(function () {
				$(this).css('opacity', '1').dequeue();
				$(this).addClass("active_block");
			});
		});
	}
}





// бургер
$(".burger_button").on("click", function() {
  // $(this).toggleClass("on");
  $(".burger_menu").slideDown(function(){
  	$("body").addClass("no_scroll");
  });
});

$(".close_burger").on("click", function() {
  // $(this).toggleClass("on");
  $(".burger_menu").slideUp(function(){
  	$("body").removeClass("no_scroll");
  });
});