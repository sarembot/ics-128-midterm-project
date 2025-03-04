// MITCHELL SAREMBA - ICS128 - Midterm

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

class User extends GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    super(firstName, lastName, email, username, profilePic);
    this._admin = false;
    User.users.push(this); // Add this instance to list of users
  }

  static users = [];
  /**
   * Method that displays the homepage for each user after a successful login
   * It adds a bootstrap card carousel item for each appropriate profile
   * In the case of a normal user, it displays their profile and all admin
   *
   */
  displayHomepage = (block, navList, navItemsBlock) => {
    block.innerHTML = ``;

    let navListContent = ``;
    let navItemsBlockContent = ``;
    let activeCount = 0;

    navListContent += `
        <li class="nav-item" role="presentation">
          <a class="nav-link active" data-bs-toggle="tab" href="#${this.username}">${this.username}</a>
        </li>
   `;

    for (let admin of Admin.admins) {
      navListContent += `
        <li class="nav-item" role="presentation">
          <a class="nav-link" data-bs-toggle="tab" href="#${admin.username}">${admin.username}</a>
        </li>
      `;
      activeCount += 1;
    }

    navItemsBlockContent += `
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

    activeCount = 0;

    for (let admin of Admin.admins) {
      navItemsBlockContent += `
          <div class="tab-pane container fade" id=${admin.username} role="tabpanel">
            <div class="card w-100 m-0">
              <img class="card-img-top" src="${admin.profilePic}" alt="${admin.firstName} ${admin.lastName}">
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
    navList.innerHTML = navListContent;
    navItemsBlock.innerHTML = navItemsBlockContent;

    block.appendChild(navList);
    block.appendChild(navItemsBlock);
  };
}

class Admin extends GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    super(firstName, lastName, email, username, profilePic);

    this._admin = true;
    Admin.admins.push(this);
  }

  static admins = [];

  displayHomepage = (block) => {
    let content = ``; // To store inner-carousel content

    block.innerHTML = ``; // Clear previous

    document.getElementById("userTitle").innerText = `
    Welcome ${this.firstName}
    `;

    content += `
      <div class="carousel-item w-100 active"
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${this.profilePic}" alt="${this.firstName} ${this.lastName}">
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

    for (let admin of Admin.admins) {
      // If it's not an admin and it's not the current user
      // if (!user.admin && this.username != user.username) continue;
      if (admin === this) continue;

      content += `
      <div class="carousel-item w-100"
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${admin.profilePic}" alt="Gandalf the Grey">
          <div class="card-body d-flex justify-content-center align-items-center flex-column">
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

    for (let user of User.users) {
      // If it's not an admin and it's not the current user
      // if (!user.admin && this.username != user.username) continue;

      content += `
      <div class="carousel-item w-100"
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="..." alt="${user.profilePic}">
          <div class="card-body d-flex justify-content-center align-items-center flex-column">
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
    }

    block.innerHTML = content;
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

console.log(User.users);
console.log(Admin.admins);

const userDisplay = document.getElementById("userDisplay");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginFormContainer = document.getElementById("loginFormContainer");
const loginBlock = document.getElementById("loginBlock");
const homeBlock = document.getElementById("homeBlock");
const userCarousel = document.getElementById("userCarousel");
const userCarouselInner = document.getElementById("userCarouselInner");

const navList = document.getElementById("navList");
const navItemsBlock = document.getElementById("navItemsBlock");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // I want to run a validation to check if the user.username is in my list of users
  // then bring up the homepage
  const usernameInputValue = document.getElementById("usernameInput").value;

  let usernames = [];
  let allUsers = User.users.concat(Admin.admins);
  console.log(allUsers);

  // Really basic validation
  // TODO: Improve to have some more strict matching conditions (or less strict - case sensitivity)
  allUsers.forEach((user) => {
    usernames.push(user.username);
  });

  console.log(usernames);

  let userIndex = allUsers.findIndex(
    (user) => usernameInputValue === user.username
  );
  let currentUser = allUsers[userIndex];

  if (usernames.includes(usernameInputValue)) {
    // currentUser.moveCurrentUserToFrontOfArray(User.users, userIndex);
    // currentUser.displayHomepage(userCarouselInner);
    currentUser.displayHomepage(userDisplay, navList, navItemsBlock);

    userDisplay.classList.remove("hidden");
    loginFormContainer.classList.add("hidden");
  }
});
