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

  servicesGrid.innerHTML = visibleServices
    .map(
      (service) => `
        <article class="service-card reveal-on-scroll">
          <img src="${service.image}" alt="${service.title}" loading="lazy" />
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

  // Bind/observe newly rendered scroll-reveal elements
  initScrollReveal();
}

function openServiceDialog(serviceId) {
  const service = services.find((item) => item.id === serviceId);
  if (!service || !dialog || !dialogContent) return;

  const bookingHref = document.getElementById("booking") ? "#booking" : "index.html#booking";

  dialogContent.innerHTML = `
    <img class="dialog-media" src="${service.image}" alt="${service.title}" />
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

if (appointmentForm) {
  appointmentForm.querySelector('input[name="date"]').min = new Date().toISOString().split("T")[0];

  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";

    const fields = [...appointmentForm.querySelectorAll("input, select, textarea")];
    fields.forEach((field) => field.classList.remove("is-invalid"));

    const invalidField = fields.find((field) => !field.checkValidity());
    if (invalidField) {
      invalidField.classList.add("is-invalid");
      invalidField.focus();
      formStatus.textContent = "Please complete all required fields correctly.";
      return;
    }

    const phoneField = appointmentForm.querySelector('input[name="phone"]');
    const phonePattern = /^[0-9+()\s-]{10,15}$/;
    if (!phonePattern.test(phoneField.value.trim())) {
      phoneField.classList.add("is-invalid");
      phoneField.focus();
      formStatus.textContent = "Please enter a valid phone number.";
      return;
    }

    // Show sending feedback
    formStatus.textContent = "Sending booking request...";
    formStatus.style.color = "var(--teal-dark)";

    const submitBtn = appointmentForm.querySelector(".btn-submit");
    if (submitBtn) submitBtn.disabled = true;

    // Gather form payload
    const formData = {
      name: appointmentForm.querySelector('[name="name"]').value.trim(),
      phone: appointmentForm.querySelector('[name="phone"]').value.trim(),
      email: appointmentForm.querySelector('[name="email"]').value.trim(),
      service: appointmentForm.querySelector('[name="service"]').value.trim(),
      date: appointmentForm.querySelector('[name="date"]').value,
      time: appointmentForm.querySelector('[name="time"]').value,
      age: appointmentForm.querySelector('[name="age"]').value,
      notes: appointmentForm.querySelector('[name="notes"]').value.trim()
    };

    fetch("booking.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          appointmentForm.reset();
          formStatus.textContent = data.message;
          formStatus.style.color = "var(--teal-dark)";
        } else {
          formStatus.textContent = data.message;
          formStatus.style.color = "#dc2626";
        }
      })
      .catch((error) => {
        formStatus.textContent = "Unable to send request. Please check your internet connection or call us directly.";
        formStatus.style.color = "#dc2626";
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
        window.setTimeout(() => {
          formStatus.textContent = "";
        }, 7000);
      });
  });
}

// Intersection Observer for scroll animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.1, // trigger when 10% visible
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

// Run observer setup on script startup
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
  
  // Create Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = slides
      .map((_, index) => `<button type="button" class="slider-dot" aria-label="Go to slide ${index + 1}" data-slide-index="${index}"></button>`)
      .join("");
  }
  const dots = Array.from(dotsContainer ? dotsContainer.querySelectorAll(".slider-dot") : []);
  
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots state
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
  
  // Make goToSlide globally or locally accessible if needed, but keeping it scoped is cleanest.
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Event listeners
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
  
  // Autoplay
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
  
  // Pause on hover
  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);
  
  // Touch / Swipe Gestures
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
  
  // Initialize
  goToSlide(0);
  startAutoplay();
}
