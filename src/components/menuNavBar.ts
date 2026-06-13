import $ from "jquery";
import './menuNavBar.css'
import logoJQuery from '../assets/images/JQuery-Logo.wine.svg'
import logoHtml from '../assets/images/HTML5_Badge.svg'
import logoCss from '../assets/images/CSS3_icon-icons.com_67069.svg'

export function menuNavBar(): void {
    $('#menu').html( /* html */
        `<div class="titlebar">
            <i class="material-icons md-24">code</i>
                <h1 class="title">INDEX</h1>
            <i class="material-icons md-24">code</i>
        </div>
        <div class="menu-nav-container">
            <nav class="menu-nav-bar" id="menu-nav">
                <ul class="menu-list">
                    <li>
                        <div class="button-material">
                            <div id="selection-home">
                                <button class="btn-html">
                                    <div class="imagen-main-html">
                                            <img src="${logoHtml}" alt="html Logo">                  
                                    </div>
                                </button>
                                <button class="btn-css">
                                    <div class="imagen-main-css">
                                            <img src="${logoCss}" alt="css Logo">                  
                                    </div>
                                </button>
                                <button class="btn-jquery">
                                    <div class="imagen-main">
                                            <img src="${logoJQuery}" alt="jQuery Logo">                  
                                    </div>
                                </button>
                            </div>
                            <button class="home">
                                <div class="buttons-nav active">
                                    <i class="material-icons md-24">home</i>
                                    <h3>Home</h3>
                                </div>
                            </button>
                        </div>
                    </li>
                    <li>
                        <button class="counter">
                            <div class="buttons-nav">
                                <i class="material-icons md-24">1k_plus</i>
                                <h3>Counter</h3>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button class="about">
                            <div class="buttons-nav">
                                <i class="material-icons md-24">apps</i>
                                <h3>About</h3>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button class="configuration">
                            <div class="buttons-nav">
                                <i class="material-icons md-24">settings</i>
                                <h3>Settings</h3>
                            </div>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="resize-handle-bottom-left" id="resize-button"><i class="material-icons md-24">open_with</i></div>`
    );

    $('.menu-nav-bar').on('scroll', function(this: HTMLElement){
        const topDistance = $(this).scrollTop() || 0;
        const isScrolled  = topDistance > 5;

        $('.titlebar').toggleClass('scrolled-down', isScrolled);
        $(this).toggleClass('scrolled-down', isScrolled);
    });

    $('#menu').on('wheel', function(e) {
        e.stopPropagation();
    });

    let startX: number                  = 0;
    let maxBottom: number               = 0;
    let startY: number                  = 0;
    let startHeight: number             = 0;
    let currentX: number                = 0;
    let currentY: number                = 0;
    let menuWidth: number               = 0;
    let maxRight: number                = 0;
    let positionState: 'left' | 'right' = 'left'; 

    $('.titlebar').on('mousedown touchstart', function(e: JQuery.TriggeredEvent){
        if(!e.originalEvent) return;

        let clientX = 0;
        let clientY = 0;
        if (e.type.startsWith('touch')) {
            const touchEvent = e.originalEvent as TouchEvent;
            clientX = touchEvent.touches[0].clientX;
            clientY = touchEvent.touches[0].clientY;
        } else {
            const mouseEvent = e.originalEvent as MouseEvent;
            clientX = mouseEvent.clientX;
            clientY = mouseEvent.clientY;
        }

        menuWidth = $('#menu').outerWidth() || 0;
        const menuHeight = $('#menu').outerHeight() || 0; // Obtener altura
        
        const windowWidth = $(window).width() ?? 0;
        const windowHeight = $(window).height() ?? 0; // Obtener altura ventana
        
        maxRight = windowWidth - menuWidth - 12;
        maxBottom = windowHeight - menuHeight - 12; // Límite inferior (con 12px de margen)

        startX  = clientX - currentX;
        startY  = clientY - currentY;
        
        $(this).css('cursor', 'grabbing');
        $('body').css('user-select', 'none');

        document.addEventListener('mousemove', handleDragMove, { passive: false });
        document.addEventListener('touchmove', handleDragMove, { passive: false });
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchend', handleDragEnd);
    });

    function handleDragMove(e: MouseEvent | TouchEvent) {
        // Bloqueamos el scroll de la página de fondo solo mientras arrastramos el menú
        if (e.cancelable) e.preventDefault();

        let clientX = 0;
        let clientY = 0;
        if ('touches' in e && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }

        currentX = clientX - startX;
        currentY = clientY - startY;

        // Mantener dentro de los límites
        if (currentX < 0) currentX = 0;
        if (currentY < 0) currentY = 0; // Límite superior
        if (currentX > maxRight) currentX = maxRight;
        if (currentY > maxBottom) currentY = maxBottom; // Límite inferior
        
        // APLICAR AMBOS EJES
        $('#menu').css('transform', `translate(${currentX}px, ${currentY}px)`);
    }

    function handleDragEnd() {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchend', handleDragEnd);

        $('.titlebar').css('cursor', 'grab');
        $('body').css('user-select', '');
        
        if (currentX <= maxRight / 2) {
            currentX = 0;
            positionState = 'left';
        } else {
            currentX = maxRight;
            positionState = 'right';
        }

        $('#menu').addClass('snap-animating');
        // ANIMAR EN AMBOS EJES (Mantiene el currentY actual)
        $('#menu').css('transform', `translate(${currentX}px, ${currentY}px)`);

        const isAtRightEdge = currentX >= (maxRight - 5);
        $('#app').toggleClass('menu-on-right', isAtRightEdge);

        setTimeout(() => {
            $('#menu').removeClass('snap-animating');
        }, 350);
    }

    $('#menu').on('mousedown', '.resize-handle-bottom-left', function(e){
        e.preventDefault();
        e.stopPropagation();

        startY = e.pageY;
        startHeight = $('#menu').outerHeight() || 0;
        $('body').css('user-select', 'none');

        $(document).on('mousemove.menuResize', handleResizeMove);
        $(document).on('mouseup.menuResize', handleResizeEnd);
    });

    function handleResizeMove(e: MouseEvent | JQuery.TriggeredEvent) {
        const pageY = e.pageY ?? 0;
        const deltaY: number = pageY - startY;
        let newHeight: number = startHeight + deltaY;
        
        if(newHeight < 150) newHeight = 150;

        const windowHeight = ($(window).height() || 0) - 12; 
        if(newHeight > windowHeight) newHeight = windowHeight;

        $('#menu').css('height', `${newHeight}px`);
    }

    function handleResizeEnd() {
        $(document).off('.menuResize');
        $('body').css('user-select', '');
    }

    const $menu = $('#menu');
    const $app = $('#app');
    let resizeTimeout: ReturnType<typeof setTimeout>;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(() => {
            const windowWidth  = window.innerWidth;
            const windowHeight = window.innerHeight;

            menuWidth        = $menu.outerWidth() || 0;
            const menuHeight = $menu.outerHeight() || 0;
            
            maxRight  = windowWidth - menuWidth - 12;
            maxBottom = windowHeight - menuHeight - 12;

            if (currentY > maxBottom) {
                currentY = maxBottom;
            }

            if (positionState === 'right') {
                currentX = maxRight;
                $app.addClass('menu-on-right');
            } else {
                currentX = 0;
                $app.removeClass('menu-on-right');
            }

            $menu.css('transform', `translate(${currentX}px, ${currentY}px)`);
            
            if (windowWidth > 1024) {
                $menu.removeClass('menu-open'); 
            }
        }, 60);
    });
}