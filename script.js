// elements for setting calorie goal
const calGoalForm = document.querySelector("#calorieGoalForm");
const setGoalInput = document.querySelector("#setGoalInput");
const setGoalBtn = document.querySelector("#setGoal");

// elements for displaying macros consumed
const macros = document.querySelector("#macros");
const calGoal = document.querySelector("#calAllowed");
const calConsumed = document.querySelector("#calConsumed");
const fat = document.querySelector("#fat");
const carb = document.querySelector("#carb");
const protein = document.querySelector("#protein");

// elements for submitting meal
const macroForm = document.querySelector("#macroForm");
const calorieForm = document.querySelector("#calorieForm");
const fatForm = document.querySelector("#fatForm");
const carbForm = document.querySelector("#carbForm");
const proteinForm = document.querySelector("#proteinForm");
const submitMeal = document.querySelector("#submitMeal");

// display past meals
const mealsContainer = document.querySelector("#meals");

// meal object
function Meal(cal, f, c, p) {
  this.calories = cal;
  this.fat = f;
  this.carbs = c;
  this.protein = p;
  this.date = new Date().toLocaleDateString();
  this.id = new Date().getTime();
}

const defaultStore = {
  target: 0,
  meals: [],
}

// get data from local storage or create a new store
let localStore = defaultStore;
if (localStorage.calorieTracker) localStore = JSON.parse(localStorage.calorieTracker);

// update local storage object
const updateStore = () => {
  localStorage.setItem("calorieTracker", JSON.stringify(localStore));
}

const displayMeals = () => {
  for (const meal of localStore.meals) {
    let mealCard = document.createElement('div')
    mealCard.className = "mealCard card";

    let date = document.createElement('p');
    date.innerHTML = meal.date;
    date.className = "card-header"

    let deleteCard = document.createElement('span');
    deleteCard.innerHTML = "X";
    deleteCard.onclick = () => deleteMeal(meal.id);
    date.appendChild(deleteCard);

    let calories = document.createElement('p')
    calories.innerHTML = `calories: ${meal.calories}`;

    let fat = document.createElement('p')
    fat.innerHTML = `fat: ${meal.fat}`;

    let carbs = document.createElement('p')
    carbs.innerHTML = `carbs: ${meal.carbs}`;

    let protein = document.createElement('p')
    protein.innerHTML = `protein: ${meal.protein}`;

    mealCard.appendChild(date);
    mealCard.appendChild(calories);
    mealCard.appendChild(fat);
    mealCard.appendChild(carbs);
    mealCard.appendChild(protein);
    mealsContainer.appendChild(mealCard);
  }
}

const addMeal = () => {
  const newMeal = new Meal();
  newMeal.calories = Number(calorieForm.value)
  newMeal.fat = Number(fatForm.value)
  newMeal.carbs = Number(carbForm.value)
  newMeal.protein = Number(proteinForm.value)
  localStore.meals.push(newMeal);
  updateStore();
  location.reload();
}

const populateMacros = () => {
  let dailyCal = 0;
  let dailyFat = 0;
  let dailyCarb = 0;
  let dailyProt = 0;
  let today = new Date().toLocaleDateString();
  localStore.meals.map(meal => {
    if (meal.date == today) {
      dailyCal += meal.calories;
      dailyFat += meal.fat;
      dailyCarb += meal.carbs;
      dailyProt += meal.protein;
    }
  })
  calConsumed.innerHTML = dailyCal;
  fat.innerHTML = dailyFat;
  carb.innerHTML = dailyCarb;
  protein.innerHTML = dailyProt;
}

const deleteMeal = (id) => {
  localStore.meals = localStore.meals.filter(meal =>meal.id !== id)
  updateStore();
  location.reload();
}

// check for existing information in local storage
if (localStore.target) {
  calGoal.innerHTML = localStore.target;
  calGoalForm.style.display = "none";
  macros.style.display = "block";
  macroForm.style.display = 'flex';
}

populateMacros();
displayMeals();

// set target calorie goal
setGoalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStore["target"] = Number(setGoalInput.value);
  updateStore();
  location.reload();
})

macroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addMeal();
});