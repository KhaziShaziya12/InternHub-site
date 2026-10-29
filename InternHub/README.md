# InternHub

A web app that helps students find internships and manage their applications.

## Features
- Landing page with project introduction and internship statistics
- Login and sign-up pages
- 20 internships across 14 companies, each with role, description, location and eligibility
- Apply form with personal details, education, cover note and resume upload
- Profile panel (top right icon) with saved details and a reusable resume
- Student management: register, view, edit and delete students
- Application management: view details, set status (Pending, Accepted, Rejected), delete

## Project structure
```
internhub/
├── index.html        Page shell and script loading
├── css/
│   └── styles.css    Styles (small inlined subset of Bootstrap 5 classes)
├── js/
│   ├── data.js       Sample departments, companies and internships
│   ├── state.js      App state, helpers, saving and loading
│   ├── views.js      Home, internships, students, applications, apply form
│   ├── profile.js    Profile icon panel and My profile page
│   ├── auth.js       Login and sign-up
│   ├── events.js     Click, change and form handlers
│   └── main.js       Render function and app start
├── README.md
└── .gitignore
```

## Run it
No build step and no dependencies. Open `index.html` in a browser.

## Host it for free (GitHub Pages)
1. Push this folder to a GitHub repository.
2. In the repository, open **Settings > Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then save.
4. After a minute, GitHub shows your site's public link.

## Important notes
- Data is stored in each visitor's own browser (localStorage). Nothing is shared between users.
- Login is a front-end simulation and is not secure. Do not use real passwords.
- Resume uploads save only the file name and size, not the file contents.
- The internships and companies are made-up sample data.

## Tech
HTML, CSS and vanilla JavaScript. No framework and no build tools.
