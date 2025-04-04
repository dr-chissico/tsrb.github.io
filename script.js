// script.js

// Carregar imagens dinamicamente no carrossel
const carouselImages = [
    'imagens/carousel1.jpg',
    'imagens/carousel2.jpg',
    'imagens/carousel3.jpg'
];

const carouselContainer = document.querySelector('.carousel');
let currentSlideIndex = 0;

// Função para renderizar o slide atual
function renderSlide() {
    carouselContainer.innerHTML = `
        <img src="${carouselImages[currentSlideIndex]}" alt="Slide ${currentSlideIndex + 1}" class="carousel-image">
    `;
}

// Função para ir para o próximo slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % carouselImages.length;
    renderSlide();
}

// Função para ir para o slide anterior
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + carouselImages.length) % carouselImages.length;
    renderSlide();
}

// Inicializar o carrossel
renderSlide();

// Adicionar funcionalidade ao formulário de contato
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    console.log('Formulário enviado:', data);

    alert('Obrigado por entrar em contato! Sua mensagem foi enviada com sucesso.');
    contactForm.reset();
});

// Adicionar navegação suave para os links do menu
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Ajuste para compensar o cabeçalho fixo
                behavior: 'smooth'
            });
        }
    });
});