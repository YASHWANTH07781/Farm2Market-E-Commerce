

/*Weekly deals increment*/

  document.addEventListener("DOMContentLoaded", function () {
    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");
    const quantityInputs = document.querySelectorAll(".qty");

    incrementButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let currentValue = parseInt(quantityInputs[index].value);
            quantityInputs[index].value = currentValue + 1;
        });
    });

    decrementButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            let currentValue = parseInt(quantityInputs[index].value);
            if (currentValue > 1) {
                quantityInputs[index].value = currentValue - 1;
            }
        });
    });
  });

  
function increment() {
    let qty = document.getElementById("quantityValue");
    qty.value = parseInt(qty.value) + 1;
}

function decrement() {
    let qty = document.getElementById("quantityValue");
    if (qty.value > 1) {
        qty.value = parseInt(qty.value) - 1;
    }
}
