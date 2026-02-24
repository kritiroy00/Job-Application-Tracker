const totalEl = document.getElementById("total");
const interviewEl = document.getElementById("thrivingCount");
const rejectedEl = document.getElementById("strugglingCount");
const countJob = document.querySelector(".count-job");

const allSection = document.getElementById("allCards");
const interviewSection = document.getElementById("interviewCards");
const rejectedSection = document.getElementById("rejectedCards");

const allBtn = document.getElementById("all-filter-btn");
const interviewBtn = document.getElementById("thriving-filter-btn");
const rejectedBtn = document.getElementById("struggling-filter-btn");

let currentTab = "all";

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.dataset.status = "all";
});


function updateCounts() {
  const allCards = document.querySelectorAll(".card");
  const interviewCards = [...allCards].filter(c => c.dataset.status === "interview");
  const rejectedCards = [...allCards].filter(c => c.dataset.status === "rejected");

  totalEl.textContent = allCards.length;
  interviewEl.textContent = interviewCards.length;
  rejectedEl.textContent = rejectedCards.length;

  if (currentTab === "all") countJob.textContent = `${allCards.length} of ${allCards.length} jobs`;
  if (currentTab === "interview") countJob.textContent = `${interviewCards.length} of ${allCards.length} jobs`;
  if (currentTab === "rejected") countJob.textContent = `${rejectedCards.length} of ${allCards.length} jobs`;
}


function handleEmptyState(section) {
  const cardsInSection = [...section.children].filter(c => c.classList.contains("card"));

  const emptyDiv = section.querySelector(".empty-state");
  if (emptyDiv) emptyDiv.remove();

  if (cardsInSection.length === 0) {
    const div = document.createElement("div");
    div.className = "empty-state flex flex-col items-center justify-center py-10 text-gray-500";
    div.innerHTML = `
      <img src="./jobs.png" alt="No jobs available" class="w-40 h-40 mb-4 opacity-80">
      <p class="text-lg font-semibold">No jobs available</p>
      <p class="text-sm">Check back soon for new job opportunities</p>
    `;
    section.appendChild(div);
  }
}


function changeStatus(card, newStatus) {
  const badge = card.querySelector(".Status div");

  if (card.dataset.status === "interview" && newStatus === "rejected") {
    interviewSection.removeChild(card);
  } else if (card.dataset.status === "rejected" && newStatus === "interview") {
    rejectedSection.removeChild(card);
  } else if (card.dataset.status === "all") {
    allSection.removeChild(card);
  }

  card.dataset.status = newStatus;

  if (newStatus === "interview") {
    badge.textContent = "INTERVIEW";
    badge.className = "INTERVIEW inline-block bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded";
    interviewSection.appendChild(card);
  } else if (newStatus === "rejected") {
    badge.textContent = "REJECTED";
    badge.className = "REJECTED inline-block bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded";
    rejectedSection.appendChild(card);
  }

  updateCounts();
  handleEmptyState(interviewSection);
  handleEmptyState(rejectedSection);
}

cards.forEach(card => {
  const deleteBtn = card.querySelector(".btn-delete button");
  const interviewBtn = card.querySelector(".INTERVIEW-btn");
  const rejectedBtn = card.querySelector(".REJECTED-btn");

  deleteBtn.addEventListener("click", () => {
    const parentSection = card.parentElement;
    card.remove();
    updateCounts();
    handleEmptyState(interviewSection);
    handleEmptyState(rejectedSection);
  });

  interviewBtn.addEventListener("click", () => {
    changeStatus(card, "interview");
  });

  rejectedBtn.addEventListener("click", () => {
    changeStatus(card, "rejected");
  });
});

function toggleStyle(activeId) {

  document.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("bg-blue-300");
    btn.classList.add("bg-gray-300");
  });
  const activeBtn = document.getElementById(activeId);
  activeBtn.classList.remove("bg-gray-300");
  activeBtn.classList.add("bg-blue-300");

  allSection.classList.add("hidden");
  interviewSection.classList.add("hidden");
  rejectedSection.classList.add("hidden");

  if (activeId === "all-filter-btn") {
    allSection.classList.remove("hidden");
    currentTab = "all";
  } else if (activeId === "thriving-filter-btn") {
    interviewSection.classList.remove("hidden");
    currentTab = "interview";
  } else if (activeId === "struggling-filter-btn") {
    rejectedSection.classList.remove("hidden");
    currentTab = "rejected";
  }

  updateCounts();
  handleEmptyState(interviewSection);
  handleEmptyState(rejectedSection);
}

allBtn.addEventListener("click", () => toggleStyle("all-filter-btn"));
interviewBtn.addEventListener("click", () => toggleStyle("thriving-filter-btn"));
rejectedBtn.addEventListener("click", () => toggleStyle("struggling-filter-btn"));

updateCounts();
handleEmptyState(interviewSection);
handleEmptyState(rejectedSection);