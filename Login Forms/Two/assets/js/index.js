// Toggle between sign in and sign up forms
    const signinTab = document.getElementById('signin-tab');
    const signupTab = document.getElementById('signup-tab');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    signinTab.addEventListener('click', () => {
      signinTab.classList.add('active');
      signupTab.classList.remove('active');
      signinForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    });

    signupTab.addEventListener('click', () => {
      signupTab.classList.add('active');
      signinTab.classList.remove('active');
      signupForm.classList.remove('hidden');
      signinForm.classList.add('hidden');
    });

    // Toggle password visibility
    function togglePassword(fieldId = 'password') {
      const passwordField = document.getElementById(fieldId);
      const toggleIcon = passwordField.nextElementSibling;
      
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
      } else {
        passwordField.type = 'password';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
      }
    }

    // Form validation and submission
    document.getElementById('signin-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const username = this.username.value;
      const password = this.password.value;
      
      // Here you would typically send this data to your server
      console.log('Signing in with:', { username, password });
      
      // Show loading state
      const submitBtn = this.querySelector('.signin');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.textContent = 'Sign In';
        alert('Login successful! Redirecting...');
        // window.location.href = '/dashboard'; // Redirect on success
      }, 1500);
    });

    document.getElementById('signup-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = {
        fullname: this['fullname'].value,
        email: this['email'].value,
        password: this['new-password'].value
      };
      
      if (this['new-password'].value !== this['confirm-password'].value) {
        alert('Passwords do not match!');
        return;
      }
      
      if (!this['terms'].checked) {
        alert('You must agree to the terms and conditions');
        return;
      }
      
      console.log('Signing up with:', formData);
      
      // Show loading state
      const submitBtn = this.querySelector('.signin');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.textContent = 'Sign Up';
        alert('Account created successfully! Please check your email to verify.');
        signinTab.click(); // Switch back to sign in form
      }, 2000);
    });