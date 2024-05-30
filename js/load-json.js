// Define a global variable to store the JSON data
let airports;

// Function to fetch JSON data from file
async function fetchData() {
  try {
    // Fetch the JSON file
    let response = await fetch('../util/airports.json');

    // Parse the JSON response
    airports = await response.json();

    // Log the retrieved data (optional)
  } catch (error) {
    // Handle errors
    console.error('Error fetching JSON data:', error);
  }
}

// Call the fetchData function to initiate data retrieval
fetchData();
