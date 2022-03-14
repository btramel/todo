class Item {
    constructor(title, priority, details) {
        this.title = title;
        this.priority = priority;
        this.details = details;
    }
}

// initialize array with to-do list items (objects)
const items = [{title: 'Feed Mox', priority: null, details: 'treats too?'}]



// SELECTORS
const menu = document.querySelector('.menu')
const overlay = document.getElementById('overlay')
const modal = document.querySelector('.modal')
const newItem = document.querySelector('#newItem')
const closeModalButtons = document.querySelectorAll('.close-button')
const submit = document.getElementById('submit-item')



// EVENT LISTENERS

// listen for new item click
newItem.addEventListener('click', () => {
    openModal()
})

// listen for all closing abilities: close button, submit button, and overlay itself
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

// clicking outside of the modal while open will close it
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

// clicking on submit will create new item div and object
submit.addEventListener('click', (e) => {
    e.preventDefault()
    createItemObj()
    // sortItems()
    displayItems()
    modal.classList.remove('active')
    overlay.classList.remove('active')
})





// OPEN AND CLOSE
function openModal() {
    modal.classList.add('active')
    overlay.classList.add('active')
    document.getElementById('title').focus(); }
function closeModal() {
    modal.classList.remove('active')
    overlay.classList.remove('active') }


function createItemObj() {
    // initialize
    const title = document.getElementById('title').value
    let priority;
        // check to see if the new item is a priority
        if ( document.getElementById('prioritize').checked ? priority = 1 : priority = null );
    const details = document.getElementById('details').value
    
    const item = new Item(title, priority, details);

    // add new item to object array
    items.push(item)
    console.table(items)
}

// function sortItems() {
//     // sort obj array by priority
// }

function displayItems() {
    // assign information to card nodes
    const listContainer = document.querySelector('.list-container')
    let node = document.createElement('div')
    node.className = 'item'

    const title = document.getElementById('title').value
    let titleNode = document.createElement('div')
    titleNode.classList.add('title')
    titleNode.innerHTML = `${title}`

    let priorityNode = document.createElement('div');
    if ( document.getElementById('prioritize').checked ? priority = 1 : priority = null );
    if ( priority === 1 ) {
        priorityNode.innerHTML = '!'
    } else ( priorityNode.innerHTML = ' ');
    priorityNode.classList.add('priority')

    let deleteNode = document.createElement('button')
    deleteNode.classList.add('delete')
    deleteNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fffacd"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>`

    // display new card
    listContainer.append(node)
    node.appendChild(titleNode)
    node.appendChild(priorityNode)
    // node.appendChild(priorityNode)
    node.appendChild(deleteNode)
}

// searchbar
    // foreach filter through title, details
// editdetailsbutton
    // ontouchitem
    // contenteditable details section
    // exit-edit-screen
