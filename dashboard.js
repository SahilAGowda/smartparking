document.addEventListener('DOMContentLoaded', () => {
    // Destination Selection Animation
    const destinationCards = document.querySelectorAll('.destination-card');
    const proceedBtn = document.querySelector('.proceed-btn');
    const destinationForm = document.getElementById('destinationForm');

    // Radio Button Animation
    destinationCards.forEach(card => {
        const input = card.querySelector('input');
        const label = card.querySelector('label');

        input.addEventListener('change', () => {
            // Remove active class from all cards
            destinationCards.forEach(c => {
                c.querySelector('label').classList.remove('active');
            });

            // Add active class to selected card
            if (input.checked) {
                label.classList.add('active');
                
                // Vibration effect
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }

                // Sound effect (optional)
                playSelectionSound();
            }
        });
    });

    // Proceed Button Animation
    proceedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if any destination is selected
        const selectedDestination = document.querySelector('input[name="destination"]:checked');
        
        if (selectedDestination) {
            // Button click animation
            proceedBtn.classList.add('clicked');
            
            // Create ripple effect
            createRippleEffect(proceedBtn);
            
            // Navigate to next page directly
            navigateToNextPage(selectedDestination.value);
        } else {
            // Show error if no destination selected
            showErrorNotification('Please select a destination');
        }
    });

    // Ripple Effect Function
    function createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const x = event.clientX - element.offsetLeft;
        const y = event.clientY - element.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 300);
    }

    // Navigate to Next Page
    function navigateToNextPage(destination) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.classList.add('page-transition');
        document.body.appendChild(overlay);

        // Add transition animation
        setTimeout(() => {
            overlay.classList.add('active');
        }, 50);

        // Redirect to next page after transition
        setTimeout(() => {
            window.location.href = `destination_page.html?destination=${destination}`;
        }, 500);
    }

    // Error Notification
    function showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('error-notification');
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 50);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Sound Effect (Optional)
    function playSelectionSound() {
        try {
            const audio = new Audio('selection-sound.mp3');
            audio.play();
        } catch (error) {
            console.log('Sound not available');
        }
    }

    // Sidebar Interaction
    const sidebarItems = document.querySelectorAll('.sidebar nav ul li');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            playSelectionSound();
        });
    });

    // Profile Hover Effect
    const profileImg = document.querySelector('.profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transform = 'scale(1.1)';
            profileImg.style.transition = 'transform 0.3s ease';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1)';
        });
    }
});

// Additional CSS
const style = document.createElement('style');
style.textContent = `
    .error-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff6b6b;
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .error-notification.show {
        opacity: 1;
    }

    .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 9999;
    }

    .page-transition.active {
        opacity: 1;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .proceed-btn {
        position: relative;
        overflow: hidden;
        transition: transform 0.2s ease;
    }

    .proceed-btn.clicked {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

