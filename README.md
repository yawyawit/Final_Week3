FindME – Project Handoff
Project Overview
FindME is a school-campus Lost and Found website designed to help students and school staff report, browse, and recover misplaced belongings around campus.

The project is a front-end website built with HTML, CSS, and JavaScript. It currently uses browser localStorage to save submitted reports.
Pages
- Home (index.html) – Introduces FindME and explains the three-step process: Report, Browse, and Recover. Includes links to browse listings and report an item.
- Lost & Found (items.html) – Displays listings, search, type filtering (All, Lost, Found), View Details popups, and Delete Report buttons for user-submitted listings.
- Report (report.html) – Form for submitting Lost or Found reports. Fields include report type, item name, description, location, date, and student name.
- About (about.html) – Information about the website and its purpose.
Files
- index.html – Home page
    - items.html – Listings page
    - report.html – Report form
    - about.html – About page
    - style.css – Shared layout, styles, responsive design, colors, cards, form controls, header, and footer
    - script.js – Report storage, listing rendering, search/filter behavior, details popup, and report deletion
    - logo.png – FindME logo
    - campus-bg.jpg – Campus background image, if used by the stylesheet
Current Features
    - Browse Lost and Found listings
    - Search listings by item name, location, or description
    - Filter listings by Lost or Found
    - Submit reports through a form
    - Automatically set the report date field to the current date when it is blank
    - Save submitted reports in browser localStorage
    - View report details in a centered custom popup (instead of the browser's default alert)
    - Delete user-submitted reports after a confirmation prompt

    - Shared navigation and footer across pages
    - Responsive styling for smaller screens
    - Sticky navigation header while scrolling
    - FindME visual theme based on the University of Baguio login page colors: charcoal/dark gray, red, white, and neutral gray
How the Website Works
1. A user opens the Report page and fills out the form.
2. JavaScript reads the form data and creates a report object.
3. The report is saved in localStorage under the key findmeReports.
4. The Lost & Found page reads saved reports and combines them with the sample listings.
5. The listing page renders cards and supports searching and filtering.
6. View Details opens a custom centered popup with the item's information.
7. Delete Report asks for confirmation and removes the selected report from localStorage, then refreshes the displayed listings.
Storage and Limitations
- Reports are stored in the browser's localStorage.
- Reports are available only in the same browser and device where they were submitted.
- The project does not currently have a server, shared database, account system, or administrator dashboard.
- Sample listings are built into the JavaScript and are not stored as user reports.
- Deletion currently applies to locally stored user-submitted reports; it does not remove built-in sample listings.
- This is a prototype/demo rather than a production-ready campus-wide system.
Design Notes
- The website uses a shared CSS stylesheet for all pages.
- The navigation bar is intended to remain at the top while scrolling (position: sticky).
- The footer is designed to sit at the bottom on short pages while remaining in normal document flow on longer pages. A
- The logo is intended to appear circular.
- The visual theme uses red accents with charcoal/dark gray and white, inspired by the "University of Baguio login page". 
- The visual theme uses red accents with charcoal/dark gray and white, inspired by the University of Baguio login page. Use the same palette consistently for buttons, headings, borders, and interactive states.
- Native HTML select menus may still display a system-controlled blue highlight in some Chrome/Windows dropdowns. CSS may not be able to fully recolor that native highlight; a custom dropdown would be needed for consistent styling.
