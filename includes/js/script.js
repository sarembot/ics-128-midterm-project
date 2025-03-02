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
  }

  /**
   * Method that displays the homepage for each user after a successful login
   * It adds a bootstrap card carousel item for each appropriate profile
   * In the case of a normal user, it displays their profile and all admin
   *
   */
  displayHomepage = (users, block) => {
    let slideCount = 0; // Keeps track for active slide
    let content = ``; // To store inner-carousel content

    block.innerHTML = ``; // Clear previous

    for (let user of users) {
      // If it's not an admin and it's not the current user
      if (!user.admin && this.username != user.username) continue;

      content += `
      <div class="carousel-item ${slideCount === 0 ? "active" : ""}"
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="..." alt="${user.profilePic}">
          <div class="card-body">
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

      slideCount += 1;
    }
    block.innerHTML = content;
  };
}

class Admin extends GenericUser {
  constructor(firstName, lastName, email, username, profilePic) {
    super(firstName, lastName, email, username, profilePic);

    this._admin = true;
  }
}

// Users
let bilbo = new Admin("Bilbo", "Baggins", "bilbo@shire.orc", "bilbo", "");
let gandalf = new Admin(
  "Gandalf",
  "the Grey",
  "gandalf@shire.orc",
  "gandalf",
  ""
);
let tomBombadil = new Admin(
  "Tom",
  "Bombadil",
  "tommysmokes@shire.orc",
  "tombom",
  ""
);
let frodo = new User("Frodo", "Baggins", "frodo@shire.orc", "frodo", "");
let samwise = new User("Samwise", "Gamgee", "sammyg@shire.orc", "samwise", "");
let pippin = new User("Peregrin", "Took", "pippin@shire.orc", "pippin", "");
let merry = new User("Meriadoc", "Brandybuck", "merry@shire.orc", "merry", "");
let gimli = new User("Gimli", "Son of Glóin", "gimli@dwarf.orc", "gimli", "");
let elrond = new User(
  "Elrond",
  "Half-elven",
  "elrond@rivendell.orc",
  "elrond",
  ""
);
let aragorn = new User("Aragorn", "", "aragorn@gondor.orc", "aragorn", "");
let orthoSackvilleBaggins = new User(
  "Orth",
  "Sackville-Baggins",
  "orthopedicsurgeon@shire.orc",
  "ortho",
  ""
);
let legolas = new User(
  "Legolas",
  ", son of Thranduil",
  "legomyeggo@rivendell.orc",
  "samwise",
  ""
);
let sauron = new User("Sauron", "", "sauron@midearth.orc", "sauron", "");
let saruman = new User(
  "Saruman",
  "the White",
  "saruman@midearth.orc",
  "saruman",
  ""
);
let gollum = new User("Gollum", "", "gollum@midearth.orc", "gollum", "");

let users = [
  bilbo,
  gandalf,
  tomBombadil,
  frodo,
  samwise,
  pippin,
  merry,
  gimli,
  elrond,
  aragorn,
  orthoSackvilleBaggins,
  legolas,
  sauron,
  saruman,
  gollum,
];

const userDisplay = document.getElementById("userDisplay");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const loginFormContainer = document.getElementById("loginFormContainer");
const loginBlock = document.getElementById("loginBlock");
const homeBlock = document.getElementById("homeBlock");
const userCarousel = document.getElementById("userCarousel");
const userCarouselInner = document.getElementById("userCarouselInner");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // I want to run a validation to check if the user.username is in my list of users
  // then bring up the homepage
  const usernameInputValue = document.getElementById("usernameInput").value;

  let userIndex;
  let usernames = [];

  // Really basic validation
  // TODO: Improve to have some more strict matching conditions (or less strict - case sensitivity)
  users.forEach((user) => {
    usernames.push(user.username);
  });

  userIndex = users.findIndex((user) => usernameInputValue === user.username);

  if (usernames.includes(usernameInputValue)) {
    users[userIndex].displayHomepage(users, userCarouselInner);
    userDisplay.classList.remove("hidden");
    loginFormContainer.classList.add("hidden");
  }
});
