!function ($) {
    let $sid = location.search.substring(1).split('=')[1]
    console.log($sid)
    const $simg = $('.simg')
    const $dimg = $('.dimg')
    const $title = $('.title')
    const $name = $('.name')
    const $price = $('.price i')

    if (!$sid) {
        $sid = 2
    }
    $.ajax({
        url: 'http://localhost/yunproject/project/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (d) {
        console.log(d)
        $simg.attr('src',d.url)//添加小图地址
        $simg.attr('sid',d.sid)//添加sid标识
        $dimg.attr('src',d.url)//添加大图地址
        $title.html(d.title)
        $name.html(d.title)
        $price.html(d.price)
    })

















}(jQuery)