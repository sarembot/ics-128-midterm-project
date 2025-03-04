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
   *
   */
  displayHomepage = (
    block, // Outer container
    userNavList, // To store nav tab list items for users
    userNavItems, // To store nav tab content for users
    adminNavList, // To store nav tab list items for admins
    adminNavItems // To store nav tab content for admins
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

    // Add a list item to nav
    userNavListContent += `
        <li class="nav-item p-0" role="presentation">
          <a class="nav-link p-1 active" data-bs-toggle="tab" href="#${this.username}">${this.username}</a>
        </li>
   `;

    // Add associated content for that nav tab
    userNavItemsContent += `
      <div class="tab-pane container fade show active" id=${this.username} role="tabpanel">
        <div class="card w-100 m-0">
          <img class="card-img-top rounded img" src="${this.profilePic}" alt="${this.firstName} ${this.lastName}">
          <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <h5 class="card-title">${this.firstName} ${this.lastName}</h5>
            <ul class="list-group p-2">
            <li class="list-group-item">${this.email}</li>
            <li class="list-group-item">${this.username}</li>
            </ul>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    `;

    // Add all of the admin to the admin nav list
    for (let admin of Admin.admins) {
      adminNavListContent += `
       <li class="nav-item p-0" role="presentation">
         <a class="nav-link p-1 ${
           // If it's the first iteration, add class "active"
           activeCount === 0 ? "active" : ""
         }" data-bs-toggle="tab" href="#${admin.username}">${admin.username}</a>
       </li>
     `;
      activeCount += 1;
    }

    activeCount = 0; // Reset counter

    // Add associated content for admin list
    for (let admin of Admin.admins) {
      adminNavItemsContent += `
     <div class="tab-pane container fade ${
       // If first item, add class "show active"
       activeCount === 0 ? "show active" : ""
     }" id=${admin.username} role="tabpanel">
            <div class="card w-100 m-0 d-flex flex-column flex-md-row">
              <img class="card-img-top img-thumbnail" src="${
                admin.profilePic
              }" alt="${admin.firstName} ${admin.lastName}">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">${admin.firstName} ${admin.lastName}</h5>
                <ul class="list-group p-2">
                  <li class="list-group-item">${admin.email}</li>
                  <li class="list-group-item">${admin.username}</li>
                </ul>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
      `;
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
  };
}

/**
 *
 *  The Admin class is similar to User, but with increased privledges
 *
 *  Privledges:
 *    - View every user profile
 *    - Make changes to normal users - including deleting profiles
 *
 *
 */
class Admin extends GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    super(firstName, lastName, email, username, profilePic);

    this._admin = true;
    Admin.admins.push(this); // Add current instance to list
  }

  static admins = []; // Dynamically keeps an array of Admin instances

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
    adminNavItems
  ) => {
    // Clear all previous content
    block.innerHTML = ``;

    // Store new content
    let userNavListContent = ``;
    let userNavItemsContent = ``;
    let adminNavListContent = ``;
    let adminNavItemsContent = ``;
    let activeCount = 0;

    // Add the current user first
    adminNavListContent += `
        <li class="nav-item" role="presentation">
          <a class="nav-link active" data-bs-toggle="tab" href="#${this.username}">${this.username}</a>
        </li>
   `;

    adminNavItemsContent += `
      <div class="tab-pane container fade show active" id=${this.username} role="tabpanel">
        <div class="card w-100 m-0 d-flex flex-column flex-md-row">
          <img class="card-img-top img-thumbnail" src="${this.profilePic}" alt="${this.firstName} ${this.lastName}">
          <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <h5 class="card-title">${this.firstName} ${this.lastName}</h5>
            <ul class="list-group p-2">
            <li class="list-group-item">${this.email}</li>
            <li class="list-group-item">${this.username}</li>
            </ul>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    `;

    // Add all of the admin to the admin nav
    for (let admin of Admin.admins) {
      if (admin.username === this.username) continue; // So the currentUser isn't added twice

      adminNavListContent += `
       <li class="nav-item" role="presentation">
         <a class="nav-link" data-bs-toggle="tab" href="#${admin.username}">${admin.username}</a>
       </li>
     `;
    }

    for (let admin of Admin.admins) {
      adminNavItemsContent += `
     <div class="tab-pane container fade" id=${admin.username} role="tabpanel">
            <div class="card w-100 m-0 d-flex flex-column flex-md-row">
              <img class="card-img-top img-thumbnail" src="${admin.profilePic}" alt="${admin.firstName} ${admin.lastName}">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">${admin.firstName} ${admin.lastName}</h5>
                <ul class="list-group p-2">
                  <li class="list-group-item">${admin.email}</li>
                  <li class="list-group-item">${admin.username}</li>
                </ul>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
      `;
    }

    activeCount = 0;

    // Add all of the users to the user nav
    for (let user of User.users) {
      userNavListContent += `
       <li class="nav-item" role="presentation">
         <a class="nav-link ${
           activeCount === 0 ? "active" : ""
         }" data-bs-toggle="tab" href="#${user.username}">${user.username}</a>
       </li>
     `;
      activeCount += 1;
    }

    activeCount = 0;

    for (let user of User.users) {
      userNavItemsContent += `
     <div class="tab-pane container fade ${
       activeCount === 0 ? "show active" : ""
     }" id=${user.username} role="tabpanel">
            <div class="card w-100 m-0 d-flex flex-column flex-md-row">
              <img class="card-img-top img-thumbnail" src="${
                user.profilePic
              }" alt="${user.firstName} ${user.lastName}">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
                <ul class="list-group p-2">
                  <li class="list-group-item">${user.email}</li>
                  <li class="list-group-item">${user.username}</li>
                </ul>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
      `;

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

    block.appendChild(adminDisplay);
    block.appendChild(userDisplay);
  };
}

// Users
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
  "tommysmokes@shire.orc",
  "tombom",
  "images/tombom.webp"
);

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

let gollum = new User(
  "Gollum",
  "",
  "gollum@midearth.orc",
  "gollum",
  "images/gollum.webp"
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
      adminNavItems
    );

    userDisplayContainer.classList.remove("hidden"); // Show homepage content
    loginFormContainer.classList.add("hidden"); // Hide login page content
  }
});
