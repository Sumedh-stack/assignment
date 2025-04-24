let sumList = [5, 6, 7];
let checkoutList = [
  [2, 3],
  [3, 3],
  [4, 3],
];

updatePage();

function addItemtocheckout() {
  const items = parseInt(document.getElementById("itemCount").value);
  const minIndex = getCounterWithMinimumItems();
  sumList[minIndex] += items;
  checkoutList[minIndex].push(items);
  updatePage(minIndex);
}

function getCounterWithMinimumItems() {
  return sumList.reduce(
    (minIdx, current, idx, arr) => (current < arr[minIdx] ? idx : minIdx),
    0
  );
}

function updatePage(highlightIndex = -1) {
  const countersDiv = document.getElementById("counters");
  countersDiv.innerHTML = "";

  for (let i = 0; i < sumList.length; i++) {
    const counterDiv = createCounterElement(i, highlightIndex === i);
    countersDiv.append(counterDiv);
  }
}

function createCounterElement(index, highlight = false) {
  const counterDiv = document.createElement("div");
  counterDiv.classList.add("counter");

  if (highlight) {
    counterDiv.classList.add("highlight");
    setTimeout(() => counterDiv.classList.remove("highlight"), 1000);
  }

  const infoRow = createInfoRow(index);
  const itemListDiv = createItemList(index);
  const totalDiv = createTotalDiv(index);

  counterDiv.append(infoRow);
  counterDiv.append(itemListDiv);
  counterDiv.append(totalDiv);

  return counterDiv;
}

function createInfoRow(index) {
  const infoRow = document.createElement("div");
  infoRow.classList.add("info-row");

  const h2Element = document.createElement("h3");
  h2Element.textContent = `Counter ${index + 1}`;

  const customerDiv = document.createElement("div");
  customerDiv.classList.add("customers");
  customerDiv.textContent = `👥 ${checkoutList[index].length} Customers`;

  infoRow.appendChild(h2Element);
  infoRow.appendChild(customerDiv);

  return infoRow;
}

function createItemList(index) {
  const itemListDiv = document.createElement("div");
  itemListDiv.classList.add("item-list");

  for (let j = 0; j < checkoutList[index].length; j++) {
    const item = document.createElement("div");
    item.classList.add("item");

    const span = document.createElement("span");
    span.innerHTML = `🛒 ${checkoutList[index][j]} items`;
    item.appendChild(span);

    if (j === 0) {
      const redMark = document.createElement("span");
      redMark.textContent = "—";
      redMark.style.color = "red";
      redMark.style.fontWeight = "bold";
      redMark.style.marginLeft = "auto";
      redMark.classList.add("red-mark");

      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.appendChild(redMark);
    }

    itemListDiv.appendChild(item);
  }

  return itemListDiv;
}

function createTotalDiv(index) {
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total");
  totalDiv.textContent = `Total ${sumList[index]} items`;
  return totalDiv;
}
