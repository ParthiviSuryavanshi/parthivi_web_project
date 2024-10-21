const subjectsData = {
};

function updateSubjects() {
  const streamDropdown = document.getElementById("stream");
  const semesterDropdown = document.getElementById("semester");
  const subjectsDropdown = document.getElementById("subjects");

  subjectsDropdown.innerHTML = '<option value="" disabled selected>Select a subject</option>';

  const selectedStream = streamDropdown.value;
  const selectedSemester = semesterDropdown.value;

  if (selectedStream && selectedSemester) {
      const subjects = subjectsData[selectedStream][selectedSemester];
      if (subjects) {
          subjects.forEach(subject => {
              const option = document.createElement("option");
              option.value = subject;
              option.textContent = subject;
              subjectsDropdown.appendChild(option);
          });
      }
      updateTabs();
  }
}

function updateTabs() {
  const subjectsDropdown = document.getElementById("subjects");
  const selectedSubject = subjectsDropdown.value;
  const selectedStream = document.getElementById("stream").value;

  fetch("subjects.json")
      .then((response) => response.json())
      .then((data) => {
          const subjectData = data[selectedStream][selectedSubject];

          displayTabContent(subjectData);
      })
      .catch((error) => console.error("Error fetching JSON:", error));

  openTab("pyq");
}

function openTab(tabName) {
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => {
      tab.style.display = 'none';
  });
  document.getElementById(tabName).style.display = 'block';
}

function displayTabContent(subjectData) {
  const pyqContainer = document.getElementById("pyq");
  const notesContainer = document.getElementById("notes");
  const videosContainer = document.getElementById("videosList");

  pyqContainer.innerHTML = "";
  notesContainer.innerHTML = "";
  videosContainer.innerHTML = "";

  if (subjectData.pyq && subjectData.pyq.length > 0) {
      subjectData.pyq.forEach(pyq => {
          const pyqDiv = createContentDiv(pyq.title, pyq.description, pyq.pdf);
          pyqContainer.appendChild(pyqDiv);
      });
  }

  if (subjectData.notes && subjectData.notes.length > 0) {
      subjectData.notes.forEach(note => {
          const noteDiv = createContentDiv(note.title, note.description, note.pdf);
          notesContainer.appendChild(noteDiv);
      });
  }

  if (subjectData.videos && subjectData.videos.length > 0) {
      subjectData.videos.forEach(video => {
          const videoDiv = createVideoDiv(video.image, video.heading, video.description, video.youtube);
          videosContainer.appendChild(videoDiv);
      });
  }

  const activeTabId = subjectData.videos.length ? "videos" : subjectData.pyq.length ? "pyq" : "notes";
  openTab(activeTabId);
}

function createContentDiv(title, description, link) {
  const contentDiv = document.createElement("div");
  contentDiv.innerHTML = `
      <div class="content-item">
          <h3>${title}</h3>
          <a href="${link}" target="_blank">View PDF</a>
      </div>
  `;
  return contentDiv;
}

function createVideoDiv(image, heading, description, youtubeLink) {
  const videoDiv = document.createElement("div");
  videoDiv.innerHTML = `
      <div class="video-item">
          <img class="video-image" src="${image}" alt="${heading} Image" />
          <div class="video-details">
              <h3>${heading}</h3>
              <p>${description}</p>
              <a href="${youtubeLink}" target="_blank">Watch Video</a>
          </div>
      </div>
  `;
  return videoDiv;
}

updateSubjects();
