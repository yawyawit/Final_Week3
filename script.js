const sampleItems = [
    
];

const STORAGE_KEY = "findmeReports";

function getReports() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveReports(reports) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

function getAllItems() {
    return [...getReports(), ...sampleItems];
}

const reportForm = document.getElementById("reportForm");

if (reportForm) {
    const dateField = document.getElementById("date");

    function setToday() {
        const today = new Date();
        dateField.value = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 10);
    }

    if (dateField && !dateField.value) {
        setToday();
    }

    reportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const data = new FormData(reportForm);

        const report = {
            id: "report-" + Date.now(),
            type: data.get("type"),
            itemName: data.get("itemName").trim(),
            description: data.get("description").trim(),
            location: data.get("location").trim(),
            date: data.get("date"),
            studentName: data.get("studentName").trim()
        };

        const reports = getReports();
        reports.unshift(report);
        saveReports(reports);

        const message = document.getElementById("formMessage");

        if (message) {
            message.textContent = "Report submitted successfully!";
        }

        reportForm.reset();

        if (dateField) {
            setToday();
        }
    });
}

const itemsContainer = document.getElementById("itemsContainer");

if (itemsContainer) {
    const searchField = document.getElementById("searchItems");
    const filterField = document.getElementById("filterType");
    const emptyMessage = document.getElementById("emptyMessage");

    function renderItems() {
        const query = (searchField?.value || "").trim().toLowerCase();
        const type = filterField?.value || "All";

        const filtered = getAllItems().filter(item =>
            (type === "All" || item.type === type) &&
            `${item.itemName} ${item.location} ${item.description}`
                .toLowerCase()
                .includes(query)
        );

        itemsContainer.innerHTML = "";

        filtered.forEach(item => {
            const card = document.createElement("article");
            card.className = "card";

            const title = document.createElement("h3");
            title.textContent = item.itemName;

            const badge = document.createElement("span");
            badge.className = "status " +
                (item.type === "Lost" ? "status-lost" : "status-found");
            badge.textContent = item.type + " Item";

            const location = document.createElement("p");
            location.textContent =
                (item.type === "Lost" ? "Last seen at: " : "Found at: ") +
                item.location;

            const date = document.createElement("p");
            date.textContent = "Date: " + item.date;

            const viewButton = document.createElement("button");
            viewButton.type = "button";
            viewButton.textContent = "View Details";
            viewButton.addEventListener("click", () => showItemDetails(item));

            card.append(badge, title, location, date, viewButton);

            if (item.id.startsWith("report-")) {
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.textContent = "Delete Report";
                deleteButton.className = "delete-button";

                deleteButton.addEventListener("click", () => deleteReport(item.id));

                card.append(deleteButton);
            }

            itemsContainer.append(card);
        });

        if (emptyMessage) {
            emptyMessage.hidden = filtered.length !== 0;
        }
    }

    
function showItemDetails(item) {
    const overlay = document.createElement("div");
    overlay.className = "details-overlay";

    const modal = document.createElement("div");
    modal.className = "details-modal";

    const heading = document.createElement("h2");
    heading.textContent = "Item Details";

    const details = [
        ["Item", item.itemName],
        ["Type", item.type],
        ["Description", item.description],
        ["Location", item.location],
        ["Date", item.date],
        ["Reported by", item.studentName]
    ];

    const info = document.createElement("div");
    info.className = "details-info";

    details.forEach(([label, value]) => {
        const row = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = label + ": ";

        const text = document.createElement("span");
        text.textContent = value;

        row.append(strong, text);
        info.append(row);
    });

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "details-close";

    function closeModal() {
        overlay.remove();
    }

    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeModal();
        }
    });

    modal.append(heading, info, closeButton);
    overlay.append(modal);
    document.body.append(overlay);
}


    function deleteReport(id) {
        const confirmed = confirm("Are you sure you want to delete this report?");

        if (!confirmed) {
            return;
        }

        const reports = getReports().filter(report => report.id !== id);

        saveReports(reports);
        renderItems();
    }

    searchField?.addEventListener("input", renderItems);
    filterField?.addEventListener("change", renderItems);

    renderItems();
}
