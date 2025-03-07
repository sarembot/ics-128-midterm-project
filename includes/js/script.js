// MITCHELL SAREMBA - ICS128 - Midterm

/**
 *
 * The GenericUser class defines common attributes for all users
 *
 **/
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
   * Method for generating tab nav list items by interpolating information
   * from GenericUser objects
   *
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
   * Method for generating tab nav content by interpolating information from
   * GenericUser objects
   *
   */
  generateNavItem = (obj, counter) => {
    return `
      <div class="tab-pane fade ${counter === 0 ? "show active" : ""}" id="${
      obj.username
    }" role="tabpanel">
        <div class="card w-100 m-0 d-flex flex-column flex-md-row">
          <img class="profile-img justify-self-center align-self-center m-2" src="${
            obj.profilePic
          }" alt="${obj.firstName} ${obj.lastName}">
          <div id="${
            obj.username
          }CardBody" class="card-body d-flex flex-column justify-content-center align-items-center p-1 m-1">
            <h5 class="card-title">${obj.firstName} ${obj.lastName}</h5>
            <ul id="${obj.username}CardList" class="list-group p-2">
            <li class="list-group-item">${obj.email}</li>
            <li class="list-group-item">${obj.username}</li>
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
              }DeleteModalLabel" class="modal-title">Delete User</h5>
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
    this._admin = false;
    User.users.push(this); // Add this instance to list of users
  }

  static users = []; // To keep a dynamic list of User objects as they are created

  /**
   * Method that displays the homepage for each user after a successful login
   * Display a bootstrap nav with tabs for each user type (User and Admin)
   * In the case of a normal user, it displays their profile and all admin
   *
   */
  displayHomepage = (
    block, // Outer container
    userNavList, // Stores nav tab list items for users
    userNavItems, // Stores nav tab content for users
    adminNavList, // Stores nav tab list items for admins
    adminNavItems // Stores nav tab content for admins
  ) => {
    // Clear all previous content
    block.innerHTML = ``;

    // Variables to store generated HTML - makes it easier add it to the DOM all at once rather then bit by bit
    let userNavListContent = ``;
    let userNavItemsContent = ``;
    let adminNavListContent = ``;
    let adminNavItemsContent = ``;

    // Counter to keep track of first iteration of loops to add "active" class
    let activeCount = 0;

    // Add the current user first so their profile is displayed

    // Add current user list item
    userNavListContent += this.generateNavListItem(this, activeCount);

    // Add associated content for that nav tab
    userNavItemsContent += this.generateNavItem(this, activeCount);

    // Add all of the admin to the admin nav list
    for (let admin of Admin.admins) {
      adminNavListContent += this.generateNavListItem(admin, activeCount);

      activeCount += 1;
    }

    activeCount = 0; // Reset counter

    // Add associated content for admin list
    for (let admin of Admin.admins) {
      adminNavItemsContent += this.generateNavItem(admin, activeCount);

      activeCount += 1;
    }

    // Add user content to DOM
    userNavList.innerHTML = userNavListContent;
    userNavItems.innerHTML = userNavItemsContent;
    userDisplay.appendChild(userNavList);
    userDisplay.appendChild(userNavItems);

    // Add admin content to DOM
    adminNavList.innerHTML = adminNavListContent;
    adminNavItems.innerHTML = adminNavItemsContent;
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
 *  Privledges:
 *    - View every user profile
 *    - Make changes to normal users - including deleting profiles
 */
class Admin extends GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    super(firstName, lastName, email, username, profilePic);

    this._admin = true;
    Admin.admins.push(this); // Add current instance to list
  }

  static admins = []; // Dynamically keeps an array of Admin instances
  deleteBtns = [];

  /**
   *
   * For instance of Admin, the displayHomepage() method displays all User profiles in addition to all Admin profiles
   * This is distinct from the displayHomepage() method in the User class, which displays just the current
   * user's profile along with all Admin profiles
   *
   */
  displayHomepage = (
    block,
    userNavList,
    userNavItems,
    adminNavList,
    adminNavItems,
    homepageTitle
  ) => {
    // Clear all previous content
    // block.innerHTML = ``;

    // Store new content
    let userNavListContent = ``;
    let userNavItemsContent = ``;
    let adminNavListContent = ``;
    let adminNavItemsContent = ``;
    let activeCount = 0;

    // Add the current user (Admin) first
    adminNavListContent += this.generateNavListItem(this, activeCount);
    adminNavItemsContent += this.generateNavItem(this, activeCount);
    activeCount += 1;

    // Add all of the admin to the admin nav list
    for (let admin of Admin.admins) {
      if (admin.username === this.username) continue; // So the current user isn't added twice

      adminNavListContent += this.generateNavListItem(admin, activeCount);
    }

    // Add all of the associated content for each admin
    for (let admin of Admin.admins) {
      if (admin.username === this.username) continue;

      adminNavItemsContent += this.generateNavItem(admin, activeCount);
    }

    activeCount = 0;

    // Add all of the users to the user nav
    for (let user of User.users) {
      userNavListContent += this.generateNavListItem(user, activeCount);

      activeCount += 1;
    }

    activeCount = 0;

    for (let user of User.users) {
      userNavItemsContent += this.generateNavItem(user, activeCount);

      activeCount += 1;
    }

    userNavList.innerHTML = userNavListContent;
    userNavItems.innerHTML = userNavItemsContent;
    userDisplay.appendChild(userNavList);
    userDisplay.appendChild(userNavItems);

    adminNavList.innerHTML = adminNavListContent;
    adminNavItems.innerHTML = adminNavItemsContent;
    adminDisplay.appendChild(adminNavList);
    adminDisplay.appendChild(adminNavItems);

    homepageTitle.innerText = `Welcome, ${this.firstName} ${this.lastName}`;

    this.addDeleteBtnsForUsers();
    this.addListenerToDeleteBtns();
  };

  /**
   * Adds delete buttons for each user, giving Admins the ability to
   * delete user profiles
   *
   */
  addDeleteBtnsForUsers = () => {
    // For every user
    for (let user of User.users) {
      // Get their tab pane container
      const div = document.getElementById(user.username);
      const cardList = document.getElementById(`${user.username}CardList`);
      // Get their associated tab list item
      const li = document.getElementById(`${user.username}Li`);
      const modal = document.getElementById(`${user.username}DeleteModal`);
      const modalDeleteBtn = document.getElementById(
        `${user.username}ModalDeleteBtn`
      );
      const modalCancelBtn = document.getElementById(
        `${user.username}ModalCancelBtn`
      );

      const btn = document.createElement("button");
      btn.classList = "btn btn-danger mx-5 mt-2 ";
      btn.setAttribute("data-bs-toggle", "modal");
      btn.setAttribute("data-bs-target", `#${user.username}DeleteModal`);
      btn.textContent = `Delete ${user.username}`;

      // Append a child inside their card
      cardList.appendChild(btn);

      // Add their button and list item to an array so we can
      // add the event listeners later
      this.deleteBtns.push({
        div: div,
        button: btn,
        li: li,
        modal: modal,
        modalDeleteBtn: modalDeleteBtn,
        modalCancelBtn: modalCancelBtn,
      });
    }
  };

  /**
   *  Adds an event listener to each delete button of user profiles
   *  that removes the buttons parent element (the profile card)
   *  and removes the list item associated with that card
   *
   */
  addListenerToDeleteBtns = () => {
    this.deleteBtns.forEach((obj) => {
      let { div, button, li, modal, modalDeleteBtn, modalCancelBtn } = obj;
      modal = new bootstrap.Modal(modal);
      button.addEventListener("click", () => {
        // Pop up modal - Are you sure you want to delete?
        // If yes,
        modal.show();

        modalDeleteBtn.addEventListener("click", () => {
          div.remove();
          li.remove();
        });

        modalCancelBtn.addEventListener("click", () => {
          modal.hide();
        });
        // div.remove(); // Remove the card (the button's parent)
        // li.remove(); // Remove the associated list item

        // If no, close modal

        // TODO: Think about deleting the user from the actual arrw
      });
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
  "elrond@rivendell.orc",
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
  ", son of Thranduil",
  "legomyeggo@rivendell.orc",
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
  "saruman@midearth.orc",
  "saruman",
  "images/saruman.webp"
);

const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginFormContainer = document.getElementById("loginFormContainer");
const userDisplayContainer = document.getElementById("userDisplayContainer");

const adminNavList = document.getElementById("adminNavList");
const adminNavItems = document.getElementById("adminNavItems");
const userNavList = document.getElementById("userNavList");
const userNavItems = document.getElementById("userNavItems");
const userDisplay = document.getElementById("userDisplay");
const adminDisplay = document.getElementById("adminDisplay");
const homepageTitle = document.getElementById("homepageTitle");

const logout = () => {
  loginFormContainer.classList.remove("hidden");
  userDisplayContainer.classList.add("hidden");
};

const logoutBtn = document.getElementById("logoutBtn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get username value entered by user
  const usernameInputValue = document.getElementById("usernameInput").value;

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
      homepageTitle
    );

    userDisplayContainer.classList.remove("hidden"); // Show homepage content
    loginFormContainer.classList.add("hidden"); // Hide login page content
  }
});

logoutBtn.addEventListener("click", () => {
  logout();
});
