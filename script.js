// filepath: c:/wamp64/www/Tribunal_Superior_de_Recurso/script.js

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("header nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Array de URLs das imagens do carrossel
    const imagens = [
        'imagens/Imagem 1.jpg',
        'imagens/Imagem 2.jpg',
        'imagens/Imagem 3.jpg',
        'imagens/Imagem 4.jpg',
        'imagens/Imagem 5.jpg'
    ];

    let indiceAtual = 0;

    // Seleciona os elementos do carrossel
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    // Função para carregar as imagens dinamicamente
    function carregarImagens() {
        imagens.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('carousel-item');
            if (index === 0) img.classList.add('active'); // Define a primeira imagem como ativa
            carousel.appendChild(img);
        });
    }

    // Função para mostrar o slide atual
    function mostrarSlide(indice) {
        const slides = document.querySelectorAll('.carousel-item');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === indice);
        });
    }

    // Função para ir para o próximo slide
    function proximoSlide() {
        indiceAtual = (indiceAtual + 1) % imagens.length;
        mostrarSlide(indiceAtual);
    }

    // Função para ir para o slide anterior
    function slideAnterior() {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
        mostrarSlide(indiceAtual);
    }

    // Adiciona eventos aos botões de controle
    prevButton.addEventListener('click', slideAnterior);
    nextButton.addEventListener('click', proximoSlide);

    // Inicializa o carrossel
    carregarImagens();

    // Change slide every 5 seconds
    setInterval(() => {
        proximoSlide();
    }, 5000);
    
    // Form validation
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

            // Simulate form submission
            alert("Mensagem enviada com sucesso!");
            contactForm.reset();
        });
    }

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Security: Prevent XSS by sanitizing user input
    function sanitizeInput(input) {
        const tempDiv = document.createElement("div");
        tempDiv.textContent = input;
        return tempDiv.innerHTML;
    }

    // Example: Sanitize form inputs before processing
    const inputs = document.querySelectorAll("form input, form textarea");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            input.value = sanitizeInput(input.value);
        });
    });

    // Privacy: Hide email addresses from bots
    const emailElements = document.querySelectorAll("[data-email]");
    emailElements.forEach(el => {
        const email = el.getAttribute("data-email").replace("[at]", "@");
        el.textContent = email;
    });

    // Integrity: Hash sensitive data (example only, not for production)
    function hashData(data) {
        return btoa(unescape(encodeURIComponent(data))); // Base64 encoding as a simple example
    }

    // Example: Hash email before sending (for demonstration purposes)
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            const emailField = document.getElementById("email");
            emailField.value = hashData(emailField.value);
        });
    }
});