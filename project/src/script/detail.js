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
        // console.log(d)
        $simg.attr('src', d.url)//添加小图地址
        $simg.attr('sid', d.sid)//添加sid标识
        $dimg.attr('src', d.url)//添加大图地址
        $title.html(d.title)
        $name.html(d.title)
        $price.html(d.price)
        // console.log(d.piclisturl.split(','))

        // 渲染小图
        let $listurl = d.piclisturl.split(',')
        let $strhtml = ''
        $.each($listurl, function (index, value) {
            $strhtml += '<li><img src="' + value + '"/></li>'
        })
        $('.list ul').html($strhtml)
    })
    // 放大镜效果
    const $spic = $('.spic')//小图盒子
    const $sf = $('.sf')//小放
    const $df = $('.df')//大放
    const $prev = $('.prev')//左箭头
    const $next = $('.next')//右箭头
    const $list = $('.list')//小图列表

    //小放/大放=小图/大图
    $sf.height($spic.height() * $df.height() / $dimg.height())
    $sf.width($spic.width() * $df.width() / $dimg.width())
    let $bili = $dimg.width() / $spic.width()

    $spic.hover(function () {
        $sf.css('display', 'block')
        $df.css('display', 'block')
        $prev.css('display', 'block')
        $next.css('display', 'block')

        $(this).on('mousemove', function (e) {
            let $leftvalue = e.pageX - $('.main').offset().left - $sf.width() / 2
            let $topvalue = e.pageY - $('.main').offset().top - $sf.height() / 2
            if ($leftvalue < 0) {
                $leftvalue = 0
            } else if ($leftvalue > $spic.width() - $sf.width()) {
                $leftvalue = $spic.width() - $sf.width()
            }
            if ($topvalue < 0) {
                $topvalue = 0
            } else if ($topvalue > $spic.height() - $sf.height()) {
                $topvalue = $spic.height() - $sf.height()
            }
            $sf.css({
                left: $leftvalue,
                top: $topvalue
            })
            $dimg.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            })


        })
    }, function () {
        $sf.css('display', 'none')
        $df.css('display', 'none')
        $prev.css('display', 'none')
        $next.css('display', 'none')
    })

    // 小图切换
    $('.list ul').on('click', 'li', function () {
        let $imgurl = $(this).find('img').attr('src')
        $simg.attr('src', $imgurl)
        $dimg.attr('src', $imgurl)
    })
    // 箭头添加事件
    let $num = 5 //显示图片的数量
    $next.on('click', function () {
        let $lists = $('.list ul li ')//不添加事件一般能够取到
        if ($lists.size() > $num) {
            $num++
            $prev.css('color', '#333')
            if ($lists.size() == $num) {
                $next.css('color', '#fff')
            }
            $('.list ul').animate({
                left: -($num - 5) * $lists.eq(0).outerWidth(true)//
            })
        }
    })
    $prev.on('click', function () {
        let $lists = $('.list ul li ')//不添加事件一般能够取到
        if ($num > 5) {
            $num--
            $next.css('color', '#333')
            if ($num <= 5) {
                $prev.css('color', '#fff')
            }
            $('.list ul').animate({
                left: -($num - 5) * $lists.eq(0).outerWidth(true)//
            })
        }
    })

    // 数组存储商品编号和数量
    let arrsid = []
    let arrnum = []

    // 先取cookie判断是否第一次点击
    function cookietoarr() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',')
            arrnum = jscookie.get('cookienum').split(',')
        } else {
            arrsid = []
            arrnum = []
        }
    }

    //改变数量 
    $('.up').on('click', function () {
        let $num = $(this).parents('.main').find('.right input').val();
        $num++;
        $(this).parents('.main').find('.right input').val($num);
    });
    $('.down').on('click', function () {
        let $num = $(this).parents('.main').find('.right input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.main').find('.right input').val($num);
    });

    // 加入购物车
    $('.cart').on('click', function () {
        // let $sid = $simg.attr('sid')
        let $sid = $(this).parents('.main').find('.simg').attr('sid')
        cookietoarr()
        // console.log($sid)
        //$.inArray(value,array,[fromIndex])
        //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。

        if ($.inArray($sid, arrsid) != -1) {
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.count').val())
            arrnum[$.inArray($sid, arrsid)] = $num
            jscookie.add('cookienum', arrnum, 10)
        }else{
            arrsid.push($sid)
            jscookie.add('cookiesid',arrsid,10)
            arrnum.push($('.count').val())
            jscookie.add('cookienum',arrnum,10)
        }
        alert('加入购物车成功')
    })

}(jQuery)