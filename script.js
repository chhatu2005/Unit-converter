
const category = document.getElementById("category")
const inputValue = document.getElementById("inputValue")
const fromUnit = document.getElementById("fromUnit")
const toUnit = document.getElementById("toUnit")
const result = document.getElementById("result")
const resetBtn = document.getElementById("resetBtn")

// Conversion factors relative to a base unit
const units = {
    length: {
        Meter: 1,
        Kilometer: 1000,
        Feet: 0.3048,
        Mile: 1609.344
    },

    weight: {
        Kilogram: 1,
        Gram: 0.001,
        Pound: 0.45359237,
        Ounce: 0.028349523125
    }
}

// Load units into dropdowns
function loadUnits() {
    const selectedCategory = category.value;
    const unitNames = Object.keys(units[selectedCategory]);

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    unitNames.forEach((unit) => {
        fromUnit.innerHTML +=
            `<option value="${unit}">${unit}</option>`;

        toUnit.innerHTML +=
            `<option value="${unit}">${unit}</option>`;
    });

    // Set different default units
    toUnit.selectedIndex = 1;

    convert();
}

// Convert units
function convert() {
    const value = parseFloat(inputValue.value);

    if (inputValue.value.trim() === "" || isNaN(value)) {
        result.innerText = "0";
        return;
    }

    const selectedCategory = category.value;

    const fromFactor = units[selectedCategory][fromUnit.value];
    const toFactor = units[selectedCategory][toUnit.value];

    // Convert to base unit, then to target unit
    const baseValue = value * fromFactor;
    const convertedValue = baseValue / toFactor;

    result.innerText = Number(convertedValue.toFixed(4)).toString();
}

// Reset all fields
function resetConverter() {
    inputValue.value = "";
    result.innerText = "0";
    category.value = "length";
    loadUnits();
}

// Event listeners
category.addEventListener("change", loadUnits);
inputValue.addEventListener("input", convert);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);
resetBtn.addEventListener("click", resetConverter);

// Initialize converter
loadUnits();
