// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .certificate-card, .stat-item, .contact-item, .nav-links a, .social-link, .project-link, .contact-link');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Particle.js Background
particlesJS("particles-js", {
    particles: {
        number: { 
            value: 80, 
            density: { 
                enable: true, 
                value_area: 800 
            } 
        },
        color: { 
            value: "#ffffff" 
        },
        shape: { 
            type: "circle" 
        },
        opacity: { 
            value: 0.5, 
            random: true 
        },
        size: { 
            value: 3, 
            random: true 
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00c6ff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { 
                enable: true, 
                mode: "repulse" 
            },
            onclick: { 
                enable: true, 
                mode: "push" 
            }
        }
    }
});

// Animated Counters
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
};

// Animated Skill Bars
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.transform = `scaleX(${width / 100})`;
    });
};

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
    
    // Add active class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '15px 0';
        navbar.style.background = 'rgba(42, 45, 124, 0.95)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = 'rgba(42, 45, 124, 0.9)';
    }
    
    // Trigger animations when elements come into view
    const aboutSection = document.querySelector('#about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (aboutPosition < screenPosition) {
        animateCounters();
        animateSkillBars();
    }
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
    
    // Reset form
    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Skip if it's a social link or external link
        if (this.classList.contains('social-link') || this.classList.contains('contact-link') || this.classList.contains('project-link')) {
            return;
        }
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Initialize animations on load
window.addEventListener('load', () => {
    // Trigger skill bars animation
    setTimeout(animateSkillBars, 500);
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Project Image Click Handler (optional)
document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('click', function() {
        // Get the project link from the card
        const projectLink = this.closest('.project-card').querySelector('.project-link');
        if (projectLink) {
            window.open(projectLink.href, '_blank');
        }
    });
});

// Typing Effect for Hero Title (Optional Enhancement)
const typingEffect = () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    let charIndex = 0;
    
    // Clear the text initially
    heroTitle.textContent = '';
    
    const typeWriter = () => {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
};

// Uncomment the line below to enable typing effect
// typingEffect();

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .certificate-card, .timeline-content').forEach(el => {
    observer.observe(el);
});