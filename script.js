// ========================================
// GOOGLE APPS SCRIPT URL
// ========================================

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwENHsGK3dTzc0qXizfy6joqz0BAlTHL8wfpqozkB6DzhA8duAXfORqOeFwUO2XjlNi/exec";


// ========================================
// CONTACT FORM
// ========================================

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const message =
        document.getElementById("message").value;

    const time =
        new Date().toLocaleString();

    const user = {
        name: name,
        email: email,
        message: message,
        time: time
    };

    try {

        await fetch(
            GOOGLE_SCRIPT_URL,
            {
                method: "POST",
                body: JSON.stringify(user)
            }
        );

        alert("Message Sent Successfully!");

        form.reset();

    }

    catch(error) {

        console.error(error);

        alert(
            "There was a problem sending your message."
        );

    }

});


// ========================================
// ADMIN LOGIN
// ========================================

function login() {

    const password =
        document.getElementById("password").value;

    if (password === "admin123") {

        document.getElementById("admin")
            .style.display = "none";

        document.getElementById("responses")
            .style.display = "block";

        loadResponses();

    }

    else {

        alert("Wrong Password");

    }

}


// ========================================
// LOAD RESPONSES FROM GOOGLE SHEETS
// ========================================

function loadResponses() {

    const responseList =
        document.getElementById("responseList");

    responseList.innerHTML =
        "<p>Loading responses...</p>";

    const callbackName =
        "googleSheetCallback";

    window[callbackName] =
        function(responses) {

            responseList.innerHTML = "";

            if (responses.length === 0) {

                responseList.innerHTML =
                    "<p>No responses yet.</p>";

                return;

            }

            responses.forEach(function(user) {

                responseList.innerHTML += `

                    <div class="response-card">

                        <h3>${user.name}</h3>

                        <p>
                            <strong>Email:</strong>
                            ${user.email}
                        </p>

                        <p>
                            <strong>Message:</strong>
                            ${user.message}
                        </p>

                        <p>
                            <strong>Time:</strong>
                            ${user.time}
                        </p>

                    </div>

                `;

            });

            delete window[callbackName];

            const oldScript =
                document.getElementById(
                    "googleSheetScript"
                );

            if (oldScript) {
                oldScript.remove();
            }

        };


    const script =
        document.createElement("script");

    script.id =
        "googleSheetScript";

    script.src =
        GOOGLE_SCRIPT_URL +
        "?callback=" +
        callbackName;

    script.onerror =
        function() {

            responseList.innerHTML =
                "<p>Unable to load responses.</p>";

        };

    document.body.appendChild(script);

}


// ========================================
// DARK / LIGHT MODE
// ========================================

const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark-mode"
        );

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            themeToggle.innerText =
                "☀️ Light Mode";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        else {

            themeToggle.innerText =
                "🌙 Dark Mode";

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);


// ========================================
// REMEMBER THEME
// ========================================

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.innerText =
        "☀️ Light Mode";
}
