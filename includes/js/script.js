// MITCHELL SAREMBA - ICS128 - Midterm

/**
 * GenericUser defines attributes and behaviours that are common among both
 * instances of the User class and instances of the Admin class
 */
class GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._username = username;
    this._profilePic = profilePic;
    this._admin = false;
  }

  /**
   * Generates a list item in Bootstrap nav tab format
   *
   * @param {l} obj specifies the object who's information is interpolated
   * @param {*} counter is used to keep track of the first item on the list to
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

  /**
   * Generates bootstrap nav tab content for their associated list item
   *
   * @param {object} obj specifies the object who's information is interpolated
   * @param {integer} counter is used to keep track of the first item on the list to
   * include the "show active" bootstrap class
   * @returns a <div> element of class tab-pane, containing a bootstrap card with
   * obj (user) that displays user information
   */
  generateNavItem = (obj, counter) => {
    return `
      <div class="container tab-pane fade ${
        counter === 0 ? "show active" : ""
      }" id="${obj.username}" role="tabpanel">
        <div class="card w-100 mw-100 m-0 d-flex flex-column flex-md-row bg-dark text-light">
          <img class="profile-img justify-self-center align-self-center m-2" src="${
            obj.profilePic
          }" alt="${obj.firstName} ${obj.lastName}">
          <div id="${
            obj.username
          }CardBody" class="card-body d-flex flex-column justify-content-center align-items-center p-1 m-1 mw-75 bg-dark text-light">
            <h5 class="card-title">${obj.firstName} ${obj.lastName}</h5>
            <ul id="${obj.username}CardList" class="list-group p-2 mw-100">
            <li class="list-group-item p-1 fs-6">${obj.email}</li>
            <li class="list-group-item p-1">${obj.username}</li>
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

  handleAdminBurger = () => {
    document.getElementById("adminNavBurger").addEventListener("click", () => {
      console.log("clicked");
      console.log(adminNavList);
      document.getElementById("adminNavList").classList.remove("show");
    });
  };

  /**
   *
   */

  // Getters
  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }

  get username() {
    return this._username;
  }

  get profilePic() {
    return this._profilePic;
  }

  get admin() {
    return this._admin;
  }

  // Setters
  set firstName(firstName) {
    this._firstName = firstName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  set email(email) {
    this._email = email;
  }

  set username(username) {
    this._username = username;
  }

  set profilePic(profilePic) {
    this._profilePic = profilePic;
  }

  set admin(admin) {
    this._admin = admin;
  }
}

/**
 *
 *  The User class defines standard, unprivleged users
 *
 */
class User extends GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    super(firstName, lastName, email, username, profilePic);

    User.users.push(this); // Add this instance to list of users
  }

  static users = []; // To keep a dynamic list of User objects as they are created

  /**
   * Displays homepage for this User after a successful login
   * Constructs two bootstrap nav tab containers
   * Displays current users profile in upper container, admin profiles in lower container
   * Takes hardcoded html elements as params and generates their innerHTML
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
    adminNavItems
  ) => {
    // Clear all previous content
    block.innerHTML = ``;

    // Variables to store generated HTML - makes it easier add it to the DOM all at once rather then bit by bit
    let userNavListHTML = ``;
    let userNavItemsHTML = ``;
    let adminNavListHTML = ``;
    let adminNavItemsHTML = ``;

    // Counter to keep track of first iteration of loops to add "active" class
    let activeCount = 0;

    // Add the current user first so their profile is displayed

    // Add current user list item
    userNavListHTML += this.generateNavListItem(this, activeCount);

    // Add associated content for that nav tab
    userNavItemsHTML += this.generateNavItem(this, activeCount);

    // Add all of the admin to the admin nav list
    for (let admin of Admin.admins) {
      adminNavListHTML += this.generateNavListItem(admin, activeCount);

      activeCount += 1;
    }

    activeCount = 0; // Reset counter

    // Add associated content for admin list
    for (let admin of Admin.admins) {
      adminNavItemsHTML += this.generateNavItem(admin, activeCount);

      activeCount += 1;
    }

    // Add user content to DOM
    userNavList.innerHTML = userNavListHTML;
    userNavItems.innerHTML = userNavItemsHTML;
    userDisplay.appendChild(userNavList);
    userDisplay.appendChild(userNavItems);

    // Add admin content to DOM
    adminNavList.innerHTML = adminNavListHTML;
    adminNavItems.innerHTML = adminNavItemsHTML;
    adminDisplay.appendChild(adminNavList);
    adminDisplay.appendChild(adminNavItems);

    // Append children to outer container
    block.appendChild(userDisplay);
    block.appendChild(adminDisplay);

    homepageTitle.innerText = `Welcome, ${this.firstName} ${this.lastName}`;
  };
}

/**
 *  The Admin class is similar to User, but with increased privledges
 *
 */
class Admin extends GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    super(firstName, lastName, email, username, profilePic);

    Admin.admins.push(this); // Add current instance to list
  }

  static admins = []; // Dynamically keeps an array of Admin instances
  modalElements = [];

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
    adminNavListCollapse
  ) => {
    // Clear all previous content
    // block.innerHTML = ``;

    // Store new content
    let userNavListHTML = ``;
    let userNavItemsHTML = ``;
    let adminNavListHTML = ``;
    let adminNavItemsHTML = ``;

    let activeCount = 0; // Keep track of first item in list

    // Add the current user (Admin) first
    adminNavListHTML += this.generateNavListItem(this, activeCount);
    adminNavItemsHTML += this.generateNavItem(this, activeCount);
    activeCount += 1;

    // Add all of the admin to the admin nav list
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

    for (let user of User.users) {
      userNavItemsHTML += this.generateNavItem(user, activeCount);

      activeCount += 1;
    }

    userNavList.innerHTML = userNavListHTML;
    userNavItems.innerHTML = userNavItemsHTML;
    userNavListCollapse.appendChild(userNavList);
    userDisplay.appendChild(userNavItems);

    adminNavList.innerHTML = adminNavListHTML;
    adminNavItems.innerHTML = adminNavItemsHTML;
    adminNavListCollapse.appendChild(adminNavList);
    adminDisplay.appendChild(adminNavItems);

    homepageTitle.innerText = `Welcome, ${this.firstName} ${this.lastName}`;

    this.addDeleteBtnsForUsers();
    // this.addListenerToDeleteBtns();
  };

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
   * Create delete button
   */
  createDeleteBtn(user) {
    const btn = document.createElement("button");
    btn.classList = "btn btn-danger mx-4 mt-2 p-1 ";
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", `#${user.username}DeleteModal`);
    btn.textContent = `Delete`;

    return btn;
  }

  /**
   * Adds delete buttons to each user profile, giving Admins the ability to
   * delete user profiles
   * It also gets a bunch of information about the user as it's adding the button
   * to the profile, which will be destructured later when adding event listeners to
   * the button
   */
  addDeleteBtnsForUsers = () => {
    for (let user of User.users) {
      // Get ul that's in user's card
      let cardList = document.getElementById(`${user.username}CardList`);
      let btn = this.createDeleteBtn(user);
      let modalElements = this.getElementsForDeleteModal(user, btn);

      cardList.appendChild(btn);
      this.addListenerToDeleteBtns(modalElements);
    }
  };

  /**
   *  Adds an event listener to each delete button of user profiles
   *  that removes the buttons parent element (the profile card)
   *  and removes the list item associated with that card
   *
   */
  addListenerToDeleteBtns = (modalElementsObj) => {
    let { div, button, li, modal, modalDeleteBtn, modalCancelBtn } =
      modalElementsObj;

    modal = new bootstrap.Modal(modal);
    button.addEventListener("click", () => {
      // Pop up modal - Are you sure you want to delete?
      // If yes,
      modal.show();

      modalDeleteBtn.addEventListener("click", () => {
        console.log(div);
        div.remove();
        li.remove();
      });

      modalCancelBtn.addEventListener("click", () => {
        modal.hide();
      });

      // TODO: Think about deleting the user from the actual arrw
    });
  };
}

// Create Admin instances
let bilbo = new Admin(
  "Bilbo",
  "Baggins",
  "bilbo@shire.orc",
  "bilbo",
  "images/bilbo.webp"
);

let gandalf = new Admin(
  "Gandalf",
  "the Grey",
  "gandalf@shire.orc",
  "gandalf",
  "images/gandalf_profilepic.jpeg"
);

let tomBombadil = new Admin(
  "Tom",
  "Bombadil",
  "tommy@shire.orc",
  "tombom",
  "images/tombom.webp"
);

// Create User instances
let frodo = new User(
  "Frodo",
  "Baggins",
  "frodo@shire.orc",
  "frodo",
  "images/frodo.webp"
);

let samwise = new User(
  "Samwise",
  "Gamgee",
  "sammyg@shire.orc",
  "samwise",
  "images/samwise.webp"
);

let pippin = new User(
  "Peregrin",
  "Took",
  "pippin@shire.orc",
  "pippin",
  "images/pippin.webp"
);

let merry = new User(
  "Meriadoc",
  "Brandybuck",
  "merry@shire.orc",
  "merry",
  "images/merry.webp"
);

let gimli = new User(
  "Gimli",
  "Son of Glóin",
  "gimli@dwarf.orc",
  "gimli",
  "images/gimli.webp"
);

let elrond = new User(
  "Elrond",
  "Half-elven",
  "elrond@riv.orc",
  "elrond",
  "images/elrond.webp"
);

let aragorn = new User(
  "Aragorn",
  "",
  "aragorn@gondor.orc",
  "aragorn",
  "images/aragorn.webp"
);

let gollum = new User(
  "Gollum",
  "",
  "gollum@midearth.orc",
  "gollum",
  "images/gollum.webp"
);

let lobelia = new User(
  "Lobelia",
  "Sackville-Baggins",
  "lobeliosity@shire.orc",
  "lobelia",
  "images/lobelia.webp"
);

let legolas = new User(
  "Legolas",
  "",
  "legoboy@riv.orc",
  "legolas",
  "images/legolas.webp"
);

let sauron = new User(
  "Sauron",
  "",
  "sauron@midearth.orc",
  "sauron",
  "images/sauron.webp"
);

let saruman = new User(
  "Saruman",
  "the White",
  "saru@midearth.orc",
  "saruman",
  "images/saruman.webp"
);

const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginFormContainer = document.getElementById("loginFormContainer");
const userDisplayContainer = document.getElementById("userDisplayContainer");

const adminNavList = document.getElementById("adminNavList");
const adminNavItems = document.getElementById("adminNavItems");
const adminNavListCollapse = document.getElementById("adminNavListCollapse");
const userNavList = document.getElementById("userNavList");
const userNavItems = document.getElementById("userNavItems");
const userDisplay = document.getElementById("userDisplay");
const adminDisplay = document.getElementById("adminDisplay");
const homepageTitle = document.getElementById("homepageTitle");
const usernameInput = document.getElementById("usernameInput");

const logout = () => {
  loginFormContainer.classList.remove("hidden");
  userDisplayContainer.classList.add("hidden");

  usernameInput.value = "";
};

const logoutBtn = document.getElementById("logoutBtn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get username value entered by user
  const usernameInputValue = usernameInput.value;

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

  // If it's a registered user
  if (usernames.includes(usernameInputValue)) {
    currentUser.displayHomepage(
      userDisplayContainer,
      userNavList,
      userNavItems,
      adminNavList,
      adminNavItems,
      homepageTitle,
      adminNavListCollapse,
      userNavListCollapse
    );

    userDisplayContainer.classList.remove("hidden"); // Show homepage content
    loginFormContainer.classList.add("hidden"); // Hide login page content
  }
});

logoutBtn.addEventListener("click", () => {
  logout();
});

// document.addEventListener("DOMContentLoaded", () => {
//   adminNavBurger.addEventListener("click", () => {
//     setTimeout(() => {
//       adminNavListCollapse.classList.remove("show");
//     }, 500);
//   });
// });

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
