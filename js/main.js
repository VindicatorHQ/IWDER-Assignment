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