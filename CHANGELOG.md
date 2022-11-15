# Unreleased

# 1.3.0
## Changed
- Updated all dependencies
- Reorganized `package.json`
- Switched from `yarn` to `pnpm`
- Switched from Heroku to Render

# 1.2.0
## Changed
- Removed node engine requirement from package.json

## Fixed
- Searching for Men's Basketball recap link doesn't crash the app

# 1.1.0
## Added
- New URL for getting the status of a game currently happening
- Parent interface types for the JSON returned from the schedule and current game URLs

## Changed
- Tabs to spaces

## Fixed
- Bug while game a game is currently happening where the score was not available from the schedule URL and the application would break
- Bug where the winner was not immediately available after a game finished, but the game was marked as "completed"

# 1.0.0
## Added
- this `CHANGELOG.md`
- Men's Basketball and Football support
- _much_ simpler application compared to both GitHub Pages version and version where I had to manually update a `games.ts` file with every game ID and time of the game

## Removed
- `dist` directory, since Heroku will just build it now with the redeploy
