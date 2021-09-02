let menu_obj = {
    bucket_of_seafood_chowder: {
        item: "Bucket Of Seafood Chowder",
        price: 13.24,
        type: "food"
    },
    "sirloin_tips_and_chicken_tenders_family_meal_deal": {
        item: "Sirloin Tips And Chicken Tenders Family Meal Deal",
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
let selected_menu_items = [];

// General scripts
let triggerTabList = [].slice.call(document.querySelectorAll('#nav-tab button'));
// console.log(triggerTabList);
triggerTabList.forEach(function(triggerEl) {
    var tabTrigger = new bootstrap.Tab(triggerEl)

    triggerEl.addEventListener('click', function(event) {
        event.preventDefault()
        tabTrigger.show()
    })
})

// Next button in the table selection section
document.querySelector("#table-selection-next-btn").addEventListener("click", () => {
    hideSection("#table-num");
    showSection("#food-menu");
})

// When a card number in the table selection section is clicked
document.querySelectorAll(".table-num-card-item").forEach(ele => {
    ele.addEventListener("click", () => {
        hideSection("#table-num");
        showSection("#food-menu");
    })
})

// Next button in the menu selection section
document.querySelector("#menu-selection-next-btn").addEventListener("click", () => {
    hideSection("#food-menu");
    showSection("#order-details");
    clearSearchBar();
    displayOrderSummary();
    displayOrderDetails();
})

document.querySelector("#menu-selection-previous-btn").addEventListener("click", () => {
    hideSection("#food-menu");
    showSection("#table-num");
    clearSearchBar();
})

document.querySelector("#order-details-previous-btn").addEventListener("click", () => {
    hideSection("#order-details");
    showSection("#food-menu");
    clearSearchBar();
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
// Function that will display the food and drinks menu
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
        let ele_clicked_id = e.target.id.replace("menu-", "");
        if (e.target.checked) {
            selected_menu_items.push(ele_clicked_id);
            displaySelectedMenuItems(selected_menu_items);
        } else {
            selected_menu_items.splice(selected_menu_items.indexOf(ele_clicked_id), 1);
            displaySelectedMenuItems(selected_menu_items);
        }

        showOrHideNextButton();
    })
})

const displaySelectedMenuItems = (items_arr) => {
    let selected_items = document.querySelector(`#selected-menu-list`);
    selected_items.innerHTML = "";

    items_arr.forEach(ele => {
        let html = `<div class="food-menu-item" id="selected-${ele}">
            <div class="food-detail">
                <div class="menu-item-title">${menu_obj[ele].item}</div>
                <div class="menu-item-price">$${menu_obj[ele].price}</div>
            </div>
            <div class="menu-item-selection">
                <div>
                    <i id="remove-${ele}" class="mdi mdi-close-box-outline remove"></i>
                </div>
            </div>
        </div>`;

        selected_items.insertAdjacentHTML('beforeend', html);
    })

    // function to remove selected item from the list
    document.querySelectorAll(".remove").forEach(ele => {
        ele.addEventListener("click", function() {
            let remove_id = this.id.replace("remove-", "");
            document.querySelector(`#selected-${remove_id}`).style = "display: none";
            selected_menu_items.splice(selected_menu_items.indexOf(remove_id), 1);
            document.querySelector(`#menu-${remove_id}`).checked = false;
            showOrHideNextButton();
        })
    })
}

const showOrHideNextButton = () => {
    if (selected_menu_items.length < 1) {
        document.querySelector("#menu-selection-next-btn").style = "display: none";
    } else {
        document.querySelector("#menu-selection-next-btn").style = "display: block";
    }
}

document.querySelector("#search").addEventListener("keyup", (e) => {
    let search_text = document.querySelector("#search").value.toUpperCase();
    filterMenuItems(search_text);
})

const filterMenuItems = (text_to_find) => {
    let menu_item_title = document.querySelectorAll(".menu-item-title");
    let menu_item_price = document.querySelectorAll(".menu-item-price");

    menu_item_title.forEach(ele => {
        if (ele.textContent.toUpperCase().includes(text_to_find)) {
            ele.parentNode.parentNode.style = "visibility: visible;";
        } else {
            ele.parentNode.parentNode.style = "visibility: hidden; display: none;";
        }
    })

    menu_item_price.forEach(ele => {
        if (ele.textContent.toUpperCase().includes(text_to_find)) {
            ele.parentNode.parentNode.style = "visibility: visible;";
        }
    })
}

const clearSearchBar = () => {
    document.querySelector("#search").value = "";
    filterMenuItems("");
}


/**
 * Order details
 */
const displayOrderSummary = () => {
    document.querySelector("#total-items").innerHTML = selected_menu_items.length;
    let total_amount = 0;
    selected_menu_items.forEach(ele => {
        total_amount += menu_obj[ele].price;
    })
    document.querySelector("#order-details-grand-total").innerHTML = `$${total_amount.toFixed(2)}`;
}

const displayOrderDetails = () => {
    let order_details = document.querySelector("#order-details-items");
    order_details.innerHTML = "";

    selected_menu_items.forEach(ele => {
        let html = `<div class="card mt-2">
            <div class="card-body">
                <div class="order-details order-detail-item">
                    <h5>Item</h5>
                    <span>:</span>
                    <p>${menu_obj[ele].item}</p>
                </div>
                <div class="order-details order-detail-qty">
                    <h5>Qty</h5>
                    <span>:</span>
                    <p id="order-details-${ele}">
                        <span class="btn btn-light decrease-qty">─</span>
                        <span id="order-details-${ele}-qty">1</span>
                        <span class="btn btn-light increase-qty">+</span>
                    </p>
                </div>
                <div class="order-details order-detail-price">
                    <h5>Price</h5>
                    <span>:</span>
                    <p id="order-details-${ele}-price">$${menu_obj[ele].price}</p>
                </div>
            </div>
        </div>`;
        order_details.insertAdjacentHTML('beforeend', html);
    })

    document.querySelectorAll(".increase-qty").forEach(ele => {
        ele.addEventListener("click", (e) => increaseItemQuantity(e.target.parentElement.id))
    })

    document.querySelectorAll(".decrease-qty").forEach(ele => {
        ele.addEventListener("click", (e) => decreaseItemQuantity(e.target.parentElement.id))
    })
}

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
    increaseGrandTotal(single_price);
}

// Decrease price
const decreasePrice = (ele_id) => {
    let current_price = parseFloat(document.querySelector(`#${ele_id}-price`).innerHTML.split("$")[1]);
    let current_qty = parseInt(document.querySelector(`#${ele_id}-qty`).innerHTML);
    let single_price = parseFloat((current_price / (current_qty + 1)).toFixed(2));
    let difference = (current_price - single_price).toFixed(2);
    document.querySelector(`#${ele_id}-price`).innerHTML = `$${difference}`;
    decreaseGrandTotal(single_price);
}

const increaseGrandTotal = (amount) => {
    let grand_total_ele = document.querySelector("#order-details-grand-total");
    let current_grand_total = parseFloat(grand_total_ele.innerHTML.split("$")[1]);
    let new_grand_total = (current_grand_total + amount).toFixed(2);
    grand_total_ele.innerHTML = `$${new_grand_total}`;
}

const decreaseGrandTotal = (amount) => {
    let grand_total_ele = document.querySelector("#order-details-grand-total");
    let current_grand_total = parseFloat(grand_total_ele.innerHTML.split("$")[1]);
    let new_grand_total = (current_grand_total - amount).toFixed(2);
    grand_total_ele.innerHTML = `$${new_grand_total}`;
}

document.querySelector("#order-details-order-btn").addEventListener("click", () => {
    let grand_total = document.querySelector("#order-details-grand-total").innerHTML;

    Swal.fire({
        title: `This order will cost you <h2 style="font-size: 50px">${grand_total}</h2>`,
        showCancelButton: true,
        confirmButtonText: `Confirm Order`,
        cancelButtonText: `Cancel`,
        confirmButtonColor: `green`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your order has been placed',
                showConfirmButton: false,
                timer: 2000
            })

            hideSection("#order-details");
            showSection("#table-num");
            restartOrder();
        }
    })
})

const restartOrder = () => {
    selected_menu_items.forEach(ele => {
        document.querySelector(`#menu-${ele}`).checked = false;
    })

    selected_menu_items = [];
    displaySelectedMenuItems(selected_menu_items);
    showOrHideNextButton();
    clearSearchBar();

    document.querySelectorAll(".restaurant-menu").forEach(ele => {
        if (ele.classList.contains("active")) {
            ele.classList.remove("active");
            ele.classList.remove("show");
        }
    })
    document.querySelector("#nav-food-tab").classList.add("active");
    document.querySelector("#nav-food").classList.add("active");
    document.querySelector("#nav-food").classList.add("show");
}