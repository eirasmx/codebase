
function modifyAndSaveJSON() {
    // Fetch the JSON file
    fetch('../util/airports.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            // Modify the JSON data
            jsonData.forEach(obj => {
                const randomNumber = Math.floor(Math.random() * (980 - 450 + 1)) + 450;
                obj.price = randomNumber;
            });

            // Convert the modified JSON data to a string
            const modifiedJsonString = JSON.stringify(jsonData, null, 2);

            // Save the modified JSON string back to the file (not possible in browser)
            localStorage.setItem('new', modifiedJsonString);

            console.log('Now you would typically send this data to a server to save it.');
            console.log('Modified JSON data:', modifiedJsonString);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


modifyAndSaveJSON()
