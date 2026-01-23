// ================= ACHIEVEMENTS COUNTER =================
const counters = document.querySelectorAll('.achievements-number');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 1.0 });

    observer.observe(counter);
});

// ================= CONTACT FORM TO GOOGLE SHEET =================

// TUMAR DEPLOYED WEB APP URL — eta correct kore paste kora ache
const scriptURL = "https://script.google.com/macros/s/AKfycbwuMs3NGActm9OQmiImyQkde8Ai_PdJuG_gHtBy-yehgegBi6o3H7yAe1PxgRLm9m2MRQ/exec";

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){
    e.preventDefault(); // Prevent page reload

    const formData = new FormData(form); // Automatically collect all form fields

    fetch(scriptURL, {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert("Message sent successfully!");
        form.reset();
    })
    .catch(error => {
        alert("Something went wrong. Try again!");
        console.error("Error!", error);
    });
});
