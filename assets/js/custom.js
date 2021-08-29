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