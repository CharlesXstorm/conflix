<div align="center">
  <a href="https://conflixtv.vercel.app/">
    <img width="60%" alt="Conflix – a responsive netflixclone different from any other clone you will find on the internet" src="https://github.com/user-attachments/assets/50056d5e-0654-4922-b752-feb18ca1eca6">
  </a>
</div>
  <br/>
<p align="center">
  A responsive Netflix clone different from any other clone you will find on the internet.
</p>

<p align="center">
  <a href="https://twitter.com/charlesxstorm" target="_blank">
    <img width="30px" src="https://github.com/user-attachments/assets/52eff4e7-0bb6-40db-a8ab-8ddb416fd539" alt="Twitter" />
  </a>.
  <a href="https://instagram.com/charlesxstorm" target="_blank">
    <img width="30px" src="https://github.com/user-attachments/assets/4aae05f0-76f5-4605-a2c8-456b531ae599" alt="Instagram" />

  </a>
</p>

<p align="center">
  <a href="#-about-the-project"><strong>About</strong></a> ·
  <a href="#clapper-popcorn-demo"><strong>Demo</strong></a> ·
  <a href="#sparkles-features"><strong>Features</strong></a> ·
   <a href="#hammer_and_wrench-jigsaw-challenges"><strong>Challenges</strong></a> ·
  <a href="#rocket-tools-heavy_plus_sign-technologies"><strong>Tools & Technologies</strong></a> ·
  <a href="#-screenshots"><strong>Screenshots</strong></a> ·
  <a href="#-getting-started"><strong>Getting Started</strong></a> ·
  <a href="#white_check_mark-requirements"><strong>Requirements</strong></a> ·
  <a href="#-license"><strong>License</strong></a> ·
</p>
<br/>

https://github.com/user-attachments/assets/29b9dfd6-087a-42aa-b80f-1ebb40758ef2

https://github.com/user-attachments/assets/a6bd58cd-3349-4d2d-a434-3080dfc48563


<br/>

## 📜✍ About The Project

Conflix is an extremely responsive Netflix clone built using MERN. I created this project to learn more about the MERN stack technology and to solidify my knowledge of best design and development practices.<br/>
I'm a professional designer/animator who has found his way into web development and this creative side of me tends to ensure that every design detail in development is represented accurately and properly.
<br/><br/>
This project is completely built from scratch without following any tutorial or copying any code abstraction from a similar base. It is 100% original, with the exception of the Conflix intro animation which is a modification of a Codepen by <a href="https://codepen.io/claudio_bonfati/pen/mdryxPv" target="_blank">Claudio Bonfati</a>.
<br/>
I added the ability to play some trailers at least, to give it the feel of a proper streaming service. I've also made improvements by adding micro-interactions and minimal page route transitions.
Most of the animations in this project were created using pure CSS, with a few exceptions that were made using Framer-motion.
<br/><br/>
I've put a great deal of work into this project, over 3 months and 2 weeks and I hope you'll like it as much as I do.<br/>
I would appreciate it if you could give this project a star, as a sign of encouragement. It will mean everything to know someone finds this project useful 😇.

<br/>

## :clapper: :popcorn: Demo

Here you can find the demo link:

- [Conflix demo](https://conflixtv.vercel.app/)

### Guest Account

I've added a "signin as a guest" button for lazy users like me 😊. You don't need to signup to test the features of Conflix.
<br/>
There are a few restrictions attached to the guest account.
- It cannot delete the guest & kids sub-profile.
- It can add and edit other sub-profiles but cannot edit the guest & kids sub-profile.

<br/>

## :sparkles: Features

:heavy_check_mark: &nbsp;&nbsp;Responsive layout.<br />
:heavy_check_mark: &nbsp;&nbsp;Guest sign-in.<br />
:heavy_check_mark: &nbsp;&nbsp;Restriction on guest account.<br />
:heavy_check_mark: &nbsp;&nbsp;User signup, sign-in, and logout.<br />
:heavy_check_mark: &nbsp;&nbsp;Create up to 5 sub-profile accounts.<br />
:heavy_check_mark: &nbsp;&nbsp;Edit and delete sub-profile accounts<br />
:heavy_check_mark: &nbsp;&nbsp;New Users have a kid sub-profile included by default.<br />
:heavy_check_mark: &nbsp;&nbsp;Select profile pictures from up to 3 specialized categories of profile icons.<br />
:heavy_check_mark: &nbsp;&nbsp;Browse movies by categories.<br />
:heavy_check_mark: &nbsp;&nbsp;Navigate pages by movie type (Movies, TV shows).<br />
:heavy_check_mark: &nbsp;&nbsp;Kids-only content when you switch to the kids sub-profile.<br />
:heavy_check_mark: &nbsp;&nbsp;Top 10 movies or TV shows in your country using Geolocation API.<br />
:heavy_check_mark: &nbsp;&nbsp;Micro-interactions and minimal page transitions (pure CSS and Framer-motion).<br />
:heavy_check_mark: &nbsp;&nbsp;Ability to play movie trailers.<br />
:heavy_check_mark: &nbsp;&nbsp;Pause/mute movie trailers.<br />
:heavy_check_mark: &nbsp;&nbsp;Play customized Conflix "C" intro animation (credits: [Claudio Bonfati's pen](https://codepen.io/claudio_bonfati/pen/mdryxPv)) with characteristic Netflix sound.<br />
:heavy_check_mark: &nbsp;&nbsp;Autoplay hero movie trailers on-load when on PC.<br />
:heavy_check_mark: &nbsp;&nbsp;Movie trailers autoplay when hovering over the movie scroll element.<br />
:heavy_check_mark: &nbsp;&nbsp;Infinite scroll implementation with scroll location indicator.<br />
:heavy_check_mark: &nbsp;&nbsp;Swipeable scroll on mobile.<br />
:heavy_check_mark: &nbsp;&nbsp;Special modal to show movie or series details.<br />
:heavy_check_mark: &nbsp;&nbsp;Movies have dynamic ratings to determine if it's 18+ or for kids.<br />
:heavy_check_mark: &nbsp;&nbsp;Add/remove movies from the Mylist category.<br />
:heavy_check_mark: &nbsp;&nbsp;Favourite list persistence (session storage)<br />
:heavy_check_mark: &nbsp;&nbsp;Search movies by title, actors or genres.<br />
:heavy_check_mark: &nbsp;&nbsp;Loading skeleton.<br />

<br/>

## :hammer_and_wrench: :jigsaw: Challenges

My biggest challenge was the task I initially thought would be the easiest: the infinite scroll with the movie detail modal.<br/>
When I was mapping out tasks for the project, I brushed off the scroll task as something that would take a few minutes, but I was so wrong. This scroll feature isn't just any regular scroll implementation, it had to have some specialized features.
<br/><br/>
These features include:
<br/>
🟥 Infinite scroll that moves by a particular scroll amount.<br/>
🟥 Special modal that centrally overlays the element it highlights.<br/>
🟥 Play the available trailer video when hovering over the modal.<br/>
🟥 Detect if a scroll element is in the extreme right or left position.<br/>
🟥 Expand the modal from the right or left with micro-interactions (depending on the scroll element's position).<br/>
🟥 Detect if a movie is favourited, and dynamically render the appropriate add or remove button.<br/>
🟥 Collapse the modal from the right or left with micro-interactions (depending on the scroll element's position).

<br/>

## :rocket: Tools :heavy_plus_sign: Technologies

- [TMDb API's](https://www.themoviedb.org/)
- [Geolocation API](https://api.country.is/)
- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [React Player](https://www.npmjs.com/package/react-player)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [JsonWebToken](https://jwt.io/)
- [Axios](https://axios-http.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Tailwind](https://tailwindcss.com/)
- [SCSS](https://sass-lang.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)
- [SVG Repo](https://www.svgrepo.com/)
- [Adobe Illustrator](https://www.adobe.com/ng/products/illustrator/) for creating custom SVG files.
- [Adobe Photoshop](https://www.adobe.com/photoshop) for the movie strip background on the landing page.
- [Netlify](https://www.netlify.com) and [Vercel](https://vercel.com/) for the deployment and CI of the client-side.
- [Koyeb](https://app.koyeb.com/) for the deployment and CI of the server side.

  <br/>

## 📸 Screenshots

**Landing Page_Desktop_View**
![landingPage_Desktop_view](https://github.com/user-attachments/assets/bc5e70a7-892b-45cd-971e-7c9211e6419b)
<br/>

**SignUp Page_Desktop_View**
![SignUp_page2_Desktop_view](https://github.com/user-attachments/assets/5fb5b3ba-3e0e-4d53-a5dc-06c75005e28a)
<br/>

**SignIn Page_Desktop_View**
![SignIn_Desktop_view](https://github.com/user-attachments/assets/12a46c27-58c1-4fc7-926c-a44cc0ec28ce)
<br/>

**Profile Page_Desktop_View**
![SubAccount_Menu_Desktop_view](https://github.com/user-attachments/assets/e08aee70-bc7a-4ec8-be86-c82d61767388)
<br/>

**Add Profile_Desktop_View**
![Add Profile](https://github.com/user-attachments/assets/7b1c5283-c62d-40c1-a628-4b8426a9d6fb)
<br/>

**Manage Profile_Desktop_View**
![Manageprofile](https://github.com/user-attachments/assets/9091db80-627c-44c4-8672-c65fe93fb71f)
<br/>

**Select Profile Icon_Desktop_View**
![select_Icon](https://github.com/user-attachments/assets/aefdbef4-a002-4cc4-aa5b-fcff1b3edbbb)
<br/>

**Home Page_Desktop_View**
![DeskView1](https://github.com/user-attachments/assets/12df88d4-07e0-460a-ad20-eff0d590b64d)
<br/>

**Top 10 Category in your country_Desktop_View**
![Top10_Shows](https://github.com/user-attachments/assets/2d97eff6-bc95-4415-84e8-3556a973fa7a)
<br/>

**Movie Detail_Desktop_View**
![movieDetail](https://github.com/user-attachments/assets/df3d4eec-0176-4acc-b6d3-cabd329e0643)
<br/>

**Kids Only_Desktop_View**
![kidsOnly](https://github.com/user-attachments/assets/2b00e716-d800-4a02-a412-b0b719fb9fed)

<br/>

**Error Page_Desktop_View**
![ErrorPage](https://github.com/user-attachments/assets/a21ba5bf-9a55-48b6-970d-b1884e4d58d1)


<br/>


## 🐾 Getting Started

- Clone the project

```bash
  git clone https://github.com/Charlesxstorm/Conflix
```

- Go to the project client directory

```bash
  cd conflix/client
```

- Install dependencies

```bash
  npm install
```

- Create a .env file at the root of the client directory.

- Request an API key from [TMDB](https://www.themoviedb.org/) and add the following to the .env file

```
VITE_TMDB_AUTH = **TMDB_API_KEY**
VITE_TMDB_URL = https://api.themoviedb.org/3
```

- Go to the [JWT website](https://jwt.io/)
- In the "payload" section, add the following JSON.

```
{"domain":"/api/v1/conflix"}
```

- In the "verify signature" section, add a 256-bit secret. A generated token should now be in the "encoded" field. (you can use [this tool](https://randomkeygen.com/) to generate a random 256-bit secret).
- Copy the generated token in the "encoded" section.
- Paste this token in your .env file as follows.

```
VITE_API_KEY = **generated token**
VITE_API_URL = /proxy/api/v1/conflix/users
VITE_PROXY_URL = http://localhost:5000/
VITE_GEOLOCATION_URL = https://api.country.is/
```

- Your completed .env file should now look like this.

```
VITE_TMDB_AUTH = **TMDB_API_KEY**
VITE_TMDB_URL = https://api.themoviedb.org/3
VITE_API_KEY = **generated token**
VITE_API_URL = /proxy/api/v1/conflix/users
VITE_PROXY_URL = http://localhost:5000/
VITE_GEOLOCATION_URL = https://api.country.is/
```

- Go to the project server directory

```bash
  cd conflix/server
```

- Install dependencies

```bash
  npm install
```

- Create a .env file at the root of the server directory.

- Go to the [mongoDB website](https://www.mongodb.com/) and create an account.
- Create a database and add a database user and password.
- Add the following to your .env file.

```
NODE_ENV = development
PORT = 5000
DATABASE= **the database URL**
USER= **database user**
DATABASE_PASSWORD = **database password**
JWT_SECRET = **the 256-bit secret generated earlier**
TMDB_AUTH = **TMDB_API_KEY**
TMDB_URL = https://api.themoviedb.org/3
```

- In the server directory, run the application.

```bash
  npm run dev
```

<br/>

## :white_check_mark: Requirements

Before starting, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

<br/>

## 📝 License

[MIT](https://github.com/charlesxstorm/conflix/blob/main/LICENSE)

<br/>

