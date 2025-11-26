// Nombre initial de places restantes
let slotsRemaining = 100;

document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("language-switcher");

  /**
   * Met à jour l'affichage du nombre de places et la couleur/glow
   * @param {string} lang - langue active
   */
  function updateSlotsDisplay(lang) {
    const t = translations[lang];
    const slotsText = document.getElementById("slots_text");
    const slotsLight = document.getElementById("slots_light");
    const slotsBox = document.querySelector(".animated-border-box");
    const slotsBoxGlow = document.querySelector(".animated-border-box-glow");

    // Texte traduit
    slotsText.textContent = `${slotsRemaining} ${t.slots.remaining}`;

    // Définition couleur + vitesse selon le nombre de places
    let glowColor, rotateSpeed;
    if (slotsRemaining > 50) {
      glowColor = "limegreen"; // 🟢 Vert
      rotateSpeed = "4s";      // rotation lente
    } else if (slotsRemaining > 10) {
      glowColor = "orange";    // 🟠 Orange
      rotateSpeed = "2s";      // rotation moyenne
    } else {
      glowColor = "red";       // 🔴 Rouge
      rotateSpeed = "1s";      // rotation rapide
    }

    // Couleur du voyant
    slotsLight.style.background = glowColor;

    // Couleur + vitesse de la bordure animée (via variables CSS)
    if (slotsBox) {
      slotsBox.style.setProperty("--glow-color", glowColor);
      slotsBox.style.setProperty("--rotate-speed", rotateSpeed);
    }
    if (slotsBoxGlow) {
      slotsBoxGlow.style.setProperty("--glow-color", glowColor);
      slotsBoxGlow.style.setProperty("--rotate-speed", rotateSpeed);
    }
  }

  /**
   * Applique les traductions et met à jour l'UI
   * @param {string} lang - langue choisie
   */
  function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // TITRE
    document.getElementById("title").textContent = t.title;

    // INTRO
    document.getElementById("intro_title").textContent = t.intro_title;
    document.getElementById("intro_text").textContent = t.intro_text;

    // AVANTAGES
    document.getElementById("benefits_title").textContent = t.benefits_title;
    const benefitsList = document.getElementById("benefits_list");
    benefitsList.innerHTML = "";
    t.benefits_list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      benefitsList.appendChild(li);
    });

    // REQUIS
    document.getElementById("requirements_title").textContent = t.requirements_title;
    const requirementsList = document.getElementById("requirements_list");
    requirementsList.innerHTML = "";
    t.requirements_list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      requirementsList.appendChild(li);
    });

    // PRIX
    document.getElementById("price_title").textContent = t.price_title;
    document.getElementById("price_text").textContent = t.price_text;
    document.getElementById("payment_button").textContent = t.payment_button;

    // CONTENU
    document.getElementById("content_title").textContent = t.content_title;
    const contentList = document.getElementById("content_list");
    contentList.innerHTML = "";
    t.content_list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      contentList.appendChild(li);
    });

    // ETAPES
    document.getElementById("steps_title").textContent = t.steps_title;
    const stepsList = document.getElementById("steps_list");
    stepsList.innerHTML = "";
    t.steps_list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      stepsList.appendChild(li);
    });

    // DISCLAIMER
    document.getElementById("disclaimer_title").textContent = t.disclaimer_title;
    document.getElementById("disclaimer_text").textContent = t.disclaimer_text;
    document.getElementById("payment_button2").textContent = t.payment_button2;

    // FOOTER
    const footer = document.getElementById("footer_text");
    if (footer) footer.innerHTML = t.footer_text;

    // TERMS MODAL
    document.getElementById("terms_text").textContent = t.terms_modal.text;
    const termsLink = document.getElementById("terms_link");
    termsLink.textContent = t.terms_modal.terms_link;
    termsLink.href = "terms.html";

    const faqLink = document.getElementById("faq_link");
    faqLink.textContent = t.terms_modal.faq_link;
    faqLink.href = "faq.html";

    document.getElementById("agree_label").textContent = t.terms_modal.agree_label;
    document.getElementById("final_payment_button").textContent = t.payment_button;

    // Mise à jour slots + glow
    updateSlotsDisplay(lang);

    // Sauvegarde langue
    localStorage.setItem("lang", lang);
  }

  // Détection automatique de la langue
  const browserLang = (navigator.language || navigator.userLanguage).substring(0,2);
  const savedLang = localStorage.getItem("lang") || browserLang || "fr";
  const langToUse = translations[savedLang] ? savedLang : "fr";

  languageSwitcher.value = langToUse;
  setLanguage(langToUse);

  // Changement manuel de langue
  languageSwitcher.addEventListener("change", e => {
    setLanguage(e.target.value);
  });

  // --- Modal logic ---
  const modal = document.getElementById("terms-modal");
  const overlay = document.getElementById("modal-overlay");
  const closeModal = document.getElementById("close-modal");
  const agreeCheckbox = document.getElementById("agree_checkbox");
  const finalButton = document.getElementById("final_payment_button");

  function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  function closeModalFn() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    agreeCheckbox.checked = false;
    finalButton.setAttribute("disabled", true);
  }

  // Ouverture du modal depuis les boutons
  document.getElementById("payment_button").addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });
  document.getElementById("payment_button2").addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });

  // Fermeture modal
  closeModal.addEventListener("click", closeModalFn);
  overlay.addEventListener("click", closeModalFn);

  // Activation du bouton final si case cochée
  agreeCheckbox.addEventListener("change", () => {
    if (agreeCheckbox.checked) {
      finalButton.removeAttribute("disabled");
    } else {
      finalButton.setAttribute("disabled", true);
    }
  });
});
