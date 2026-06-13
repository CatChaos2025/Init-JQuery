import $ from 'jquery';

($.easing as any).easeOutBack = function (x: number): number {
    return 1 - Math.pow(1 - x, 4);
};

function randomHueColor(): number {
  const hue = Math.floor(Math.random() * 360);
  return Math.min(Math.max(hue, 200), 280);
}

export function button_nav(): void {
    // 1. ESTADO INICIAL: Usa '>' para ocultar SOLO los hijos directos de main (las páginas)
    $('main > section').hide(); 
    $('#selection-home').hide();
    $('#home-page').show();
    
    $(document).on('click', '.menu-list button:not(#selection-home button)', function() {
        const currentButton = $(this);
        const currentDiv = currentButton.find('.buttons-nav');

        $('.buttons-nav').removeClass('active');
        currentDiv.addClass('active');

        const color_value = randomHueColor();
        const color_start = `hsl(${color_value}, 100%, 50%)`;
        const color_end = `hsl(${color_value}, 120%, 40%)`;

        currentDiv.css('--active-color-start', color_start);
        currentDiv.css('--active-color-end', color_end);

        const buttonClass = currentButton.attr('class')?.split(' ')[0];
        const pageId = buttonClass + '-page';

        // 2. AQUÍ TAMBIÉN: Cambia 'main section' por 'main > section'
        $('main > section').removeClass('active-page'); 
        $('#' + pageId).addClass('active-page');

        if(!currentButton.hasClass('home')){
            $('#selection-home').slideUp({
                duration: 200,
                easing: 'easeOutBack'
            });
        }
    });
    
    $(document).on('click', '.home', function() {
        $('#selection-home').slideToggle({
            duration: 250,
            easing: 'easeOutBack'
        });
    });

    $(document).on('click', '#selection-home button', function(e) {
        e.stopPropagation(); // Evita que el evento "salte" a elementos padres
        
        const subButtonClass = $(this).attr('class');
        console.log(`Presionaste el logo: ${subButtonClass}`);
        
    });
}