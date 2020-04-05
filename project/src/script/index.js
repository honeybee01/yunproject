!function ($) {

    // 编辑推荐列表渲染，同时添加懒加载
    $.ajax({
        url: 'http://localhost/yunproject/project/php/indexto.php',
        dataType: 'json'
    }).done(function (data) {
        let $tjstr = ''
        $.each(data, function (index, value) {
            // console.log(value)

            $tjstr += `
            <li>
            <img class="lazy" data-original="${value.url}"/>
            <p>${value.title}</p>
            <span>${value.price}</span>
            </li>
            `
        })
        $('.tj .tj-list ul').html($tjstr)
        // 添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" })
        })
    })
    //获取楼梯,在页面卷曲高度变化时改变定位方式
    let $louti = $('.louti')
    $(window).on('scroll', function () {
        // alert(1)
        if ($(window).scrollTop() > 350) {
            $louti.css({
                'position': 'fixed',
                top: 150
            })
        } else {
            $louti.css({
                'position': 'absolute',
                top: 674
            })
        }
    })
    // 点击返回页面卷曲高度为0
    $('.louti .l-back').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        });
    })


    //轮播图 
    let $banner = $('.banner') //轮播图盒子
    let $ulis = $('.banner ul li')  //图片列表
    let $olis = $('.banner ol li') //小圆圈
    let $left = $('.banner .left')  // 左箭头
    let $right = $('.banner .right') // 右箭头
    let index = 0//存储当前的索引位置

    $ulis.eq(0).show().siblings('li').hide()//第一张图片显示其他图片影藏

    // 封装切换过程
    function play(value) {
        $olis.eq(value).addClass('active').siblings('li').removeClass('active')
        $ulis.eq(value).fadeIn('fast').siblings().fadeOut('fast');

    }
    // 点击小圆圈时把当前点击的小圆圈的索引给index
    $olis.on('click', function () {
        index = $(this).index()
        play(index)
    })
    //通过左右箭头进行轮播。
    //右箭头事件规律：每点击一次，当前的索引位置+1
    $right.on('click', function () {
        index++
        if (index > $olis.length - 1) {
            index = 0
        }
        play(index)
    })
    $left.on('click', function () {
        index--
        if (index < 0) {
            index = $olis.length - 1
        }
        play(index)
    })
    // 使用定时器进行自动轮播，将右箭头点击事件在定时器中运行
    let time = null
    time = setInterval(() => {
        index++
        if (index > $olis.length - 1) {
            index = 0
        }
        play(index)
    }, 2000)
    // 鼠标经过banner停止定时器
    $banner.on('mouseover', function () {
        clearInterval(time)
    })
    // 鼠标离开banner将定时器再次运行
    $banner.on('mouseout', function () {
        time = setInterval(() => {
            index++
            if (index > $olis.length - 1) {
                index = 0
            }
            play(index)
        }, 2000)
    })


}(jQuery)