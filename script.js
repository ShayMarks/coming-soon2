document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Smooth 3D Parallax for Background Blobs
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.04; // Tweak speed for natural feel
        const x = (mouseX - centerX) * speed;
        const y = (mouseY - centerY) * speed;
        
        requestAnimationFrame(() => {
            blob.style.setProperty('--move-x', `${x}px`);
            blob.style.setProperty('--move-y', `${y}px`);
        });
    });

    // 3D Tilt Effect for Hero Content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Calculate tilt angles based on mouse position
        const tiltX = ((mouseY - centerY) / centerY) * -10; // Max 10 deg tilt
        const tiltY = ((mouseX - centerX) / centerX) * 10;
        
        requestAnimationFrame(() => {
            heroContent.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
    }
});

// Reset 3D transforms when mouse leaves the window
document.addEventListener('mouseleave', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        requestAnimationFrame(() => {
            heroContent.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }
    
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach(blob => {
        requestAnimationFrame(() => {
            blob.style.setProperty('--move-x', `0px`);
            blob.style.setProperty('--move-y', `0px`);
        });
    });
});
