
# StudyMichi

StudyMichi is a fully functional ed-tech platform built using the MERN stack, comprising ReactJS, TypeScript, NodeJS, MongoDB, and ExpressJS. It is designed to empower learners and educators by providing a seamless and interactive online learning experience. The platform enables users to create, consume, and rate educational content, fostering a vibrant ecosystem for knowledge sharing.




## Documentation

 1.  [Features](https://linktodocumentation)
 2.  [Technical Details](https://linktodocumentation)




## Features

#### For Students
  * **Interactive Learning**: A user-friendly interface that makes learning engaging and accessible.
  * **Course List**: Access to a comprehensive list of available courses.
  * **Content Rating**: Rate educational content to help improve quality.
  * **Personalized Learning Path**: Discover courses tailored to your needs.

  #### For Instructors
  * **Content Creation**: Easily create and upload educational content.
  * **Global Reach**: Connect with learners worldwide.
  * **Feedback System**: Gain insights from student reviews to enhance your courses.
##  Technical Details

1. ### Sytem Architecture

![App Screenshot](https://raw.githubusercontent.com/gourangpathak/StudyNotion-An-Online-Education-Platform/refs/heads/master/images/architecture.png)

The platform employs a modular and scalable architecture:

**Front-end** : ReactJS and TypeScript for building an intuitive and responsive user interface.

**Back-end** : NodeJS and ExpressJS for managing server-side logic and APIs.

**Database** : MongoDB for storing user, course, and content data.

### High Level Overview

![App Screenshot](https://raw.githubusercontent.com/gourangpathak/StudyNotion-An-Online-Education-Platform/refs/heads/master/images/schema.png)


**Client** : ReactJS + TypeScript (Front-end)

**Server** : NodeJS + ExpressJS (Back-end)

**Database** : MongoDB (NoSQL Database)

**Authentication** : JWT (JSON Web Tokens) for secure user authentication

**API Layer** : REST APIs for communication between client and server

2. ### Front-End
**Frameworks and Tools**: ReactJS, TypeScript, Redux (for state management), and TailwindCSS (for styling).

**Features**:

* Intuitive navigation for students and instructors.

* Responsive design for various screen sizes.

*  Interactive components for course creation, rating, and browsing.

**Libraries Used** : 
* Axios (for API calls)

* React Router (for routing)

* React Hook Form (for form validation)

* React Redux (for state management)

* React Icons (for icons and visual elements)

* React Otp Input (for OTP validation)

* Swiper (for interactive carousels)

* Video React (for video playback)

* React Player (for embedded media playback)

* React Rating Stars Component (for course rating)

3. ### Back-End

**Frameworks and Tools** : NodeJS, ExpressJS.

**Features** :

* User authentication and authorization using JWT.

* REST APIs for CRUD operations on courses, users, and ratings.

* Secure handling of user data and content uploads.

**Data Models** : 

* **User Model**: Stores user details, roles (student/instructor), and authentication tokens.

* **Course Model**: Contains course metadata, creator info, and student enrollment details.

* **Ratings Model**: Tracks user ratings and feedback for courses.

4. ### Deployment

 **Hosting** : 

 * Front-end: Vercel

* Back-end: Render or Railway

**Process** :

* Front-end is built and deployed using Vercel.

* Back-end deployed on Render/Railway with continuous integration (CI) enabled for updates.

* MongoDB Atlas used for database hosting.

5. ### Future Enhancements

* **Live Sessions** : Add support for live classes and webinars.
* **Gamification** : Introduce badges and leaderboards to enhance student engagement.

* **Advanced Analytics**: Provide detailed insights for instructors on course performance and learner engagement.

* **Mobile Application**: Develop a dedicated mobile app for Android and iOS platforms.



## Screenshots

![App Screenshot](https://raw.githubusercontent.com/gourangpathak/StudyNotion-An-Online-Education-Platform/refs/heads/master/images/architecture.png)
