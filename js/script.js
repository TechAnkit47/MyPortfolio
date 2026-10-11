/**
 * ==========================================================================
 * ANKIT KUMAR - FULL STACK WEB DEVELOPER PORTFOLIO
 * High-Performance Vanilla JavaScript Interactions
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. THEME SWITCHER (Dark / Light Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('ankit_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('ankit_portfolio_theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        themeIcon.className = 'fa-solid fa-sun';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    }
  }

  // --- 2. MOBILE NAVIGATION DRAWER ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      });
    });
  }

  // --- 3. STICKY NAVBAR & SCROLL-SPY ---
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar glass blur intensity on scroll
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // ScrollSpy active link update
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (activeLink) activeLink.classList.add('active');
      } else {
        if (activeLink) activeLink.classList.remove('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 4. TYPING EFFECT FOR HERO ROLE ---
  const typedTarget = document.getElementById('hero-typed-text');
  if (typedTarget) {
    const phrases = [
      'Full Stack Web Developer',
      'Computer Science Engineer',
      'Frontend & UI/UX Developer',
      'PHP & MySQL Backend Developer',
      'Python Automation & Scripting'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1600; // Pause at end of phrase
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 350; // Pause before typing next
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // --- 5. PROJECTS CATEGORY FILTERING ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 6. INTERACTIVE PLAYGROUND: ATTENDANCE ELIGIBILITY CALCULATOR ---
  const totalClassesInput = document.getElementById('calc-total');
  const attendedClassesInput = document.getElementById('calc-attended');
  const percentageDisplay = document.getElementById('calc-percentage');
  const progressBarFill = document.getElementById('calc-progress-fill');
  const statusBadge = document.getElementById('calc-status-badge');
  const statusAdvice = document.getElementById('calc-status-advice');

  function calculateAttendance() {
    if (!totalClassesInput || !attendedClassesInput) return;

    let total = parseInt(totalClassesInput.value, 10) || 0;
    let attended = parseInt(attendedClassesInput.value, 10) || 0;

    if (total < 1) total = 1;
    if (attended > total) {
      attended = total;
      attendedClassesInput.value = total;
    }
    if (attended < 0) attended = 0;

    const percentage = ((attended / total) * 100).toFixed(1);
    const numPercent = parseFloat(percentage);

    if (percentageDisplay) percentageDisplay.textContent = `${percentage}%`;
    if (progressBarFill) progressBarFill.style.width = `${Math.min(numPercent, 100)}%`;

    if (statusBadge && statusAdvice) {
      if (numPercent >= 75) {
        statusBadge.className = 'calc-status-badge status-eligible';
        statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Eligible for Exams (75%+ Threshold Met)';
        
        // Calculate safe classes to miss
        const safeMiss = Math.floor((attended - 0.75 * total) / 0.75);
        if (safeMiss > 0) {
          statusAdvice.textContent = `Great attendance! You can safely miss up to ${safeMiss} upcoming lectures while maintaining 75%.`;
        } else {
          statusAdvice.textContent = `You are right at the 75% boundary. Attend all upcoming lectures to stay safe.`;
        }
      } else {
        statusBadge.className = 'calc-status-badge status-shortage';
        statusBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Shortage Warning (Below 75%)';
        
        // Calculate required consecutive lectures to reach 75%
        const needed = Math.ceil((0.75 * total - attended) / 0.25);
        statusAdvice.textContent = `Attendance Shortage! You need to attend the next ${needed} consecutive classes to reach the 75% eligibility mark.`;
      }
    }
  }

  if (totalClassesInput && attendedClassesInput) {
    totalClassesInput.addEventListener('input', calculateAttendance);
    attendedClassesInput.addEventListener('input', calculateAttendance);
    calculateAttendance(); // Init calculation on load
  }

  // --- 7. PLAYGROUND MAIN TABS SWITCHER ---
  const playgroundTabs = document.querySelectorAll('.playground-tab-btn');
  const playgroundPanes = document.querySelectorAll('.playground-pane');

  playgroundTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playgroundTabs.forEach(t => t.classList.remove('active'));
      playgroundPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // --- 8. CODE INSPECTOR SNIPPET SWITCHER ---
  const codeTabItems = document.querySelectorAll('.code-tab-item');
  const codeWindowSnippet = document.getElementById('code-snippet-pre');
  const codeWindowTitle = document.getElementById('code-window-filename');

  const snippets = {
    php: {
      file: 'college_db_connect.php',
      code: `<?php
// My College Portal - Relational MySQL Database Handler
class Database {
    private $host = "localhost";
    private $db_name = "college_portal";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $e) {
            error_log("Connection Error: " . $e->getMessage());
        }
        return $this->conn;
    }
}
?>`
    },
    js: {
      file: 'portal_ajax_validator.js',
      code: `// Dynamic Student Inquiry Validation & Submission
document.getElementById('inquiryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentName = document.querySelector('#studentName').value.trim();
    const rollNumber  = document.querySelector('#rollNumber').value.trim();

    if (!studentName || !rollNumber) {
        showToast("Please fill in all mandatory fields.", "warning");
        return;
    }

    try {
        const payload = { name: studentName, roll: rollNumber, timestamp: Date.now() };
        const response = await fetch('/api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.status === 'success') {
            showToast("Inquiry submitted successfully!", "success");
        }
    } catch (err) {
        console.error("Submission failed:", err);
    }
});`
    },
    python: {
      file: 'attendance_calculator.py',
      code: `# Student Record & Automated Attendance Analyzer
import csv

class StudentAttendanceManager:
    def __init__(self, filename='students_data.csv'):
        self.filename = filename

    def calculate_eligibility(self, threshold=75.0):
        report = []
        with open(self.filename, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                attended = int(row['attended'])
                total = int(row['total'])
                percentage = round((attended / total) * 100, 2)
                eligible = "ELIGIBLE" if percentage >= threshold else "SHORTAGE"
                
                report.append({
                    "name": row['name'],
                    "roll": row['roll'],
                    "percentage": percentage,
                    "status": eligible
                })
        return report`
    },
    css: {
      file: 'modern_responsive_grid.css',
      code: `/* Production Glassmorphism Card System */
.modern-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.75rem;
}

.glass-card {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.85rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease, border-color 0.3s ease;
}

.glass-card:hover {
    transform: translateY(-5px);
    border-color: rgba(6, 182, 212, 0.5);
}`
    }
  };

  codeTabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const langKey = tab.getAttribute('data-lang');
      if (snippets[langKey]) {
        if (codeWindowTitle) codeWindowTitle.textContent = snippets[langKey].file;
        if (codeWindowSnippet) codeWindowSnippet.textContent = snippets[langKey].code;
      }
    });
  });

  // --- 9. INTERACTIVE CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Recruitment Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in Name, Email, and Message.', 'warning');
        return;
      }

      // Show sending state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Email...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Construct mailto link
        const mailtoUrl = `mailto:ankitkumar7778999@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

        showToast('Message formatted! Opening your email client...', 'success');
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Ready!';

        setTimeout(() => {
          window.location.href = mailtoUrl;
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1200);

      }, 600);
    });
  }

  // --- 10. TOAST NOTIFICATION UTILITY ---
  function showToast(message, type = 'info') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    let icon = '<i class="fa-solid fa-circle-info" style="color: var(--accent-cyan)"></i>';
    if (type === 'success') icon = '<i class="fa-solid fa-circle-check" style="color: var(--accent-emerald)"></i>';
    if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation" style="color: var(--accent-amber)"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

});
