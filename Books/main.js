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

    //Request for JSON
    let reqJSON = new XMLHttpRequest();

    //Get response back formatted at JSON
    reqJSON.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            let booksArray = []

            let JSONText = JSON.parse(this.responseText);

            //Add all books to the array
            for (i = 0; i <= maxResults.value - 1; i++) {
                
                booksArray.push(JSONText.query.results.json.items[i]);
            }

            //Create table headers
            tableHeaders.forEach(function (item){
                let th = '<th>' + item + '</th>';
                thead += th;
            });

            //Append header to table
            thead += '</thead><tbody>'
            tblOutputJSON.innerHTML += thead;

            //Create rows for table and append to table
            booksArray.forEach(function (item) {
                
                tblOutputJSON.innerHTML += `<tr><td><img src=${item.volumeInfo.imageLinks.smallThumbnail}/></td>
                                            <td>${item.volumeInfo.title}</td>
                                            <td>${item.volumeInfo.description}</td>
                                            <td>${item.volumeInfo.authors}</td>
                                            <td><a target="_blank" rel="noopener noreferrer" href=${item.volumeInfo.previewLink}>Preview Book</a></td>
                                            <td><a target="_blank" rel="noopener noreferrer" href=${item.volumeInfo.infoLink}>Book Info</a></td></tr>`;
                        
            });
            
            tblOutputJSON.innerHTML += '</tbody>';
            
        }

    }

    reqJSON.open("GET", `${yqlBaseURL}${yqlQuery}&format=json`, true);
    reqJSON.send();
}
