// Define a global variable to store the JSON data
var tracking_data;

// Function to fetch data from JSON file
function fetchData() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the URL of the JSON file
  var url = "data.json";

  // Open a GET request to the URL
  xhr.open("GET", url, true);

  // Set the response type to JSON
  xhr.responseType = "json";

  // Define a function to handle the onload event
  xhr.onload = function () {
    // Check if the request was successful
    if (xhr.status === 200) {
      // Parse the JSON response
      tracking_data = xhr.response;
      // Now you can use globalData variable to access your JSON data globally
    } else {
      // Log an error message if the request was not successful
      console.error("Error fetching data:", xhr.statusText);
    }
  };

  // Define a function to handle any errors
  xhr.onerror = function () {
    console.error("Error fetching data:", xhr.statusText);
  };

  // Send the request
  xhr.send();
}

// Call the fetchData function to initiate the data retrieval process
fetchData();

var now = new Date();

var year = now.getFullYear();
var month = now.getMonth() + 1;
var month = (month < 10 ? "0" : "") + month;

var day = now.getDate();
var day = (day < 10 ? "0" : "") + day;

// Format the date nicely
var date = year + "-" + month + "-" + day;

// Display the date

var shipping_process = [
  "In transit",
  "Shipped",
  "Preparing for delivery",
  "Out for delivery",
  "Delivered",
];

function check_status(array, status, info_date, pointer, line) {
  function track_up() {
    pointer.style.background = "#329c6c";

    if (line != undefined) {
      line.style.background = "#329c6c";
    }

    array["status"] = status;
  }
  if (date > info_date[0]) {
    track_up();
  } else if (date == info_date[0]) {
    function check_time(time_string) {
      const current_time = new Date();
      const [time, period] = time_string.split(" ");

      let [hours, minutes] = time.split(":");
      if (period.toLowerCase() === "pm") {
        hours = parseInt(hours) + 12;
      }

      const check_time = new Date();
      check_time.setHours(parseInt(hours));
      check_time.setMinutes(parseInt(minutes));
      check_time.setSeconds(0);
      check_time.setMilliseconds(0);

      return current_time >= check_time;
    }

    if (check_time(info_date[1]) == true) {
      track_up();
    }
  }
}

function get_string_date(code_date) {
  var date_value = new Date(code_date);
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var day_name = " (" + days[date_value.getDay()] + ")";

  var month_name = date_value.toLocaleString("default", { month: "short" });

  return [
    month_name + " " + date_value.getDate() + ", " + date_value.getFullYear(),
    day_name,
  ];
}

function get_tracking() {
  var valid_tracking_numbers = tracking_data["tracking_numbers"];

  document.getElementById("complex").style.display = "none";
  var entered_tracking = document
    .getElementById("entered-number")
    .value.replace(/\+/g, "");
  var tracking_number = document.getElementById("tracking-number");
  var track_id_data = document.getElementById("track-id-data");
  var status_value = document.querySelector(".status");
  var status_icon = document.getElementById("status-icon");

  if (entered_tracking.length > 0) {
    tracking_number.innerHTML = entered_tracking;
  } else {
    tracking_number.innerHTML = "Tracking number";
  }

  if (valid_tracking_numbers.includes(entered_tracking)) {
    var tracking_info = tracking_data[entered_tracking];

    var pointer_delivered = document.getElementById("pointer-delivered");

    var line_out_delivered = document.getElementById("line-out-delivered");
    var pointer_out = document.getElementById("pointer-out");

    var line_preparing_out = document.getElementById("line-preparing-out");
    var pointer_preparing = document.getElementById("pointer-preparing");

    var line_shipped_preparing = document.getElementById(
      "line-shipped-preparing"
    );
    var pointer_shipped = document.getElementById("pointer-shipped");

    var line_transit_shipped = document.getElementById("line-transit-shipped");
    var pointer_transit = document.getElementById("pointer-transit");

    check_status(
      tracking_info,
      0,
      tracking_info["transit_date"],
      pointer_transit
    );

    check_status(
      tracking_info,
      1,
      tracking_info["shipped_date"],
      pointer_shipped,
      line_transit_shipped
    );

    check_status(
      tracking_info,
      2,
      tracking_info["preparing_delivery"],
      pointer_preparing,
      line_shipped_preparing
    );

    check_status(
      tracking_info,
      3,
      tracking_info["out_delivery"],
      pointer_out,
      line_preparing_out
    );

    check_status(
      tracking_info,
      4,
      tracking_info["delivery_date"],
      pointer_delivered,
      line_out_delivered
    );

    var delivered_date = document.getElementById("delivered-date");
    var out_date = document.getElementById("out-date");
    var preparing_date = document.getElementById("preparing-date");
    var shipped_date = document.getElementById("shipped-date");

    delivered_date.innerHTML =
      get_string_date(tracking_info["delivery_date"][0])[0] +
      " " +
      tracking_info["delivery_date"][1];

    out_date.innerHTML =
      get_string_date(tracking_info["out_delivery"])[0] +
      " " +
      tracking_info["out_delivery"][1];
    preparing_date.innerHTML =
      get_string_date(tracking_info["preparing_delivery"])[0] +
      " " +
      tracking_info["preparing_delivery"][1];
    shipped_date.innerHTML =
      get_string_date(tracking_info["shipped_date"])[0] +
      " " +
      tracking_info["shipped_date"][1];

    var date_time = document.querySelector(".date-time");
    var status_value_too = document.querySelector(".status2");
    var delivery_date = document.querySelector(".delivery-date");
    var location_value = document.getElementById("location");

    location_value.innerHTML = tracking_info["location"];

    var delivery_date_value = get_string_date(
      tracking_info["delivery_date"][0]
    );
    delivery_date.innerHTML = delivery_date_value[0] + delivery_date_value[1];
    //   date_time.innerHTML = current status date and time;

    status_value.innerHTML = shipping_process[tracking_info["status"]];
    status_value_too.innerHTML = shipping_process[tracking_info["status"]];

    var data_status = {
      "In transit": tracking_info["transit_date"],
      Shipped: tracking_info["shipped_date"],
      "Preparing for delivery": tracking_info["preparing_delivery"],
      "Out for delivery": tracking_info["out_delivery"],
      Delivered: tracking_info["delivery_date"],
    };

    var date_time_value =
      data_status[shipping_process[tracking_info["status"]]];
    date_time.innerHTML = get_string_date(date_time_value[0])[0];

    if (tracking_info["status"] < 4) {
      track_id_data.innerHTML = "Not delivered";
      track_id_data.style.color = "#fe6b2b";

      status_icon.src = "clock.png";
    } else {
      track_id_data.innerHTML =
        "Delivered on " + tracking_info["delivery_date"][0];
      track_id_data.style.color = "#329c6c";

      status_icon.src = "check.png";
    }

    // MAKE HIDES
    if (window.matchMedia("(max-width: 850px)").matches) {
      document.getElementById("complex").style.display = "block";
      document.getElementById("summary").style.display = "block";
      document.getElementById("no-result").style.display = "none";
    } else {
      document.getElementById("complex").style.display = "block";
      document.getElementById("no-result").style.display = "none";
    }
  } else {
    if (window.matchMedia("(max-width: 850px)").matches) {
      document.getElementById("no-result").style.display = "block";
      document.getElementById("summary").style.display = "none";
    } else {
      track_id_data.style.color = "gray";
      track_id_data.innerHTML = "Not found";
      status_icon.src = "clock.png";
      document.getElementById("no-result").style.display = "none";
      document.querySelector(".date-time").innerHTML = "-";
      status_value.innerHTML = "No Inforamtion yet";
    }
  }
}
