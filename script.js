// ======================================================================
// EMAILJS CONFIGURATION CONFIG
// ======================================================================
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS Public Key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your EmailJS Service ID
const EMAILJS_ADMIN_TEMPLATE_ID = "YOUR_ADMIN_TEMPLATE_ID"; // Replace with Admin Alert Template ID
const EMAILJS_CLIENT_TEMPLATE_ID = "YOUR_CLIENT_TEMPLATE_ID"; // Replace with Client Confirmation Template ID

// Initialize EmailJS
if (typeof emailjs !== "undefined") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

const services = [
  {
    id: "low-level-laser-therapy",
    title: "Low-Level Laser Therapy (LLLT)",
    shortDesc:
      "Non-invasive light therapy to accelerate tissue healing, reduce inflammation, and relieve acute/chronic pain.",
    fullDesc:
      "Low-Level Laser Therapy (LLLT) uses specific wavelengths of light to interact with tissue. It helps accelerate the healing process by stimulating cellular function, increasing circulation, and reducing pain and inflammation in deep tissues.",
    conditions: [
      "Muscle strains & ligament sprains",
      "Tendonitis & bursitis",
      "Joint pain & arthritis",
      "Wound healing & tissue repair"
    ],
    approach:
      "We target the specific area of pain or injury with precise laser dosages to stimulate cellular recovery and provide fast, drug-free pain relief.",
    image: "assets/Low-Level Laser Therapy (LLLT).png",
  },
  {
    id: "short-wave-diathermy",
    title: "Short Wave Diathermy (SWD)",
    shortDesc:
      "Deep heat therapy using high-frequency electromagnetic energy to relieve deep muscle spasms and joint stiffness.",
    fullDesc:
      "Short Wave Diathermy (SWD) is a therapeutic treatment that uses high-frequency electromagnetic currents to generate deep heat within body tissues. It increases blood flow, relaxes muscles, and improves the flexibility of connective tissues.",
    conditions: [
      "Chronic back & neck pain",
      "Deep muscle spasms",
      "Joint stiffness & osteoarthritis",
      "Chronic pelvic inflammatory disease"
    ],
    approach:
      "Safe, controlled electromagnetic application to heat deep tissues, promoting relaxation, healing, and pain relief before therapeutic exercises.",
    image: "assets/Short Wave Diathermy (SWD).png",
  },
  {
    id: "tens-therapy",
    title: "TENS (Transcutaneous Electrical Nerve Stimulation)",
    shortDesc:
      "Targeted electrical stimulation to block pain signals and stimulate endorphin release for effective pain relief.",
    fullDesc:
      "TENS therapy uses low-voltage electrical currents to relieve pain. It works by stimulating sensory nerves to block pain signals from reaching the brain and by promoting the release of endorphins, the body's natural painkillers.",
    conditions: [
      "Acute post-operative pain",
      "Chronic lower back & neck pain",
      "Neuropathic pain",
      "Phantom limb pain"
    ],
    approach:
      "Customized electrode placement and frequency adjustments to target specific painful regions, providing safe and immediate pain management.",
    image: "assets/TENS (Transcutaneous Electrical Nerve Stimulation).png",
  },
  {
    id: "interferential-therapy",
    title: "Interferential Therapy",
    shortDesc:
      "Deep-penetrating electrical stimulation to reduce deep-seated swelling, muscle spasms, and chronic pain.",
    fullDesc:
      "Interferential Therapy (IFT) uses mid-frequency electrical currents to penetrate deep into muscles and tissues. It is highly effective for reducing edema, accelerating bone and tissue healing, and managing deep, persistent musculoskeletal pain.",
    conditions: [
      "Deep muscle spasms",
      "Swelling and edema",
      "Chronic joint pain",
      "Sports injuries"
    ],
    approach:
      "We set crossing electrical currents that interfere deep within the target tissues, providing a comfortable, deep-tissue massage effect and pain relief.",
    image: "assets/Interferential Therapy.png",
  },
  {
    id: "ultrasound-therapy",
    title: "Ultrasound Therapy",
    shortDesc:
      "High-frequency sound waves to promote deep tissue healing, break down scar tissue, and improve mobility.",
    fullDesc:
      "Ultrasound Therapy utilizes high-frequency sound waves to penetrate deep into soft tissues. These waves create micro-vibrations and deep heating, which increase blood flow, break down scar tissue, reduce chronic swelling, and accelerate healing.",
    conditions: [
      "Tendonitis & plantar fasciitis",
      "Muscle spasms & joint contractures",
      "Ligament sprains",
      "Scar tissue buildup"
    ],
    approach:
      "Application of a conductive gel and continuous or pulsed ultrasound waves directly to the injured area to stimulate deep cellular repair.",
    image: "assets/Ultrasound Therapy.png",
  },
  {
    id: "electrical-stimulation",
    title: "Electrical Stimulation",
    shortDesc:
      "Electrical currents to prevent muscle wasting, re-educate weak muscles, and improve motor control.",
    fullDesc:
      "Electrical Muscle Stimulation (EMS) or Neuromuscular Electrical Stimulation (NMES) uses electrical impulses to contract muscles. It is essential for preventing muscle atrophy in immobilized limbs and re-educating weak muscles after stroke or surgery.",
    conditions: [
      "Muscle atrophy (wasting)",
      "Stroke rehabilitation (hemiplegia)",
      "Bell's palsy & facial weakness",
      "Post-surgical muscle inhibition"
    ],
    approach:
      "Targeted stimulation of motor nerves using customized electrical wave parameters to restore muscle tone, strength, and movement control.",
    image: "assets/Electrical Stimulation.png",
  },
  {
    id: "wax-therapy",
    title: "Wax Therapy",
    shortDesc:
      "Warm paraffin wax treatment to soothe joint pain, improve circulation, and soften stiff tissues in hands and feet.",
    fullDesc:
      "Wax Therapy (Paraffin Bath) involves coating the hands, feet, or joints in warm paraffin wax. The heat from the wax transfers deep into the joints and muscles, relieving stiffness, improving blood flow, and making tissues more pliable for stretching.",
    conditions: [
      "Rheumatoid arthritis in hands/feet",
      "Osteoarthritis stiffness",
      "Tenosynovitis",
      "Stiff fingers and ankles"
    ],
    approach:
      "Multiple layers of warm, therapeutic-grade paraffin wax are applied to the hands or feet, followed by wrapping to retain heat and promote deep tissue relaxation.",
    image: "assets/Wax Therapy.png",
  },
  {
    id: "traction-therapy",
    title: "Traction Therapy",
    shortDesc:
      "Mechanical decompression of the spine to relieve pressure on compressed discs and pinched nerves.",
    fullDesc:
      "Traction Therapy is a mechanical decompression technique used to treat spinal disorders. By applying a controlled pulling force, it creates space between the vertebrae, reducing pressure on spinal discs and pinched nerve roots.",
    conditions: [
      "Herniated or bulging discs",
      "Sciatica & cervical radiculopathy",
      "Spinal stenosis",
      "Degenerative disc disease"
    ],
    approach:
      "Computerized mechanical cervical or lumbar traction, customized to the patient's weight and comfort, to decompress the spine and alleviate radiating nerve pain.",
    image: "assets/Traction Therapy.png",
  },
  {
    id: "exercise-prescription",
    title: "Exercise Prescription",
    shortDesc:
      "Personalized, progressive exercise programs to rebuild strength, endurance, and physical function.",
    fullDesc:
      "Exercise Prescription involves designing a customized program of stretching, strengthening, aerobic, and functional exercises. These exercises are tailored to your specific biomechanical needs to correct imbalances, prevent injuries, and build resilience.",
    conditions: [
      "General muscle weakness",
      "Core instability",
      "Postural imbalances",
      "Cardiovascular recovery"
    ],
    approach:
      "A thorough physical assessment followed by the prescription of specific, step-by-step exercises with detailed guidance on form, reps, and sets.",
    image: "assets/Exercise Prescription.png",
  },
  {
    id: "orthopaedic-rehabilitation",
    title: "Orthopaedic Rehabilitation",
    shortDesc:
      "Comprehensive recovery programs for fractures, joint replacements, arthritis, and orthopedic surgeries.",
    fullDesc:
      "Orthopaedic Rehabilitation is a comprehensive, therapeutic program designed to restore mobility, strength, and function after bone, joint, or soft tissue injuries, fractures, joint replacements, and major orthopedic surgeries.",
    conditions: [
      "Post-fracture stiffness",
      "Total knee or hip replacement",
      "Rotator cuff repairs",
      "ACL reconstruction recovery"
    ],
    approach:
      "A multi-modal therapy approach integrating swelling control, passive/active range of motion, progressive strengthening, and gait re-education.",
    image: "assets/Orthopaedic Rehabilitation.png",
  },
  {
    id: "joint-mobilisation",
    title: "Joint Mobilisation with Manual Therapy",
    shortDesc:
      "Hands-on manual techniques to glide, roll, and mobilize stiff joints, restoring natural, pain-free movement.",
    fullDesc:
      "Joint Mobilisation is a hands-on manual therapy technique where the physiotherapist applies precise passive forces to a joint. This restores joint play, improves synovial fluid flow, reduces pain, and increases range of motion.",
    conditions: [
      "Frozen shoulder",
      "Stiff spine & neck joints",
      "Chronic joint restrictions",
      "Post-immobilization stiffness"
    ],
    approach:
      "Precise, graded manual mobilization and manipulation techniques based on the Maitland or Mulligan concepts, tailored to joint tolerance.",
    image: "assets/Joint Mobilisation with Manual Therapy.png",
  },
  {
    id: "soft-tissue-manipulation",
    title: "Soft Tissue Manipulation",
    shortDesc:
      "Manual techniques targeting muscles, tendons, and fascia to release tension, break scar tissue, and improve circulation.",
    fullDesc:
      "Soft Tissue Manipulation encompasses myofascial release, trigger point therapy, and deep tissue massage. It aims to reduce muscle tightness, break down painful adhesions, and restore normal flexibility in soft tissues.",
    conditions: [
      "Myofascial pain syndrome",
      "Muscle tightness & knots",
      "Fibromyalgia",
      "Chronic tension headaches"
    ],
    approach:
      "Hands-on manual pressure, stretching, and deep tissue massage targeting active trigger points and tight fascial layers to release restriction and restore mobility.",
    image: "assets/Soft Tissue Manipulation.png",
  },
  {
    id: "home-physiotherapy",
    title: "Home Physiotherapy",
    shortDesc:
      "Professional physiotherapy care delivered directly in the comfort and convenience of your home.",
    fullDesc:
      "Home Physiotherapy brings professional clinical care to patients who cannot travel due to severe pain, post-surgical limitations, or elderly frailty. The sessions are fully customized to the home environment, promoting functional recovery.",
    conditions: [
      "Bedbound or highly restricted mobility",
      "Early post-operative recovery",
      "Geriatric rehabilitation",
      "Severe acute spine pain"
    ],
    approach:
      "We bring portable modalities (like portable TENS/ultrasound) and manual therapy skills to your home, designing safe exercises using your home furniture and layout.",
    image: "assets/Home Physiotherapy.png",
  }
];

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const servicesGrid = document.querySelector("[data-services-grid]");
const loadServicesButton = document.querySelector("[data-load-services]");
const dialog = document.querySelector("[data-service-dialog]");
const dialogContent = document.querySelector("[data-dialog-content]");
const closeDialogButton = document.querySelector("[data-close-dialog]");
const appointmentForm = document.querySelector("[data-appointment-form]");
const formStatus = document.querySelector("[data-form-status]");
const serviceSearch = document.querySelector("[data-service-search]");
const noServicesMessage = document.querySelector("[data-no-services]");

let servicesExpanded = false;
let serviceQuery = "";

function icon(name) {
  return `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

function renderServices() {
  if (!servicesGrid) return;

  const initialCount = servicesGrid.dataset.initialCount ? Number(servicesGrid.dataset.initialCount) : 6;
  const filteredServices = services.filter((service) => {
    const haystack = `${service.title} ${service.shortDesc} ${service.fullDesc}`.toLowerCase();
    return haystack.includes(serviceQuery);
  });
  const visibleServices = servicesExpanded ? filteredServices : filteredServices.slice(0, initialCount);

  // Modern WebP picture fallback implementation inside JS services cards
  servicesGrid.innerHTML = visibleServices
    .map(
      (service) => `
        <article class="service-card reveal-on-scroll">
          <picture>
            <source srcset="${service.image.replace('.png', '.webp')}" type="image/webp">
            <img src="${service.image}" alt="${service.title}" loading="lazy" width="370" height="245" />
          </picture>
          <div class="service-card-content">
            <h3>${service.title}</h3>
            <p>${service.shortDesc}</p>
            <button class="service-link" type="button" data-service-id="${service.id}">
              View details ${icon("arrow-right")}
            </button>
          </div>
        </article>
      `
    )
    .join("");

  if (loadServicesButton) {
    loadServicesButton.hidden = filteredServices.length <= initialCount;
    loadServicesButton.textContent = servicesExpanded ? "Show Fewer Services" : "View All Services";
  }

  if (noServicesMessage) {
    noServicesMessage.hidden = filteredServices.length > 0;
  }

  initScrollReveal();
}

function openServiceDialog(serviceId) {
  const service = services.find((item) => item.id === serviceId);
  if (!service || !dialog || !dialogContent) return;

  const bookingHref = document.getElementById("booking") ? "#booking" : "index.html#booking";

  dialogContent.innerHTML = `
    <picture>
      <source srcset="${service.image.replace('.png', '.webp')}" type="image/webp">
      <img class="dialog-media" src="${service.image}" alt="${service.title}" width="760" height="260" />
    </picture>
    <div class="dialog-body">
      <h2>${service.title}</h2>
      <p>${service.fullDesc}</p>
      <h3>Common Conditions Treated</h3>
      <ul class="condition-list">
        ${service.conditions.map((condition) => `<li>${icon("check")}${condition}</li>`).join("")}
      </ul>
      <h3>Our Approach</h3>
      <p>${service.approach}</p>
      <a class="btn btn-primary" href="${bookingHref}" data-dialog-book>
        Book Appointment ${icon("arrow-right")}
      </a>
    </div>
  `;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeServiceDialog() {
  if (!dialog) return;

  if (dialog.open && typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function closeMobileMenu() {
  if (!menuToggle || !mobileNav) return;

  menuToggle.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

setHeaderState();
renderServices();

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
}

window.addEventListener("scroll", setHeaderState, { passive: true });

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("href").slice(1);
  const target = document.getElementById(targetId);
  if (!target) return;

  event.preventDefault();
  closeMobileMenu();
  closeServiceDialog();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (servicesGrid) {
  servicesGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-service-id]");
    if (!button) return;
    openServiceDialog(button.dataset.serviceId);
  });
}

if (loadServicesButton) {
  loadServicesButton.addEventListener("click", () => {
    servicesExpanded = !servicesExpanded;
    renderServices();
  });
}

if (serviceSearch) {
  serviceSearch.addEventListener("input", (event) => {
    serviceQuery = event.target.value.trim().toLowerCase();
    servicesExpanded = false;
    renderServices();
  });
}

if (closeDialogButton) {
  closeDialogButton.addEventListener("click", closeServiceDialog);
}

if (dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeServiceDialog();
  });

  dialog.addEventListener("close", () => {
    dialogContent.innerHTML = "";
  });
}

// ----------------------------------------------------------------------
// HARDENED CLIENT-SIDE FORM VALIDATION & INTERACTIVE STATE
// ----------------------------------------------------------------------
if (appointmentForm) {
  const dateField = appointmentForm.querySelector('input[name="date"]');
  if (dateField) {
    dateField.min = new Date().toISOString().split("T")[0];
  }

  // Monitor typing and clear validation errors dynamically
  const formInputs = appointmentForm.querySelectorAll("input, select, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      clearFieldError(input);
    });
    input.addEventListener("change", () => {
      clearFieldError(input);
    });
  });

  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.innerHTML = "";
    
    // Clear all existing inline errors
    formInputs.forEach((input) => clearFieldError(input));

    // Validate Honeypot (hidden field)
    const honeypot = appointmentForm.querySelector('input[name="website_url"]');
    if (honeypot && honeypot.value.trim() !== "") {
      formStatus.textContent = "Request flagged as automated spam.";
      formStatus.style.color = "#dc2626";
      return;
    }

    // Validate Cloudflare Turnstile
    const turnstileResponse = appointmentForm.querySelector('[name="cf-turnstile-response"]');
    if (turnstileResponse && turnstileResponse.value === "") {
      formStatus.textContent = "Security verification required. Please check Turnstile.";
      formStatus.style.color = "#dc2626";
      return;
    }

    let firstInvalidField = null;

    // Validate Full Name (Human-Realistic supporting accents, hyphens, dots, spaces)
    const nameInput = appointmentForm.querySelector('[name="name"]');
    const nameVal = nameInput.value.trim();
    const nameRegex = /^[\p{L}\s'.-]{3,100}$/u;
    if (nameVal.length === 0) {
      setFieldError(nameInput, "Full name is required.");
      if (!firstInvalidField) firstInvalidField = nameInput;
    } else if (!nameRegex.test(nameVal)) {
      setFieldError(nameInput, "Please enter a valid full name (3-100 letters only).");
      if (!firstInvalidField) firstInvalidField = nameInput;
    }

    // Validate Phone Number
    const phoneInput = appointmentForm.querySelector('[name="phone"]');
    const phoneVal = phoneInput.value.trim();
    const phoneRegex = /^[0-9+()\s-]{10,15}$/;
    if (phoneVal.length === 0) {
      setFieldError(phoneInput, "Phone number is required.");
      if (!firstInvalidField) firstInvalidField = phoneInput;
    } else if (!phoneRegex.test(phoneVal)) {
      setFieldError(phoneInput, "Please enter a valid phone number (10 to 15 digits).");
      if (!firstInvalidField) firstInvalidField = phoneInput;
    }

    // Validate Email
    const emailInput = appointmentForm.querySelector('[name="email"]');
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal.length === 0) {
      setFieldError(emailInput, "Email address is required.");
      if (!firstInvalidField) firstInvalidField = emailInput;
    } else if (!emailRegex.test(emailVal)) {
      setFieldError(emailInput, "Please enter a valid email address.");
      if (!firstInvalidField) firstInvalidField = emailInput;
    }

    // Validate Service
    const serviceInput = appointmentForm.querySelector('[name="service"]');
    if (serviceInput.value === "") {
      setFieldError(serviceInput, "Please select a clinical service.");
      if (!firstInvalidField) firstInvalidField = serviceInput;
    }

    // Validate Preferred Date (cannot be in the past)
    const dateVal = dateField.value;
    const todayStr = new Date().toISOString().split("T")[0];
    if (dateVal === "") {
      setFieldError(dateField, "Please select an appointment date.");
      if (!firstInvalidField) firstInvalidField = dateField;
    } else if (dateVal < todayStr) {
      setFieldError(dateField, "Preferred date cannot be in the past.");
      if (!firstInvalidField) firstInvalidField = dateField;
    }

    // Validate Preferred Time
    const timeInput = appointmentForm.querySelector('[name="time"]');
    if (timeInput.value === "") {
      setFieldError(timeInput, "Please select a preferred time.");
      if (!firstInvalidField) firstInvalidField = timeInput;
    }

    // Validate Age (integer between 1 and 120)
    const ageInput = appointmentForm.querySelector('[name="age"]');
    const ageVal = parseInt(ageInput.value.trim(), 10);
    if (isNaN(ageVal) || ageVal < 1 || ageVal > 120) {
      setFieldError(ageInput, "Please enter a valid age between 1 and 120.");
      if (!firstInvalidField) firstInvalidField = ageInput;
    }

    // If validations failed, shift keyboard focus to the first faulty field
    if (firstInvalidField) {
      firstInvalidField.focus();
      formStatus.textContent = "Please correct the highlighted errors above.";
      formStatus.style.color = "#dc2626";
      return;
    }

    // Check if configuration is updated
    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" || EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
      formStatus.innerHTML = "System is in template setup mode. Please configure your EmailJS credentials.";
      formStatus.style.color = "#dc2626";
      return;
    }

    // Show loading visual feedback and disable duplicate submissions
    formStatus.textContent = "Submitting booking request...";
    formStatus.style.color = "var(--teal-dark)";
    
    const submitBtn = appointmentForm.querySelector(".btn-submit");
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // Build form payload
    const formData = new FormData(appointmentForm);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value.trim();
    });

    const templateParams = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      service: payload.service,
      date: payload.date,
      time: payload.time,
      age: payload.age,
      notes: payload.notes || "No notes provided.",
      clinic_phone: "+91 98765 43210",
      clinic_email: "hello@physioglides.com"
    };

    // Parallel dispatch to EmailJS for Admin notification and Patient confirmation
    const adminPromise = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, templateParams);
    const clientPromise = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CLIENT_TEMPLATE_ID, templateParams);

    Promise.all([adminPromise, clientPromise])
      .then(() => {
        appointmentForm.reset();
        // Reload Turnstile widget state if configured and present
        if (window.turnstile) {
          const turnstileElem = document.querySelector(".cf-turnstile");
          if (turnstileElem) {
            window.turnstile.reset(turnstileElem);
          }
        }
        formStatus.textContent = "Appointment request received successfully. Our coordinator will contact you shortly.";
        formStatus.style.color = "var(--teal-dark)";
      })
      .catch((error) => {
        console.error("EmailJS Error: ", error);
        // Safe fallback alert with active call and WhatsApp action triggers
        formStatus.innerHTML = `
          Unable to submit booking automatically. Please call us at 
          <a href="tel:+919876543210" style="text-decoration:underline; font-weight:bold;">+91 98765 43210</a> 
          or chat on 
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style="text-decoration:underline; font-weight:bold; color:#25d366;">WhatsApp</a> 
          to book directly.
        `;
        formStatus.style.color = "#dc2626";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
  });
}

function setFieldError(input, message) {
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
  
  const parent = input.parentElement;
  
  // Create description error label
  const errId = "err-" + input.name;
  input.setAttribute("aria-describedby", errId);
  
  let errSpan = parent.querySelector(".error-message");
  if (!errSpan) {
    errSpan = document.createElement("span");
    errSpan.className = "error-message";
    errSpan.id = errId;
    errSpan.setAttribute("role", "alert");
    parent.appendChild(errSpan);
  }
  errSpan.textContent = message;
}

function clearFieldError(input) {
  input.classList.remove("is-invalid");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
  
  const parent = input.parentElement;
  const errSpan = parent.querySelector(".error-message");
  if (errSpan) {
    errSpan.remove();
  }
}

// Intersection Observer for scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initTestimonialSlider();
});

// Testimonial slider carousel logic
function initTestimonialSlider() {
  const container = document.querySelector(".testimonial-slider-container");
  const track = document.querySelector("[data-slider-track]");
  const prevBtn = document.querySelector("[data-slider-prev]");
  const nextBtn = document.querySelector("[data-slider-next]");
  const dotsContainer = document.querySelector("[data-slider-dots]");
  
  if (!container || !track) return;
  
  const slides = Array.from(track.querySelectorAll(".testimonial-slide"));
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 6000;
  
  // Create Dots indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = slides
      .map((_, index) => `<button type="button" class="slider-dot" aria-label="Go to slide ${index + 1}" data-slide-index="${index}"></button>`)
      .join("");
  }
  const dots = Array.from(dotsContainer ? dotsContainer.querySelectorAll(".slider-dot") : []);
  
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  }
  
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    updateSlider();
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoplay();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoplay();
    });
  }
  
  if (dotsContainer) {
    dotsContainer.addEventListener("click", (e) => {
      const dot = e.target.closest("[data-slide-index]");
      if (!dot) return;
      const index = parseInt(dot.dataset.slideIndex, 10);
      goToSlide(index);
      resetAutoplay();
    });
  }
  
  function startAutoplay() {
    if (autoplayTimer) return;
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  }
  
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);
  
  // Touch Swiping Support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  const dragThreshold = 50;
  
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    stopAutoplay();
  }, { passive: true });
  
  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });
  
  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    
    const diffX = currentX - startX;
    if (Math.abs(diffX) > dragThreshold) {
      if (diffX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    startAutoplay();
  });
  
  goToSlide(0);
  startAutoplay();
}
