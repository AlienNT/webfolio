function loaded() {
    let nav = document.querySelector('.nav_col'),
        content = document.querySelector('.folio__content'),
        screens = content.querySelectorAll('.folio__screen .content-wrapper'),
        header = document.querySelector('.folio__header'),
        anchors = document.querySelectorAll('.anchor'),
        topCalc = 0
    calcHeight()
    scroll()
    styledFirstWord()
    hamburger()
    slider()
    if (window.innerWidth >= 900) {
        videoBg()
    } else {
        topSpace()
        calcHeight()
    }
    //анимация скилов
    let about = document.querySelector('.about .content-wrapper')
    about.onmouseover = function () {
        let sHtml = about.querySelector('.html .skill_level div'),
            sCss = about.querySelector('.css .skill_level div'),
            sJs = about.querySelector('.js .skill_level div')
        sHtml.style.cssText = 'padding-left: 76%;'
        sCss.style.cssText = 'padding-left: 80%'
        sJs.style.cssText = 'padding-left: 61%'
    }
    //скролл и расчет высоты хедера при ресайзе
    window.onresize = () => setTimeout(function () {
        let vid = document.querySelector('.folio__content .folio__container .video_bg')

        if (window.innerWidth < 900) {
            vid.style.cssText = 'visibility: hidden;'
            calcHeight()
            scroll()
            topSpace()
        } else {
            vid.style.cssText = 'visibility: show;'

        }
    }, 100)

//рассчеты верхних отступов для мобильной версии
    function calcHeight() {
        topCalc = header.offsetHeight
        nav.style.cssText = `top: ${topCalc}px`
    }

    function topSpace() {
        content.style.cssText = `margin-top: ${topCalc}px;`
        for (let screen of screens) {
            screen.style.cssText = `min-height: calc(100vh - ${topCalc}px`
        }
        for (let a of anchors) {
            a.style.cssText = `top: -${topCalc}px;`
        }

    }

    // скрытие меню при скролле
    // function scroll() {
    //     let scrollPos = window.pageYOffset
    //     window.onscroll = function () {
    //         console.log(nav.classList.contains('nav_col-active'));
    //         if (nav.classList.contains('nav_col-active') === false) {
    //             function calc() {
    //                 let header       = document.querySelector('.folio__header'),
    //                     heightHeader = header.offsetHeight,
    //                     currentPos   = window.pageYOffset
    //                 scrollPos < currentPos ?
    //                     header.style.top = `${-heightHeader}px` :
    //                     header.style.top = '0'
    //                 scrollPos = currentPos
    //             }
    //
    //             calc()
    //         }
    //     }
    // }
}

//главный слайдер контента

function slider() {
    let navCont = document.querySelector('.folio__nav ul'),
        navLinks = navCont.querySelectorAll('.folio__nav li'),
        screens = document.querySelectorAll('.folio__screen'),
        index = 0
    navCont.onclick = (e) => {
        let currentEl = e.target,
            parentEl = currentEl.closest('li'),
            elements = Array.prototype.slice.call(navLinks)
        index = elements.indexOf(parentEl)
        showSlide()
    }
    // слушатель на стрелки
    document.onkeydown = (e) => {
        console.log(e.code);
        if (window.innerWidth >= 900) {
            if (e.code === 'ArrowUp') {
                index > 0 ? index -= 1 : index = screens.length - 1
            }
            if (e.code === 'ArrowDown') {
                index < screens.length - 1 ? index += 1 : index = 0

            }
            showSlide()
        }
    }
    document.onwheel = (e) => {
        console.log(e.deltaY);
        if (window.innerWidth >= 900) {
            if (e.deltaY < 0) {
                index > 0 ? index -= 1 : index = screens.length - 1
            }
            if (e.deltaY > 0) {
                index < screens.length - 1 ? index += 1 : index = 0

            }
            showSlide()
        }
    }

    //показ нужного слайда
    function showSlide() {
        for (let screen of screens) {
            screen.classList.remove('screen-active')
        }
        screens[index].classList.add('screen-active')
        setActiveLi()
    }

    //смена активной ссылки
    function setActiveLi() {
        for (let link of navLinks) {
            link.classList.remove('active-link')
        }
        navLinks[index].classList.add('active-link')
    }
}

//гамбургер меню
function hamburger() {
    let hamburger = document.querySelector('.hamburger'),
        nav = document.querySelector('.nav_col'),
        header = document.querySelector('.folio__header'),
        navLinks = document.querySelector('.folio__nav')

    document.onclick = (e) => {
        let t = e.target
        if (t.closest('.hamburger') === hamburger) {
            hamburger.classList.toggle('hamburger-active')
            nav.classList.toggle('nav_col-active')
        } else if (t.closest('.folio__header') !== header || t.closest('.folio__nav') === navLinks) {
            hamburger.classList.remove('hamburger-active')
            nav.classList.remove('nav_col-active')
        }
    }
}
// генерация видео бэкграунда
function videoBg() {
    let contentCont = document.querySelector('.folio__content .folio__container')
    contentCont.insertAdjacentHTML('afterbegin', '<video class="video_bg" src="vid/bg.mov" preload="" autoplay="" loop="" muted=""></video>')

}
//стилизация первого слова заголовка
function styledFirstWord() {
    let first = document.querySelectorAll('.title')
    for (let elem of first) {
        let string = (elem.textContent).split(' '),
            content = string[0]
        if (string.length > 1) {
            elem.innerHTML = string.innerHTML =
                `<span class="first_styled">${content} </span>` + string.slice(1)
        }
    }
}


loaded()
