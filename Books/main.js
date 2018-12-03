function searchBooks() {
    //Get user inputs
    let bookTitle = document.querySelector('#bookTitle');
    let maxResults = document.querySelector('#maxResults');

    //Get reference to empty table for JSON output
    let tblOutputJSON = document.querySelector('#tblOutputJSON');

    //Clear out table in case of resubmit
    tblOutputJSON.innerHTML = "";

    //Array for headers
    let tableHeaders = ['Image', 'Title', 'Description', 'Authors', 'Preview', 'Info'];

    //Create table header
    let thead = '<thead>';

    //Insert inputs into query params
    let yqlBaseURL = "https://query.yahooapis.com/v1/public/yql?q=";
    let yqlQuery = `SELECT * from google.books where q='${bookTitle.value}' AND maxResults='${maxResults.value}' &env=store://datatables.org/alltableswithkeys`;

    //AJAX request for JSON data
    $.ajax({
        dataType: 'json',
        url: `${yqlBaseURL}${yqlQuery}&format=json`,
        type: 'GET',
        success: (data) => {

            let books = [...data.query.results.json.items];

            //Create table headers
            thead += tableHeaders.map((header) => {
                return `<th>${header}</th>`;
            }).join('');

            //Append header to table
            tblOutputJSON.innerHTML += `${thead}</thead><tbody>`;

            //Create rows and celles for table and append to table     
            tblOutputJSON.innerHTML += books.map((book) => {
                return `<tr><td><img src=${book.volumeInfo.imageLinks.smallThumbnail}/></td>
                        <td>${book.volumeInfo.title}</td>
                        <td>${book.volumeInfo.description}</td>
                        <td>${book.volumeInfo.authors}</td>
                        <td><a target="_blank" rel="noopener noreferrer" href=${book.volumeInfo.previewLink}>Preview Book<a/></td>
                        <td><a target="_blank" rel="noopener noreferrer" href=${book.volumeInfo.infoLink}>Book Info</a></td></tr>`;
            }).join(''); 
            
            tblOutputJSON.innerHTML += '</tbody>';

        }

    });
}
