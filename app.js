/**
 * SOY CRESPA NATURALMENTE - LÓGICA DE INTERACCIÓN Y FUNCIONALIDADES
 * Implementación nativa, rápida, sin dependencias pesadas, totalmente responsive y accesible.
 */

document.addEventListener("DOMContentLoaded", () => {
  initBusinessHoursStatus();
  initHeaderScroll();
  initMobileMenu();
  renderServices();
  renderPackages();
  renderGallery();
  renderArticles();
  renderReviews();
  renderFaq();
  initAdvisorQuiz();
  initBookingWizard();
  initSearchModal();
  initModalsGlobalEvents();
});

/* ==========================================================================
   1. HORARIOS EN VIVO (ZONA HORARIA COLOMBIA UTC-5)
   ========================================================================== */
function initBusinessHoursStatus() {
  const statusBadge = document.getElementById("hoursStatusBadge");
  const hoursListEl = document.getElementById("hoursScheduleList");
  if (!statusBadge || !hoursListEl) return;

  // Renderizar la tabla de horarios
  hoursListEl.innerHTML = SALON_DATA.hours.map((h, idx) => `
    <div class="hours-row" data-day-index="${idx}">
      <span>${h.day}</span>
      <span>${h.time}</span>
    </div>
  `).join("");

  // Calcular hora en Colombia (UTC-5)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const colombiaTime = new Date(utc - (5 * 3600000));

  const dayOfWeek = colombiaTime.getDay(); // 0 is Sunday, 1 is Monday...
  // Mapear domingo=6, lunes=0, martes=1, etc.
  const salonDayIndex = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;

  // Marcar fila de hoy
  const rows = hoursListEl.querySelectorAll(".hours-row");
  if (rows[salonDayIndex]) {
    rows[salonDayIndex].classList.add("today");
  }

  const todaySchedule = SALON_DATA.hours[salonDayIndex];
  if (!todaySchedule || !todaySchedule.open) {
    statusBadge.className = "hours-status-badge closed";
    statusBadge.innerHTML = `<span class="hours-status-dot"></span> Cerrado hoy (Domingo)`;
    return;
  }

  const currentMinutes = colombiaTime.getHours() * 60 + colombiaTime.getMinutes();
  const [startH, startM] = todaySchedule.start.split(":").map(Number);
  const [endH, endM] = todaySchedule.end.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
    statusBadge.className = "hours-status-badge open";
    statusBadge.innerHTML = `<span class="hours-status-dot"></span> Abierto ahora · Cierra a las ${todaySchedule.end.replace("17:30", "5:30 p.m.").replace("17:00", "5:00 p.m.")}`;
  } else {
    statusBadge.className = "hours-status-badge closed";
    statusBadge.innerHTML = `<span class="hours-status-dot"></span> Cerrado ahora · Abre a las 9:00 a.m.`;
  }
}

/* ==========================================================================
   2. HEADER SCROLL & NAVEGACIÓN MÓVIL
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const menuDrawer = document.getElementById("mobileDrawer");
  const closeBtn = document.getElementById("mobileDrawerClose");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !menuDrawer) return;

  const openDrawer = () => {
    menuDrawer.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    menuDrawer.classList.remove("active");
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  menuDrawer.addEventListener("click", (e) => {
    if (e.target === menuDrawer) closeDrawer();
  });

  navLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

/* ==========================================================================
   3. CATÁLOGO DE SERVICIOS
   ========================================================================== */
let currentCategoryFilter = "all";

function renderServices() {
  const container = document.getElementById("servicesGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!container) return;

  const filtered = (currentCategoryFilter === "all")
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === currentCategoryFilter);

  container.innerHTML = filtered.map(service => {
    // Generar bloque de precio
    let priceHtml = "";
    if (service.priceType === "tiers") {
      priceHtml = `
        <div class="service-pricing-box">
          <div class="price-box-header">
            <span class="price-main">${service.prices[0].formatted}</span>
            <span class="price-subnote">Tarifa inicial (Densidad baja)</span>
          </div>
          <div class="density-tiers-mini">
            ${service.prices.map(p => `
              <div class="density-row">
                <span>${p.tier}</span>
                <span>${p.formatted}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    } else if (service.priceType === "options") {
      priceHtml = `
        <div class="service-pricing-box">
          <div class="price-box-header">
            <span class="price-main">${service.prices[0].formatted}</span>
            <span class="price-subnote">${service.priceNote}</span>
          </div>
          <div class="density-tiers-mini">
            ${service.prices.map(p => `
              <div class="density-row">
                <span>${p.tier}</span>
                <span>${p.formatted}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    } else {
      priceHtml = `
        <div class="service-pricing-box">
          <div class="price-box-header">
            <span class="price-main">${service.prices[0].formatted}</span>
            <span class="price-subnote">${service.priceNote}</span>
          </div>
          <p style="font-size:0.8125rem; color:var(--text-muted); margin-top:0.25rem;">
            Consulta la cotización exacta enviándonos foto de tu cabello.
          </p>
        </div>
      `;
    }

    return `
      <article class="service-card" data-service-id="${service.id}">
        <div class="service-card-media">
          <img src="${service.image}" alt="${service.title}" loading="lazy">
          <span class="service-card-badge badge badge-white">${service.badge}</span>
        </div>
        <div class="service-card-body">
          <span class="service-category-tag">${service.categoryLabel}</span>
          <h3 class="service-card-title">${service.title}</h3>
          <p class="service-card-desc">${service.shortDescription}</p>
          ${priceHtml}
          <div class="service-card-actions">
            <button class="btn btn-outline btn-sm" onclick="openServiceDetailModal('${service.id}')">
              Ver detalles completos
            </button>
            <a href="${buildWhatsAppUrl(service.whatsappMessage)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" title="Consultar por WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.181-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
              </svg>
              Reservar
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Configurar listeners de filtros
  filterButtons.forEach(btn => {
    btn.onclick = () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategoryFilter = btn.dataset.category;
      renderServices();
    };
  });
}

function openServiceDetailModal(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  const modal = document.getElementById("serviceDetailModal");
  const content = document.getElementById("serviceDetailContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="aspect-ratio: 16/9; max-height: 280px; overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <img src="${service.image}" alt="${service.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
      <span class="badge badge-gold">${service.categoryLabel}</span>
      <span class="badge badge-navy">${service.badge}</span>
    </div>
    <h2 class="section-title" style="font-size: 2rem; margin-bottom: 1rem;">${service.title}</h2>
    <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">
      ${service.fullDescription}
    </p>

    <h4 style="font-size: 1.125rem; font-family: var(--font-serif); color: var(--navy-deep); margin-bottom: 0.75rem;">
      ¿Qué incluye este servicio?
    </h4>
    <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.75rem;">
      ${service.includes.map(inc => `
        <li style="display: flex; align-items: flex-start; gap: 0.625rem; font-size: 0.9375rem; color: var(--text-dark);">
          <span style="color: var(--gold-dark); font-weight: bold;">✓</span>
          <span>${inc}</span>
        </li>
      `).join("")}
    </ul>

    <div style="background: var(--ivory); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 1.75rem;">
      <h4 style="font-size: 1rem; color: var(--navy-deep); margin-bottom: 0.5rem; font-weight: 700;">
        Estructura de Tarifas (Pesos Colombianos)
      </h4>
      <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.75rem;">
        ${service.priceNote}. En salón evaluamos tu longitud y hebra para confirmar la tarifa exacta.
      </p>
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        ${service.prices.map(p => `
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; padding: 0.25rem 0; border-bottom: 1px dashed rgba(16,44,80,0.1);">
            <span style="color: var(--text-dark);">${p.tier}</span>
            <strong style="color: var(--navy-deep);">${p.formatted}</strong>
          </div>
        `).join("")}
      </div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;">
      <div>
        <span style="display: block; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Duración estimada</span>
        <strong style="font-size: 0.9375rem; color: var(--navy-deep);">${service.duration}</strong>
      </div>
      <a href="${buildWhatsAppUrl(service.whatsappMessage)}" target="_blank" rel="noopener" class="btn btn-whatsapp">
        Consultar y Agendar por WhatsApp
      </a>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   4. PAQUETES COMBINADOS
   ========================================================================== */
function renderPackages() {
  const container = document.getElementById("packagesGrid");
  if (!container) return;

  container.innerHTML = PACKAGES_DATA.map(pkg => `
    <article class="package-card ${pkg.recommended ? 'highlighted' : ''}">
      <span class="package-card-badge badge ${pkg.recommended ? 'badge-gold' : 'badge-navy'}">
        ${pkg.badge}
      </span>
      <h3 class="package-title">${pkg.title}</h3>
      <span class="package-subtitle">${pkg.subtitle}</span>
      <p class="package-desc">${pkg.description}</p>

      <div class="package-price-box">
        <span style="display:block; font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">
          ${pkg.priceNote}
        </span>
        <div style="font-family:var(--font-serif); font-size:1.75rem; font-weight:700; color:var(--navy-deep); margin-top:0.25rem;">
          ${pkg.prices[0].formatted}
        </div>
        ${pkg.prices.length > 1 ? `
          <div class="package-price-tiers">
            ${pkg.prices.map(pr => `
              <div class="package-tier-item">
                <span>${pr.tier}</span>
                <strong>${pr.formatted}</strong>
              </div>
            `).join("")}
          </div>
        ` : ''}
      </div>

      <div class="package-features-list">
        ${pkg.features.map(f => `
          <div class="package-feature-item ${f.included ? 'included' : 'excluded'}">
            <span class="feat-icon">${f.included ? '✓' : '—'}</span>
            <div class="feat-text">
              <strong>${f.name}</strong>
              <span>${f.detail}</span>
            </div>
          </div>
        `).join("")}
      </div>

      <div style="margin-top: auto;">
        <a href="${buildWhatsAppUrl(pkg.whatsappMessage)}" target="_blank" rel="noopener" class="btn ${pkg.recommended ? 'btn-gold' : 'btn-outline'} btn-lg" style="width: 100%;">
          ${pkg.recommended ? 'Agendar Súper Paquete' : 'Consultar Paquete Express'}
        </a>
      </div>
    </article>
  `).join("");
}

/* ==========================================================================
   5. ASESOR CAPILAR INTERACTIVO (QUIZ)
   ========================================================================== */
let quizCurrentStep = 1;
const quizAnswers = {};

function initAdvisorQuiz() {
  const container = document.getElementById("advisorQuizCard");
  if (!container) return;

  renderQuizStep();
}

function renderQuizStep() {
  const container = document.getElementById("quizDynamicContent");
  const progressBar = document.getElementById("quizProgressBar");
  const stepIndicator = document.getElementById("quizStepIndicator");
  const resultView = document.getElementById("quizResultView");
  if (!container) return;

  if (quizCurrentStep > QUIZ_QUESTIONS.length) {
    // Mostrar resultados
    container.style.display = "none";
    if (resultView) {
      resultView.style.display = "block";
      renderQuizResult();
    }
    return;
  }

  container.style.display = "block";
  if (resultView) resultView.style.display = "none";

  const question = QUIZ_QUESTIONS[quizCurrentStep - 1];
  const progressPercent = (quizCurrentStep / QUIZ_QUESTIONS.length) * 100;

  if (progressBar) progressBar.style.width = `${progressPercent}%`;
  if (stepIndicator) stepIndicator.textContent = `Paso ${quizCurrentStep} de ${QUIZ_QUESTIONS.length}`;

  container.innerHTML = `
    <h3 class="quiz-question-title">${question.title}</h3>
    <p class="quiz-question-subtitle">${question.subtitle}</p>

    <div class="quiz-options-grid">
      ${question.options.map(opt => {
        const isSelected = quizAnswers[question.id] === opt.value;
        return `
          <button class="quiz-option-btn ${isSelected ? 'selected' : ''}" onclick="selectQuizOption('${question.id}', '${opt.value}')">
            <span class="quiz-option-icon">${opt.icon}</span>
            <span class="quiz-option-label">${opt.label}</span>
          </button>
        `;
      }).join("")}
    </div>

    <div class="quiz-nav-actions">
      ${quizCurrentStep > 1 ? `
        <button class="btn btn-outline btn-sm" onclick="prevQuizStep()">
          ← Anterior
        </button>
      ` : `<div></div>`}
      
      <button class="btn btn-primary btn-sm" id="quizNextBtn" onclick="nextQuizStep()" ${!quizAnswers[question.id] ? 'disabled style="opacity:0.5; pointer-events:none;"' : ''}>
        ${quizCurrentStep === QUIZ_QUESTIONS.length ? 'Ver mi Recomendación' : 'Siguiente →'}
      </button>
    </div>
  `;
}

window.selectQuizOption = function(questionId, value) {
  quizAnswers[questionId] = value;
  renderQuizStep();
};

window.nextQuizStep = function() {
  if (quizCurrentStep <= QUIZ_QUESTIONS.length) {
    quizCurrentStep++;
    renderQuizStep();
  }
};

window.prevQuizStep = function() {
  if (quizCurrentStep > 1) {
    quizCurrentStep--;
    renderQuizStep();
  }
};

window.restartQuiz = function() {
  quizCurrentStep = 1;
  for (let key in quizAnswers) delete quizAnswers[key];
  renderQuizStep();
};

function renderQuizResult() {
  const resultCardEl = document.getElementById("quizResultCardBody");
  if (!resultCardEl) return;

  const evaluation = evaluateQuizAnswers(quizAnswers);
  const { service, reason, textureDisplay, densityDisplay, estimatedPrice, customWhatsAppMsg } = evaluation;

  resultCardEl.innerHTML = `
    <div class="quiz-result-media">
      <img src="${service.image}" alt="${service.title}">
    </div>
    <div class="quiz-result-body">
      <span class="quiz-result-badge">Recomendación Personalizada</span>
      <h3 class="quiz-result-title">${service.title}</h3>
      <p class="quiz-result-why">
        <strong>¿Por qué es ideal para ti?</strong><br>
        ${reason}
      </p>
      <div style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1rem;">
        Textura indicada: <strong>${textureDisplay}</strong> · Densidad: <strong>${densityDisplay}</strong>
      </div>
      <div class="quiz-result-estimate">
        <span>Tarifa orientativa estimada</span>
        <strong>${estimatedPrice}</strong>
      </div>
      <div class="quiz-result-actions">
        <a href="${buildWhatsAppUrl(customWhatsAppMsg)}" target="_blank" rel="noopener" class="btn btn-whatsapp">
          Consultar esta recomendación por WhatsApp
        </a>
        <button class="btn btn-outline" onclick="restartQuiz()">
          Reiniciar Asesor
        </button>
      </div>
    </div>
  `;
}

/* ==========================================================================
   6. SOLICITUD DE CITA PASO A PASO
   ========================================================================== */
function initBookingWizard() {
  const serviceSelect = document.getElementById("bookingServiceSelect");
  const dateInput = document.getElementById("bookingDateInput");
  const timeRadios = document.querySelectorAll(".time-radio-tile");
  const summaryBox = document.getElementById("bookingSummaryBox");
  const sendBtn = document.getElementById("bookingSubmitBtn");
  if (!serviceSelect || !dateInput) return;

  // Llenar selector con servicios y paquetes reales
  serviceSelect.innerHTML = `
    <option value="">-- Elige un servicio o paquete --</option>
    <optgroup label="Paquetes Especiales">
      ${PACKAGES_DATA.map(p => `<option value="${p.title}">${p.title}</option>`).join("")}
    </optgroup>
    <optgroup label="Servicios Individuales">
      ${SERVICES_DATA.map(s => `<option value="${s.title}">${s.title}</option>`).join("")}
    </optgroup>
  `;

  // Validar fecha mínima (hoy en Colombia)
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  // Time tile selection
  let selectedTimeSlot = "Sin preferencia";
  timeRadios.forEach(tile => {
    tile.addEventListener("click", () => {
      timeRadios.forEach(t => t.classList.remove("selected"));
      tile.classList.add("selected");
      selectedTimeSlot = tile.dataset.time;
      updateBookingSummary();
    });
  });

  const updateBookingSummary = () => {
    const selectedService = serviceSelect.value || "Pendiente por definir";
    const selectedDate = dateInput.value || "Fecha flexible / Por confirmar";
    const notes = document.getElementById("bookingNotesInput")?.value || "Ninguna";

    if (summaryBox) {
      summaryBox.innerHTML = `
        <div class="summary-row">
          <span>Servicio solicitado:</span>
          <span>${selectedService}</span>
        </div>
        <div class="summary-row">
          <span>Preferencia de fecha:</span>
          <span>${selectedDate}</span>
        </div>
        <div class="summary-row">
          <span>Franja horaria:</span>
          <span>${selectedTimeSlot}</span>
        </div>
      `;
    }

    if (sendBtn) {
      const msg = `Hola, Soy Crespa Naturalmente. Me gustaría solicitar una cita desde la página web:\n- Servicio: ${selectedService}\n- Fecha de preferencia: ${selectedDate}\n- Horario de preferencia: ${selectedTimeSlot}\n- Observaciones: ${notes}\n\nQuedo atenta/o a su confirmación de disponibilidad y tarifa actual. ¡Gracias!`;
      sendBtn.href = buildWhatsAppUrl(msg);
    }
  };

  serviceSelect.addEventListener("change", updateBookingSummary);
  dateInput.addEventListener("change", updateBookingSummary);
  document.getElementById("bookingNotesInput")?.addEventListener("input", updateBookingSummary);

  updateBookingSummary();
}

/* ==========================================================================
   7. GALERÍA VISUAL Y LIGHTBOX
   ========================================================================== */
let activeLightboxIndex = 0;
let currentGalleryFilter = "all";

function renderGallery() {
  const container = document.getElementById("galleryGrid");
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  if (!container) return;

  const filtered = (currentGalleryFilter === "all")
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === currentGalleryFilter);

  container.innerHTML = filtered.map((item, idx) => `
    <div class="gallery-card" tabindex="0" onclick="openLightbox(${item.id})">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-overlay-badge">${item.badge}</span>
        <h4 class="gallery-overlay-title">${item.title}</h4>
      </div>
    </div>
  `).join("");

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentGalleryFilter = btn.dataset.category;
      renderGallery();
    };
  });
}

window.openLightbox = function(itemId) {
  const itemIndex = GALLERY_ITEMS.findIndex(g => g.id === itemId);
  if (itemIndex === -1) return;

  activeLightboxIndex = itemIndex;
  updateLightboxContent();

  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

function updateLightboxContent() {
  const item = GALLERY_ITEMS[activeLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const descEl = document.getElementById("lightboxDesc");
  const waBtn = document.getElementById("lightboxWaBtn");

  if (imgEl) imgEl.src = item.image;
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.description;
  if (waBtn) {
    const msg = `Hola, vi el resultado "${item.title}" en la galería de su web. Me gustaría saber qué servicio o tratamiento se realizó y si es adecuado para mi cabello.`;
    waBtn.href = buildWhatsAppUrl(msg);
  }
}

window.nextLightboxItem = function() {
  activeLightboxIndex = (activeLightboxIndex + 1) % GALLERY_ITEMS.length;
  updateLightboxContent();
};

window.prevLightboxItem = function() {
  activeLightboxIndex = (activeLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightboxContent();
};

/* ==========================================================================
   8. ARTÍCULOS EDITORIALES Y CONSEJOS
   ========================================================================== */
function renderArticles() {
  const container = document.getElementById("articlesGrid");
  if (!container) return;

  container.innerHTML = ARTICLES_DATA.map(art => `
    <article class="article-card">
      <div class="article-media">
        <img src="${art.image}" alt="${art.title}" loading="lazy">
      </div>
      <div class="article-body">
        <div class="article-meta">
          <span>${art.category}</span>
          <span>·</span>
          <span>${art.readTime}</span>
        </div>
        <h3 class="article-title">${art.title}</h3>
        <p class="article-excerpt">${art.excerpt}</p>
        <button class="article-read-btn" onclick="openArticleModal('${art.id}')">
          Leer artículo completo →
        </button>
      </div>
    </article>
  `).join("");
}

window.openArticleModal = function(articleId) {
  const article = ARTICLES_DATA.find(a => a.id === articleId);
  if (!article) return;

  const modal = document.getElementById("articleDetailModal");
  const content = document.getElementById("articleDetailContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="aspect-ratio: 16/9; max-height: 280px; overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
      <span class="badge badge-gold">${article.category}</span>
      <span style="font-size: 0.75rem; color: var(--text-muted);">${article.readTime}</span>
    </div>
    <h2 class="section-title" style="font-size: 2rem; margin-bottom: 1.5rem; line-height: 1.2;">
      ${article.title}
    </h2>
    <div class="article-full-body" style="font-size: 1rem; color: var(--text-dark); line-height: 1.8;">
      ${article.body}
    </div>
    <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <span style="font-size: 0.875rem; color: var(--text-muted);">¿Quieres asesoría personalizada para tu tipo de rizo?</span>
      <a href="${buildWhatsAppUrl('Hola, leí el artículo sobre "' + article.title + '" en su web y quisiera consultarle a sus especialistas.')}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
        Consultar con una especialista
      </a>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

/* ==========================================================================
   9. RESEÑAS VERIFICADAS DE GOOGLE
   ========================================================================== */
function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;

  container.innerHTML = REVIEWS_DATA.map(rev => `
    <div class="review-card">
      <div class="review-stars">
        ${'★'.repeat(rev.stars)}
      </div>
      <p class="review-comment">"${rev.comment}"</p>
      <div class="review-author-wrap">
        <div class="author-avatar-initial">
          ${rev.name.charAt(0)}
        </div>
        <div class="author-info">
          <h5>${rev.name}</h5>
          <p>${rev.source} · ${rev.date}</p>
        </div>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   10. PREGUNTAS FRECUENTES (FAQ ACORDEÓN)
   ========================================================================== */
function renderFaq() {
  const container = document.getElementById("faqList");
  if (!container) return;

  container.innerHTML = FAQ_DATA.map((item, idx) => `
    <div class="faq-item" id="faqItem-${idx}">
      <button class="faq-question-btn" onclick="toggleFaq(${idx})" aria-expanded="false" aria-controls="faqAns-${idx}">
        <span>${item.question}</span>
        <span class="faq-toggle-icon">↓</span>
      </button>
      <div class="faq-answer-panel" id="faqAns-${idx}">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join("");
}

window.toggleFaq = function(index) {
  const item = document.getElementById(`faqItem-${index}`);
  const btn = item.querySelector(".faq-question-btn");
  const panel = item.querySelector(".faq-answer-panel");
  if (!item || !panel) return;

  const isActive = item.classList.contains("active");

  // Cerrar todos los demás
  document.querySelectorAll(".faq-item").forEach(other => {
    other.classList.remove("active");
    const otherPanel = other.querySelector(".faq-answer-panel");
    const otherBtn = other.querySelector(".faq-question-btn");
    if (otherPanel) otherPanel.style.maxHeight = null;
    if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
  });

  if (!isActive) {
    item.classList.add("active");
    panel.style.maxHeight = panel.scrollHeight + "px";
    btn.setAttribute("aria-expanded", "true");
  }
};

/* ==========================================================================
   11. BÚSQUEDA RÁPIDA EN VIVO
   ========================================================================== */
function initSearchModal() {
  const trigger = document.getElementById("searchTriggerBtn");
  const modal = document.getElementById("searchModal");
  const input = document.getElementById("searchInput");
  const resultsList = document.getElementById("searchResultsList");
  if (!trigger || !modal || !input) return;

  trigger.onclick = () => {
    modal.classList.add("active");
    input.value = "";
    input.focus();
    renderSearchResults("");
    document.body.style.overflow = "hidden";
  };

  // Keyboard shortcut Ctrl+K o Cmd+K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      trigger.click();
    }
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  input.addEventListener("input", (e) => {
    renderSearchResults(e.target.value.trim());
  });

  function renderSearchResults(query) {
    if (!resultsList) return;
    if (!query) {
      resultsList.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9375rem;">
          Escribe para buscar servicios, paquetes, consejos o preguntas frecuentes...
        </div>
      `;
      return;
    }

    const q = normalizeString(query);
    const matches = [];

    // Buscar en Servicios
    SERVICES_DATA.forEach(s => {
      if (normalizeString(s.title).includes(q) || normalizeString(s.shortDescription).includes(q)) {
        matches.push({ type: "Servicio", title: s.title, desc: s.shortDescription, action: `openServiceDetailModal('${s.id}')` });
      }
    });

    // Buscar en Paquetes
    PACKAGES_DATA.forEach(p => {
      if (normalizeString(p.title).includes(q) || normalizeString(p.description).includes(q)) {
        matches.push({ type: "Paquete", title: p.title, desc: p.description, action: `location.hash='#paquetes'` });
      }
    });

    // Buscar en Artículos
    ARTICLES_DATA.forEach(a => {
      if (normalizeString(a.title).includes(q) || normalizeString(a.excerpt).includes(q)) {
        matches.push({ type: "Consejo Capilar", title: a.title, desc: a.excerpt, action: `openArticleModal('${a.id}')` });
      }
    });

    // Buscar en FAQ
    FAQ_DATA.forEach((f, idx) => {
      if (normalizeString(f.question).includes(q) || normalizeString(f.answer).includes(q)) {
        matches.push({ type: "Pregunta Frecuente", title: f.question, desc: f.answer, action: `location.hash='#faq'; toggleFaq(${idx})` });
      }
    });

    if (matches.length === 0) {
      resultsList.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
          No se encontraron resultados para "<strong>${query}</strong>".<br>
          <a href="${buildWhatsAppUrl('Hola, busco información sobre: ' + query)}" target="_blank" class="btn btn-whatsapp btn-sm" style="margin-top: 1rem;">
            Consultar por WhatsApp
          </a>
        </div>
      `;
      return;
    }

    resultsList.innerHTML = matches.map(m => `
      <div class="search-result-item" onclick="${m.action}; closeAllModals();" style="cursor: pointer;">
        <div>
          <span style="font-size: 0.6875rem; text-transform: uppercase; font-weight: 700; color: var(--gold-dark);">${m.type}</span>
          <h5 style="font-size: 0.9375rem; color: var(--navy-deep);">${m.title}</h5>
          <p style="font-size: 0.8125rem; color: var(--text-muted);">${m.desc.slice(0, 85)}...</p>
        </div>
        <span style="color: var(--gold); font-size: 1.25rem;">→</span>
      </div>
    `).join("");
  }
}

function normalizeString(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* ==========================================================================
   12. CONTROL GLOBAL DE MODALES
   ========================================================================== */
function initModalsGlobalEvents() {
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });

    const closeBtn = backdrop.querySelector(".modal-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeAllModals);
    }
  });
}

window.closeAllModals = function() {
  document.querySelectorAll(".modal-backdrop").forEach(b => b.classList.remove("active"));
  document.body.style.overflow = "";
};

window.copySalonAddress = function() {
  navigator.clipboard.writeText(SALON_DATA.address).then(() => {
    alert("Dirección copiada al portapapeles: " + SALON_DATA.address);
  }).catch(() => {
    prompt("Copia la dirección oficial:", SALON_DATA.address);
  });
};
