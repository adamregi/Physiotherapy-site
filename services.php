<?php
/**
 * PhysioGlides - Our Services Directory
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_lifetime' => 0,
        'cookie_secure'    => true,
        'cookie_httponly'  => true,
        'cookie_samesite'  => 'Strict'
    ]);
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Explore physiotherapy services from PhysioGlides, including sports rehab, home care, neuro rehab, pediatric physiotherapy, and post-surgery rehabilitation."
    />
    <title>Services | PhysioGlides</title>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://physioglides.com/services.php" />

    <!-- Open Graph Tags -->
    <meta property="og:title" content="Services | PhysioGlides" />
    <meta property="og:description" content="Explore our evidence-based services including laser, traction, and home physiotherapy care." />
    <meta property="og:image" content="https://physioglides.com/assets/about-clinic.png" />
    <meta property="og:url" content="https://physioglides.com/services.php" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Services | PhysioGlides" />
    <meta name="twitter:description" content="Explore our evidence-based clinical services." />
    <meta name="twitter:image" content="https://physioglides.com/assets/about-clinic.png" />

    <!-- CSRF Token Meta -->
    <meta name="csrf-token" content="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">

    <!-- Cache-Busted Stylesheet -->
    <link rel="stylesheet" href="styles.css?v=1.0.1" />
  </head>
  <body>
    <svg class="svg-sprite" aria-hidden="true">
      <symbol id="icon-activity" viewBox="0 0 24 24"><path d="M22 12h-4l-3 8-6-16-3 8H2" /></symbol>
      <symbol id="icon-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></symbol>
      <symbol id="icon-check" viewBox="0 0 24 24"><path d="m20 6-11 11-5-5" /></symbol>
      <symbol id="icon-close" viewBox="0 0 24 24"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></symbol>
      <symbol id="icon-menu" viewBox="0 0 24 24"><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></symbol>
      <symbol id="icon-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.89.32 1.76.6 2.6a2 2 0 0 1-.45 2.11L9 10.64a16 16 0 0 0 4.36 4.36l1.21-1.21a2 2 0 0 1 2.11-.45c.84.28 1.71.48 2.6.6A2 2 0 0 1 22 16.92z" /></symbol>
    </svg>

    <header class="site-header" data-header>
      <div class="container header-inner">
        <a class="brand" href="index.php#home" aria-label="PhysioGlides home">
          <span class="brand-mark"><svg><use href="#icon-activity"></use></svg></span>
          <span class="brand-name">Physio<span>Glides</span></span>
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          <a href="index.php#home">Home</a>
          <a href="about.php">About</a>
          <a class="is-active" href="services.php">Services</a>
          <a href="index.php#contact">Contact</a>
          <a class="btn btn-primary btn-small" href="index.php#booking">Book Appointment</a>
        </nav>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle>
          <svg class="menu-icon"><use href="#icon-menu"></use></svg>
          <svg class="close-icon"><use href="#icon-close"></use></svg>
        </button>
      </div>
      <nav class="mobile-nav" aria-label="Mobile navigation" data-mobile-nav>
        <a href="index.php#home">Home</a>
        <a href="about.php">About</a>
        <a class="is-active" href="services.php">Services</a>
        <a href="index.php#contact">Contact</a>
        <a class="btn btn-primary" href="index.php#booking">Book Appointment</a>
      </nav>
    </header>

    <main>
      <section class="page-hero services-hero">
        <picture>
          <source srcset="assets/mission-bg.webp" type="image/webp">
          <img class="hero-bg-anim" src="assets/mission-bg.png" alt="PhysioGlides clinic treatment room" />
        </picture>
        <div class="container page-hero-content">
          <p class="section-kicker fade-in-up delay-1">Our Offerings</p>
          <h1 class="fade-in-up delay-2">Services We Offer</h1>
          <p class="breadcrumb fade-in-up delay-3"><a href="index.php#home">Home</a> / <span>Services We Offer</span></p>
        </div>
      </section>

      <section class="section services-page">
        <div class="container">
          <div class="service-toolbar">
            <label>
              <span>Search services</span>
              <input type="search" placeholder="Type to search ..." data-service-search />
            </label>
          </div>

          <div class="services-grid" data-services-grid data-initial-count="9"></div>
          <p class="empty-state" data-no-services hidden>No services found matching your search.</p>

          <div class="center-actions">
            <button class="btn btn-outline" type="button" data-load-services>Load More</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <a class="brand footer-brand" href="index.php#home" aria-label="PhysioGlides home">
            <span class="brand-mark"><svg><use href="#icon-activity"></use></svg></span>
            <span class="brand-name">Physio<span>Glides</span></span>
          </a>
          <p>Premium, evidence-based physiotherapy clinic serving Medavakkam and surrounding areas.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href="index.php#home">Home</a>
          <a href="about.php">About Us</a>
          <a href="services.php">Our Services</a>
          <a href="index.php#booking">Book Appointment</a>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>123 Recovery Street, Main Road,<br />Medavakkam, Chennai 600100</p>
          <a href="tel:+919876543210">+91 98765 43210</a>
          <a href="mailto:hello@physioglides.com">hello@physioglides.com</a>
        </div>
        <div>
          <h3>Ready to heal?</h3>
          <p>Schedule your assessment today.</p>
          <a class="btn btn-primary btn-small" href="index.php#booking">Book Appointment Today</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>Copyright &copy; <span data-year></span> PhysioGlides Physiotherapy Clinic. All rights reserved.</span>
      </div>
    </footer>

    <a class="whatsapp" href="index.php#contact" aria-label="Chat on WhatsApp">
      <svg><use href="#icon-phone"></use></svg>
    </a>

    <dialog class="service-dialog" data-service-dialog>
      <button class="dialog-close" type="button" aria-label="Close service details" data-close-dialog>
        <svg><use href="#icon-close"></use></svg>
      </button>
      <div data-dialog-content></div>
    </dialog>

    <!-- Cache-Busted Javascript -->
    <script src="script.js?v=1.0.1"></script>
  </body>
</html>
