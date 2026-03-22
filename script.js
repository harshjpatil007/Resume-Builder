// Branch Data
const branchSkills = {
    cs: ["Java", "Python", "React", "Node.js", "SQL", "Data Structures", "Git"],
    mech: ["AutoCAD", "SolidWorks", "Thermodynamics", "Ansys", "Manufacturing"],
    ece: ["Embedded Systems", "Verilog", "MATLAB", "Microcontrollers", "VLSI"],
    civil: ["Revit", "Staad Pro", "Surveying", "Estimation", "Concrete Design"]
};

// State for Projects
let projectCount = 0;

// Update Preview Helpers
const sync = (inputId, outputId) => {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputId);
    input.addEventListener('input', () => {
        output.textContent = input.value || "---";
    });
};

// Initial Syncs
sync('in-name', 'out-name');
sync('in-email', 'out-email');
sync('in-phone', 'out-phone');
sync('in-linkedin', 'out-linkedin');
sync('in-summary', 'out-summary');
sync('in-skills', 'out-skills');

// Smart Skills Logic
document.getElementById('branchSelect').addEventListener('change', function() {
    const container = document.getElementById('skill-suggestions');
    const skillsInput = document.getElementById('in-skills');
    container.innerHTML = '';
    
    if(branchSkills[this.value]) {
        branchSkills[this.value].forEach(skill => {
            const chip = document.createElement('span');
            chip.className = 'skill-chip';
            chip.textContent = `+ ${skill}`;
            chip.onclick = () => {
                const current = skillsInput.value;
                skillsInput.value = current ? `${current}, ${skill}` : skill;
                document.getElementById('out-skills').textContent = skillsInput.value;
            };
            container.appendChild(chip);
        });
    }
});

// Dynamic Projects Logic
document.getElementById('add-project-btn').onclick = () => {
    projectCount++;
    const id = projectCount;
    
    // Create Input HTML
    const inputHtml = `
        <div class="project-block" id="p-input-${id}" style="border: 1px solid #eee; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            <input type="text" placeholder="Project Title" oninput="updateProject(${id})" id="p-title-${id}">
            <textarea placeholder="Description" oninput="updateProject(${id})" id="p-desc-${id}"></textarea>
        </div>
    `;
    document.getElementById('project-inputs').insertAdjacentHTML('beforeend', inputHtml);

    // Create Preview HTML
    const previewHtml = `
        <div class="project-item" id="p-preview-${id}">
            <div class="project-title" id="out-p-title-${id}">Project Title</div>
            <div class="project-desc" id="out-p-desc-${id}">Project description...</div>
        </div>
    `;
    document.getElementById('out-projects').insertAdjacentHTML('beforeend', previewHtml);
};

function updateProject(id) {
    const title = document.getElementById(`p-title-${id}`).value;
    const desc = document.getElementById(`p-desc-${id}`).value;
    document.getElementById(`out-p-title-${id}`).textContent = title;
    document.getElementById(`out-p-desc-${id}`).textContent = desc;
}

// PDF Download Logic
document.getElementById('download-btn').onclick = () => {
    const element = document.getElementById('resume-content');
    const opt = {
        margin: 0,
        filename: 'Student_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};
// Template Switcher Logic
const templateOptions = document.querySelectorAll('.template-option');
const resumePaper = document.getElementById('resume-content');

templateOptions.forEach(option => {
    option.onclick = function() {
        // 1. Remove 'active' class from all options
        templateOptions.forEach(opt => opt.classList.remove('active'));
        
        // 2. Add 'active' class to clicked option
        this.classList.add('active');
        
        // 3. Remove all existing theme classes from the resume
        resumePaper.classList.remove('theme-blue', 'theme-dark', 'theme-green', 'theme-purple');
        
        // 4. Add the new theme class
        const selectedTheme = this.getAttribute('data-theme');
        resumePaper.classList.add(selectedTheme);
    };
});