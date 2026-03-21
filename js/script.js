document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Sticky navbar effect on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section, footer');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Animations
    const faders = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // WhatsApp Form Submission (AI Integration)
    const waForm = document.getElementById('wa-form');
    if (waForm) {
        waForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const standard = document.getElementById('standard').value;
            const message = document.getElementById('message').value;
            
            // Format phone number (India code +91)
            const phone = "917378887754"; 
            
            // Construct the WhatsApp message body
            let text = `Hello JM Tutorial AI Assistant,\n\nI am reaching out regarding a new inquiry.\n\n*Name:* ${name}\n*Standard/Course:* ${standard}\n*Message:* ${message}`;
            
            // Generate the wa.me link
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
            
            // Open in new tab (This will trigger their configured WhatsApp AI Bot)
            window.open(url, '_blank');
            
            // Optional: Reset form fields (disabled to allow the user to see their info even if they return)
            // waForm.reset();
        });
    }

    // WhatsApp Side Chat Widget Logic
    const floatingWaBtn = document.getElementById('floating-wa-btn');
    const waChatBox = document.getElementById('wa-chat-box');
    const waCloseBtn = document.getElementById('wa-close-btn');
    const waWidgetForm = document.getElementById('wa-widget-form');
    const waWidgetInput = document.getElementById('wa-widget-input');

    if (floatingWaBtn && waChatBox) {
        // Toggle Panel
        floatingWaBtn.addEventListener('click', () => {
            waChatBox.classList.toggle('active');
            if (waChatBox.classList.contains('active')) {
                setTimeout(() => waWidgetInput.focus(), 300);
            }
        });

        // Close Panel
        waCloseBtn.addEventListener('click', () => {
            waChatBox.classList.remove('active');
        });

        // Capture Chat and Send to WA
        waWidgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = waWidgetInput.value.trim();
            if (message) {
                const phone = "917378887754"; 
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
                waWidgetInput.value = '';
                waChatBox.classList.remove('active');
            }
        });
    }
});
