/**
 * Compact Phone Button Injector with Icon Flip Animation
 * Adds a small call button to the bottom right of any webpage
 * Phone icon flips sideways when clicked
 */

(function() {
  // Check if the button already exists
  if (document.getElementById('phone-container')) return;

  // Create the styles
  const style = document.createElement('style');
  style.textContent = `
    /* Compact phone button container */
    #phone-container {
      position: fixed;
      bottom: 15px;
      right: 15px;
      display: flex;
      align-items: center;
      background-color: #000;
      border-radius: 25px;
      padding: 8px 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    /* Hover effect */
    #phone-container:hover {
      background-color: #222;
      transform: translateY(-1px);
    }

    /* Label styling */
    #phone-container span {
      color: white;
      font-size: 12px;
      margin-right: 8px;
      font-family: 'Arial', sans-serif;
      font-weight: 600;
    }

    /* Phone icon - smaller with flip animation */
    #phone-container i {
      color: white;
      font-size: 20px;
      transition: transform 0.3s ease;
    }

    /* Flip the icon when clicked */
    #phone-container.clicked i {
      transform: rotate(45deg);
    }

    /* Micro-interaction animation */
    @keyframes microBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.95); }
    }

    #phone-container:active {
      animation: microBounce 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  // Create the button
  const phoneContainer = document.createElement('div');
  phoneContainer.id = 'phone-container';
  phoneContainer.innerHTML = `
    <span>Call Us!</span>
    <i class="fas fa-phone-alt"></i>
  `;

  // Set phone number
  const phoneNumber = '+15755202483';
  
  phoneContainer.onclick = function(e) {
    e.preventDefault();
    // Add clicked class for flip animation
    this.classList.add('clicked');
    
    // Small delay before initiating call
    setTimeout(() => {
      window.location.href = 'tel:' + phoneNumber;
    }, 300);
    
    // Remove clicked class after animation completes
    setTimeout(() => {
      this.classList.remove('clicked');
    }, 1000);
  };

  // Add tooltip
  phoneContainer.title = 'Call ' + phoneNumber;

  // Add to body
  document.body.appendChild(phoneContainer);

  // Load Font Awesome if needed
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(faLink);
  }

  // Configuration API
  window.PhoneButton = {
    setNumber: function(newNumber) {
      phoneNumber = newNumber;
      phoneContainer.title = 'Call ' + phoneNumber;
    },
    setLabel: function(newLabel) {
      phoneContainer.querySelector('span').textContent = newLabel;
    },
    setColor: function(color) {
      phoneContainer.style.backgroundColor = color;
    },
    toggleSize: function() {
      phoneContainer.classList.toggle('compact');
    },
    flipIcon: function(degrees = 45) {
      phoneContainer.querySelector('i').style.transform = `rotate(${degrees}deg)`;
    },
    resetIcon: function() {
      phoneContainer.querySelector('i').style.transform = '';
    }
  };

  console.log('Compact call button injected!');
})();