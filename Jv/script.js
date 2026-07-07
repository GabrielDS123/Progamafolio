import { db, collection, addDoc } from "./firebase-config.js";

// ===== MENU TOGGLE MOBILE =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const logoToggle = document.getElementById("logo-toggle");
const mobileBreakpoint = 640;

function isMobile() {
    return window.innerWidth <= mobileBreakpoint;
}

function toggleMenu(force) {
    const shouldOpen = typeof force === "boolean" ? force : !navMenu.classList.contains("active");
    menuToggle.classList.toggle("active", shouldOpen);
    navMenu.classList.toggle("active", shouldOpen);
}

function closeMenu() {
    toggleMenu(false);
}

// Abrir/fechar o menu apenas pela logo no celular
logoToggle.addEventListener("click", (e) => {
    if (!isMobile()) return;

    e.stopPropagation();
    toggleMenu();
});

// Fechar menu ao clicar em um link
navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
    if (isMobile() && !e.target.closest("nav") && navMenu.classList.contains("active")) {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (!isMobile()) {
        closeMenu();
    }
});

// ===== DOWNLOAD DO CURRÍCULO =====
const downloadCvBtn = document.getElementById("btn-cnt");

downloadCvBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "curriculo/Curriculo_Gabriel_David_Souza.pdf";
    link.download = "Curriculo_Gabriel_David_Souza.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// ===== ENVIO DO FORMULÁRIO =====
const form = document.querySelector(".client");
const submitBtn = document.getElementById("enviar");

// Adicionar evento de envio do formulário
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pegar valores do formulário
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('input[name="message"]').value;

    // Validar campos
    if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Desabilitar botão enquanto envia
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
        // Adicionar documento à coleção "mensagens"
        await addDoc(collection(db, "mensagens"), {
            nome: name,
            email: email,
            mensagem: message,
            data: new Date(),
        });

        alert("Mensagem enviada com sucesso! 🎉");
        form.reset(); // Limpar formulário
        submitBtn.textContent = "envie mensagem";
        submitBtn.disabled = false;
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert("Erro ao enviar mensagem. Tente novamente.");
        submitBtn.textContent = "envie mensagem";
        submitBtn.disabled = false;
    }
});
