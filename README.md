# OnTheTown App

Use this app to search for events by keyword and find restaurants nearby.  Link to a page where you can purchase tickets and save your events to your profile.

[Use the App Here](https://nightynight.herokuapp.com/)

##Approach
The first thing I tried to do was set up my routes involving my API calls.  The Eventful API was very frustrating because some of the keys in the opject returned would be an array in some restults and a key/value pair in another and sometimes null, so a lot of if...else statements needed to be put into place to display the restults correctly.  From there, I set up my Google Places API call.  From there, I set up my profile results and my delete buttons.  Then I added the map.  Lots of styling happened at the end but some was done along the way as well.

##Credits:
  * [jQuery](https://jquery.com/)
  * [Bootstrap](http://getbootstrap.com/)
  * [Google Fonts](https://www.google.com/fonts)
  * [Moment](http://momentjs.com/)
  * [Express](http://expressjs.com/)
  * [Passport](http://passportjs.org/)
  * [Eventful API](http://api.eventful.com/)
  * [Google Maps API](https://developers.google.com/maps/)
  * [Google Places API](https://developers.google.com/places/)


##Known Issues:
  * If you are not logged in when you get to the "Buy" button, it will take you to the log in page, and once you are logged in, it kicks you back to the homepage, making you go through the search all over again.
  * Would like to trigger the modal when you need to log in or sign up rather than redirecting to the log in or sign up page. (I figured out a way to get this to happen but the backend route still runs so it still redirects to the log in or sign up page unless I cut out the .catch portion of the route).
  * Google Maps map labels stay open once clicked.  Would like to be able to automatically close the open label when clicking on a new marker.
  * Some of the copy pulled from the eventful API is still coming back with markup due to the way the info is entered on the API end.
  * Would like to open the buy tab while keeping the focus on the current window.
  * Would like to be able to search for events in your area by adding another search field.
  * Would like to be able to edit profile info, like name, email, or password.
  * Would like to work more on styling.
  * Would like to add GroupOn API, Factual API, and Happy Hour results.
  * Would like to find a better event API.  Wanted to use Brown Paper Tickets but they don't have a search function on their API.
  * Fix the label for the venue on the map to say the venue name and address.
  * Pull up bigger images for the events and find a way to make the whitespace around them disappear.
  * Need to debug in other browsers and operating systems
  * Some of the tests are failing now.
  * Rename the repo and heroku project to OnTheTown.
