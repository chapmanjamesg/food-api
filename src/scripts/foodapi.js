console.log('Horray this is working!')
//this needs to be outside of the parse so that it executes properly
const foodFactory = (food) => {
    return `
    <div class="food">
        <h1>${food.name}</h1>
        <section>${food.category}<section>
        <aside>${food.ethnicity}</aside>
        <p>${food.ingredients}</p>
        <p>${food.country}</p>
        <p>energy per serving: ${food.energy}</p>
        <p>sugar per serving: ${food.sugar}</p>
        <p>fat per serving: ${food.fat}</p>
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
            //console.log('food', food)
            // console.log(food.name)
            //make sure that your callbacks have similar caps
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.Barcode}.json`)
            .then(response => response.json())
            .then(productInfo => {
                console.log(productInfo.product.ingredients_text)
                if(productInfo.product.ingredients_text){
                    food.ingredients = productInfo.product.ingredients_text
                }else {
                    food.ingredients = "no ingredients listed"
                }
                 if(productInfo.product.countries_hierarchy){
                     food.country = productInfo.product.countries_hierarchy
                 }else {
                     food.country = "no country listed"
                 }
                 if(productInfo.product.nutriments.energy_serving){
                     food.energy = productInfo.product.nutriments.energy_serving
                 }else {
                     food.energy = "no energy per serving listed"
                 }
                 if(productInfo.product.nutriments.sugars_serving){
                     food.sugar = productInfo.product.nutriments.sugars_serving
                 }else{
                     food.sugar = "no sugar per serving listed"
                 }
                 if(productInfo.product.nutriments.fat_serving){
                     food.fat = productInfo.product.nutriments.fat_serving
                 }else {
                     food.fat = "no fat per serving listed"
                 }
                const addFoodToDom = document.querySelector('.foodList');
                //you don't need a for loop here because it is an object not an array at this point.
                addFoodToDom.innerHTML += foodFactory(food)

                })

        });
    })

