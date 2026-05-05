const API = "http://localhost:3000/applicants";

async function loadApplicants() {
  const tbody = document.getElementById("table-body");
  try {
    const res = await fetch(API);
    const data = await res.json();

    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="19">No applicants found.</td></tr>`;
      return;
    }

    tbody.innerHTML = data.map((a, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${a.full_name || ""}</td>
        <td>${a.mobile_number || ""}</td>
        <td>${a.email_id || ""}</td>
        <td>${a.applying_for_position || ""}</td>
        <td>${a.state || ""}</td>
        <td>${a.city || ""}</td>
        <td>${a.location || ""}</td>
        <td>${a.dob ? a.dob.split("T")[0] : ""}</td>
        <td>${a.age || ""}</td>
        <td>${a.gender || ""}</td>
        <td>${a.total_experience || ""}</td>
        <td>${a.relevant_experience || ""}</td>
        <td>${a.current_salary || ""}</td>
        <td>${a.expected_salary || ""}</td>
        <td>${a.qualification || ""}</td>
        <td>${a.notice_period || ""}</td>
        <td>${a.resume_link ? `<a href="${a.resume_link}" target="_blank">View</a>` : "N/A"}</td>
        <td>${new Date(a.created_at).toLocaleDateString()}</td>
      </tr>
    `).join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="19">Error loading data.</td></tr>`;
    console.error(err);
  }
}

loadApplicants();
