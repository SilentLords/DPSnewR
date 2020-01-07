// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
var myMap;
var MyIconContentLayout;
ymaps.ready(init);

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let csrftoken = getCookie('csrftoken');
let time = NaN;

function placeold(id_m, coordx, coordy, hate_points, like_points) {

    var placemark = new ymaps.Placemark([coordx, coordy],
        {
            iconContent: 'DPS',
            data: id_m
        },
        {
            iconLayout: 'default#image',
            // iconImageClipRect: [[0,0], [26, 47]],
            iconImageHref: 'static/img/metka.svg',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -27],
        },);


    placemark.events.add('contextmenu', function (e) {


            // Если меню метки уже отображено, то убираем его.
            if ($('#menu').css('display') == 'block') {
                $('#menu').remove();
            } else {
                // HTML-содержимое контекстного меню.
                var menuContent =
                    '<div id="menu">\
                        <ul id="menu_list">\
                             <li>Пожаловаться: <button id="hate"><span id="hate"></span></button></li>\
                             <li>Оценить: <button id="like">Like  <span id="like"></span> </button></li>\
                            \<li>Удалить: <button id="del">Del</button></li>\
                        </ul>\
                    </div>';

                // Размещаем контекстное меню на странице
                $('body').append(menuContent);
                console.log(hate_points)
                $('#hate').text(hate_points);
                $('#like').text(like_points);
                // Задаем позицию меню.
                $('#menu').css({
                    left: e.get('pagePixels')[0],
                    top: e.get('pagePixels')[1]
                });
                $('#hate').button().click(function () {
                    alert(id_m);

                    $('#menu').remove();
                    $.ajax({
                        type: 'POST',
                        url: '/main/hate/',
                        headers: {
                            "X-CSRFToken": csrftoken
                        },// some data url
                        data: {hate_Id: id_m},  // some params
                        success: function (response) {     // callback
                            if (response.result === 'OK') {

                                if (response.data && typeof (response.data) === 'object') {

                                    // do something with the successful response.data
                                    // e.g. response.data can be a JSON object
                                }
                            } else {
                                // handle an unsuccessful response
                            }
                        }
                    });
                    alert('send');

                    window.location.reload();
                    alert('reload');

                    $('#hate').text(hate_points);
                })
                $('#like').button().click(function () {
                    alert('like');
                    $('#menu').remove();
                })
                $('#del').button().click(function () {
                    alert('del');
                    $('#menu').remove();
                })

            }
        }
    );
    myMap.geoObjects.add(placemark);
}

function place(coords) {

    if ($.session.get("time") === undefined) {
        window.time = new Date();
        $.session.set("time", window.time);
        var placemark = new ymaps.Placemark([coords[0], coords[1]],
            {iconContent: 'DPS'},
            {
                iconLayout: 'default#image',
                iconImageHref: 'static/img/metka.svg',
                iconImageSize: [30, 30],
                iconImageOffset: [-15, -27],
            },);
        $.ajax({
            type: 'POST',
            url: '/main/create/',
            headers: {
                "X-CSRFToken": csrftoken
            },// some data url
            data: {coordx: coords[0], coordy: coords[1]},  // some params
            success: function (response) {     // callback
                if (response.result === 'OK') {
                    if (response.data && typeof (response.data) === 'object') {
                        // do something with the successful response.data
                        // e.g. response.data can be a JSON object
                    }
                } else {
                    // handle an unsuccessful response
                }
            }
        });
        placemark.events.add('contextmenu', function (e) {
            let ip;
            $.getJSON("https://api.ipify.org/?format=json", function (e) {
                window.ip = e.ip;
            });
            // Если меню метки уже отображено, то убираем его.
            if ($('#menu').css('display') == 'block') {
                $('#menu').remove();
            } else {
                // HTML-содержимое контекстного меню.
                var menuContent =
                    '<div id="menu">\
                        <ul id="menu_list">\
                             <li>Пожаловаться: <button id="hate">!</button> </li>\
                             <li>Оценить: <button id="like">Like</button></li>\
                            \<li>Удалить: <button id="del">Del</button></li>\
                        </ul>\
                    </div>';

                // Размещаем контекстное меню на странице
                $('body').append(menuContent);

                // Задаем позицию меню.
                $('#menu').css({
                    left: e.get('pagePixels')[0],
                    top: e.get('pagePixels')[1]
                });
                $('#hate').button().click(function () {
                    alert('hate');
                    $('#menu').remove();
                    $.ajax({
                        type: 'POST',
                        url: '/main/hate/',
                        headers: {
                            "X-CSRFToken": csrftoken
                        },// some data url
                        data: {coordx: coords[0], coordy: coords[1]},  // some params
                        success: function (response) {     // callback
                            if (response.result === 'OK') {
                                if (response.data && typeof (response.data) === 'object') {
                                    // do something with the successful response.data
                                    // e.g. response.data can be a JSON object
                                }
                            } else {
                                // handle an unsuccessful response
                            }
                        }
                    });
                })
                $('#like').button().click(function () {
                    alert('like');
                    $('#menu').remove();
                })
                $('#del').button().click(function () {
                    alert('del');
                    $('#menu').remove();
                })

            }
        });
        myMap.geoObjects.add(placemark);
    } else {
        let cur_time = new Date();
        let d = new Date($.session.get("time"))
        let times_dif = cur_time - d;
        if (times_dif < 300000) {
            alert("Подожди 5 минуточек)")
        } else {
            var placemark = new ymaps.Placemark([coords[0], coords[1]],
                {iconContent: 'DPS'},
                {
                    iconLayout: 'default#image',
                    // iconImageClipRect: [[0,0], [26, 47]],
                    iconImageHref: 'static/img/metka.svg',
                    iconImageSize: [30, 30],
                    iconImageOffset: [-15, -27],
                },);
            $.ajax({
                type: 'POST',
                url: '/main/create/',
                headers: {
                    "X-CSRFToken": csrftoken
                },// some data url
                data: {coordx: coords[0], coordy: coords[1]},  // some params
                success: function (response) {     // callback
                    if (response.result === 'OK') {
                        if (response.data && typeof (response.data) === 'object') {
                            // do something with the successful response.data
                            // e.g. response.data can be a JSON object
                        }
                    } else {
                        // handle an unsuccessful response
                    }
                }
            });
            placemark.events.add('contextmenu', function (e) {
                let ip;
                $.getJSON("https://api.ipify.org/?format=json", function (e) {
                    window.ip = e.ip;
                });
                // Если меню метки уже отображено, то убираем его.
                if ($('#menu').css('display') == 'block') {
                    $('#menu').remove();
                } else {
                    // HTML-содержимое контекстного меню.
                    var menuContent =
                        '<div id="menu">\
                            <ul id="menu_list">\
                                 <li>Пожаловаться: <button id="hate">!</button> </li>\
                                 <li>Оценить: <button id="like">Like</button></li>\
                                \<li>Удалить: <button id="del">Del</button></li>\
                            </ul>\
                        </div>';

                    // Размещаем контекстное меню на странице
                    $('body').append(menuContent);

                    // Задаем позицию меню.
                    $('#menu').css({
                        left: e.get('pagePixels')[0],
                        top: e.get('pagePixels')[1]
                    });
                    $('#hate').button().click(function () {
                        alert('hate');
                        $('#menu').remove();
                        $.ajax({
                            type: 'POST',
                            url: '/main/hate/',
                            headers: {
                                "X-CSRFToken": csrftoken
                            },// some data url
                            data: {coordx: coords[0], coordy: coords[1]},  // some params
                            success: function (response) {     // callback
                                if (response.result === 'OK') {
                                    if (response.data && typeof (response.data) === 'object') {
                                        // do something with the successful response.data
                                        // e.g. response.data can be a JSON object
                                    }
                                } else {
                                    // handle an unsuccessful response
                                }
                            }
                        });
                    })
                    $('#like').button().click(function () {
                        alert('like');
                        $('#menu').remove();
                    })
                    $('#del').button().click(function () {
                        alert('del');
                        $('#menu').remove();
                    })

                }
            });
            myMap.geoObjects.add(placemark);
        }
    }

    // alert(coords)
}

function init() {
    // Создание карты.
    window.myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 10
    }),
        myMap.events.add('click', function (e) {
            var coords =
                e.get('coords');
            place(coords)
        });
    let marks = appConfig.marklist;
    let coord = appConfig.coords;
    if (marks) {
        for (let i = 0; i < marks.length; i++) {
            let cordx = coord[i][0];
            let cordy = coord[i][1];

            placeold(marks[i][0], cordx, cordy, marks[i][2], marks[i][3])
        }
    }

};

$("#ekb").button().click(function () {
    myMap.setCenter([56.838011, 60.597465]);
    $(".link-active").toggleClass("link-active", " ");
    $("#ekb_B").addClass("link-active");

});
$("#msk").button().click(function () {
    myMap.setCenter([55.76, 37.64]);
    $(".link-active").toggleClass("link-active", " ");
    $("#msk_B").addClass("link-active");
});
$("#spb").button().click(function () {
    myMap.setCenter([59.939095, 30.315868]);
    $(".link-active").toggleClass("link-active", " ");
    $("#spb_B").addClass("link-active");
});
$("#tmn").button().click(function () {
    myMap.setCenter([57.1522, 65.5272]);
    $(".link-active").toggleClass("link-active", " ");
    $("#tmn_B").addClass("link-active");
});
$("#chel").button().click(function () {
    myMap.setCenter([55.154, 61.4291]);
    $(".link-active").toggleClass("link-active", " ");
    $("#chel_B").addClass("link-active");
});
