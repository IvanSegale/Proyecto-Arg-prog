// Agregar/quitar clase Mostrar a los elementos visibles/ocultos

const observador = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar');
        } else {
            entry.target.classList.remove('mostrar');
        }
    });
});

const elementosOcultos = document.querySelectorAll('.oculto');
elementosOcultos.forEach((el) => observador.observe(el));


// Mostrar/ocultar Menu hamburguesa

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
// cerrar menu al clickear un link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}) )

// CARRUSEL PORTFOLIO

// detectar click y calcular pocision x

const track = document.getElementById("track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

// no mover si no se hizo click
const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;

// obtener la pocision relativa del puntero
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2; 
  
// obtener el porcentaje total recorrido en el carrusel
  const percentage = (mouseDelta / maxDelta) * -100,
// guardo el porcentaje anterior para que al soltar el mouse no reinicie el carrusel
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
// delimito los max y min del carrusel para no arrastrar infinitamente
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;

// animo las imagenes al mover por el carrusel para efecto "parallax"
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);