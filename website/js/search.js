function airport_search(widget, id) {
  const searchInput = document.getElementById(widget);
  const suggestions = document.getElementById(id);
  
  searchInput.addEventListener('input', function(event) {
      const query = this.value.toLowerCase();
      const filteredAirports = airports.filter(airport => 
          airport.name.toLowerCase().includes(query) ||
          airport.city.toLowerCase().includes(query) ||
          airport.country.toLowerCase().includes(query)
      );
        var inputValue = event.target.value;
    
        // Check if the input value length is greater than 3 characters
        if (inputValue.length > 3) {
            // Execute your code here
          suggestions.style.display = 'block'
          displaySuggestions(filteredAirports);
        }
      
  });
  
  
  function displaySuggestions(filteredAirports) {
      suggestions.innerHTML = '';
      filteredAirports.forEach(airport => {
        // Set the inner text/content of the anchor tag
  
        // Create a line break element
        var lineBreak = document.createElement('br');
  
  
        // Append the anchor tag and line break to the parent element
        var anchor = '<div class="search-result" onclick=insert_data("' + airport.city.replace(' ', '_') +':-sep-:' + airport.code + '","' + widget + '","' + airport.price + '")><section><div class="scroll-left">' + airport.name + '<p><span>' + airport.country + '</span> <span><a>' + airport.city + '</a></span></p></div><div class="scroll-right">' + airport.code + '</div></section></div>'
        
        suggestions.innerHTML += anchor
        suggestions.appendChild(lineBreak);
  
  
  
      });
  }
  
}

function insert_data(value, id, price) {
  var parts = value.split(":-sep-:");
  document.getElementById(id).value = parts.join(", ").replace('_', ' ') ;
  if (id == 'from') {
    session_data['price'] = price
  }

  tunnel()
}

function tunnel(){
  document.getElementById('from-suggestions').style.display = 'none';
  document.getElementById('to-suggestions').style.display = 'none';
}