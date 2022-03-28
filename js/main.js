const modal = document.querySelector(".modal");
const trigger = document.querySelector(".modalButton");
const closeButton = document.querySelector(".close-button");
const showSpoilers = document.querySelector("#showSpoilers");

function toggleModal()
{
    modal.classList.toggle("show-modal");
}

function windowOnClick(event)
{
    if (event.target === modal)
    {
        toggleModal();
    }
}

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

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);