(function ($) {

    let arr_default = []//排序前的li数组
    let arr = []//排序中的数组
    let prev = null
    let next = null


    // 渲染默认的数据列表页
    const $main = $('.main')
    $.ajax({
        url: 'http://localhost/yunproject/project/php/listdata.php',
        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>'
        console.log(data)
        $.each(data, function (index, value) {
            $strhtml += `
                <li>
                <a href="detail.html?sid=${value.sid}" target="_blank">
                <img class="lazy" data-original="${value.url}"/>
                <p>${value.title}</p>
                <span>￥${value.price}</span>
                </a>
                </li>
            `
        })
        $strhtml += '</ul>'
        $main.html($strhtml)
        // 添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" })
        })

        arr_default = []//排序前的li数组
        arr = []//排序中的数组
        prev = null
        next = null
        $('.main li').each(function (index, element) {
            arr[index] = $(this)
            arr_default[index] = $(this)
        })

        $('button').eq(0).on('click', function () {

        })
        $('button').eq(1).on('click', function () {
            for (let i = 0; i < arr.length - 1; i++) {
                for (let j = 0; j < arr.length - i; j++) {
                    prev = parseFloat(arr[j].find('span').html().substring(1))
                    next = parseFloat(arr[j + 1].find('span').html().substring(1))
                //    判断价格改变li的位置
                    if (prev > next) {
                        let temp = arr[j]
                        arr[j] = arr[j + 1]
                        arr[j + 1] = temp
                    }
                }
            }
            // 清空列表
            $('.main ul').empty()
            
            
        })
        $('button').eq(2).on('click', function () {

        })

    })


    // 添加分页
    $('.page').pagination({
        pageCount: 3,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '<',
        nextContent: '>',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent())
            $.ajax({
                url: 'http://localhost/yunproject/project/php/listdata.php',
                data: {
                    page: api.getCurrent() //传输页码给后端
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml = '<ul>'
                console.log(data)
                $.each(data, function (index, value) {
                    $strhtml += `
                        <li>
                        <a href="detail.html?sid=${value.sid}" target="_blank">
                        <img class="lazy" data-original="${value.url}"/>
                        <p>${value.title}</p>
                        <span>￥${value.price}</span>
                        </a>
                        </li>
                    `
                })
                $strhtml += '</ul>'
                $main.html($strhtml)
                $(function () {
                    $("img.lazy").lazyload({ effect: "fadeIn" })
                })


            })
        }
    })

    // 排序
    $('button')


})(jQuery)