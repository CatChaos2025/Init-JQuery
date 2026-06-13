import $ from 'jquery';
import './style.css'
import { button_nav } from './components/buttonsNav';
import { homePage } from './pages/home-page';
import { menuNavBar } from './components/menuNavBar';

$('#app').html( /* html */`
  <aside id="menu">
  </aside>
  <div class="pages" >
      <header>
      </header>

      <main>
        <section id="home-page"></section>
        <section id="counter-page">adios</section>
        <section id="about-page">adios</section>
        <section id="configuration-page">bueno</section>
        <footer>Contactanos</footer>
      </main>
  </div>
`)

menuNavBar()
homePage();
button_nav();