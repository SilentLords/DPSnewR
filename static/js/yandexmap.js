var myMap;
 
    ymaps.ready(init);
 
	//Определение начальных параметров карты
    function init () {
        myMap = new ymaps.Map("map", {
        center: [56.326944, 44.0075], 
        zoom: 12
        }, {
            balloonMaxWidth: 800
            });
 
	//Добавляем элементы управления	
	myMap.controls                
        .add('zoomControl')                
        .add('typeSelector')                
        .add('mapTools');		
}
$('#image').change(function(){
    $('.add-on').find('img:first').attr('src', $('#image option:selected').attr('data-path'));
});
var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(<strong> $[properties.name] + $[properties.description]);