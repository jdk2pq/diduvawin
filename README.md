# Did UVA Win?

<img height="40%" src="https://i.imgur.com/KSeFkJy.png">

## Wahoo-what?
Want to know if UVA won in basketball? [DidUVAWin.com](diduvawin.com) has the answer!

[DidUVAWin.com](diduvawin.com) shows a big "YES", "NO", or "NOT YET" for all UVA basketball games. While a game's still in play, it shows "NOT YET", updating the score shown with each refresh of the page. Once a game is finished, it most likely changes to "YES"...but it can also change to "NO".

## Wahoo-why?
Want to always know how UVA Men's Basketball is doing? Change your homepage to [DidUVAWin.com](diduvawin.com)! Missed the game and need to quickly find out how your favorite team did, but ESPN takes too long to load? Check [DidUVAWin.com](diduvawin.com)! Want to support a fellow 'Hoo? Use [DidUVAWin.com](diduvawin.com)!

## Wa-who?-wa
This is an unofficial UVA Men's Basketball project made by Jake Kenneally. It is not affiliated with the University of Virginia or Virginia Athletics in any way.

If you're interested in building a similar page for your school, please get in contact!

## Wa-how?-wa
A Node.js app using [Express](http://expressjs.com/) and built on Heroku.

The ESPN game IDs and start times are stored in `config.ts`, as well as the ID for UVA Men's Basketball on ESPN.com. Upon load, the app looks up which game is the most recent game that is not in the future. Then, it makes an ESPN API call with the game ID to find out if the game is still ongoing. If it is, the app shows "NOT YET" and the score at the bottom of the page. Otherwise, it checks to see if UVA was the winner by matching on the ID in `config.ts` and shows the appropriate message and scores from the game.

The only changes throughout the season should be updating the array of games. Everything else should just work, as long as the JSON returned from the ESPN API stays relatively the same.