let totalItemsPerCounter = [5, 6, 7];
let customerItemsPerCounter = [
  [2, 3],
  [3, 3],
  [4, 3],
];

renderCounters();

function addCustomerToCheckout() {
  const itemCount = parseInt(document.getElementById("itemCount").value);
  const targetCounterIndex = findLeastLoadedCounter();

  totalItemsPerCounter[targetCounterIndex] += itemCount;
  customerItemsPerCounter[targetCounterIndex].push(itemCount);

  renderCounters(targetCounterIndex);
}

function findLeastLoadedCounter() {
  return totalItemsPerCounter.reduce(
    (minIdx, current, idx, arr) => (current < arr[minIdx] ? idx : minIdx),
    0
  );
}

function renderCounters(highlightedIndex = -1) {
  const countersContainer = document.getElementById("counters");
  countersContainer.innerHTML = "";

  for (let counterIndex = 0; counterIndex < totalItemsPerCounter.length; counterIndex++) {
    const counterElement = createCounterElement(counterIndex, highlightedIndex === counterIndex);
    countersContainer.appendChild(counterElement);
  }
}

function createCounterElement(counterIndex, shouldHighlight = false) {
  const counterDiv = document.createElement("div");
  counterDiv.classList.add("counter");

  if (shouldHighlight) {
    counterDiv.classList.add("highlight");
    setTimeout(() => counterDiv.classList.remove("highlight"), 1000);
  }

  const headerRow = createHeaderRow(counterIndex);
  const itemListDiv = createItemList(counterIndex);
  const totalItemsDiv = createTotalItemsDiv(counterIndex);

  counterDiv.appendChild(headerRow);
  counterDiv.appendChild(itemListDiv);
  counterDiv.appendChild(totalItemsDiv);

  return counterDiv;
}

function createHeaderRow(counterIndex) {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("info-row");

  const counterTitle = document.createElement("h3");
  counterTitle.textContent = `Counter ${counterIndex + 1}`;

  const customerCount = document.createElement("div");
  customerCount.classList.add("customers");
  customerCount.textContent = `👥 ${customerItemsPerCounter[counterIndex].length} Customers`;

  headerDiv.appendChild(counterTitle);
  headerDiv.appendChild(customerCount);

  return headerDiv;
}

function createItemList(counterIndex) {
  const itemListDiv = document.createElement("div");
  itemListDiv.classList.add("item-list");

  for (let customerIndex = 0; customerIndex < customerItemsPerCounter[counterIndex].length; customerIndex++) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const itemSpan = document.createElement("span");
    itemSpan.innerHTML = `🛒 ${customerItemsPerCounter[counterIndex][customerIndex]} items`;
    itemDiv.appendChild(itemSpan);

    if (customerIndex === 0) {
      const redIndicator = document.createElement("span");
      redIndicator.textContent = "—";
      redIndicator.style.color = "red";
      redIndicator.style.fontWeight = "bold";
      redIndicator.style.marginLeft = "auto";
      redIndicator.classList.add("red-mark");

      itemDiv.style.display = "flex";
      itemDiv.style.justifyContent = "space-between";
      itemDiv.appendChild(redIndicator);
    }

    itemListDiv.appendChild(itemDiv);
  }

  return itemListDiv;
}

function createTotalItemsDiv(counterIndex) {
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total");
  totalDiv.textContent = `Total ${totalItemsPerCounter[counterIndex]} items`;
  return totalDiv;
}
