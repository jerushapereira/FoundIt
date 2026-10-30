const sampleItems = [
  { id: 101, name: "Blue water bottle", location: "Science building, Room 204", type: "Lost", returned: false, sample: true },
  { id: 102, name: "Canvas pencil case", location: "Central library, ground floor", type: "Found", returned: false, sample: true },
  { id: 103, name: "Black umbrella", location: "Student centre entrance", type: "Found", returned: true, sample: true }
];

let items = [...sampleItems];
let nextId = 104;

const registryGroups = document.querySelector("#registry-groups");
const searchEmpty = document.querySelector("#search-empty");
const foundList = document.querySelector("#found-list");
const lostList = document.querySelector("#lost-list");
const foundCount = document.querySelector("#found-count");
const lostCount = document.querySelector("#lost-count");
const searchInput = document.querySelector("#search-input");
const registryCount = document.querySelector("#registry-count");
const searchSummary = document.querySelector("#search-summary");
const itemForm = document.querySelector("#item-form");
const formFeedback = document.querySelector("#form-feedback");

function renderItems() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleItems = items.filter((item) =>
    String(item.id).includes(query) || item.name.toLowerCase().includes(query)
  );

  registryCount.textContent = `${items.length} ${items.length === 1 ? "entry" : "entries"}`;
  searchSummary.textContent = query ? `${visibleItems.length} matching ${visibleItems.length === 1 ? "entry" : "entries"}` : "";
  const noSearchMatches = query && visibleItems.length === 0;
  registryGroups.hidden = noSearchMatches;
  searchEmpty.hidden = !noSearchMatches;

  const foundItems = visibleItems.filter((item) => item.type === "Found");
  const lostItems = visibleItems.filter((item) => item.type === "Lost");
  renderGroup(foundList, foundItems, "Found", query);
  renderGroup(lostList, lostItems, "Lost", query);
  foundCount.textContent = `${foundItems.length} ${foundItems.length === 1 ? "item" : "items"}`;
  lostCount.textContent = `${lostItems.length} ${lostItems.length === 1 ? "item" : "items"}`;
}

function renderGroup(list, groupItems, groupName, query) {
  list.replaceChildren();

  if (groupItems.length === 0) {
    const message = document.createElement("p");
    message.className = "group-empty";
    message.textContent = query ? `No matching ${groupName.toLowerCase()} items.` : `No ${groupName.toLowerCase()} items listed yet.`;
    list.append(message);
    return;
  }

  groupItems.forEach((item) => list.append(createItemCard(item)));
}

function createItemCard(item) {
  const card = document.createElement("article");
  card.className = "item-card";

  const top = document.createElement("div");
  top.className = "item-card-top";
  const identity = document.createElement("div");
  const id = document.createElement("div");
  id.className = "item-id";
  id.textContent = `ID ${item.id}${item.sample ? " · SAMPLE" : ""}`;
  const name = document.createElement("h3");
  name.className = "item-name";
  name.textContent = item.name;
  identity.append(id, name);

  const type = document.createElement("span");
  type.className = `badge ${item.type === "Lost" ? "badge-lost" : "badge-found"}`;
  type.textContent = item.type;
  top.append(identity, type);

  const detail = document.createElement("div");
  detail.className = "item-detail";
  const location = document.createElement("span");
  const locationLabel = document.createElement("span");
  locationLabel.className = "detail-label";
  locationLabel.textContent = "Location";
  const locationValue = document.createElement("span");
  locationValue.textContent = item.location;
  location.append(locationLabel, locationValue);
  detail.append(location);

  const bottom = document.createElement("div");
  bottom.className = "item-card-bottom";
  const status = document.createElement("span");
  status.className = `item-status${item.returned ? " returned" : ""}`;
  status.textContent = item.returned ? "Returned" : "Not returned";

  const actions = document.createElement("div");
  actions.className = "item-actions";
  const returnButton = document.createElement("button");
  returnButton.className = "text-button";
  returnButton.type = "button";
  returnButton.textContent = item.returned ? "Marked returned" : "Mark returned";
  returnButton.disabled = item.returned;
  returnButton.setAttribute("aria-label", item.returned ? `Item ${item.id} is already marked returned` : `Mark ${item.name} as returned`);
  returnButton.addEventListener("click", () => {
    item.returned = true;
    item.type = "Found";
    renderItems();
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "text-button delete";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete ${item.name}`);
  deleteButton.addEventListener("click", () => {
    items = items.filter((candidate) => candidate.id !== item.id);
    renderItems();
  });

  actions.append(returnButton, deleteButton);
  bottom.append(status, actions);
  card.append(top, detail, bottom);
  return card;
}

function showFieldError(field, message) {
  const error = document.querySelector(`#${field}-error`);
  error.textContent = message;
}

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#item-name");
  const locationInput = document.querySelector("#item-location");
  const name = nameInput.value.trim();
  const location = locationInput.value.trim();
  let valid = true;

  showFieldError("name", "");
  showFieldError("location", "");
  formFeedback.textContent = "";
  formFeedback.classList.remove("error");

  if (!name) {
    showFieldError("name", "Enter an item name.");
    valid = false;
  }
  if (!location) {
    showFieldError("location", "Enter where the item was lost or found.");
    valid = false;
  }
  if (!valid) {
    formFeedback.textContent = "Please fix the highlighted fields.";
    formFeedback.classList.add("error");
    return;
  }

  const type = itemForm.querySelector('input[name="type"]:checked').value;
  items.unshift({ id: nextId, name, location, type, returned: false, sample: false });
  formFeedback.textContent = `Added to this demo registry with ID ${nextId}.`;
  nextId += 1;
  itemForm.reset();
  renderItems();
});

searchInput.addEventListener("input", renderItems);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderItems();
