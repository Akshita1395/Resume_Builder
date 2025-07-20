let sectionCount = 0;
let customFieldCount = 0;
let resumeData = {};

// Ensure modals are hidden on page load
window.addEventListener('load', () => {
  try {
    const formModal = document.getElementById("formModal");
    const previewModal = document.getElementById("previewModal");
    if (formModal) formModal.style.display = "none";
    if (previewModal) previewModal.style.display = "none";
    console.log("Modals hidden on page load");
  } catch (error) {
    console.error("Error on page load:", error);
  }
});

// Toggles between light and dark themes
function toggleTheme() {
  try {
    const body = document.body;
    if (!body) {
      console.error("Body element not found");
      alert("Error: Cannot toggle theme. Page structure is broken.");
      return;
    }
    body.classList.toggle("light");
    body.classList.toggle("dark");
    console.log("Theme toggled successfully");
  } catch (error) {
    console.error("Error in toggleTheme:", error);
    alert("Error toggling theme. Please check the console.");
  }
}

// Opens the resume input modal and initializes the first form section
function openForm() {
  try {
    const modal = document.getElementById("formModal");
    if (!modal) {
      console.error("Modal element not found");
      alert("Error: Modal not found. Please check the HTML.");
      return;
    }
    modal.style.display = "flex"; // Use flex to match CSS centering
    const formFields = document.getElementById("formFields");
    if (formFields) {
      formFields.innerHTML = ""; // Clear previous
      sectionCount = 0;
      customFieldCount = 0;
      createFormBlock(); // Add first section
    } else {
      console.error("Form fields container not found");
      alert("Error: Form fields container not found.");
    }
  } catch (error) {
    console.error("Error in openForm:", error);
    alert("Error opening form. Please check the console.");
  }
}

// Closes the form modal
function closeForm() {
  try {
    const modal = document.getElementById("formModal");
    if (!modal) {
      console.error("Modal element not found");
      return;
    }
    modal.style.display = "none";
  } catch (error) {
    console.error("Error in closeForm:", error);
    alert("Error closing form. Please check the console.");
  }
}

// Closes the preview modal
function closePreview() {
  try {
    const previewModal = document.getElementById("previewModal");
    if (!previewModal) {
      console.error("Preview modal element not found");
      return;
    }
    previewModal.style.display = "none";
  } catch (error) {
    console.error("Error in closePreview:", error);
    alert("Error closing preview. Please check the console.");
  }
}

// Creates the initial form section with full resume details
function createFormBlock() {
  try {
    sectionCount++;
    const formContainer = document.getElementById("formFields");
    if (!formContainer) {
      console.error("Form fields container not found");
      return;
    }
    const block = document.createElement("div");
    block.className = "form-block";
    block.setAttribute("data-type", "resume");
    block.innerHTML = `
      <label for="name${sectionCount}">Name</label>
      <input type="text" id="name${sectionCount}" placeholder="e.g., John Doe" required />
      <label for="email${sectionCount}">Email</label>
      <input type="email" id="email${sectionCount}" placeholder="e.g., john@example.com" required />
      <label for="phone${sectionCount}">Phone</label>
      <input type="text" id="phone${sectionCount}" placeholder="e.g., +91-XXXXX-XXXXX" />
      <label for="education${sectionCount}">Education</label>
      <textarea id="education${sectionCount}" placeholder="e.g., B.Tech in Computer Science from XYZ University"></textarea>
      <label for="experience${sectionCount}">Experience</label>
      <textarea id="experience${sectionCount}" placeholder="e.g., 2 years at ABC Corp as Frontend Developer"></textarea>
      <label for="skills${sectionCount}">Skills</label>
      <input type="text" id="skills${sectionCount}" placeholder="e.g., JavaScript, Python, React" />
      <span id="error${sectionCount}" class="form-error">Please fill in Name and a valid Email.</span>
    `;
    formContainer.appendChild(block);
  } catch (error) {
    console.error("Error in createFormBlock:", error);
    alert("Error creating form section. Please check the console.");
  }
}

// Creates a custom field section with a user-defined label and textarea
function createCustomField(fieldName) {
  try {
    customFieldCount++;
    const formContainer = document.getElementById("formFields");
    if (!formContainer) {
      console.error("Form fields container not found");
      return;
    }
    const block = document.createElement("div");
    block.className = "form-block";
    block.setAttribute("data-type", "custom");
    block.setAttribute("data-field-name", fieldName);
    block.innerHTML = `
      <label for="custom${customFieldCount}">${fieldName}</label>
      <textarea id="custom${customFieldCount}" placeholder="Enter details for ${fieldName}"></textarea>
      <span id="errorCustom${customFieldCount}" class="form-error">Custom field name cannot be empty.</span>
    `;
    formContainer.appendChild(block);
  } catch (error) {
    console.error("Error in createCustomField:", error);
    alert("Error creating custom field. Please check the console.");
  }
}

// Adds a new section (prompts for field name and adds custom field)
function addSection() {
  try {
    // Validate the last resume section (if any)
    if (sectionCount > 0) {
      const lastName = document.getElementById(`name${sectionCount}`);
      const lastEmail = document.getElementById(`email${sectionCount}`);
      if (!lastName || !lastEmail) {
        console.error("Form inputs not found for section", sectionCount);
        alert("Error: Form inputs not found.");
        return;
      }
      if (!lastName.value || !/^\S+@\S+\.\S+$/.test(lastEmail.value)) {
        alert("Please fill in the current section's Name and Email before adding another.");
        lastName.style.borderColor = lastName.value ? "#aaa" : "red";
        lastEmail.style.borderColor = /^\S+@\S+\.\S+$/.test(lastEmail.value) ? "#aaa" : "red";
        document.getElementById(`error${sectionCount}`).style.display = "block";
        return;
      }
    }

    // Prompt for custom field name
    const fieldName = prompt("Enter the name of the new field (e.g., Certifications, Projects):");
    if (!fieldName || fieldName.trim() === "") {
      alert("Field name cannot be empty.");
      return;
    }
    createCustomField(fieldName.trim());
  } catch (error) {
    console.error("Error in addSection:", error);
    alert("Error adding section. Please check the console.");
  }
}

// Updates the resume preview based on selected template
function updatePreview() {
  try {
    const previewContent = document.getElementById("previewContent");
    const template = document.getElementById("templateSelect").value;
    if (!previewContent) {
      console.error("Preview content element not found");
      alert("Error: Preview content not found.");
      return;
    }

    previewContent.className = `resume-preview ${template}`;
    let html = `
      <h3>${resumeData.resumes[0].name}</h3>
      <p>${resumeData.resumes[0].email} | ${resumeData.resumes[0].phone || "N/A"}</p>
      <hr>
    `;
    resumeData.resumes.forEach((resume, index) => {
      html += `
        <h3>Resume Section ${index + 1}</h3>
        <p><strong>Education:</strong> ${resume.education || "N/A"}</p>
        <p><strong>Experience:</strong> ${resume.experience || "N/A"}</p>
        <p><strong>Skills:</strong> ${resume.skills || "N/A"}</p>
      `;
    });
    if (resumeData.customFields.length > 0) {
      html += `<h3>Custom Sections</h3>`;
      resumeData.customFields.forEach(field => {
        html += `<p><strong>${field.fieldName}:</strong> ${field.description || "N/A"}</p>`;
      });
    }
    previewContent.innerHTML = html;
  } catch (error) {
    console.error("Error in updatePreview:", error);
    alert("Error updating preview. Please check the console.");
  }
}

// Generates a resume preview and validates form data
function submitForm() {
  try {
    const formMessage = document.getElementById("formMessage");
    if (!formMessage) {
      console.error("Form message element not found");
      alert("Error: Form message element not found.");
      return;
    }
    let isValid = true;
    resumeData = { resumes: [], customFields: [] };

    // Validate and collect data from resume sections
    for (let i = 1; i <= sectionCount; i++) {
      const nameInput = document.getElementById(`name${i}`);
      const emailInput = document.getElementById(`email${i}`);
      const phoneInput = document.getElementById(`phone${i}`);
      const educationInput = document.getElementById(`education${i}`);
      const experienceInput = document.getElementById(`experience${i}`);
      const skillsInput = document.getElementById(`skills${i}`);
      const error = document.getElementById(`error${i}`);

      if (!nameInput || !emailInput || !error) {
        console.error("Form inputs not found for section", i);
        formMessage.style.display = "block";
        formMessage.style.color = "red";
        formMessage.textContent = "Error: Form inputs missing for section " + i;
        return;
      }

      const name = nameInput.value;
      const email = emailInput.value;
      const phone = phoneInput.value;
      const education = educationInput.value;
      const experience = experienceInput.value;
      const skills = skillsInput.value;

      if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
        isValid = false;
        error.style.display = "block";
        nameInput.style.borderColor = name ? "#aaa" : "red";
        emailInput.style.borderColor = /^\S+@\S+\.\S+$/.test(email) ? "#aaa" : "red";
      } else {
        error.style.display = "none";
        nameInput.style.borderColor = "#aaa";
        emailInput.style.borderColor = "#aaa";
        resumeData.resumes.push({ name, email, phone, education, experience, skills });
      }
    }

    // Collect data from custom fields
    for (let i = 1; i <= customFieldCount; i++) {
      const customInput = document.getElementById(`custom${i}`);
      const error = document.getElementById(`errorCustom${i}`);
      if (!customInput || !error) {
        console.error("Custom field inputs not found for section", i);
        continue;
      }
      const fieldName = customInput.parentElement.getAttribute("data-field-name");
      const description = customInput.value;
      resumeData.customFields.push({ fieldName, description });
    }

    if (!isValid) {
      formMessage.style.display = "block";
      formMessage.style.color = "red";
      formMessage.textContent = "Please fill in all required fields with valid data.";
      return;
    }

    // Show preview modal
    const previewModal = document.getElementById("previewModal");
    if (!previewModal) {
      console.error("Preview modal element not found");
      alert("Error: Preview modal not found.");
      return;
    }
    formMessage.style.display = "block";
    formMessage.style.color = "green";
    formMessage.textContent = "Generating preview...";
    previewModal.style.display = "flex"; // Use flex to match CSS centering
    updatePreview();

    setTimeout(() => {
      formMessage.style.display = "none";
    }, 1000);
  } catch (error) {
    console.error("Error in submitForm:", error);
    alert("Error generating resume. Please check the console.");
  }
}

// Generates and downloads the PDF resume
function downloadPDF() {
  try {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error("jsPDF library not loaded");
      const formMessage = document.getElementById("formMessage");
      if (formMessage) {
        formMessage.style.display = "block";
        formMessage.style.color = "red";
        formMessage.textContent = "Error: PDF generation library not loaded.";
      }
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const template = document.getElementById("templateSelect").value;
    let yOffset = 10;

    // Set template-specific styles
    if (template === "modern") {
      doc.setFont("Arial", "normal");
      doc.setLineWidth(0.5);
      doc.setDrawColor(0, 102, 255);
      doc.line(10, 15, 200, 15); // Header line for modern
    } else if (template === "classic") {
      doc.setFont("Times", "normal");
      doc.setLineWidth(1);
      doc.setDrawColor(0, 0, 0);
      doc.rect(5, 5, 200, 287); // Border for classic
    } else {
      doc.setFont("Helvetica", "normal");
    }

    // Add resume sections to PDF
    resumeData.resumes.forEach((resume, index) => {
      doc.setFontSize(16);
      doc.text(`Resume Section ${index + 1}`, 10, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      doc.text(`Name: ${resume.name || "N/A"}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Email: ${resume.email || "N/A"}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Phone: ${resume.phone || "N/A"}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Education: ${resume.education || "N/A"}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Experience: ${resume.experience || "N/A"}`, 10, yOffset);
      yOffset += 10;
      doc.text(`Skills: ${resume.skills || "N/A"}`, 10, yOffset);
      yOffset += 20;

      if (yOffset > 250 && (index < resumeData.resumes.length - 1 || resumeData.customFields.length > 0)) {
        doc.addPage();
        yOffset = 10;
      }
    });

    // Add custom fields to PDF
    if (resumeData.customFields.length > 0) {
      doc.setFontSize(16);
      doc.text("Custom Sections", 10, yOffset);
      yOffset += 10;
      resumeData.customFields.forEach(field => {
        doc.setFontSize(12);
        doc.text(`${field.fieldName}: ${field.description || "N/A"}`, 10, yOffset);
        yOffset += 10;

        if (yOffset > 250) {
          doc.addPage();
          yOffset = 10;
        }
      });
    }

    const formMessage = document.getElementById("formMessage");
    if (formMessage) {
      formMessage.style.display = "block";
      formMessage.style.color = "green";
      formMessage.textContent = "Generating PDF...";
    }

    setTimeout(() => {
      doc.save("resume.pdf");
      if (formMessage) {
        formMessage.textContent = "Resume downloaded successfully!";
      }
      closePreview();
    }, 1000);
  } catch (error) {
    console.error("Error in downloadPDF:", error);
    const formMessage = document.getElementById("formMessage");
    if (formMessage) {
      formMessage.style.display = "block";
      formMessage.style.color = "red";
      formMessage.textContent = "Error generating PDF. Please try again.";
    }
  }
}