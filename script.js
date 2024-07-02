// Get the checkbox element
const checkbox = document.getElementById('optn-prfcard');

// Get the trigger elements
const trigger1 = document.getElementById('id-chkbox-optn-prf');
const trigger2 = document.getElementById('id-camp-optn-lbl');
const card = document.getElementById('prfcard-details-cntnt');



// Function to toggle the checkbox and card visibility
const toggleCheckbox = () => {
    // Toggle checkbox state
    checkbox.checked = !checkbox.checked;
    card.classList.toggle('flipped');
};

// Add event listeners to the trigger elements
trigger1.addEventListener('click', toggleCheckbox);
trigger2.addEventListener('click', toggleCheckbox);
