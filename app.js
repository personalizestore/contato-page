// CONFIGURAÇÕES DA LOJA - AJUSTE ESTES VALORES
const CONFIG = {
    whatsappNumber: "5519996548833", // Número do WhatsApp (DDI + DDD + Número) sem traços ou parênteses
    instagramHandle: "@alpha.personalize", // Perfil do Instagram
    instagramUrl: "https://instagram.com/alpha.personalize",
    websiteUrl: "https://www.personalizealpha.com/",
    couponCode: "PERSO15" // Código do cupom revelado
};

// Carrega as configurações dinamicamente no HTML
document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualizar o ano atual no rodapé
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear().toString();
    }

    // 2. Configurar elementos dinâmicos baseados no CONFIG
    const instagramHandleEl = document.getElementById("instagram-handle");
    if (instagramHandleEl) {
        instagramHandleEl.textContent = CONFIG.instagramHandle;
    }

    const couponCodeEl = document.getElementById("coupon-code");
    if (couponCodeEl) {
        couponCodeEl.textContent = CONFIG.couponCode;
    }

    // Atualizar links do Hub se o usuário mudar na CONFIG
    const links = document.querySelectorAll(".links-section .link-item");
    if (links.length >= 3) {
        links[0].href = CONFIG.websiteUrl;
        links[1].href = CONFIG.instagramUrl;
        links[2].href = `https://wa.me/${CONFIG.whatsappNumber}?text=Ol%C3%A1%21+Acabei+de+receber+minha+encomenda+e+gostaria+de+falar+com+voc%C3%AAs.`;
    }

    const btnShopCta = document.getElementById("btn-shop-cta");
    if (btnShopCta) {
        btnShopCta.href = CONFIG.websiteUrl;
    }

    setupCouponReveal();
    setupStarRating();
});

// --- LÓGICA DO CUPOM DE DESCONTO ---
function setupCouponReveal() {
    const btnReveal = document.getElementById("btn-reveal");
    const couponDisplay = document.getElementById("coupon-display");
    const couponSubtext = document.getElementById("coupon-subtext");
    const btnCopy = document.getElementById("btn-copy");
    
    if (!btnReveal || !couponDisplay || !btnCopy) return;

    btnReveal.addEventListener("click", () => {
        // Disparar efeito de confete se a biblioteca estiver carregada
        if (typeof confetti === "function") {
            // Confete primário
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#c084fc', '#f472b6', '#38bdf8', '#fbbf24']
            });

            // Disparar rajada lateral após um pequeno delay
            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#c084fc', '#f472b6']
                });
            }, 250);

            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#c084fc', '#38bdf8']
                });
            }, 300);
        }

        // Esconder o botão de revelação e mostrar o cupom
        btnReveal.classList.add("hidden");
        couponDisplay.classList.remove("hidden");
        if (couponSubtext) {
            couponSubtext.classList.remove("hidden");
        }

        // Mostrar o botão CTA da loja virtual
        const btnShopCta = document.getElementById("btn-shop-cta");
        if (btnShopCta) {
            btnShopCta.classList.remove("hidden");
        }
    });

    // Copiar código do cupom
    btnCopy.addEventListener("click", () => {
        const textToCopy = CONFIG.couponCode;
        copyToClipboard(textToCopy, btnCopy, "Copiar", "Copiado!");
    });

    // Copiar @ do Instagram
    const btnCopyHandle = document.getElementById("btn-copy-handle");
    if (btnCopyHandle) {
        btnCopyHandle.addEventListener("click", () => {
            copyToClipboard(CONFIG.instagramHandle, btnCopyHandle, "Copiar @", "Copiado!");
        });
    }
}

// --- LÓGICA DE AVALIAÇÃO POR ESTRELAS ---
function setupStarRating() {
    const starButtons = document.querySelectorAll(".star-btn");
    const ratingFeedback = document.getElementById("rating-feedback");
    const feedbackMessage = document.getElementById("feedback-message");
    const btnFeedbackAction = document.getElementById("btn-feedback-action");
    const btnFeedbackText = document.getElementById("btn-feedback-text");

    if (!starButtons.length || !ratingFeedback || !feedbackMessage || !btnFeedbackAction) return;

    starButtons.forEach(button => {
        button.addEventListener("click", () => {
            const rating = parseInt(button.getAttribute("data-rating"));
            
            // Atualizar o visual das estrelas
            starButtons.forEach((star, index) => {
                const starIcon = star.querySelector("i");
                if (index < rating) {
                    star.classList.add("active");
                    starIcon.className = "fa-solid fa-star";
                } else {
                    star.classList.remove("active");
                    starIcon.className = "fa-regular fa-star";
                }
            });

            // Gerar a resposta personalizada com base na nota
            ratingFeedback.classList.remove("hidden");
            
            let message = "";
            let whatsappMessage = "";
            let actionText = "";

            if (rating >= 4) {
                // Efeito de mini-confete para avaliação alta
                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 30,
                        spread: 40,
                        origin: { y: 0.8 }
                    });
                }
                
                message = rating === 5 
                    ? "Uau, ficamos extremamente felizes! 🥰 É um prazer ter você como cliente. Que tal compartilhar seu carinho enviando uma mensagem no WhatsApp?"
                    : "Oba! Ficamos super felizes com sua avaliação positiva. Muito obrigado pelo carinho! ❤️";
                
                whatsappMessage = encodeURIComponent(`Olá! Acabei de avaliar meu pedido com ${rating} estrelas no QR Code. Adorei a experiência! ⭐⭐⭐⭐⭐`);
                actionText = "Enviar no WhatsApp";
                
                // Mudar estilo do botão para sucesso
                btnFeedbackAction.style.background = "var(--gradient-accent)";
                btnFeedbackAction.style.color = "#111827";
            } else {
                message = "Poxa, sentimos muito que sua experiência não tenha sido 100% perfeita. 😢 Queremos entender o que houve e ajudar você imediatamente!";
                whatsappMessage = encodeURIComponent(`Olá! Avaliei meu pedido com ${rating} estrelas. Gostaria de falar com o suporte sobre a minha entrega/produto.`);
                actionText = "Falar com Suporte";
                
                // Estilo neutro para suporte
                btnFeedbackAction.style.background = "rgba(255, 255, 255, 0.05)";
                btnFeedbackAction.style.color = "var(--text-primary)";
            }

            feedbackMessage.textContent = message;
            btnFeedbackText.textContent = actionText;
            btnFeedbackAction.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${whatsappMessage}`;
        });
    });
}

// --- FUNÇÃO AUXILIAR PARA COPIAR CLIPBOARD ---
function copyToClipboard(text, buttonElement, originalText, successText) {
    // Tenta usar a Clipboard API moderna
    navigator.clipboard.writeText(text).then(() => {
        showCopySuccess(buttonElement, originalText, successText);
    }).catch(err => {
        // Fallback para navegadores antigos
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  // Evita scroll na tela
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopySuccess(buttonElement, originalText, successText);
        } catch (err) {
            console.error('Erro ao copiar texto: ', err);
        }
        document.body.removeChild(textArea);
    });
}

function showCopySuccess(buttonElement, originalText, successText) {
    buttonElement.classList.add("success");
    const icon = buttonElement.querySelector("i");
    const textSpan = buttonElement.querySelector("span") || buttonElement;
    
    // Troca o ícone para check mark
    if (icon) {
        icon.className = "fa-solid fa-check";
    }
    
    // Troca o texto
    if (textSpan) {
        textSpan.textContent = successText;
    }

    // Reverte após 2 segundos
    setTimeout(() => {
        buttonElement.classList.remove("success");
        if (icon) {
            // Verifica qual o botão original para restaurar o ícone correto
            if (buttonElement.id === "btn-copy") {
                icon.className = "fa-regular fa-copy";
            } else if (buttonElement.id === "btn-copy-handle") {
                icon.className = "fa-regular fa-copy";
            }
        }
        if (textSpan) {
            textSpan.textContent = originalText;
        }
    }, 2000);
}
