// MITCHELL SAREMBA - ICS128 - Midterm

//  ## PROJECT SUMMARY
//  Each instance of user is instantiated as either an Admin or a User class. When a user  logs in, the displayHomepage() method is called on the current user logging in. There are two displayHomepage() methods, one for the User class, and one for the Admin class. Depending on the class of the user, different homepages with differnt permissions will be displayed.

/**
 * GenericUser defines attributes and behaviours that are common among
 * instances of the User class and instances of the Admin class
 */
class GenericUser {
  constructor(name, username, email, race, height, img, birth, death, wiki) {
    this._name = name;
    this._username = username;
    this._email = email;
    this._race = race;
    this._height = height;
    this._img = img;
    this._birth = birth;
    this._death = death;
    this._wiki = wiki;
  }

  /**
   * Generates a list item in Bootstrap nav tab format
   *
   * @param {this} user specifies the user who's information is interpolated
   * @param {number} counter is used to keep track of the first item on the list to
   * include the "active" bootstrap class
   * @returns an <li> tag containing proper bootstrap format for nav tab list items
   */
  generateNavListItem = (user, counter) => {
    return `
          <li id="${user.username}Li" class="nav-item p-0" role="presentation">
            <a class="nav-link text-secondary fw-bold p-1 secondary-font ${
              counter === 0 ? "active" : ""
            }" data-bs-toggle="tab" href="#${user.username}">${
      user.username
    }</a>
          </li>
     `;
  };

  /**
   * Generates bootstrap nav tab content for their associated list item
   * Also adds a modal so it can be used when adding a delete button to user profiles later
   *
   * @param {this} user specifies the object who's information is interpolated
   * @param {number} counter is used to keep track of the first item on the list to
   * include the "show active" bootstrap class
   * @returns a <div> element of class tab-pane, containing a bootstrap card with
   * obj (user) that displays user information
   */
  generateNavItem = (user, counter) => {
    return `
      <div class="container tab-pane fade p-0 ${
        counter === 0 ? "show active" : ""
      }" id="${user.username}" role="tabpanel">
        <div class="card w-100 mw-100 m-0 d-flex flex-column flex-md-row bg-dark text-light border border-0">
          <img class="profile-img justify-self-center align-self-center m-2" src="${
            user.img
          }" alt="${user.name}">
          <div id="${
            user.username
          }CardBody" class="card-body d-flex flex-column justify-content-center align-items-center p-1 m-1 mw-75 bg-dark text-light">
            <h5 class="card-title">${user.name}</h5>
            <div id="${
              user.username
            }Lists" class="container d-flex flex-column flex-md-row justify-content-center justify-content-md-around">
              <ul id="${
                user.username
              }CardList1" class="list-group list-group-flush p-2 mw-100">
                <li class="list-group-item p-1 text-light bg-dark">
                  <div class="d-flex flex-column align-items-start">
                    <div class="text-white-50 fw-medium">Username</div>
                      <span class="navLiSpan">${user.username}</span>
                  </div>
                </li>
                <li class="list-group-item p-1 text-light bg-dark">
                  <div class="d-flex flex-column align-items-start">
                      <div class="text-white-50 fw-medium">Email</div>
                        <span class="navLiSpan">${user.email}</span>
                  </div>
                </li>
                <li class="list-group-item p-1 text-light bg-dark">
                  <div class="d-flex flex-column align-items-start">
                    <div class="text-white-50 fw-medium">Race</div>
                      <span class="navLiSpan">${
                        // If user has a race, display it. Otherwise, display "Unknown"
                        user.race ? user.race : "Unknown"
                      }</span>
                  </div>
                </li>
                <li class="list-group-item p-1 text-light bg-dark">
                  <div class="d-flex flex-column align-items-start">
                    <div class="text-white-50 fw-medium">Height</div>
                      <span class="navLiSpan">${
                        user.height ? user.height : "Unknown"
                      }</span>
                  </div>
                </li>
                
              </ul>
              <ul id="${
                user.username
              }CardList2" class="list-group list-group-flush p-2 mw-100 d-none d-lg-block">
                <li class="list-group-item p-1 text-light bg-dark">
                  <div class="d-flex flex-column align-items-start">
                    <div class="text-white-50 fw-medium">Birth</div>
                      <span class="navLiSpan">${user.birth}</span>
                  </div>
                </li>
                <li class="list-group-item p-1 text-light bg-dark">
                  <div class="d-flex flex-column align-items-start">
                      <div class="text-white-50 fw-medium">Death</div>
                        <span class="navLiSpan">${user.death}</span>
                  </div>
                </li>
                <li class="list-group-item p-1 text-light bg-dark">
                  <div class="d-flex flex-column align-items-start">
                    <div class="text-white-50 fw-medium">Wiki</div>
                      <a href="${
                        user.wiki ? user.wiki : "#"
                      }" target="_blank"><span class="navLiSpan">${
      user.wiki ? user.wiki : "N/A"
    }</span></a>

                  </div>
                </li>
              </ul>
              <div id="${user.username}deleteBtnContainer"></div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="${
          user.username
        }DeleteModal" tabindex="-1" aria-labelledby="${
      user.username
    }DeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header border-bottom border-secondary">
              <h5 id="${
                user.username
              }DeleteModalLabel" class="modal-title text-light">Delete ${
      user.username
    }</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark">
              <p class="text-light secondary-font">Are you sure you want to delete ${
                user.username
              }?</p>
            </div>
            <div class="modal-footer border-top border-secondary">
              <button id="${
                user.username
              }ModalDeleteBtn" type="button" class="btn btn-danger text-dark modal-btn secondary-font" data-bs-dismiss="modal"><span class="secondary-font">Yes, delete.</span></button>
              <button id="${
                user.username
              }ModalCancelBtn" type="button" class="btn btn-secondary text-dark modal-btn secondary-font" data-bs-dismiss="modal"><span class="secondary-font">No, take me back.</span></button>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  };

  // Getters
  get name() {
    return this._name;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get race() {
    return this._race;
  }

  get height() {
    return this._height;
  }

  get img() {
    return this._img;
  }

  get birth() {
    return this._birth;
  }

  get death() {
    return this._death;
  }
  get wiki() {
    return this._wiki;
  }

  // Setters
  set name(name) {
    this._name = name;
  }

  set email(email) {
    this._email = email;
  }

  set username(username) {
    this._username = username;
  }

  set race(race) {
    this._race = race;
  }

  set height(height) {
    this._height = height;
  }

  set img(img) {
    this._img = img;
  }
  set birth(birth) {
    this._birth = birth;
  }

  set death(death) {
    this._death = death;
  }
  set wiki(wiki) {
    this._wiki = wiki;
  }
}

/**
 *  User defines standard, unprivleged users
 *  Main difference between Admin and User is how the homepage is displayed within their respective displayHomepage() method
 */
class User extends GenericUser {
  constructor(name, username, email, race, height, img, birth, death, wiki) {
    super(name, username, email, race, height, img, birth, death, wiki);

    User.users.push(this); // Add this instance to list of users
  }

  static users = []; // Keeps a dynamic list of User objects as they are created

  /**
   * Displays homepage for this User after a successful login
   * Constructs two bootstrap nav tab containers
   * Displays current users profile in upper container, admin profiles in lower container
   * Takes hardcoded html container elements as params and generates their innerHTML
   *
   * @param {div} block is the outermost html container
   * @param {li} userNavList stores generated nav tab list items for users
   * @param {*} userNavItems stores generated nav tab content for users
   * @param {*} adminNavList stores generated nav tab list items for admin
   * @param {*} adminNavItems stores generated nav tab content for admin
   * @param {*} homepageTitle stores custom title for the hompage in top nav bar
   * @param {*} userTitle stores custom title for userDisplay
   * @param {*} adminNavListCollapse container for adminNavList
   * @param {*} userNavListCollapse container for userNavList
   */
  displayHomepage = (
    block,
    userNavList,
    userNavItems,
    adminNavList,
    adminNavItems,
    homepageTitle,
    userTitle,
    adminNavListCollapse,
    userNavListCollapse
  ) => {
    // Some containers for generated HTML
    let userNavListHTML = ``;
    let userNavItemsHTML = ``;
    let adminNavListHTML = ``;
    let adminNavItemsHTML = ``;

    let activeCount = 0; // Keeps track of first item in list to add "active" class

    // Add the current User first so their profile is displayed
    userNavListHTML += this.generateNavListItem(this, activeCount);
    userNavItemsHTML += this.generateNavItem(this, activeCount);

    // Add all of the admin to the admin nav list
    for (let admin of Admin.admins) {
      adminNavListHTML += this.generateNavListItem(admin, activeCount);
      activeCount += 1;
    }
    activeCount = 0;

    // Add all of the associated content for each admin
    for (let admin of Admin.admins) {
      adminNavItemsHTML += this.generateNavItem(admin, activeCount);
      activeCount += 1;
    }

    // Fill in parameters with generated User HTML
    userNavList.innerHTML = userNavListHTML;
    userNavItems.innerHTML = userNavItemsHTML;
    userNavListCollapse.appendChild(userNavList);

    // Fill in parameters with generated Admin HTML
    adminNavList.innerHTML = adminNavListHTML;
    adminNavItems.innerHTML = adminNavItemsHTML;
    adminNavListCollapse.appendChild(adminNavList);

    // Add it all to the DOM by appending to global elements userDisplay and adminDisplay
    userDisplay.appendChild(userNavItems);
    adminDisplay.appendChild(adminNavItems);

    // Switch around display containers so that the User's profile is at the top of the page
    block.insertBefore(
      document.getElementById("userContainer"),
      document.getElementById("adminContainer")
    );

    // Add custom title & welcome message
    userTitle.innerText = `Your Profile`;
    homepageTitle.innerText = `Welcome, ${this.name}`;

    // Hide nav burger for
    document.getElementById("userNavBurger").classList.add("d-none");
  };
}

/**
 *  Admin is similar to User, but with increased privledges
 *  Admin's displayHomepage() method displays all user profiles, and gives Admin the ability to read and to delete User profiles
 *
 */
class Admin extends GenericUser {
  constructor(name, username, email, race, height, img, birth, death, wiki) {
    super(name, username, email, race, height, img, birth, death, wiki);

    Admin.admins.push(this); // Add current instance to list
  }

  static admins = []; // Dynamically keeps an array of Admin instances

  /**
   * Displays homepage for this instance of Admin after a successful login
   * Constructs two containers with nav tab items
   * In the upper container, all admin profiles are displayed
   * In the lower container, all user profiiles are displayed
   *
   * Some hardcoded HTML containers are passed in to facilitate construction:
   * @param {div} block is the outermost container
   * @param {li} userNavList holds nav list items for users
   * @param {div} userNavItems contains nav content for users
   * @param {li} adminNavList contains nav list items for admin
   * @param {div} adminNavItems contains nav content for admin
   * @param {div} homepageTitle contains custom navbar welcome message
   * @param {div} userTitle contains userDisplay title
   * @param {div} adminNavListCollapse container for adminNavList
   * @param {div} userNavListCollapse contains nav content for userNavList
   */

  displayHomepage = (
    block,
    userNavList,
    userNavItems,
    adminNavList,
    adminNavItems,
    homepageTitle,
    userTitle,
    adminNavListCollapse,
    userNavListCollapse
  ) => {
    // Containers to store generated content
    let userNavListHTML = ``;
    let userNavItemsHTML = ``;
    let adminNavListHTML = ``;
    let adminNavItemsHTML = ``;

    let activeCount = 0; // Keep track of first item in list for "active" class

    // Add the current user (Admin) first so their profile is displayed first
    adminNavListHTML += this.generateNavListItem(this, activeCount);
    adminNavItemsHTML += this.generateNavItem(this, activeCount);
    activeCount += 1;

    // Add the remaining admin to the admin nav list
    for (let admin of Admin.admins) {
      if (admin.username === this.username) continue; // So the current user isn't added twice

      adminNavListHTML += this.generateNavListItem(admin, activeCount);
    }

    // Add all of the associated content for each admin
    for (let admin of Admin.admins) {
      if (admin.username === this.username) continue;

      adminNavItemsHTML += this.generateNavItem(admin, activeCount);
    }

    activeCount = 0; // Reset counter

    // Add all of the users to the user nav
    for (let user of User.users) {
      userNavListHTML += this.generateNavListItem(user, activeCount);

      activeCount += 1;
    }

    activeCount = 0;

    // Add all user content
    for (let user of User.users) {
      userNavItemsHTML += this.generateNavItem(user, activeCount);

      activeCount += 1;
    }

    // Store generated user HTML in param containers
    userNavList.innerHTML = userNavListHTML;
    userNavItems.innerHTML = userNavItemsHTML;
    userNavListCollapse.appendChild(userNavList);

    // Store generated admin HTML in param containers
    adminNavList.innerHTML = adminNavListHTML;
    adminNavItems.innerHTML = adminNavItemsHTML;
    adminNavListCollapse.appendChild(adminNavList);

    // Add all content to DOM
    userDisplay.appendChild(userNavItems);
    adminDisplay.appendChild(adminNavItems);

    // Set custom welcome message
    homepageTitle.innerText = `Welcome, ${this.name}`;

    // Switch around display containers so that the User's profile is at the top of the page
    block.insertBefore(
      document.getElementById("adminContainer"),
      document.getElementById("userContainer")
    );

    userTitle.innerText = "Users"; // Reset userDisplay title

    // Add a delete button to each user profile
    this.addDeleteBtnsForUsers();

    // Show nav burger for user display
    document.getElementById("userNavBurger").classList.remove("d-none");
  };

  /**
   * Gets all of the elements required to make a delete button that allows admins to delete user profiles
   * It makes it easy to add event listeners to the delete user buttons
   * Stores all necessary elements into an object so they can be destructured later
   * Essentially a helper function that will be used when looping through each instance of User in addDeleteBtnsForUsers() method
   *
   * @param {User} user is an instance of the User class
   * @param {button} btn is an HTML button
   * @returns an object containing all necessary bootstrap modal elements
   */
  getElementsForDeleteModal = (user, btn) => {
    // Get all of the elements from the DOM
    const div = document.getElementById(user.username);
    const li = document.getElementById(`${user.username}Li`);
    const modal = document.getElementById(`${user.username}DeleteModal`);
    const modalDeleteBtn = document.getElementById(
      `${user.username}ModalDeleteBtn`
    );
    const modalCancelBtn = document.getElementById(
      `${user.username}ModalCancelBtn`
    );

    // Store elements in an object for later use
    let modalElementsObj = {
      username: user.username,
      div: div,
      button: btn,
      li: li,
      modal: modal,
      modalDeleteBtn: modalDeleteBtn,
      modalCancelBtn: modalCancelBtn,
    };

    return modalElementsObj;
  };

  /**
   * Creates an HTML button that will be used to allow Admin to delete User profiles
   * Adds some attributes to the button so it can be attached to a modal in the pre existing HTML
   * Serves as a helper function to create a custom button for each instance of User in the addDeleteBtnsForUsers() method
   *
   * @param {User} user is an instance of the User class
   * @returns an HTML button with custom classes and attributes
   */
  createDeleteBtn(user) {
    // Create a button ;)
    const btn = document.createElement("button");
    const span = document.createElement("span");

    // Add some custom classes/attributes for modal functionality
    btn.classList =
      "btn btn-danger p-1 border border-2 border-black text-black mx-auto mb-2";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", `#${user.username}DeleteModal`);

    span.classList = "fs-btn secondary-font";
    span.textContent = `Delete`;

    btn.appendChild(span);

    return btn;
  }

  /**
   * Adds an event listener to a delete user button
   * Uses the elements collected from getElementsForDeleteModal()
   * Destructures the obj param, creates a modal object and adds event listeners to the delete button and the buttons within the modal
   *
   * @param {obj} modalElementsObj contains all of the necessary elements to add the listeners
   */
  addListenerToDeleteBtns = (modalElementsObj) => {
    // Destructure
    let { div, button, li, modal, modalDeleteBtn, modalCancelBtn, username } =
      modalElementsObj;

    // Create JS modal object
    modal = new bootstrap.Modal(modal);

    // If delete button clicked, modal pops up
    button.addEventListener("click", () => {
      modal.show(); // Are you sure you want to delete this profile?

      // Yes, delete
      modalDeleteBtn.addEventListener("click", () => {
        // Delete the user from the DOM
        li.remove();
        div.remove();
        // Delete the user from User.users array
        User.users = User.users.filter((user) => user.username != username);
        // console.log(`User Deleted: ${username}`);

        // Find the first div in userNavItems
        const firstDiv = document.querySelector("#userNavItems > div");

        // Manually set bootstrap active and show classes
        // This makes it so the userDisplay displays another profile after one is deleted, instead of showing nothing
        firstDiv.classList.add("show", "active");
      });

      // No, take me back
      modalCancelBtn.addEventListener("click", () => {
        modal.hide();
      });
    });
  };

  /* Adds delete buttons to each user profile, giving Admins the ability to
   * delete user profiles
   * Uses all of the above methods to facilitate
   * Loops through each instance of User, creates a button, gets the modal elements, and adds an event listener to the button
   */
  addDeleteBtnsForUsers = () => {
    for (let user of User.users) {
      // Generate button for current user
      let btn = this.createDeleteBtn(user);

      // Get modal elements for current user
      let modalElements = this.getElementsForDeleteModal(user, btn);

      // Add button to DOM
      document.getElementById(`${user.username}`).appendChild(btn);

      // Add listener to button
      this.addListenerToDeleteBtns(modalElements);
    }
  };
}

// ASYNC STUFF ---------------------------------------

/**
 * Decided to get some practice with async functions and using fetch()
 * getUserData() uses The-One-API (https://the-one-api.dev/) to fetch data on each character I want to create an account for
 * It filters the response in the url using the full names of the characters
 * Was initially making separate calls for each character but kept getting Error - Too Many Requests so I changed it to just make one request per page refresh
 * The method/program is set up in a way that if you want to add more user profiles, you just have to know their name and you can add them to the URL string
 *
 * @returns data.docs - an array of objects, each one containing character information
 */
const getUserData = async () => {
  try {
    const url = `https://the-one-api.dev/v2/character?name=Bilbo Baggins,Gandalf,Tom Bombadil,Frodo Baggins,Samwise Gamgee,Peregrin Took,Meriadoc Brandybuck,Gimli,Boromir,Gollum,Lobelia Sackville-Baggins,Legolas,Sauron,Saruman,Thrór,Smaug`; // Add more users here...

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer _aGSfUOX88FjUd31UBvu", // Super secret key
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    return data.docs; // Return an array containing an object for each char
  } catch (error) {
    console.error(error.message);
  }
};

// Takes a name, makes it lower case, and removes the last name if there is one
const generateUsername = (name) => {
  return name.toLowerCase().split(" ")[0]; // Chops two word strings in half - first name is at [0]
};

/**
 * Creates either an instance of User or an instance of Admin
 * Going to be executed once for each item returned from the getUserData() function
 *
 * @param {String} name character name as it appears in the-one-api
 * @param {GenericUser} user the current user
 * @returns
 */
const createUser = (name, user) => {
  let userType; // Admin or User
  const username = generateUsername(name);
  const email = `${username}@shire.orc`;
  const img = `images/${username}.webp`;

  // Set admin
  if (username === "gandalf" || username === "tom" || username === "bilbo") {
    userType = Admin;
  } else {
    userType = User;
  }

  // Don't have to store in a variable since these objects are automatically added to User.users or Admin.admins
  return new userType(
    user.name,
    username,
    email,
    user.race,
    user.height,
    img,
    user.birth,
    user.death,
    user.wikiUrl
  );
};

/**
 * Responsible for instantiating all of the instances of User and Admin
 * Awaits the fetch for each user, then loops through the array and creates an instance of user for each item
 * Function is async so that it can wait for the data to be fetched before attempting to create instances of the users
 */
const createUsers = async () => {
  // Wait to get the data from the API
  const users = await getUserData();

  // Create a user object from each entry
  for (let user of users) {
    createUser(user.name, user);
  }
};

createUsers();

// HARDCODED ELEMENTS ---------------------------

// Login Form
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginFormContainer = document.getElementById("loginFormContainer");
const usernameInput = document.getElementById("usernameInput");
const errorSpan = document.getElementById("errorSpan");

// Homepage
const displayContainer = document.getElementById("displayContainer");
const homepageTitle = document.getElementById("homepageTitle");
const logoutBtn = document.getElementById("logoutBtn");

// Admin Display
const adminContainer = document.getElementById("adminContainer");
const adminNavList = document.getElementById("adminNavList");
const adminNavItems = document.getElementById("adminNavItems");
const adminNavListCollapse = document.getElementById("adminNavListCollapse");
const adminDisplay = document.getElementById("adminDisplay");

// User Display
const userContainer = document.getElementById("userContainer");
const userNavList = document.getElementById("userNavList");
const userNavItems = document.getElementById("userNavItems");
const userNavListCollapse = document.getElementById("userNavListCollapse");
const userDisplay = document.getElementById("userDisplay");
const userTitle = document.getElementById("userTitle");

// LOGGING IN --------------------------------------------------

/**
 * Handles the logic of logging in - validating the login input and then displaying the homepage for the current user
 */
document.addEventListener("DOMContentLoaded", () => {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameRe = /^[a-zA-Z0-9_-]{3,20}$/; // Makes sure usernames are legit

    try {
      // Get username value entered by user
      const usernameInputValue = usernameInput.value.toLowerCase();

      if (!usernameRe.test(usernameInputValue))
        throw new Error("invalidUsername");

      // Get an array of all User and Admin instances
      let allUsers = User.users.concat(Admin.admins);

      // Create an array for all usernames
      let usernames = [];
      allUsers.forEach((user) => {
        usernames.push(user.username);
      });

      // Get the index of the current user that's trying to login
      let userIndex = allUsers.findIndex(
        (user) => usernameInputValue === user.username
      );

      // Get the current instance of User or Admin that's trying to login
      let currentUser = allUsers[userIndex];

      if (!usernames.includes(usernameInputValue))
        throw new Error("usernameNotFound");

      console.log("loggin on: ", currentUser.constructor.name);

      // If it's a registered user, display homepage
      // Depending on the type of user that is currently logging in, this method will either call Admin.displayHomepage() or User.displayHomepage()
      currentUser.displayHomepage(
        displayContainer,
        userNavList,
        userNavItems,
        adminNavList,
        adminNavItems,
        homepageTitle,
        userTitle,
        adminNavListCollapse,
        userNavListCollapse
      );

      displayContainer.classList.remove("hidden"); // Show homepage content
      loginFormContainer.classList.add("hidden"); // Hide login page content
    } catch (error) {
      if (error.message === "invalidUsername") {
        errorSpan.innerText = "Invalid username. Please try again.";
      } else if (error.message === "usernameNotFound") {
        errorSpan.innerText = "Username not found. Please try again.";
      }
    }
  });

  // LOGGING OUT --------------------------------------------------

  /**
   * Hides the homepage HTML
   * Shows the login page HTML
   */
  const logout = () => {
    loginFormContainer.classList.remove("hidden"); // Show login form
    displayContainer.classList.add("hidden"); // Hide user homepage

    usernameInput.value = ""; // Clear login input
  };

  // Clicking logout button on homepage triggers modal
  // Clicking 'yes' button on modal triggers actual logout
  const logoutModalBtn = document.getElementById("logoutModalYes");
  logoutModalBtn.addEventListener("click", (e) => {
    e.preventDefault();

    logout();
  });
});

// HANDLING NAV BURGER ON MOBILE ------------------------------------

/**
 * Was having a lot of trouble configuring the collapsible nav bar on mobile after using nav tabs
 * Basically, there was a conflict between the collapsible and the nav tabs, which caused the 'show' class to be added automatically to the nav tabs
 * This created a situation where the collapsible could be collapsed, but could never be uncollapsed
 * The following handles this by adding event listeners to the bootstrap collapse and show events
 */
document.addEventListener("DOMContentLoaded", () => {
  // Get burgers (collapse triggers) and collapse content
  const adminNavBurger = document.getElementById("adminNavBurger");
  const adminNavListCollapse = document.getElementById("adminNavListCollapse");

  const userNavBurger = document.getElementById("userNavBurger");
  const userNavListCollapse = document.getElementById("userNavListCollapse");

  // Add custom events to handle collapses
  adminNavBurger.addEventListener("click", () => {
    // Manually toggle 'show' if it's added when it's not supposed to
    if (adminNavListCollapse.classList.contains("show")) {
      adminNavListCollapse.classList.remove("show");
    } else {
      adminNavListCollapse.classList.add("show");
    }
  });

  // Prevent the default bootstrap behaviour for collapses
  // Basically says to remove the 'show' class whenever the collapsible should be hidden - i.e. whenever a hide event is triggered
  adminNavListCollapse.addEventListener("hide.bs.collapse", (e) => {
    e.preventDefault();
    adminNavListCollapse.classList.remove("show");
  });

  // Add the 'show' class whenever the collapsible should be shown
  adminNavListCollapse.addEventListener("show.bs.collapse", (e) => {
    e.preventDefault();
    adminNavListCollapse.classList.add("show");
  });

  // And then do the same for the user menu...

  userNavBurger.addEventListener("click", () => {
    if (userNavListCollapse.classList.contains("show")) {
      userNavListCollapse.classList.remove("show");
    } else {
      userNavListCollapse.classList.add("show");
    }
  });

  userNavListCollapse.addEventListener("hide.bs.collapse", (e) => {
    e.preventDefault();
    userNavListCollapse.classList.remove("show");
  });

  userNavListCollapse.addEventListener("show.bs.collapse", (e) => {
    e.preventDefault();
    userNavListCollapse.classList.add("show");
  });
});

// BUG FIX FOR DELETING USERS ----------------------------------------------
// When I manually add the "show active" classes to a User nav tab pane on line 552, it would persist even if I clicked another user
// This caused two user profiles to be shown at the same time
// By targeting the bootstrap event "shown.bs.tab" I can check if the first item on the list has "show active", and remove them manually
document.addEventListener("shown.bs.tab", () => {
  const firstDiv = document.querySelector("#userNavItems > div");

  if (
    firstDiv.classList.contains("show") ||
    (firstDiv.classList.contains("active") && !firstDiv)
  ) {
    firstDiv.classList.remove("show", "active");
  }
});

// AUDIO -------------------------------------------------

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const volumeControl = document.getElementById("volumeControl");

// Toggles the audio play/pause functionality
// Also toggles icons between play and pause
const togglePlay = () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = `<i class="bi bi-pause-fill"</i>`;
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="bi bi-play-fill"</i>`;
  }
};

// Setter for audio volume
const setVolume = (value) => {
  audio.volume = value;
};

playBtn.addEventListener("click", togglePlay);

volumeControl.addEventListener("change", (e) => {
  setVolume(e.target.value);
});
