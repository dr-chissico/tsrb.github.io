// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    /* Smooth scrolling para o menu */
    const navLinks = document.querySelectorAll("header nav ul li a");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        // Se o link for interno (inicia com #) realiza o scroll suave
        if(link.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  
    /* Carrossel de Imagens Dinâmico */
    const imagens = [
      'imagens/Imagem 3.jpg',
      'imagens/Imagem 4.jpg'
    ];
    let indiceAtual = 0;
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
  
    function carregarImagens() {
      imagens.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${index + 1}`;
        img.classList.add('carousel-item');
        if (index === 0) img.classList.add('active');
        carousel.appendChild(img);
      });
    }
  
    function mostrarSlide(indice) {
      const slides = document.querySelectorAll('.carousel-item');
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === indice);
      });
    }
  
    function proximoSlide() {
      indiceAtual = (indiceAtual + 1) % imagens.length;
      mostrarSlide(indiceAtual);
    }
  
    function slideAnterior() {
      indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
      mostrarSlide(indiceAtual);
    }
  
    prevButton.addEventListener('click', slideAnterior);
    nextButton.addEventListener('click', proximoSlide);
  
    carregarImagens();
  
    setInterval(proximoSlide, 5000);
  
    /* Validação e Sanitização do Formulário */
    const contactForm = document.querySelector("form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("mensagem").value.trim();
        
        if (!name || !email || !message) {
          alert("Por favor, preencha todos os campos.");
          return;
        }
        
        if (!validateEmail(email)) {
          alert("Por favor, insira um e-mail válido.");
          return;
        }
        
        alert("Mensagem enviada com sucesso!");
        contactForm.reset();
      });
    }
  
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    function sanitizeInput(input) {
      const tempDiv = document.createElement("div");
      tempDiv.textContent = input;
      return tempDiv.innerHTML;
    }
    const inputs = document.querySelectorAll("form input, form textarea");
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        input.value = sanitizeInput(input.value);
      });
    });
  });
  