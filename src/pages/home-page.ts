// import { initOverscrollStretch } from '../components/initOverscrollStretch';
import './home-page.css'
import './styles/list.css'
import $ from 'jquery';

import html_code from '../assets/images/wallpapers/Code-Html.svg'

export function homePage():void{
    $('#home-page').html(/* html */`
        <div id="main-home">
            <article id="carac-html" class="content">
                <aside class="fecha">
                    <div class="fecha-content">
                        <p><time datetime="2026-06-09">09 de junio del 2026 </time></p>
                        <p class="fecha-status status-badge">(SIN REVISAR)</p>
                    </div>
                    <p class="fecha-name">Publicado por <span>Josías Israel Díaz Vallecillo</span></p>
                </aside>

                <div class="contenido">
                    <h1>Características Generales de html</h1>
                    <section class="hero-container">
                        <img src="${html_code}" alt="Código Html" class="hero-image">
                        <div class="hero-content">
                            <h2><strong>Historia de html</strong></h2>
                            <p>De crear papers a crear aplicaciones de uso industrial</p>
                        </div>
                    </section>
                    
                    <aside class="alert">
                        <small>Este artículo está basado en <em><a href="https://www.tokioschool.com/noticias/historia-lenguaje-html/" id="history-html-article"></a></em> de <a href="https://www.tokioschool.com/autor/adrian-rodriguez-mira/">Adrián Rodríguez Mira</a> para <a href="https://www.tokioschool.com/">Tokio School</a></small>
                    </aside>
                    <p>
                        <dfn>HTML</dfn> (<em>Lenguaje de Marcado de Hipertexto, 
                        en inglés HyperText Markup Language</em>) es <strong> el lenguaje de marcas por excelencia en el web</strong> y el <em>"el esqueleto"</em> o estructura que usa toda página web, 
                        su existencia lleva rondando <strong>desde 1989 por el creador de la web <a href="https://www.britannica.com/biography/Tim-Berners-Lee">Tim Berners-Lee</a></strong>; 
                        creado en el <a href="https://www.britannica.com/topic/Massachusetts-Institute-of-Technology"><strong>CERN</strong></a> 
                        (Organización Europea para la Investigación Nuclear, en ingles <em>European Organization for Nuclear Research</em>) y desde sus primeras versiones en 1991, 
                        ha evolucionado de ser usando para crear experientes y articulos científicos,
                        hasta las aplicaciones multiplataformas más modernas de nuestra época.
                        <br><br>

                        Los origenes de HTML llevan rondando desde mucho antes del 1991, siendo uno de sus primeros avistamientos primitivos como <a href="https://es.wikipedia.org/wiki/Enquire">Enquire</a> que fue un proyecto de software escrito en la segunda mitad de 1980,
                        que solo estaba destinado a la creación de documentacion y ensayos cientificos, se uso privado y completamente escrito en <a href="https://es.wikibooks.org/wiki0/Programaci%C3%B3n_en_Pascal/Historia">Pascal.</a>
                        En al primera versión de HTML publica era un lenguaje de bastante sencillo, con solo 18 etiquetas y la primera documentación de html en esta estaba se llama <a href="https://www.w3.org/History/19921103-hypertext/hypertext/WWW/MarkUp/Tags.html">"HTML Tags"</a>
                        <br>
                    </p>
                    <section class="list-html">
                            <h2>Entre las etiquetas más comunes de esta versión estaban:</h2><br>
                            <ul>
                                <li>
                                    <h3>Título:</h3>
                                    <p></p>
                                </li>

                                <li>
                                    <h3>Next ID:</h3>
                                </li>

                                <li>
                                    <h3>Anclajes:</h3>
                                </li>

                                <li>
                                    <h3>IsIndex:</h3>
                                </li>

                                <li>
                                    <h3>Texto sin formato:</h3>
                                </li>
                                
                                <li>
                                    <h3>Párrafo:</h3>
                                </li>

                                <li>
                                    <h3>Encabezados:</h3>
                                </li>

                                <li>
                                    <h3>Dirección:</h3>
                                </li>
                                    
                                <li>
                                    <h3>Destacando:</h3>
                                </li>
                    
                                <li>
                                    <h3>Glosarios:</h3>
                                </li>
            
                                <li>
                                    <h3>Listas:</h3>
                                </li>
                            </ul>
                    </section>
                    <div class="code-examples">
                        <p>Este es un ejemplo del uso de jquery para la creación de un documento:</p>
                        <pre><code id="codigo-html-example"></code></pre>
                        <p id='html-example'></p>
                    </div>
                </div>
            </article>
        </div>
        <div>
            <article id="carac-jquery" class="content">
                <aside class="fecha">
                    <div class="fecha-content">
                        <p><time datetime="2026-06-07">07 de junio del 2026 </time></p>
                        <p class="fecha-status status-badge">(ESCRITURA DIRECTA)</p>
                    </div>
                    <p class="fecha-name">Publicado por <span>Josías Israel Díaz Vallecillo</span></p>
                </aside>

                <div class="contenido">
                    <h1>Caracteristicas Generales de JQuery</h1>
                    <h3>Aqui vamos a ver las principales caracteristicas de html y su uso general, con unos cuantos ejemplos:</h3>
                    <div class="code-examples">
                        <p>Este es un ejemplo del uso de jquery para la creación de un documento:</p>
                        <pre><code id="codigo-jquery-example"></code></pre>
                        <p id='jquery-example'></p>
                    </div>
                </div>
            </article>
            <article id="content"></article>
            <article id="examples"></article>
        </div>
    `);

    const history_html = `<<Historia de HTML>>`

    const miCodigoJQuery =
`import $ from 'jquery';

$('list-text').html(
    /*html*/'
    <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Contacto</a></li>
    </ul>
')`;

    const explicacionDeEjemploJquery = 
    `En el código mostrado se explican las reglas básicas para crear una lista en HTML. 
    Toda lista debe comenzar con la etiqueta <ul> y finalizar con la etiqueta </ul>.`.trim();

    $('#history-html-article').text(history_html);
    $('#codigo-jquery-example').text(miCodigoJQuery);
    $('#jquery-example').text(explicacionDeEjemploJquery);

    $('.fecha-status').each(function() {
        // Tomamos el texto, lo pasamos a minúsculas y limpiamos espacios o paréntesis externos
        const textoEstado = $(this).text().toUpperCase().replace(/[()]/g, '').trim();

        // Evaluamos el caso y asignamos la clase CSS correcta
        if (textoEstado === 'REVISADO') {
            $(this).addClass('status-revisado');
        } else if (textoEstado === 'COMPLETADO') {
            $(this).addClass('status-completado');
        } else if (textoEstado === 'COMPLETADO PARCIALMENTE') {
            $(this).addClass('status-parcial');
        } else if (textoEstado === 'ESCRITURA DIRECTA') {
            $(this).addClass('status-directo');
        } else if (textoEstado === 'SIN REVISAR') {
            $(this).addClass('status-sin-revisar');
        }
    });

    // initOverscrollStretch({
    //     selector: '#home-page',
    //     resistance: 3000
    // });
}