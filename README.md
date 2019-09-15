# Did UVA Win?

<img height="40%" width="40%" src="https://i.imgur.com/KSeFkJy.png">

## Wahoo-what?
Want to know if UVA won in basketball and football? [DidUVAWin.com](http://diduvawin.com) has the answer!

[DidUVAWin.com](http://diduvawin.com) shows a big "YES", "NO", or "NOT YET" for all UVA basketball and football games. While a game's still in play, it shows "NOT YET", updating the score shown with each refresh of the page. Once a game is finished, it most likely changes to "YES"...but it can also change to "NO".

## Wahoo-why?
Want to always know how UVA Men's Basketball and Football is doing? Change your homepage to [DidUVAWin.com](http://diduvawin.com)! Missed the game and need to quickly find out how your favorite team did, but ESPN takes too long to load? Check [DidUVAWin.com](http://diduvawin.com)! Want to support a fellow 'Hoo that developed this application? Use [DidUVAWin.com](http://diduvawin.com)!

## Wa-who?-wa
This is an unofficial UVA Men's Basketball and Football project made by Jake Kenneally. It is not affiliated with the University of Virginia or Virginia Athletics in any way.

If you're interested in building a similar page for your school, please get in contact!

## Wa-how?-wa
A Node.js app using [Express](http://expressjs.com/) and built on Heroku.

The ESPN ID for UVA is stored in `constants.ts`. Upon load, the app makes two requests for schedules, one for football and one for men's basketball, and determines which game is the most recent game that is not in the future. Then, it figures out if the game is still ongoing. If it is, the app shows "NOT YET" and the score at the bottom of the page. Otherwise, it checks to see if UVA was the winner by matching on the ID in `constants.ts` and shows the appropriate message and scores from the game.

### Running locally
To run this application locally, first run:

    yarn
    
to install all dependencies and build the `dist` directory. Then, run:

    yarn serve
    
and go to [localhost:5000](http://localhost:5000) to view the site.
