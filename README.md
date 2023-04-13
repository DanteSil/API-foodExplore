
# Food Explore

The idea was to create an online menu for a fictional restaurant. This is the final challenge of the Explore course by RocketSeat.

This is a API Restful

## Tech 

- JavaScript
- Express
- Node.js
- SQlite
- CORS
- Insominia
- BeeKeeper


## Features


- A structured project, with a good organization of folders, division of components in the front-end, etc.

- A README.md file with specifications on how to run the project in a dev environment.

- Users must authenticate to enter the application through the login screen, you can apply what you learned in JWT authentication classes. Authentication must be validated with a password.

- The admin will upload images to register the dishes.

- Finally, deploy your application.

- Give your functions and variables meaningful names: work a little with Clean Code concepts.

- Admin, restaurant and user data will be stored in a database.

- Possibility to search by dish name, ingredients or favorite dish

- It is essential that your interface consumes its own API.

- It is interesting to make the application responsive: use the Mobile First concept that was learned in class.

- It's up to you where to apply animations, transitions and transformations.

- Meets the model proposed in Figma and contains elements indicative of action and state.

- The user can add items to the cart by clicking the add button. The amount is controlled by the “-” and “+” buttons;

- When clicking on the my order button, the user will be redirected to a screen where he will see his order, the sum and payment methods;

- The user can delete a dish from the cart and the total amount of the order should be automatically updated;

- The user can mark a dish as a favorite, just click on the heart that appears next to each one;

- The admin will visualize and control the status of each order, through a select field. Orders will appear in a table when clicking on Orders;

- The admin will visualize and control the status of each order, through a select field. Orders will appear in a table when clicking on Orders;
## Deployment

[Food Explore](rocketfooodexplore.netlify.app)

---

### The project has a Backend and Frontend.

- Frontend is in the folder (Front-FoodExplore)
- Backend is in the folder (API-foodExplore)

   - For the Frontend to work it is necessary that the Backend is operating


 ### To run the server(API/Backend)

```bash
# Clone this repository
$ git clone git@github.com:DanteSil/API-foodExplore.git
_________________________________________________________
# Access the project folder in your terminal
$ cd API-foodExplore 
_________________________________________________________
# Install the dependencies
$ npm install
_________________________________________________________
# run the migration and seed
$ npm run migrate
_________________________________________________________
# Run the application in development mode
$ npm run dev
_________________________________________________________
# Admin login
$ email: admin@email.com
$ password: 123
_________________________________________________________
# The Server will start at port: 3333 - go to http://localhost:3333
```

 ### To run Front (WEB)

```bash
# Clone this repository
$ git clone git@github.com:DanteSil/Front-FoodExplore.git
_________________________________________________________
# Access the project folder in your terminal
$ cd Front-FoodExplore
_________________________________________________________
# Install the dependencies
$ npm install
_________________________________________________________
# Run the application in development mode
$ npm run dev
_________________________________________________________
# The application will open on the port: 3000 - go to http://localhost:3000
```


## Lessons Learned

- Express
- Knex
- JWT
- Disk Storage
- components
- Middleware
- Cors
- http method
- migrations
## License

[MIT](https://choosealicense.com/licenses/mit/)

