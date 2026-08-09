INDEX.HTML:
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>My Portfolio</title>

    <link rel="stylesheet" href="style.css">

</head>

<body>

    <!-- Theme Toggle -->

    <button id="themeToggle">
        🌙 Dark Mode
    </button>


    <!-- Navigation Bar -->

    <nav>

        <h2>My Portfolio</h2>

        <ul>

            <li>
                <a href="#home">Home</a>
            </li>

            <li>
                <a href="#about">About</a>
            </li>

            <li>
                <a href="#skills">Skills</a>
            </li>

            <li>
                <a href="#projects">Projects</a>
            </li>

            <li>
                <a href="#contact">Contact</a>
            </li>

        </ul>

    </nav>


    <!-- Home -->

    <section id="home">

        <h1>Hello, I'm Prani</h1>

        <p>
            ECE Student | Frontend Developer
        </p>

        <button>
            Download Resume
        </button>

    </section>


    <!-- About -->

    <section id="about">

        <h2>About Me</h2>

        <p>
            I am an Electronics and Communication Engineering
            student interested in Web Development and Java Programming.
        </p>

    </section>


    <!-- Skills -->

    <section id="skills">

        <h2>Skills</h2>

        <ul>

            <li>HTML</li>

            <li>CSS</li>

            <li>JavaScript</li>

            <li>React</li>

        </ul>

    </section>


    <!-- Projects -->

    <section id="projects">

        <h2>Projects</h2>

        <div>

            <h3>Portfolio Website</h3>

            <p>
                Responsive website using HTML, CSS and JavaScript.
            </p>

        </div>

        <div>

            <h3>React Contact Cards</h3>

            <p>
                React Single Page Application.
            </p>

        </div>

    </section>


    <!-- Contact -->

    <section id="contact">

        <h2>Contact Me</h2>

        <form id="contactForm">

            <input
                type="text"
                id="name"
                placeholder="Enter your Name"
                required>

            <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                required>

            <textarea
                id="message"
                placeholder="Enter your Message"
                required></textarea>

            <button type="submit">
                Send
            </button>

        </form>

    </section>


    <!-- Admin Login -->

    <section id="admin">

        <h2>Admin Login</h2>

        <input
            type="password"
            id="password"
            placeholder="Enter Admin Password">

        <br><br>

        <button onclick="login()">
            Login
        </button>

    </section>


    <!-- User Responses -->

    <section id="responses">

        <h2>User Responses</h2>

        <div id="responseList">

        </div>

    </section>


    <!-- Footer -->

    <footer>

        <p>
            © 2026 Prani. All Rights Reserved.
        </p>

    </footer>


    <!-- JavaScript -->

    <script src="script.js"></script>

</body>

</html>


LOGIN.HTMIL:

<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <h2>Admin Login</h2>

    <input type="text" id="username" placeholder="Username">
    <br><br>

    <input type="password" id="password" placeholder="Password">
    <br><br>

    <button onclick="login()">Login</button>

    <script>
        function login(){
            let user = document.getElementById("username").value;
            let pass = document.getElementById("password").value;

            if(user === "admin" && pass === "1234"){
                alert("Login Successful");
                window.location.href="index.html";
            }
            else{
                alert("Invalid Login");
            }
        }
    </script>

</body>
</html>

SCRIPT.JS:
// ========================================
// GOOGLE APPS SCRIPT URL
// ========================================

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwENHsGK3dTzc0qXizfy6joqz0BAlTHL8wfpqozkB6DzhA8duAXfORqOeFwUO2XjlNi/exec";


// ========================================
// CONTACT FORM
// ========================================

const form =
    document.getElementById("contactForm");

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

STYLE.CSS:

/* Reset */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

/* Body */

body{
    font-family:Arial, sans-serif;
    background:#f4f4f4;
    color:#333;
    line-height:1.6;
}

/* Navigation */

nav{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#1f2937;
    color:white;
    padding:20px 50px;
    position:sticky;
    top:0;
}

nav h2{
    font-size:28px;
}

nav ul{
    list-style:none;
    display:flex;
}

nav ul li{
    margin-left:20px;
}

nav ul li a{
    color:white;
    text-decoration:none;
    font-size:18px;
}

nav ul li a:hover{
    color:yellow;
}

/* All Sections */

section{
    padding:60px;
}

/* Home */

#home{
    text-align:center;
    background:#2563eb;
    color:white;
    padding:100px 20px;
}

#home h1{
    font-size:45px;
}

#home p{
    margin-top:15px;
    font-size:22px;
}

#home button{
    margin-top:25px;
    padding:12px 25px;
    border:none;
    background:white;
    color:#2563eb;
    cursor:pointer;
    font-size:18px;
    border-radius:5px;
}

/* About */

#about{
    background:white;
}

/* Skills */

#skills{
    background:#e5e7eb;
}

#skills ul{
    margin-top:20px;
    margin-left:20px;
}

/* Projects */

#projects{
    background:white;
}

#projects div{
    background:#f1f5f9;
    padding:20px;
    margin-top:20px;
    border-radius:10px;
}

/* Contact */

#contact{
    background:#e5e7eb;
}

form{
    margin-top:20px;
}

input,
textarea{
    width:100%;
    padding:12px;
    margin-bottom:15px;
    border:1px solid gray;
    border-radius:5px;
}

textarea{
    height:120px;
}

form button{
    background:#2563eb;
    color:white;
    border:none;
    padding:12px 25px;
    cursor:pointer;
    border-radius:5px;
}

/* Admin */

#admin{
    background:white;
}

/* Responses */

#responses{
    background:#e5e7eb;
}

/* Footer */

footer{
    background:#1f2937;
    color:white;
    text-align:center;
    padding:20px;
}

/* Mobile Responsive */

@media(max-width:768px){

nav{
    flex-direction:column;
}

nav ul{
    flex-direction:column;
    margin-top:15px;
}

nav ul li{
    margin:10px 0;
}

section{
    padding:30px;
}

#home h1{
    font-size:35px;
}

}
#responses {
    display: none;
}

.response-card {
    background: white;
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 0 10px gray;
}



/* ============================= */
/* DARK MODE */
/* ============================= */

body.dark-mode {
    background: #111827;
    color: white;
}

body.dark-mode nav {
    background: #000000;
}

body.dark-mode #about {
    background: #1f2937;
    color: white;
}

body.dark-mode #skills {
    background: #374151;
    color: white;
}

body.dark-mode #projects {
    background: #1f2937;
    color: white;
}

body.dark-mode #projects div {
    background: #374151;
    color: white;
}

body.dark-mode #contact {
    background: #374151;
    color: white;
}

body.dark-mode #admin {
    background: #1f2937;
    color: white;
}

body.dark-mode #responses {
    background: #374151;
    color: white;
}

body.dark-mode .response-card {
    background: #1f2937;
    color: white;
}

body.dark-mode footer {
    background: #000000;
    color: white;
}

