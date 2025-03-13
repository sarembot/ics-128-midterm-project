### MITCHELL SAREMBA / ICS-128 MIDTERM PROJECT / WINTER 2025

## QUICK START

Project is Lord of the Rings themed, so all of the usernames follow that theme.

To get started quickly, enter one of the following usernames into the login page input:

- bilbo (to login as an admin)
- frodo (to login as a regular user)

All usernames are case insensitive and there is no password required.

You can also press play on the audio controller in the bottom left for some LOTR themed music.

## PROJECT SUMMARY

Each instance of user is instantiated as either an Admin or a User class. When a user logs in, the displayHomepage() method is called on the current user logging in. There are two displayHomepage() methods, one for the User class, and one for the Admin class. Depending on the class of the user, different homepages with differnt permissions will be displayed.

## FULL LIST OF USERNAMES

# ADMIN

- bilbo
- gandalf
- tom

# USERS

- frodo
- boromir
- meriadoc
- samwise
- gimli
- legolas
- lobelia
- thrór
- peregrin
- gollum
- saruman
- sauron
- smaug

## CLASS STRUCTURE

The program uses classes to organize the code and give permissions to users. The majority of the program's functionality is contained in 3 classes: GenericUser, User, and Admin.

# GenericUser

Superclass to both User and Admin, and it defines the properties and methods that are common among User and Admin. It defines the following properties:

name, username, email, race, height, img, birth, death, wiki

It includes the following methods:

    generateNavListItem() - generates a bootstrap list item by interpolating properties of a GenericUser

    generateNavItem() - generates content for a bootstrap nav tab item by interpolating properties of a GenericUser

# User

A subclass of GenericUser and it defines standard, unprivledged users.

It includes the following method:

    displayHomepage() - displays homepage for this User after a successful login. It displays the current user's profile and all admin profiles.

# Admin

A subclass of GenericUser and is similar to User, but it includes functionality which gives instances of Admin increased functionality over instances of User

It includes the following methods:

    displayHomepage() - displays homepage for this Admin after a successful login. It display the all Admin profiles and all User profiles with delete buttons.

    getElementsForDeleteModal() - helper function that is used to extract DOM elements for creating a modal for deleting each instance of User

    createDeleteBtn() - helper function that creates a delete button for each instance of User

    addListenerToDeleteBtns() - helper function that adds a listener to each instance of User's delete button

    addDeleteBtnsForUsers() - uses createDeleteBtn(), getElementsForDeleteModal(), and addListenerToDeleteBtns() when looping through each instance of User to add a delete button with custom modal elements for each user

## ASYNC COMPONENT

As I was putting the finishing touches on my project, it occured to me that I could maybe find an API to get some data from for my characters. I found https://the-one-api.dev/ and decided to try and fetch some of the data they had to add to my user profiles.

This turned into a bit of a headache as I tried to integrate the data into my original project structure. I had to change a lot about how my objects were instantiated, but I learned a lot about working with async functions.

The following methods facilitate the API call and async component of the program:

    async getUserData() - fetches data for each character from the one API

    generateUsername(name) - takes a name as a parameter and formats it into a suitable username

    createUser(name, user) - takes a name parameter and a GenericUser parameter and creates an instance of either Admin or User using a generated username, email, and img value, along with fetched data (name, race, height, birth, death, wikiUrl)

    async createUsers() - awaits a call for getUserData(), and then uses that data to call createUser() on each array item in the response. Results in the creation of all the programs users

## LOGGING IN

When a user logs in, the username that was entered is checked against a regex to make sure it contains only valid characters, and then it is checked to see if it is actually in the array of usernames. If validation is successful, the displayHomepage() method is called for that username

# LOGGING OUT

When a user clicks the logout button, a modal pops up to ask if they're sure they want to logout. If yes, the user's homepage is hidden and their taken back to the login page with an empty input.
