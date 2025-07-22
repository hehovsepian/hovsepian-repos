# To Run Local Dev
npm install
npm run dev

# To Run Tests
npm run test

## React + TypeScript + Vite
I chose to use vite to set up my project for the developer experience. I chose to use Typescript with React for the added type checking. 

## Tailwind CSS
I decided to use tailwind css for ease of use in creating a simply styled user interface with the ability to customize where needed. 

With more time I would add more styling to create a more engaging experience with the UI, adding icons, colors, etc.

## React Router + Context API
I went with React Router for a simple SPA experience, and I utilized React's Context API to cache the fetched data so that the repos would not have to be retrieved over and over again when going back and forth between pages. In a more complex application I would use something like Redux or something else more robust.

## Vitest
I chose to use vitest for writing unit tests because of the developer experience. 

## Accessibility
This app has limited interactivity but I tried to follow some a11y best practices, mainly with links. 
1. Use concise and meaningful text for links
2. Do not capitalize all letters in links
3. Avoid using URLs for link text
I also did some quick keyboard tabbing to test the kayboard accessibility...I found that when new repos were loaded using the "Load more repos" button the tab focus would return to the top of the page. I added some functionality to auto focus on the next new repo that was loaded so that keyboard users can continue tabbing down the list without interuption. 

## Future Improvements
With more time I would 
1. add filterung and sorting to the list or repos
2. write more integration tests, and other end to end testing.
3. Improve the experience of returning back to the list page from the detail page, so that the user was auto focused and scrolled to the last item they viewed instead of being returned to the top of the list. 

