# GoodEats - A Restaurant Finder App
## Description
This is a full-stack application made with Next.js, React, PostgreSQL, Tanstack Query, and the Google Maps API. 
It helps users find nearby restaurants of almost any type, such as fast food, tex-mex, or sushi on a Google map.
It also offers different search filters based on distance, pricing, restaurant type, rating, opening hours, and amenities.
Users can save restaurants and set their preferences so they receive personalized restaurant suggestions.
This app is deployed via Vercel.

## Technologies Used
- Figma for designing the [UI](https://www.figma.com/design/ovbsHhdabADn6MVuAhEYNb/Restaurant-App-UI?node-id=1-2&p=f&t=HmJk0lCnGnsUKbyI-0) and [ERD](https://www.figma.com/board/AIGGHh7Iw6iTiZXI9MxHAn/Restaurant-App-ERD?node-id=0-1&t=PsFUwTgTcSI70BSd-0)
- Next.js v16.2.10
- React v19.2.4
- [Postgres.js](https://github.com/porsager/postgres) v3.4.9 for interfacing between Next.js and the PostgreSQL database
- Google Maps API [Nearby Search](https://developers.google.com/maps/documentation/places/web-service/nearby-search) and [Text Search](https://developers.google.com/maps/documentation/places/web-service/text-search)
- Tailwind CSS v4
- Tanstack Query v5.102.6
- Zod v4.4.3 for type correction
- OpenAI GPT-5.6 Luna for debugging

## Challenges Faced
- Replacing useEffect() fetch statements with Tanstack Query queries
- Implementing user and admin roles with Next.js JWT auth
- Managing Next.js server and client components

## Purpose of the Project
This app helps the user find their next favorite restaurant near them.

## Features
### Authentication
- A user can create an account and log into the app with that account.
- Users and admins can change their account's email and password in the settings page.
### Admin Features
- Admins can view, ban/unban, and edit user accounts from the users page.
### User Features
- Users can view, search, save, and filter for restaurants in an interactive Google map in the restaurant map page.
- Users can view and manage their saved restaurants in the saved restaurants page.
- Users can configure their preferences from the settings page, such as their preferred restaurant type (acai shop, noodle shop, deli, etc.), rating (1 to 5 stars), opening hours, price level (low, medium, expensive, and very expensive), and amenities (accepts card, accessible, delivers, etc.).

## How to Run
1. Download or clone this repository.
2. Run `npm install` in a terminal at the project directory.
3. Run `npm run dev`.
4. Visit http://localhost:3000/.

## Credits
- [MUI](https://mui.com/) for pre-built components like sliders and chips
  - [Discrete slider component](https://mui.com/material-ui/react-slider/#discrete-sliders)
  - [Chip component](https://mui.com/material-ui/react-chip/#chip-array)
  - [Range slider component](https://mui.com/material-ui/react-slider/#range-slider)
- [React Google Maps Guide](https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#1) by Ken Nevarez
- [Pexels](https://www.pexels.com/) Images
  - https://www.pexels.com/photo/close-up-of-an-indian-noodle-dish-12737797/
  - https://www.pexels.com/photo/delicious-homemade-pizza-with-refreshing-drink-33254643/
  - https://www.pexels.com/photo/pierogies-dumplings-with-sesame-sauce-on-plate-26076240/
  - https://www.pexels.com/photo/close-up-of-a-meal-18479497/
  - https://www.pexels.com/photo/healthy-avocado-salad-with-falafel-and-olives-29203388/
  - https://www.pexels.com/photo/top-view-of-waffles-with-cornflakes-fruit-and-syrup-18174664/
  - https://www.pexels.com/photo/top-view-of-dessert-with-syrup-art-on-plate-35083389/
  - https://www.pexels.com/photo/delicious-italian-pasta-dish-with-side-dishes-38807026/
  - https://www.pexels.com/photo/sliced-sushi-on-tray-1028429/
  - https://www.pexels.com/photo/mexican-restaurant-27365284/
  - https://www.pexels.com/photo/assorted-ice-creams-on-wooden-table-34452066/
  - https://www.pexels.com/photo/appetizing-penne-pasta-with-processed-cheese-near-sauces-4378159/
  - https://www.pexels.com/photo/delicious-grilled-chicken-skewers-on-barbecue-32023378/
  - https://www.pexels.com/photo/delicious-hamburger-and-french-fries-on-wooden-surface-10679778/
  - https://www.pexels.com/photo/burger-and-french-fries-served-in-a-restaurant-19247558/
