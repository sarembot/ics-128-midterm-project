// MITCHELL SAREMBA - ICS128 - Midterm

/**
 * GenericUser defines attributes and behaviours that are common among both
 * instances of the User class and instances of the Admin class
 *
 * Attributes:
 *
 */
class GenericUser {
  constructor(name, username, email, race, height, img) {
    this._name = name;
    this._username = username;
    this._email = email;
    this._race = race;
    this._height = height;
    this._img = img;
  }

  /**
   * Generates a list item in Bootstrap nav tab format
   *
   * @param {this} obj specifies the object who's information is interpolated
   * @param {number} counter is used to keep track of the first item on the list to
   * include the "active" bootstrap class
   * @returns an <li> tag containing proper bootstrap format for nav tab list items
   */
  generateNavListItem = (obj, counter) => {
    return `
          <li id="${obj.username}Li" class="nav-item p-0" role="presentation">
            <a class="nav-link p-1 ${
              counter === 0 ? "active" : ""
            }" data-bs-toggle="tab" href="#${obj.username}">${obj.username}</a>
          </li>
     `;
  };

  editUser = () => {};

  /**
   * Generates bootstrap nav tab content for their associated list item
   *
   * @param {this} obj specifies the object who's information is interpolated
   * @param {number} counter is used to keep track of the first item on the list to
   * include the "show active" bootstrap class
   * @returns a <div> element of class tab-pane, containing a bootstrap card with
   * obj (user) that displays user information
   */
  generateNavItem = (obj, counter) => {
    return `
      <div class="container tab-pane fade p-0 ${
        counter === 0 ? "show active" : ""
      }" id="${obj.username}" role="tabpanel">
        <div class="card w-100 mw-100 m-0 d-flex flex-column flex-md-row bg-dark text-light">
          <img class="profile-img justify-self-center align-self-center m-2" src="${
            obj.img
          }" alt="${obj.name}">
          <div id="${
            obj.username
          }CardBody" class="card-body d-flex flex-column justify-content-center align-items-center p-1 m-1 mw-75 bg-dark text-light">
            <h5 class="card-title">${obj.name}</h5>
            <ul id="${
              obj.username
            }CardList" class="list-group list-group-flush p-2 mw-100">
              <li class="list-group-item p-1 text-light bg-dark">
                <div class="d-flex flex-column align-items-start">
                  <div class="text-white-50 fw-medium">Username</div>
                    <span class="navLiSpan">${obj.username}</span>
                </div>
              </li>
              <li class="list-group-item p-1 text-light bg-dark">
                <div class="d-flex flex-column align-items-start">
                    <div class="text-white-50 fw-medium">Email</div>
                      <span class="navLiSpan">${obj.email}</span>
                </div>
              </li>
              <li class="list-group-item p-1 text-light bg-dark">
                <div class="d-flex flex-column align-items-start">
                  <div class="text-white-50 fw-medium">Race</div>
                    <span class="navLiSpan">${
                      obj.race ? obj.race : "Unknown"
                    }</span>
                </div>
              </li>
              <li class="list-group-item p-1 text-light bg-dark">
                <div class="d-flex flex-column align-items-start">
                  <div class="text-white-50 fw-medium">Height</div>
                    <span class="navLiSpan">${
                      obj.height ? obj.height : "Unknown"
                    }</span>
                </div>
              </li>
              
            </ul>
          </div>
        </div>

        <div class="modal fade" id="${
          obj.username
        }DeleteModal" tabindex="-1" aria-labelledby="${
      obj.username
    }DeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="${
                obj.username
              }DeleteModalLabel" class="modal-title">Delete ${obj.username}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete ${obj.username}?</p>
            </div>
            <div class="modal-footer">
              <button id="${
                obj.username
              }ModalDeleteBtn" type="button" class="btn btn-danger" data-bs-dismiss="modal">Yes, delete.</button>
              <button id="${
                obj.username
              }ModalCancelBtn" type="button" class="btn btn-primary" data-bs-dismiss="modal">No, take me back.</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  };

  // handleAdminBurger = () => {
  //   document.getElementById("adminNavBurger").addEventListener("click", () => {
  //     console.log("clicked");
  //     console.log(adminNavList);
  //     document.getElementById("adminNavList").classList.remove("show");
  //   });
  // };

  /**
   *
   */

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
}

/**
 *
 *  The User class defines standard, unprivleged users
 *
 */
class User extends GenericUser {
  constructor(name, username, email, race, height, img) {
    super(name, username, email, race, height, img);

    User.users.push(this); // Add this instance to list of users
  }

  static users = []; // To keep a dynamic list of User objects as they are created

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

    // Add it all to the DOM
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
  };
}

/**
 *  The Admin class is similar to User, but with increased privledges
 *
 */
class Admin extends GenericUser {
  constructor(name, username, email, race, height, img) {
    super(name, username, email, race, height, img);

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
   * @param {span} homepageTitle is a container for the welcome message
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
    // Clear all previous content
    // block.innerHTML = ``;

    // Store new content
    let userNavListHTML = ``;
    let userNavItemsHTML = ``;
    let adminNavListHTML = ``;
    let adminNavItemsHTML = ``;

    let activeCount = 0; // Keep track of first item in list for "active" class

    // Add the current user (Admin) first so their profile is displayed
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

    activeCount = 0;

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

    userTitle.innerText = "Users";

    // Add a delete button to each user profile
    this.addDeleteBtnsForUsers();
  };

  /**
   * Gets all of the elements required to make a delete button that allows admins to delete user profiles
   * It makes it easy to add event listeners to the delete user buttons
   * Stores all necessary elements into an object so they can be destructured later
   * Essentially a helper function that will be used for each instance of User in addDeleteBtnsForUsers() method
   *
   * @param {User} user is an instance of the User class
   * @param {button} btn is an HTML button
   * @returns an object containing all necessary bootstrap modal elements
   */
  getElementsForDeleteModal = (user, btn) => {
    const div = document.getElementById(user.username);
    const li = document.getElementById(`${user.username}Li`);
    const modal = document.getElementById(`${user.username}DeleteModal`);
    const modalDeleteBtn = document.getElementById(
      `${user.username}ModalDeleteBtn`
    );
    const modalCancelBtn = document.getElementById(
      `${user.username}ModalCancelBtn`
    );

    let modalElementsObj = {
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
   * Serves as a helper function to create a button for each instance of User in the addDeleteBtnsForUsers() method
   *
   * @param {User} user is an instance of the User class
   * @returns an HTML button with custom classes and attributes
   *
   */
  createDeleteBtn(user) {
    const btn = document.createElement("button");
    const span = document.createElement("span");

    btn.classList =
      "btn btn-danger mx-4 mt-3 p-1 border border-2 border-black text-black";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", `#${user.username}DeleteModal`);

    span.classList = "fs-btn";
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
    let { div, button, li, modal, modalDeleteBtn, modalCancelBtn } =
      modalElementsObj;

    // Create JS modal object
    modal = new bootstrap.Modal(modal);

    // If delete button clicked, modal pops up
    button.addEventListener("click", () => {
      modal.show(); // Are you sure you want to delete this profile?

      // Yes, delete
      modalDeleteBtn.addEventListener("click", () => {
        div.remove();
        li.remove();
      });

      // No, take me back
      modalCancelBtn.addEventListener("click", () => {
        modal.hide();
      });

      // TODO: Think about deleting the user from the actual arrw
    });
  };

  /**
   * Adds delete buttons to each user profile, giving Admins the ability to
   * delete user profiles
   * Uses all of the above methods to facilitate
   * Loops through each instance of User, creates a button, gets the modal elements, and adds an event listener to the button
   */
  addDeleteBtnsForUsers = () => {
    for (let user of User.users) {
      // Get <ul> in current user's card
      let cardList = document.getElementById(`${user.username}CardList`);

      // Generate button for current user
      let btn = this.createDeleteBtn(user);

      // Get modal elements for current user
      let modalElements = this.getElementsForDeleteModal(user, btn);

      // Add button to DOM
      cardList.appendChild(btn);

      // Add listener to button
      this.addListenerToDeleteBtns(modalElements);
    }
  };
}

/**
 * Decided to get some practice with async functions and using fetch()
 * getUserData() uses The One API to fetch data on each character I want to create an account for
 * It filters the response in the url using the full names of the characters
 * Was initially making separate calls for each character but kept getting Error - Too Many Requests
 *
 * @returns data.docs - an array of objects, each one containing character information
 */
const getUserData = async () => {
  try {
    const url = `https://the-one-api.dev/v2/character?name=Bilbo Baggins,Gandalf,Tom Bombadil,Frodo Baggins,Samwise Gamgee,Peregrin Took,Meriadoc Brandybuck,Gimli,Boromir,Gollum,Lobelia Sackville-Baggins,Legolas,Sauron,Saruman`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer _aGSfUOX88FjUd31UBvu",
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
  return new userType(user.name, username, email, user.race, user.height, img);
};

/**
 * Responsible for instantiating the instances of User and Admin
 * Awaits the fetch for each user, then loops through the array and creates an instance of user for each item
 */
const initUsers = async () => {
  const users = await getUserData();

  for (let user of users) {
    createUser(user.name, user);
    console.log(user.username);
  }
};

initUsers();

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

document.addEventListener("DOMContentLoaded", () => {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameRe = /^[a-zA-Z0-9_-]{3,20}$/;

    try {
      // Get username value entered by user
      const usernameInputValue = usernameInput.value;

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
      console.log(currentUser);

      if (!usernames.includes(usernameInputValue))
        throw new Error("usernameNotFound");

      console.log("loggin on: ", currentUser.constructor.name);

      // If it's a registered user
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

      console.log(error);
    }
  });

  // LOGGING OUT --------------------------------------------------

  const logout = () => {
    loginFormContainer.classList.remove("hidden"); // Show login form
    displayContainer.classList.add("hidden"); // Hide user homepage

    usernameInput.value = ""; // Clear login input
  };

  logoutBtn.addEventListener("click", () => {
    logout();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const adminNavBurger = document.getElementById("adminNavBurger");
  const adminNavListCollapse = document.getElementById("adminNavListCollapse");

  const userNavBurger = document.getElementById("userNavBurger");
  const userNavListCollapse = document.getElementById("userNavListCollapse");

  adminNavBurger.addEventListener("click", () => {
    // Manually toggle the 'show' class
    if (adminNavListCollapse.classList.contains("show")) {
      adminNavListCollapse.classList.remove("show");
    } else {
      adminNavListCollapse.classList.add("show");
    }
  });

  // Prevent Bootstrap from automatically adding the 'show' class
  adminNavListCollapse.addEventListener("hide.bs.collapse", (e) => {
    e.preventDefault(); // Prevent default behavior
    adminNavListCollapse.classList.remove("show");
  });

  adminNavListCollapse.addEventListener("show.bs.collapse", (e) => {
    e.preventDefault(); // Prevent default behavior
    adminNavListCollapse.classList.add("show");
  });

  userNavBurger.addEventListener("click", () => {
    // Manually toggle the 'show' class
    if (userNavListCollapse.classList.contains("show")) {
      userNavListCollapse.classList.remove("show");
    } else {
      userNavListCollapse.classList.add("show");
    }
  });

  // Prevent Bootstrap from automatically adding the 'show' class
  userNavListCollapse.addEventListener("hide.bs.collapse", (e) => {
    e.preventDefault(); // Prevent default behavior
    userNavListCollapse.classList.remove("show");
  });

  userNavListCollapse.addEventListener("show.bs.collapse", (e) => {
    e.preventDefault(); // Prevent default behavior
    userNavListCollapse.classList.add("show");
  });
});

// AUDIO -------------------------------------------------

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const volumeControl = document.getElementById("volumeControl");

const togglePlay = () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = `<i class="bi bi-pause-fill"</i>`;
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="bi bi-play-fill"</i>`;
  }
};

const setVolume = (value) => {
  audio.volume = value;
};

playBtn.addEventListener("click", togglePlay);
volumeControl.addEventListener("change", (e) => {
  setVolume(e.target.value);
});
