# Do: A to-do list app
A to-do app that auto-sorts list items by priority, stores items in local storage, and generates random reminders like "drink more water" or "take a break" at set intervals.

**Languages**: Javascript, CSS, HTML

**Features**: Local storage, mobile-first and responsive, auto-sorts by priority

I took on this project as part of The Odin Project's Javascript curriculum, but quickly added additional features and functionality.

![do](https://user-images.githubusercontent.com/66852498/165603551-c5860f62-b562-4199-b76a-a2e2b1eefbf9.gif)

A to-do list app isn't very useful without some sort of backend to save the to-dos that don't get finished in one session, so I quickly set out to learn how to implement local storage. I'm happy I did. It's easily the most useful endeavor I've embarked on, as far as these smaller projects go.

The meat of the project is in the <code>render()</code> function. New items are created using ES6 classes, which are then rendered node by node via a loop. This created issues when the function got larger, specifically creating a bug where the wrong to-do list item would get deleted! Obviously that couldn't stand, so I refactored, ensuring the list was sorted and saved appropriately throughout key points in the process by making the <code>save()</code> function a method of the <code>sortArr()</code> function.

<img width="1440" alt="Screen Shot 2022-03-18 at 2 16 10 PM" src="https://user-images.githubusercontent.com/66852498/165605344-c8bce2cb-cb3f-4221-81ad-8ae560c0b403.png">

The project is hosted on Github Pages. Feel free to feel the responsiveness for yourself!

Thanks for reading about my to-do app! Please check out my other projects, and don't hesitate to drop me a line!
