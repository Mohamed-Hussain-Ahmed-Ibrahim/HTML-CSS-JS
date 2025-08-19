document.addEventListener('DOMContentLoaded', function() {
    const siteNameInput = document.getElementById('siteNameInput');
    const siteUrlInput = document.getElementById('siteUrlInput');
    const submitBtn = document.querySelector('.btn-danger');
    const tableBody = document.getElementById('tableBody');

    const siteNameRegex = /^[A-Za-z0-9 ]{3,}$/;
    const siteUrlRegex = /^(https?:\/\/|www\.)?[\w-]+(\.[\w-]+)*\.(com|net|org)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    renderTable();

    function validateInput(input, regex) {
        const value = input.value.trim();
        if (value === "") {
            input.classList.remove('is-valid', 'is-invalid');
            return;
        }
        if (regex.test(value)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    siteNameInput.addEventListener('input', () => validateInput(siteNameInput, siteNameRegex));
    siteUrlInput.addEventListener('input', () => validateInput(siteUrlInput, siteUrlRegex));

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const name = siteNameInput.value.trim();
        const url = siteUrlInput.value.trim();

        const isValidName = siteNameRegex.test(name);
        const isValidUrl = siteUrlRegex.test(url);

        validateInput(siteNameInput, siteNameRegex);
        validateInput(siteUrlInput, siteUrlRegex);

        // Show validation messages
        if (!isValidName || !isValidUrl) {
            let message = 'Please fix the following errors:\n';
            if (!isValidName) message += '- Site name must be at least 3 letters/numbers.\n';
            if (!isValidUrl) message += '- URL must be valid (start with http/https and end with .com/.net/.org).\n';
            alert(message);
            return;
        }

        // Check for duplicates
        const nameExists = bookmarks.some(b => b.name.toLowerCase() === name.toLowerCase());
        const urlExists = bookmarks.some(b => b.url.toLowerCase() === url.toLowerCase());

        if (nameExists || urlExists) {
            let message = 'Duplicate entry detected:\n';
            if (nameExists) message += '- A bookmark with the same name already exists for URL: ' + bookmarks.find(b => b.name.toLowerCase() === name.toLowerCase()).url + '\n';
            if (urlExists) message += '- A bookmark with the same URL already exists.\n with name: ' + bookmarks.find(b => b.url.toLowerCase() === url.toLowerCase()).name;
            alert(message);
            return;
        }

        // All good, add bookmark
        bookmarks.push({ name, url });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderTable();
        clearForm();
    });

    function renderTable() {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        tableBody.innerHTML = '';

        if (bookmarks.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" class="text-muted bg-light">No bookmarks saved yet</td>`;
            tableBody.appendChild(row);
            return;
        }

        bookmarks.forEach((bookmark, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bookmark.name}</td>
                <td>
                    <a href="${bookmark.url.startsWith('http') ? bookmark.url : 'https://' + bookmark.url}"
                        class="btn btn-success" target="_blank">Visit</a>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function clearForm() {
        siteNameInput.value = '';
        siteUrlInput.value = '';
        siteNameInput.classList.remove('is-valid', 'is-invalid');
        siteUrlInput.classList.remove('is-valid', 'is-invalid');
    }

    window.deleteBookmark = function (index) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.splice(index, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderTable();
    };
});
