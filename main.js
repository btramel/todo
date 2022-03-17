class Item {
    constructor(title, priority, details, tag) {
        this.title = title;
        this.priority = priority;
        this.details = details;
        this.tag = tag;
    }
}

const LOCAL_STORAGE_ITEMS_KEY = 'items.key'
const LOCAL_STORAGE_NAME_KEY = 'name.key'
let username = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME_KEY)) || undefined

// initialize array with to-do list items (objects) + local storage
let items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY)) || []
let caseyArr = [
    {title: 'Drink water!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Stretch!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Read a little poetry!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Yoga!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: '2 minutes deep breathing!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Indulge in a sweet treat!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Fuck it -- send a poem to the New Yorker!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Think of everyone who loves you!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Take stock of your accomplishments!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Another butt tattoo?', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Call Brad', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
    {title: 'Take a long, hot bath!', priority: true, details: 'A reminder, with love, from Honeybee 🐝'},
];

// SELECTORS
const menu = document.querySelector('.menu')
const overlay = document.getElementById('overlay')
const modal = document.querySelector('.modal')
const newItem = document.querySelector('#newItem')
const closeModalButtons = document.querySelectorAll('.close-button')
const submit = document.getElementById('submit-item')
const deleteItem = document.querySelectorAll('.delete')
const form = document.querySelector('form')

// EVENT LISTENERS
// listen for new item click
newItem.addEventListener('click', () => {
    openModal()
})

// listen for all closing abilities: close button, submit button, and overlay itself
closeModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
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
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function casey() {
        if ( username.toLowerCase() === 'casey' && items.length % 4 === 0 ) {
        items.push( caseyArr[getRandomInt(caseyArr.length - 1)])
        } else return
    }
    casey()
    saveAndRender()
    modal.classList.remove('active')
    overlay.classList.remove('active')
    form.reset()
})

// SAVE TO LOCAL STORAGE -- HALLELUJAH
function save() {
    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items))
    localStorage.setItem(LOCAL_STORAGE_NAME_KEY, JSON.stringify(username))
}
// use this primarily. render() to load initial page
function saveAndRender() {
    save()
    render()
}
function clearList(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
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
    
    // check to see if the new item is a priority
    const priority = document.getElementById('prioritize').checked

    const details = document.getElementById('details').value

    const tag = items.length
    
    const item = new Item(title, priority, details, tag)

    // add new item to array
    items.push(item)
    console.table(items)
}
function render() {
    // clear display
    const container = document.getElementById('list-container')
    clearList(container)

    // loop through array of object, rendering each
    items.forEach(item => {

        // initialize node elements
        const node = document.createElement('div')
        const titleNode = document.createElement('div')
        const detailsNode = document.createElement('div')
        const priorityNode = document.createElement('div')
        const checkboxNode = document.createElement('input')
        const deleteNode = document.createElement('button')


        // assign class names to nodes
        node.classList.add('item')
        node.dataset.itemTag = item.tag
        titleNode.classList.add('title')
        detailsNode.classList.add('details')
        detailsNode.classList.add('hidden')
        priorityNode.classList.add('priority')
        deleteNode.classList.add('delete')
        checkboxNode.type = 'checkbox'
        checkboxNode.name = 'finished'
        checkboxNode.id = 'finished'
        // strikethrough text if checked, and remove strike if unchecked
        checkboxNode.onclick = function() {
            let strikeParent = checkboxNode.closest('.item')
            if ( strikeParent.classList.contains('finished') ) {
            strikeParent.classList.remove('finished')
            }   else {
                strikeParent.classList.add('finished')
            }
        }


        // distribute values
        titleNode.innerText = `${item.title}`
        detailsNode.innerText = `${item.details}`
        if ( item.priority ? priorityNode.innerText = '!' : priorityNode.innerText = ' ' )
        deleteNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" class="delete" viewBox="0 0 24 24" width="24px" fill="#fffacd"><path class="delete" d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>`
        
        node.onclick = function(e) {
            if ( node.classList.contains('expand') && e.target !== checkboxNode ) { // EVENT DOESN'T FIRE IF CLICK TARGET IS CHECKBOX
                node.classList.remove('expand')
                detailsNode.classList.add('hidden')
            } else if ( e.target !== checkboxNode && detailsNode.innerHTML !== '') { // EVENT DOESN'T FIRE IF NO DETAILS ARE AVAILABLE
                node.classList.add('expand')
                detailsNode.classList.remove('hidden')
            }
        }

        // clicking on trash icon will remove object and re-render items list
        deleteNode.onclick = function() {
                    // gets closest parent div of the garbage can icon, then gets its data tag (which corresponds to its location in the Items array)
                    const goner = Number(this.closest('.item').getAttribute('data-item-tag'))
                    // removes that item from the array
                    items.splice(goner, 1)
                    // loops through the array and updates the tag attribute of each object, using new position in array
                    items.forEach(item => {
                        item.tag = items.indexOf(item)
                    })
                    // re-renders page
                    saveAndRender()
                    // table log for proof
                    console.table(items)
                }
        
        // display new card
        container.append(node)
        node.appendChild(titleNode)
        node.appendChild(priorityNode)
        node.appendChild(checkboxNode)
        node.appendChild(deleteNode)
        node.appendChild(detailsNode)
    })
    save()
}

// function sortItems() {
//     // sort obj array by priority
// }

// menu functionality?
// searchbar
    // foreach filter through title, details

// editdetailsbutton
    // ontouchitem
    // contenteditable details section
    // exit-edit-screen

if ( username === undefined || username === null ) {
    username = prompt('Welcome! What is your name?').toLowerCase()
    alert(`Cool. Let's do stuff, ${username}`) 
}

render()