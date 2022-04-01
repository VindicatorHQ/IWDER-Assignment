const modals = document.querySelectorAll(".modal");
const storyToggle = document.querySelector("#storyToggle");
const showSpoilers = document.querySelector("#showSpoilers");
const closeStoryToggle = document.querySelector("#storyToggleClose");
const weaponDescriptionButton = document.querySelectorAll("[data-weapon-button]")
const weaponCloseButton = document.querySelectorAll("[data-weapon-close-button]")
const characterDescriptionButton = document.querySelectorAll("[data-character-button]")
const characterCloseButton = document.querySelectorAll("[data-character-close-button]")

function toggleModal(modal = "", char = "", weapon = "")
{
    if (char)
    {
        const characterBlock = document.querySelector(`[data-character=${char}]`);

        characterBlock.classList.toggle("show-modal")
        return;
    }

    if (weapon)
    {
        const weaponBlock = document.querySelector(`[data-weapon=${weapon}]`);

        weaponBlock.classList.toggle("show-modal")
        return;
    }

    if (!modal || Object.prototype.toString.call(modal) === "[object PointerEvent]")
    {
        modal = document.querySelector(".modal");
    }

    modal.classList.toggle("show-modal");
}

function windowOnClick(event)
{
    modals.forEach(modal => {
        if (event.target === modal)
        {
            toggleModal(modal, "", "");
        }
    });
}

if (showSpoilers)
{
    showSpoilers.addEventListener('change', function() {
        const spoileredContent = document.querySelectorAll("[data-story-block]");

        spoileredContent.forEach(storyBlock => {
            if (showSpoilers.checked)
            {
                storyBlock.classList.remove("blur-filter");
            }
            else
            {
                storyBlock.classList.add("blur-filter");
            }
        });

        toggleModal();
    });

    closeStoryToggle.addEventListener("click", toggleModal);
    storyToggle.addEventListener("click", toggleModal);
}

if (characterDescriptionButton)
{
    characterDescriptionButton.forEach(charButton => {
        charButton.addEventListener('click', function() {
            toggleModal("", charButton.value);
        });
    });

    characterCloseButton.forEach(charCloseButton => {
        charCloseButton.addEventListener('click', function() {
            toggleModal("", charCloseButton.getAttribute("data-character-close-button"));
        });
    });
}

if (weaponDescriptionButton)
{
    weaponDescriptionButton.forEach(weaponButton => {
        weaponButton.addEventListener('click', function() {
            toggleModal("", "", weaponButton.value);
        });
    });

    weaponCloseButton.forEach(weaponCloseButton => {
        weaponCloseButton.addEventListener('click', function() {
            toggleModal("", "", weaponCloseButton.getAttribute("data-weapon-close-button"));
        });
    });
}

window.addEventListener("click", windowOnClick);

const menu = document.querySelector(".topNav");
const menuItems = document.querySelectorAll(".navItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu()
{
    if (menu.classList.contains("showMenu"))
    {
        menu.classList.remove("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    }
    else
    {
        menu.classList.add("showMenu");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(
    function(menuItem) {
        menuItem.addEventListener("click", toggleMenu);
    }
);

const checkBoxes = document.querySelectorAll("input[type=checkbox]");

if (checkBoxes)
{
    checkBoxes.forEach(checkBox => {
        checkBox.addEventListener('change', function() {
            const cards = document.getElementsByClassName("char-container");
            const items = document.getElementsByClassName("char-item");

            Array.from(cards).forEach(card => {
                if (card.getAttribute("data-weapons") === this.getAttribute("data-weapon-sort"))
                {
                    const header = document.getElementById(card.getAttribute("data-weapons"));

                    if (this.checked)
                    {
                        card.style.display = "flex";
                        header.style.display = "block";
                    }
                    else {
                        card.style.display = "none";
                        header.style.display = "none";
                    }
                }
            });

            Array.from(items).forEach(item => {
                const data_weapon_sort = this.getAttribute("data-weapon-sort");
                const data_weapons = item.getAttribute("data-weapons");
                const data_weapon = item.getAttribute("data-weapon");

                if (data_weapons === data_weapon_sort || data_weapon === data_weapon_sort)
                {
                    if (this.checked)
                    {
                        item.style.display = "block";
                    }
                    else
                    {
                        item.style.display = "none";
                    }
                }
            });
        });
    });
}

const cartItemButtons = document.querySelectorAll("[data-shop-item-button]");
const closeCartButton = document.querySelector("[data-cart-close-button]");
const storeItems = document.querySelectorAll("[data-shop-item]");
const cartButton = document.getElementById("cartButton");
let removeCartItemButtons;
let newShoppingCart = [];
let shoppingCart = [];

if (cartItemButtons)
{
    cartItemButtons.forEach(storeItemButton => {
        storeItemButton.addEventListener("click", function () {
            storeItems.forEach(storeItem => {
                if (storeItemButton.getAttribute("data-shop-item-button") === storeItem.getAttribute("data-shop-item"))
                {
                    newShoppingCart.push(storeItem);
                }
            });
        });
    });

    cartButton.addEventListener("click", showShoppingCart);
    closeCartButton.addEventListener("click", toggleModal);
}

function createShoppingCart()
{
    if (shoppingCart !== newShoppingCart || newShoppingCart)
    {
        const cartHolder = document.getElementById("shopModal");

        newShoppingCart.forEach(cartItem => {
            const removeCartItemButton = document.createElement("section");
            const newSection = document.createElement("section");
            const newFigure = document.createElement("figure");
            const priceHeader = document.createElement("h3");
            const newHeader = document.createElement("h2");

            Array.from(cartItem.children).forEach(childItem => {
                if (childItem.outerHTML.includes("h2"))
                {
                    const headerContent = document.createTextNode(childItem.innerHTML);

                    newHeader.appendChild(headerContent);
                }

                if (childItem.outerHTML.includes("figure"))
                {
                    const newImage = document.createElement("img");

                    newImage.src = childItem.firstElementChild.src;
                    newImage.alt = childItem.firstElementChild.alt;
                    newImage.classList.add("shop-item-image");

                    newFigure.appendChild(newImage);
                }

                if (childItem.outerHTML.includes("h3"))
                {
                    if (childItem.firstElementChild !== null)
                    {
                        const headerContent = document.createTextNode(childItem.firstElementChild.innerHTML);

                        priceHeader.appendChild(headerContent);
                    }
                }
            });

            removeCartItemButton.setAttribute("data-remove-cart-item", cartItem.firstElementChild.innerHTML);
            removeCartItemButton.classList.add("remove-button");
            removeCartItemButton.textContent = "X";

            newSection.appendChild(removeCartItemButton);
            newSection.classList.add("shop-modal-item");
            newSection.appendChild(newHeader);
            newSection.appendChild(newFigure);
            newSection.appendChild(priceHeader);

            cartHolder.appendChild(newSection);
        });

        removeCartItemButtons = "";
        removeCartItemButtons = document.querySelectorAll("[data-remove-cart-item]");

        shoppingCart = newShoppingCart;
        newShoppingCart = [];
    }
}

function showShoppingCart()
{
    createShoppingCart();

    for (let i = 0; i < removeCartItemButtons.length; i++)
    {
        removeCartItemButtons[i].addEventListener("click", function ()
        {
            removeCartItemButtons[i].parentElement.style.display = "none";
            removeCartItemButtons[i].remove();
        });
    }

    toggleModal();
}

function checkout()
{
    alert("Thank you for shopping at the DOOM store, we hope to see you soon again!");
}