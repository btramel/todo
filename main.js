class Item {
    constructor(title, priority, details, tag, checked) {
        this.title = title;
        this.priority = priority;
        this.details = details;
        this.tag = tag;
        this.checked = checked;
    }
}
const LOCAL_STORAGE_ITEMS_KEY = 'items.key'
// initialize array with to-do list items (objects) + local storage
let items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY)) 
|| [
    {title: 'Make coffee', priority: true, details: '', checked: false},
    {title: 'Walk the dog', priority: false, details: 'walk around the park if the weather is nice', checked: false},
    {title: 'Exercise', priority: true, details: 'leg day', checked: true}
]
let reminderArr = [
    {title: 'Drink some water', priority: false, details: 'A reminder, with love. - B', checked: false},
    {title: 'Get up and move around', priority: false, details: 'A reminder, with love. - B', checked: false},
    {title: 'Release that shoulder tension', priority: false, details: 'A reminder, with love. - B', checked: false},
    {title: 'Stretch', priority: false, details: 'A reminder, with love. - B', checked: false},
    {title: 'Take a break', priority: false, details: 'You deserve it. A reminder, with love. - B', checked: false},
    {title: 'Try relaxing', priority: false, details: 'A reminder, with love. - B', checked: false},
    {title: 'Consider chilling out', priority: true, details: 'A reminder, with love. - B', checked: false}
];
// SELECTORS
const modal = document.querySelector('.modal')
const overlay = document.getElementById('overlay')
const form = document.querySelector('form')

// EVENT LISTENERS
// listen for new item click
document.querySelector('#newItem').addEventListener('click', () => {
    openModal()
})

// listen for all closing abilities: close button, submit button, and overlay itself
document.querySelectorAll('.close-button').forEach(button => {
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
document.getElementById('submit-item').addEventListener('click', (e) => {
    e.preventDefault()
    createItemObj()
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function reminder() {
        if ( items.length % 5 === 0 ) {
            items.push( reminderArr[getRandomInt(reminderArr.length - 1)])
        } else return
    }
    reminder()
    sortArr()
    saveAndRender()
    modal.classList.remove('active')
    overlay.classList.remove('active')
    form.reset()
})

// allow 'enter' to trigger submit button event
const inputTitle = document.getElementById('title')
inputTitle.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault()
        document.getElementById('submit-item').click()
    }
})

// allow enter on details form input as well
const inputDetails = document.getElementById('details')
inputDetails.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault()
        document.getElementById('submit-item').click()
    }
})


// SAVE TO LOCAL STORAGE -- HALLELUJAH
function save() {
    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(items))
}
function sortArr() {
    items.sort(function(a, b) {
    if ( a.checked  && !b.checked ) { return 1 } // to bottom of to-do list
    if ( !a.checked && b.checked ) { return -1 }
    if ( !a.priority && b.priority ) { return 1 }
    if ( a.priority && !b.priority ) { return -1 }

    return 0
})
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

    sortArr()
    // loop through array of object, rendering each
    items.forEach(item => {

        // initialize node elements
        const node = document.createElement('div')
        const titleNode = document.createElement('div')
        const detailsNode = document.createElement('div')
        const priorityNode = document.createElement('div')
        const checkboxNode = document.createElement('input')
        const deleteNode = document.createElement('button')
        const iconNode = document.createElement('div')


        // assign class names to nodes
        node.classList.add('item')
        node.dataset.itemTag = item.tag
        titleNode.classList.add('title')
        detailsNode.classList.add('details')
        detailsNode.classList.add('hidden')
        iconNode.classList.add('hidden')
        iconNode.classList.add('detailed')
        priorityNode.classList.add('priority')
        deleteNode.classList.add('delete')
        checkboxNode.type = 'checkbox'
        checkboxNode.name = 'finished'
        checkboxNode.id = 'finished'


        // distribute values
        titleNode.innerText = `${item.title}`
        detailsNode.innerText = `${item.details}`
        // set priority
        if ( item.priority ? priorityNode.innerText = '!' : priorityNode.innerText = ' ' )
        // add delete icon to button
        deleteNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" class="delete" viewBox="0 0 24 24" width="24px" fill="#fffacd"><path class="delete" d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>`
        // add dropdown icon to middle of list-item
        iconNode.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fffacd"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>`

        if ( item.details !== '' ) { 
            iconNode.classList.remove('hidden')
        }



        // EVENT LISTENERS

        // strikethrough text if checked, and remove strike if unchecked
        checkboxNode.onclick = function() {
            let strikeParent = checkboxNode.closest('.item')
            if ( strikeParent.classList.contains('finished') ) {
            strikeParent.classList.remove('finished')
            item.checked = false;
            sortArr()
            save()
            render()
            }   else {
                strikeParent.classList.add('finished')
                item.checked = true;
                sortArr()
                save()
                render()
            }
        }

        // expand item container
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
                    sortArr()
                    saveAndRender()
                    // table log for proof
                    console.table(items)
        }
        
        // display new card
        container.append(node)
        node.appendChild(titleNode)
        node.appendChild(iconNode)
        node.appendChild(priorityNode)
        node.appendChild(checkboxNode)
        node.appendChild(deleteNode)
        node.appendChild(detailsNode)

        // render checked or not
        // must go after nodes are rendered
        if ( item.checked == true ) { 
            checkboxNode.closest('.item').classList.add('finished')
            checkboxNode.setAttribute('checked', 'checked')
        }

    
    }) //END LOOP 

    // search listener
    // must go after page has entirely rendered or final foreach iteration will not go
    const searchInput = document.getElementById('search')
    const allNodes = document.querySelectorAll('.item')
    
    searchInput.addEventListener('input', (e) => {
        allNodes.forEach(item => {
            const value = e.target.value.toLowerCase()
            const isVisible = item.children[0].innerText.toLowerCase().includes(value) 
            || item.children[4].innerText.toLowerCase().includes(value)
            item.classList.toggle('hidden', !isVisible)
        }
    )})
    
    save()
}

render()