# Eventify - Discover Local Events

A responsive, single-page web application for discovering and exploring local events. This project was developed as a case study for a Web Development position, demonstrating modern front-end development skills with React, interactive UI components, and a clean, mobile-friendly design.

## Check out the live project here

[View Live Project](https://eventify-yenu.vercel.app/)

##  Features

### Core Requirements

- **Responsive Navigation Bar**: A top bar with logo and links to "Home," "Events," and "Contact" sections, which smoothly scroll to the relevant parts of the page.
- **Hero Section**: An engaging hero area with the main heading "Discover Events Near You!" and a call-to-action button.
- **Featured Events Section**: Displays a grid of 3-5 event cards. Each card includes:
    - Event name
    - Date and time
    - Location
    - Short description
    - A "Register" button with visual feedback.
- **Fully Responsive Design**: The layout adapts seamlessly to mobile, tablet, and desktop screen sizes.

### Bonus Features

- **Search Functionality**:
    - A search bar in the navigation that filters the displayed events by name, location, or description.
    - Clicking on a search result scrolls to and highlights the specific event card.
- **Dynamic Data Loading**:
    - Event data is loaded from a `dummy JSON` file (`eventsData.js`) using `useEffect` and a simulated network delay.
- **Interactive UI Elements**:
    - **Image Carousel**: Hovering over an event card cycles through multiple images for that event.
    - **Category Filters**: A section of interactive category icons (e.g., Tech, Concerts) to discover events by type.
    - **Contact Form**: A functional contact form with validation and an alert message upon submission.
- **Modern Animations**: Smooth entrance animations for elements as they scroll into view.

##  Technologies & Tools

- **HTML5**: For the structure of the web page.
- **CSS3**: Custom styling for a unique and modern look.
- **JavaScript (ES6+)**: For interactivity and logic.
- **React (Create React App)**: For building a component-based user interface.
    - `useState`, `useEffect`, `useRef` Hooks for state management and side effects.
- **React Icons**: For scalable and customizable icons (`FaCalendarAlt`, `FaSearch`, `FaUser`, etc.).
- **Git & GitHub**: For version control and project submission.


##  How to Run the Project

To run this project locally, follow these steps:

##  Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/eventify.git

# Navigate to project directory
cd eventify

# Install dependencies
npm install

# Start development server
npm start

