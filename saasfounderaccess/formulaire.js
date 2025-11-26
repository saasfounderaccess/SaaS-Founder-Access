(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const access = urlParams.get("access");

    const VALID_TOKEN = "SFAX-92JKD82-UNIQUE"; // ton token

    if (access !== VALID_TOKEN) {
        document.body.innerHTML = "<h2 style='text-align:center;margin-top:60px;'>Accès non autorisé</h2>";
        document.body.classList.add("ready"); // afficher uniquement le message
        return;
    }

    // Si autorisé → on affiche la page normalement
    document.body.classList.add("ready");

})();

document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // TRADUCTIONS
    // ======================
    const translations = {
        fr: {
            form_title: "Complétez vos informations",
            form_subtitle: "Merci pour votre paiement 🙏<br>Veuillez remplir ce formulaire pour accéder au contenu.",
            label_name: "Nom complet",
            label_email: "Adresse e-mail",
            label_phone: "Numéro de téléphone (optionnel)",
            label_country: "Pays",
            label_message: "Message (optionnel)",
            submit_button: "Valider",
            form_footer: "Vos informations sont confidentielles et ne seront jamais partagées.",
            footer_text: "SaaS Founder Access – Programme officiel des 100 Founders | <a href='faq.html'>FAQ</a> | <a href='terms.html'>Termes & Conditions</a>"
        },
        en: {
            form_title: "Complete your information",
            form_subtitle: "Thank you for your payment 🙏<br>Please fill out this form to access the content.",
            label_name: "Full name",
            label_email: "Email address",
            label_phone: "Phone number (optional)",
            label_country: "Country",
            label_message: "Message (optional)",
            submit_button: "Submit",
            form_footer: "Your information is confidential and will never be shared.",
            footer_text: "SaaS Founder Access – Official 100 Founders Program | <a href='faq.html'>FAQ</a> | <a href='terms.html'>Terms & Conditions</a>"
        },
        es: {
            form_title: "Complete su información",
            form_subtitle: "Gracias por su pago 🙏<br>Por favor complete este formulario para acceder al contenido.",
            label_name: "Nombre completo",
            label_email: "Correo electrónico",
            label_phone: "Número de teléfono (opcional)",
            label_country: "País",
            label_message: "Mensaje (opcional)",
            submit_button: "Enviar",
            form_footer: "Su información es confidencial y nunca será compartida.",
            footer_text: "SaaS Founder Access – Programa oficial de los 100 Founders | <a href='faq.html'>Preguntas Frecuentes</a> | <a href='terms.html'>Términos y Condiciones</a>"
        },
        pt: {
            form_title: "Complete suas informações",
            form_subtitle: "Obrigado pelo seu pagamento 🙏<br>Por favor, preencha este formulário para acessar o conteúdo.",
            label_name: "Nome completo",
            label_email: "Endereço de e-mail",
            label_phone: "Número de telefone (opcional)",
            label_country: "País",
            label_message: "Mensagem (opcional)",
            submit_button: "Enviar",
            form_footer: "Suas informações são confidenciais e nunca serão compartilhadas.",
            footer_text: "SaaS Founder Access – Programa oficial dos 100 Founders | <a href='faq.html'>Perguntas frequentes</a> | <a href='terms.html'>Termos e Condições</a>"
        },
        zh: {
            form_title: "填写您的信息",
            form_subtitle: "感谢您的付款 🙏<br>请填写此表单以访问内容。",
            label_name: "姓名",
            label_email: "电子邮箱",
            label_phone: "电话号码（可选）",
            label_country: "国家",
            label_message: "留言（可选）",
            submit_button: "提交",
            form_footer: "您的信息将严格保密，不会被分享。",
            footer_text: "SaaS Founder Access – 100名创始会员官方计划 | <a href='faq.html'>常见问题</a> | <a href='terms.html'>条款与条件</a>"
        }
    };

    const langSelect = document.getElementById("language-switcher");

    // ======================
    // FONCTION DE TRADUCTION
    // ======================
    function setLanguage(lang) {
        const t = translations[lang];
        if (!t) return;

        // Formulaire
        document.getElementById("form_title").innerHTML = t.form_title;
        document.getElementById("form_subtitle").innerHTML = t.form_subtitle;

        document.getElementById("label_name").textContent = t.label_name;
        document.getElementById("label_email").textContent = t.label_email;
        document.getElementById("label_phone").textContent = t.label_phone;
        document.getElementById("label_country").textContent = t.label_country;
        document.getElementById("label_message").textContent = t.label_message;

        document.getElementById("submit_button").textContent = t.submit_button;
        document.getElementById("form_footer").textContent = t.form_footer;

        // Footer multilingue avec liens
        const footer = document.getElementById("footer_text");
        if (footer) footer.innerHTML = t.footer_text;

        localStorage.setItem("lang", lang);
    }

    // ======================
    // LANGUE PAR DÉFAUT
    // ======================
    let saved = localStorage.getItem("lang") || navigator.language.slice(0,2) || "fr";
    if (!translations[saved]) saved = "fr"; // fallback

    langSelect.value = saved;
    setLanguage(saved);

    // ======================
    // CHANGEMENT MANUEL
    // ======================
    langSelect.addEventListener("change", e => {
        setLanguage(e.target.value);
    });

});