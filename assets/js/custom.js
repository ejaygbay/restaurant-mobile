let menu_obj = {
    bucket_of_seafood_chowder: {
        item: "Bucket Of Seafood Chowder",
        price: 13.24,
        type: "food"
    },
    "sirloin_tips*_&_chicken_tenders_family_meal_deal": {
        item: "Sirloin Tips* & Chicken Tenders Family Meal Deal",
        price: 54.75,
        type: "food"
    },
    french_fries: {
        item: "French Fries",
        price: 5.00,
        type: "food"
    },
    gingerbread: {
        item: "Gingerbread",
        price: 4.00,
        type: "food"
    },
    fresh_strawberry_margarita: {
        item: "Fresh Strawberry Margarita",
        price: 14.00,
        type: "drink"
    },
    frozen_lemonades: {
        item: "Frozen Lemonades",
        price: 4.59,
        type: "drink"
    },
    fresh_fruit_sangria: {
        item: "Fresh Fruit Sangria",
        price: 7.39,
        type: "drink"
    },
    sparkling_refreshers: {
        item: "Sparkling Refreshers",
        price: 3.26,
        type: "drink"
    }
}

// General scripts
let triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab button'));
console.log(triggerTabList);
triggerTabList.forEach(function(triggerEl) {
    var tabTrigger = new bootstrap.Tab(triggerEl)

    triggerEl.addEventListener('click', function(event) {
        event.preventDefault()
        tabTrigger.show()
    })
})

// Next button in the table selection section
document.querySelector("#after-num-selection-btn").addEventListener("click", () => {
    hideSection("#table-num");
    showSection("#food-menu");
})

document.querySelectorAll(".table-num-card-item").forEach(ele => {
    ele.addEventListener("click", () => {
        hideSection("#table-num");
        showSection("#food-menu");
    })
})

// Next button in the menu selection section
document.querySelector("#after-menu-selection-btn").addEventListener("click", () => {
    hideSection("#food-menu");
    showSection("#order-details");
})

const hideSection = (ele) => {
    document.querySelector(ele).style = "display: none";
}

const showSection = (ele) => {
    document.querySelector(ele).style = "display: block";
}


/**
 * Food menu scripts
 */
const displayMenuItems = (items_array) => {
    let food_items = document.querySelector(`#food-menu-list`);
    let drink_items = document.querySelector(`#drinks-menu-list`);
    food_items.innerHTML = "";
    drink_items.innerHTML = "";

    items_array.forEach(ele => {
        let html = `<div class="food-menu-item">
            <label for="menu-${ele}">
                <div class="menu-item-title">${menu_obj[ele].item}</div>
                <div class="menu-item-price">$${menu_obj[ele].price}</div>
            </label>
            <div class="menu-item-selection">
                <input type="checkbox" class="form-check-input" id="menu-${ele}">
            </div>
        </div>`;

        menu_obj[ele].type === 'food' ? food_items.insertAdjacentHTML('beforeend', html) : drink_items.insertAdjacentHTML('beforeend', html);
    })
}

displayMenuItems(Object.keys(menu_obj));

document.querySelectorAll(".food-menu-item input[type=checkbox]").forEach(ele => {
    ele.addEventListener("change", (e) => {
        console.log(e.target.checked);
    })
})






/**
 * Order details
 */
document.querySelectorAll(".increase-qty").forEach(ele => {
    ele.addEventListener("click", (e) => increaseItemQuantity(e.target.parentElement.id))
})

document.querySelectorAll(".decrease-qty").forEach(ele => {
    ele.addEventListener("click", (e) => decreaseItemQuantity(e.target.parentElement.id))
})

// Increase item quantity
const increaseItemQuantity = (ele_id) => {
    let current_qty = parseInt(document.querySelector(`#${ele_id}-qty`).innerHTML);
    document.querySelector(`#${ele_id}-qty`).innerHTML = current_qty += 1;
    increasePrice(ele_id);
}

// Decrease item quantity
const decreaseItemQuantity = (ele_id) => {
    let current_qty = parseInt(document.querySelector(`#${ele_id}-qty`).innerHTML);
    if (current_qty > 1) {
        document.querySelector(`#${ele_id}-qty`).innerHTML = current_qty -= 1;
        decreasePrice(ele_id);
    }
}

// Increase price
const increasePrice = (ele_id) => {
    let current_price = parseFloat(document.querySelector(`#${ele_id}-price`).innerHTML.split("$")[1]);
    let current_qty = parseInt(document.querySelector(`#${ele_id}-qty`).innerHTML);
    let single_price = parseFloat((current_price / (current_qty - 1)).toFixed(2));
    let sum = (current_price + single_price).toFixed(2);
    document.querySelector(`#${ele_id}-price`).innerHTML = `$${sum}`;
}

// Decrease price
const decreasePrice = (ele_id) => {
    let current_price = parseFloat(document.querySelector(`#${ele_id}-price`).innerHTML.split("$")[1]);
    let current_qty = parseInt(document.querySelector(`#${ele_id}-qty`).innerHTML);
    let single_price = parseFloat((current_price / (current_qty + 1)).toFixed(2));
    let difference = (current_price - single_price).toFixed(2);
    document.querySelector(`#${ele_id}-price`).innerHTML = `$${difference}`;
}