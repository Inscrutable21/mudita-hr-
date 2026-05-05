// Paste this in Google Sheet → Extensions → Apps Script
// Set trigger: onFormSubmit → From spreadsheet → On form submit

function onFormSubmit(e) {
  var values = e.namedValues;

  var payload = {
    full_name:              values["Full Name"] ? values["Full Name"][0] : "",
    mobile_number:          values["Mobile Number"] ? values["Mobile Number"][0] : "",
    email_id:               values["Email ID"] ? values["Email ID"][0] : "",
    applying_for_position:  values["Applying for Position"] ? values["Applying for Position"][0] : "",
    state:                  values["State"] ? values["State"][0] : "",
    city:                   values["City"] ? values["City"][0] : "",
    location:               values["Location"] ? values["Location"][0] : "",
    dob:                    values["DOB"] ? values["DOB"][0] : "",
    age:                    values["Age"] ? values["Age"][0] : "",
    gender:                 values["Gender"] ? values["Gender"][0] : "",
    total_experience:       values["Total Experience"] ? values["Total Experience"][0] : "",
    relevant_experience:    values["Relevant Experience"] ? values["Relevant Experience"][0] : "",
    current_salary:         values["Current Salary"] ? values["Current Salary"][0] : "",
    expected_salary:        values["Expected Salary"] ? values["Expected Salary"][0] : "",
    qualification:          values["Qualification"] ? values["Qualification"][0] : "",
    notice_period:          values["Notice Period"] ? values["Notice Period"][0] : "",
    resume_link:            values["Resume"] ? values["Resume"][0] : ""
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  // Replace with your actual backend URL (use ngrok if running locally)
  var webhookUrl = "https://mousiness-evidence-ragweed.ngrok-free.dev -> http://localhost:3000";

  UrlFetchApp.fetch(webhookUrl, options);
}
