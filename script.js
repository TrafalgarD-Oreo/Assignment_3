document.addEventListener('DOMContentLoaded', () => {
    
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode', !isDarkMode);

        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });


    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block'; 
                } else {
                    item.style.display = 'none'; 
                }
            });
        });
    });


    const lightbox = document.getElementById('video-lightbox');
    const closeBtn = document.querySelector('.close-btn');
    const videoContainer = document.querySelector('.video-container');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.getAttribute('data-video-url');
            
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', videoUrl + "?autoplay=1&rel=0"); 
            iframe.setAttribute('allow', 'autoplay; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            
            videoContainer.innerHTML = ''; 
            videoContainer.appendChild(iframe);

            lightbox.style.display = 'block';
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        videoContainer.innerHTML = '';
    };

    closeBtn.addEventListener('click', closeLightbox); 
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });


    const serviceType = document.getElementById('service-type');
    const durationInput = document.getElementById('duration');
    const revisionCount = document.getElementById('revision-count');
    const basePriceElement = document.getElementById('base-price');
    const totalCostElement = document.getElementById('total-cost');
    
    const calculateEstimate = () => {
        const baseRate = parseFloat(serviceType.value) || 0;
        const duration = parseFloat(durationInput.value) || 1;
        const revisions = parseInt(revisionCount.value);

        if (baseRate === 0) {
            basePriceElement.textContent = `Base Service Cost: $0`;
            totalCostElement.innerHTML = `**Total Estimated Price: $0**`;
            return;
        }

        let total = baseRate * duration;
        
        const REVISION_PREMIUM_PER_EXTRA = 50; 
        const revisionCost = Math.max(0, revisions - 2) * REVISION_PREMIUM_PER_EXTRA; 
        total += revisionCost;

        basePriceElement.textContent = `Base Service Cost: $${(baseRate * duration).toFixed(0)}`;
        totalCostElement.innerHTML = `**Total Estimated Price: $${total.toFixed(0)}**`;
    };

    serviceType.addEventListener('change', calculateEstimate);
    durationInput.addEventListener('input', calculateEstimate);
    revisionCount.addEventListener('input', calculateEstimate);
    
    calculateEstimate(); 


    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        let errorMessage = '';

        if (nameInput.value.trim() === '') {
            isValid = false;
            errorMessage = 'Your name is required.';
        } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        } else if (messageInput.value.trim().length < 20) {
            isValid = false;
            errorMessage = 'Please provide more details (minimum 20 characters in the message).';
        }

        if (isValid) {
            formMessage.textContent = 'Inquiry sent! We will contact you within 24 hours.';
            formMessage.style.color = '#48BB78';
            contactForm.reset();
        } else {
            formMessage.textContent = errorMessage;
            formMessage.style.color = '#E53E3E';
        }
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = body.classList.contains('dark-mode') ? 'var(--color-card-dark)' : 'var(--color-card-dark)';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 10px rgba(0, 0, 0, 0.2)';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.boxShadow = 'none';
        } else {
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
        }
    });

});
