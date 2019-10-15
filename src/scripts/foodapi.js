console.log('Horray this is working!')

const foodFactory = (food) => {
    return `
    <div class="food">
        <h1>${food.name}</h1>
        <section>${food.category}<section>
        <aside>${food.ethnicity}</aside>
    </div>
    `
}

//making a call to database.json
fetch("http://localhost:8088/food")
    // .then makes the code wait for it to then return from json
    // converts result of fetch request to json
    .then(foods => foods.json())
    //display json data in the console
    .then(parsedFoods => {
        console.table(parsedFoods)

        parsedFoods.forEach(food => {
             console.log('food', food)
            // console.log(food.name)
            const addFoodToDom = document.querySelector('.foodList');

                addFoodToDom.innerHTML += foodFactory(food)
            
            
        });
    })

