let price =  19.90;


$(document).ready(function(){
	
 if ((localStorage.getItem('incart') != null) && (localStorage.getItem('incart') != 0)) {
	$('.menu__cart').text(localStorage.getItem('incart'));
	$('.menu__cart').addClass('menu__cart--full');	
	showLinks();	
}
	
	$('.effect__list-item').click(function() {		
		$('.effect__list-item').removeClass('effect__list-item--selected');		
		$(this).addClass('effect__list-item--selected');
		var curPane = "." + $(this).attr('data-pane');
		$('.effect__graf').removeClass('effect__graf--visible');
		$(curPane).addClass('effect__graf--visible');
	});
	
	showComments ();
	
	$('.testimonials__showbtn').click(function() {		
		$('.testimonials__item').removeClass('hidden');	
		$(".testimonials__hidebtn").show();	
		$('.testimonials__showbtn').hide();
	});
	
	$(".testimonials__hidebtn").click(function() {
			$('.testimonials__showbtn').show();			
			$('.testimonials__hidebtn').hide();
			showComments ();			
		});
	
	$('.menu__trigger').click(function() {		
		$('.menu__list').toggleClass('visible');
		$('.menu__trigger').toggleClass('expanded');		
	});
	
	$('.menu__list li a').click(function() {		
		$('.menu__list').removeClass('visible');
		$('.menu__trigger').removeClass('expanded');		
	});
	$('.menu__list li a').click(function() {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html, body').animate({ scrollTop: destination }, 800);
		return false;
	});
	
	let startVal = parseInt(localStorage.getItem('incart'));
	$('.cart__ship-sum span').html((startVal*price).toFixed(2));
	$('.cart__step-total span').html(((startVal)*price).toFixed(2));
	$('.cart__ship-line2 span').html(startVal);
	$('.cart__total-text span').html((startVal*price+2).toFixed(2));
	$('.cart__quantity-input').val(startVal);
	
	
	$('.cart__quantity-button--plus').click(function() {	
		let curVal = $(".cart__quantity-input").val();		
		$(".cart__quantity-input").val();	
		$(".cart__quantity-input").val(parseInt(curVal) + 1);
		$('.cart__ship-sum span').html(((parseInt(curVal) + 1)*price).toFixed(2));
		$('.cart__step-total span').html(((parseInt(curVal) + 1)*price).toFixed(2));
		$('.cart__ship-line2 span').html(parseInt(curVal) + 1);
		$('.cart__total-text span').html(((parseInt(curVal) + 1)*price+2).toFixed(2));	
		localStorage.setItem("incart", parseInt(curVal) + 1);
						
	});
	
	$('.cart__quantity-button--minus').click(function() {	
		let curVal = $(".cart__quantity-input").val();			
				
		if (curVal > 1) {	
			$(".cart__quantity-input").val();	
			$(".cart__quantity-input").val(parseInt(curVal) - 1);	
			$('.cart__ship-sum span').html(((parseInt(curVal) - 1)*price).toFixed(2));
			$('.cart__step-total span').html(((parseInt(curVal) - 1)*price).toFixed(2));
			$('.cart__ship-line2 span').html(parseInt(curVal) - 1);				
			$('.cart__total-text span').html(((parseInt(curVal) - 1)*price+2).toFixed(2));
			localStorage.setItem("incart", parseInt(curVal) - 1);
		}
	});
	
	$('.cart__button--step1').click(function() {			
		if(validPromo($('.name').val()) && $('.phone').val()) {
			$('.name').parent().next('.cart__error').hide();
			$('.phone').parent().next('.cart__error').hide();
			$('.name').removeClass('error');
			$('.phone').removeClass('error');
			$(".cart__item-1").addClass('cart__block-item--visible');	
			$(".cart__item-start").removeClass('cart__block-item--visible');
			$(".cart__item-form1").removeClass('cart__block-item--visible');
			$(".cart__item-2").removeClass('cart__block-item--visible');
			$(".cart__item-form2").addClass('cart__block-item--visible');
			$(".cart__item-res1").addClass('cart__block-item--visible');
			localStorage.setItem("uphone", $('.phone').val());
			localStorage.setItem("uname", $('.name').val());
			$(".uname").text( $('.name').val());
			$(".uphone").text( $('.phone').val());
		}
		else {
			if(!$('.name').val()) {
				$('.name').addClass('error');
				$('.name').parent().next('.cart__error').show();
			}
			if(!$('.phone').val()) {
				$('.phone').addClass('error');
				$('.phone').parent().next('.cart__error').show();
			}
		}
	});
	
	$('.cart__button--step2').click(function() {	
	
			$(".cart__item-3").removeClass('cart__block-item--visible');
			$(".cart__item-res2").addClass('cart__block-item--visible');
			$(".cart__item-form2").removeClass('cart__block-item--visible');
			$(".cart__item-2").removeClass('cart__block-item--visible');
			$(".cart__item-form3").addClass('cart__block-item--visible');
			if ($('.city').val()){
				localStorage.setItem("ucity", $('.city').val());			
				$(".ucity").text( $('.city').val());
			}
			if ($('.address').val()){
				localStorage.setItem("uaddress", $('.address').val());			
				$(".uaddress").text( $('.address').val());
			}			
		
	});
	
	$('.cart__block-edit1').click(function() {	
		$(".cart__item-start").addClass('cart__block-item--visible');
		$(".cart__item-1").removeClass('cart__block-item--visible');
	}); 
	
	$('.bye__button, .header__button').click(function() {	
		showLinks();
		localStorage.setItem("incart", 1);		
	});

 $(".phone").mask('+34 999 999 999', {autoclear: false, placeholder:"_"}).on('click', function () {
  if ($(this).val() === '___ ___ ___ ___') {
    $(this).get(0).setSelectionRange(0, 0);
  };
	});
	$('.cart__button-end').click(function() {	
		let clientData ={
			count: document.querySelector('.cart__quantity-input').value,
			discount: document.querySelector('.cart__promo-block>input').value,
			name: document.querySelector('.cart__input .name').value,
			phone: document.querySelector('.cart__input .phone').value,
			city: document.querySelector('.cart__input .city').value,
			address: document.querySelector('.cart__input .address').value,
			comment: document.querySelector('.cart__input .comment').value
		};
		localStorage.setItem('clientData', JSON.stringify(clientData));
		localStorage.setItem("uq", $(".cart__quantity-input").val());
		$.ajax({
		url:"app.php",
		method:"POST",
		data:clientData,
			success: d => {								
				console.log("Form saving response: ",d); 				
				sessionStorage.clear();
				window.location.href = "/result.html";
				
			}				
		})		
	});
	
	

	$('.cart__block-edit2').click(function() {	
		$(".cart__item-res1").removeClass('cart__block-item--visible');
		$(".cart__item-form1").addClass('cart__block-item--visible');
	}); 
	$('.cart__block-edit3').click(function() {	
		$(".cart__item-res2").removeClass('cart__block-item--visible');
		$(".cart__item-form2").addClass('cart__block-item--visible');
	}); 

	$('.cart__promo-block button').click(function() {		
		if (!validPromo($('.cart__promo-block input').val())) {
			$('.cart__promo-block input').addClass('error');
			$('.cart__promo-error').show();	
		}
		else {
			$('.cart__promo-block input').removeClass('error');
			$('.cart__promo-error').hide();
		}
	});	
	
	
	
	if ($(window).width() < 765) {	
		$('.effect__list').slick({			
			infinite: false,
			dots: false,
			arrows: false,			
			variableWidth: true,				
			asNavFor: '.effect__grafs',			
		});	
		
		$('.effect__grafs').slick({			
			infinite: false,
			dots: false,
			arrows: false,
			asNavFor: '.effect__list',	
		});	
		
		$('.about__advantages').slick({			
			infinite: true,
			dots: false,
			arrows: false,	
			slidesToShow: 2,
			slidesToScroll: 1,  			
		});	
		
		 
	}
});

$(window).scroll(function() {
	if ($(this).scrollTop() > 50) {
		$('.menu-main').addClass('fixed');			
	} else {
		$('.menu-main').removeClass('fixed');			 
	}
 })	

function validPromo(txt) {
	var re = /^[a-z]+$/i;
	return re.test(txt);
}
function validName(txt) {
	var re =  /^[-a-z -]+$/i;
	return re.test(txt);
}

function showComments () {
	var repl  = $('.testimonials__item').length;	
	if (repl > 3) {
		$('.testimonials__item').addClass('hidden');
		$('.testimonials__list').each(function() {		
		  $(this).find('.testimonials__item').slice(0, 3).removeClass('hidden');			    
		});
	}	
}
function showLinks (){
	$('.bye__button').hide();
	$('.header__button').hide();	
	$('.bye__button-link').css('display', 'block');
	$('.header__button-link').css('display', 'block');
	$('.menu__cart1').hide();
	$('.menu__cart2').show();
	$('.menu__cart2').addClass('menu__cart--full'); 	
}

$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};