const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Cache for exchange rates (5 minutes cache)
let rateCache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Populate currency dropdowns
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate(); // Auto-update when currency changes
  });
}

const updateExchangeRate = async () => {
  try {
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
    
    // Validate input
    if (isNaN(amtVal) || amtVal <= 0) {
      amtVal = 1;
      amount.value = "1";
    }

    // Show loading state
    btn.disabled = true;
    btn.innerText = "Loading...";
    msg.innerText = "Fetching exchange rate...";
    msg.style.color = "#666";

    // Check cache first
    const cacheKey = `${fromCurr.value}-${toCurr.value}`;
    const now = Date.now();
    
    let rate;
    
    if (rateCache[cacheKey] && (now - rateCache[cacheKey].timestamp < CACHE_DURATION)) {
      // Use cached rate
      rate = rateCache[cacheKey].rate;
      console.log("Using cached rate");
    } else {
      // Fetch fresh rate
      const URL = `${BASE_URL}/${fromCurr.value.toUpperCase()}`;
      let response = await fetch(URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      let data = await response.json();
      rate = data.rates[toCurr.value.toUpperCase()];
      
      if (!rate) {
        throw new Error("Currency rate not found");
      }

      // Cache the rate
      rateCache[cacheKey] = {
        rate: rate,
        timestamp: now
      };
    }

    // Calculate and display result
    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    msg.style.color = "#000";
    
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "❌ Failed to fetch exchange rate. Please try again.";
    msg.style.color = "#e53e3e";
  } finally {
    // Reset button state
    btn.disabled = false;
    btn.innerText = "Get Exchange Rate";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Update on button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Update on amount input change (with debounce)
let inputTimeout;
document.querySelector(".amount input").addEventListener("input", () => {
  clearTimeout(inputTimeout);
  inputTimeout = setTimeout(() => {
    updateExchangeRate();
  }, 500); // Wait 500ms after user stops typing
});

// Initial load
window.addEventListener("load", () => {
  updateExchangeRate();
});