# 🛒 Checkout Counter Simulation

Simulates multiple checkout counters. Each new customer (with item count) is added to the counter with the fewest total items.

---

## 💡 How It Works

- Counters and customers are tracked using arrays.
- The least loaded counter is found with a linear scan.
- The UI updates dynamically with DOM manipulation.
- The updated counter is briefly highlighted; the first customer is marked in red.

---

## ⏱ Time Complexity

- Find counter: **O(n)**
- Add item: **O(1)**
- Update UI: **O(n × m)**  
  (`n` = counters, `m` = customers per counter)

---

## 📌 Assumptions

- Fixed number of counters.
- Input is a valid positive integer.

