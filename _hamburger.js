/* Small viewport show/hide menu (hamburger icon) */
function pljeskavica() {
    document.getElementById("nav-id").classList.toggle("nav-toggle"); 
  }
    /* Small viewport show/hide submenus */
  function submenu0() {
    document.getElementsByClassName('topsub')[0].scrollIntoView({behavior: "smooth"}); 
    document.getElementsByClassName('topsub')[0].classList.toggle("top-toggle"); 
    document.getElementsByClassName('sublinks')[0].classList.toggle("sub-toggle"); 
  }
  function submenu1() {
    document.getElementsByClassName('topsub')[1].scrollIntoView({behavior: "smooth"}); 
    document.getElementsByClassName('topsub')[1].classList.toggle("top-toggle"); 
    document.getElementsByClassName('sublinks')[1].classList.toggle("sub-toggle"); 
  }
  function submenu2() {
    document.getElementsByClassName('topsub')[2].scrollIntoView({behavior: "smooth"}); 
    document.getElementsByClassName('topsub')[2].classList.toggle("top-toggle"); 
    document.getElementsByClassName('sublinks')[2].classList.toggle("sub-toggle"); 
  }
  function submenu3() {
    document.getElementsByClassName('topsub')[3].scrollIntoView({behavior: "smooth"}); 
    document.getElementsByClassName('topsub')[3].classList.toggle("top-toggle");
    document.getElementsByClassName('sublinks')[3].classList.toggle("sub-toggle");
  }
  function submenu4() {
    document.getElementsByClassName('topsub')[4].scrollIntoView({behavior: "smooth"}); 
    document.getElementsByClassName('topsub')[4].classList.toggle("top-toggle");
    document.getElementsByClassName('sublinks')[4].classList.toggle("sub-toggle");
  }
  function submenu5() {
    document.getElementsByClassName('topsub')[5].scrollIntoView({behavior: "smooth"}); 
    document.getElementsByClassName('topsub')[5].classList.toggle("top-toggle");
    document.getElementsByClassName('sublinks')[5].classList.toggle("sub-toggle");
  }
  // Hamburger meni - bezbedna verzija bez inline onclick
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.getElementById('hamburger-link');
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();  // sprečava # da se pojavi u URL
            pljeskavica();        // tvoja originalna funkcija
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // i <= 2; promeniti kada bude više submenija od 2 
    for (let i = 0; i <= 2; i++) {
        let link = document.getElementById('submenu' + i + '-link');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Pozovi odgovarajuću funkciju
                window['submenu' + i]();
            });
        }
    }
});