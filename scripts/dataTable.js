
/**
 * This is a script that fetches data from users.json file and renders employee data table.
 * The main functions are fetching, table renderTables to display data in a table format and 
 * renderPagination for control large quantities of data rendered using containing using pagination.
 * 
 * @param { Object } tableBody - holds an HTML reference ID of an element that will contain table data
 * @param { Object } paginationDiv - holds an HTML reference ID of an element which controls the display
 * of the table data.
 * @param { Object } selectDesignation - holds an HTML reference ID of an element to display slected designatons.
 */

const tableBody = document.getElementById('userData');
const paginationDiv = document.getElementById('pagination');
const selectDesignation = document.getElementById('selectDesignation');

let usersData = [];
let currentPage = 1;
const rowsPerPage = 10;

fetch('users.json')
    .then(response => response.json())
    .then(data => {
        usersData = data;
        populateDesignations(usersData);
        renderTable(usersData);
    })
    .catch(error => console.error('Error fetching data:', error));

function renderTable(userData) {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedUsers = userData.slice(startIndex, endIndex);

    tableBody.innerHTML = ''; // Clear previous data

    displayedUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.designation}</td>
            <td>${user.department}</td>
        `;
        tableBody.appendChild(row);
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(usersData.length / rowsPerPage);

    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<span class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</span>`;
    }

    paginationDiv.innerHTML = paginationHTML;
}

function goToPage(page) {
    if (page >= 1 && page <= Math.ceil(usersData.length / rowsPerPage)) {
        currentPage = page;
        renderTable(usersData);
        
    }
    
}

function populateDesignations(userData) {
    const designations = new Set(userData.map(user => user.designation));
    designations.forEach(designation => {
        const option = document.createElement('option');
        option.text = designation;
        option.value = designation;
        selectDesignation.appendChild(option);
    });
}

// Event listener for select change
selectDesignation.addEventListener('change', function () {
    const selectedDesignation = this.value;
    const filteredData = selectedDesignation ?
        usersData.filter(user => user.designation === selectedDesignation) :
        usersData;
        currentPage = 1; 
        renderPagination();
    renderTable(filteredData);
});
