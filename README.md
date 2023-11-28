<!---->
<div align="center">
    <h1 style="margin-bottom: 0px">Pricewise</h1>
    <p>Smart Shopping Starts Here </p>
</div>
<p align="center">
  <a href="https://skillicons.dev">
    <img  src="https://skillicons.dev/icons?i=babel,git,github,js,ts,md,mongodb,nextjs,nodejs,tailwind&theme=dark&perline=10"/>
  </a>
</p>

## 📖 Table of Contents

-   [📖 Table of Contents](#-table-of-contents)
-   [📍 Overview](#-overview)
-   [📦 Features](#-features)
-   [📂 repository Structure](#-repository-structure)
-   [⚙️ Modules](#modules)
-   [🚀 Getting Started](#-getting-started)
    -   [🔧 Installation](#-installation)
    -   [🤖 Running price-wise](#-running-price-wise)
    -   [🧪 Tests](#-tests)
-   [🛣 Roadmap](#-roadmap)
-   [🤝 Contributing](#-contributing)
-   [📄 License](#-license)
-   [👏 Acknowledgments](#-acknowledgments)


## 📍 Overview

Price Wise is a web application designed to assist users in tracking product prices and searching for products. It provides a streamlined user interface with components like a search bar, product cards, and price tracking functionality. Users can receive email notifications for price changes through an integrated email system. The application includes a cron job for daily price updates and utilizes web scraping to gather product details from online stores. With a focus on user experience, Price Wise offers a practical solution for savvy shoppers looking to stay informed about the best deals.


## 📦 Features

|     | Feature             | Description                                                                                                           |
| --- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**    | Built with Next.js, the app includes API endpoints for product search and cron jobs, with client-side components.     |
| 📄  | **Documentation**   | In-depth documentation for setup and usage instructions.                                                              |
| 🔗  | **Dependencies**    | Uses popular libraries like Next.js, React, Mongoose, nodemailer, and TailwindCSS for building a full-stack app.      |
| 🧩  | **Modularity**      | Code is fairly modular with separate directories for API, components, utilities, and models to handle distinct tasks. |
| ⚡️ | **Performance**     | Performance considerations include Next.js for optimized image loading and server-side rendering, incremental builds. |
| 🔐  | **Security**        | No explicit security features mentioned; relies on Next.js for secure defaults and Mongoose for data validation.      |
| 🔀  | **Version Control** | Git is implied for version control through the repository link; no specific strategies or tools are outlined.         |
| 🔌  | **Integrations**    | Email notification system and scraper indicate integration with email services and Amazon for product data.           |
| 📶  | **Scalability**     | Next.js framework supports scalability; no specific architectural patterns mentioned for handling significant growth. |


## 📂 Repository Structure

```sh
└── price-wise/
    ├── app/
    │   ├── api/
    │   │   ├── cron/
    │   │   └── getSearchProds/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── product/
    │       └── [id]/
    ├── components/
    │   ├── HeroCarousel.tsx
    │   ├── Navbar.tsx
    │   ├── PriceInfoComponent.tsx
    │   ├── ProductCard.tsx
    │   ├── SearchBar.tsx
    │   ├── SearchProd.tsx
    │   ├── Spinner.tsx
    │   └── TrackPrice.tsx
    ├── lib/
    │   ├── actions/
    │   │   └── index.ts
    │   ├── models/
    │   │   ├── products.model.ts
    │   │   └── useremail.model.ts
    │   ├── mongoose.ts
    │   ├── nodemailer/
    │   │   └── index.ts
    │   ├── scraper/
    │   │   └── index.ts
    │   └── utils.ts
    ├── next.config.js
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public/
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── types/
    │   └── index.ts
    └── vercel.json

```


## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [vercel.json](https://github.com/ashu0singh/price-wise/blob/main/vercel.json)               | The "price-wise" application includes an API for product search and scheduled tasks, components for UI elements, models, email capabilities, and scrapping scripts. It is built with Next.js, styled with CSS/Tailwind, and uses TypeScript and Mongoose with MongoDB. A scheduled task in `vercel.json` triggers at 3 PM UTC daily.                                                                                                                                                                                                                                                                                                                                                                              |
| [next.config.js](https://github.com/ashu0singh/price-wise/blob/main/next.config.js)         | The "price-wise" application leverages Next.js, featuring a RESTful API for CRON tasks and product searches, stylized with global CSS, and structured with layout and page components. It includes product functionality with dynamic routing and encapsulates reusable components for UI features like carousels, navigation, and loading states. The lib directory contains business logic, including actions, data models (for products and user emails), database connections (Mongoose), email services (Nodemailer), web scraping tools, and utility functions. The `next.config.js` file configures experimental server actions and external Mongoose components along with setting trusted image domains. |
| [tailwind.config.ts](https://github.com/ashu0singh/price-wise/blob/main/tailwind.config.ts) | The provided code defines a Tailwind CSS configuration for a web application named "price-wise." This configuration specifies which files Tailwind should scan for class names (in'content'), customizes the theme with additional colors, shadows, max-width values, font families, and border radii. These custom styles are intended for use across various components and pages within the app, as evident from the file paths included in the'content' array. This Tailwind setup helps ensure a consistent design aesthetic throughout the app.                                                                                                                                                             |
| [package-lock.json](https://github.com/ashu0singh/price-wise/blob/main/package-lock.json)   | The "price-wise" application features a web interface for price tracking, with a directory indicating API endpoints for scheduled tasks and product search, front-end components for user interface elements, and libraries for actions, models, email notifications, scraping functionality, and utilities. The accompanying `package-lock.json` specifies dependencies and versions, ensuring a consistent environment across installations for this Node.js application, which is likely built using Next.js, TailwindCSS, and Mongoose for data modeling with MongoDB.                                                                                                                                        |
| [package.json](https://github.com/ashu0singh/price-wise/blob/main/package.json)             | The code represents the `package.json` configuration for "pricewise," a Node.js application built with the Next.js framework. It defines project metadata, script shortcuts for development, and production workflows. The project depends on libraries for UI components, HTTP requests, web scraping, data modeling with MongoDB, email functionality, and others. Development dependencies include types and tools for TypeScript and styling with TailwindCSS. The directory structure indicates a web application with API endpoints, React components, and a library of utilities and models.                                                                                                               |
| [tsconfig.json](https://github.com/ashu0singh/price-wise/blob/main/tsconfig.json)           | The code is from a `tsconfig.json` file, configuring TypeScript for a Next.js e-commerce app called "price-wise". It specifies ES5 as the compilation target with ESNext features, allows JS, enables strict typing, and omits output files. It ensures compatibility with the Next.js framework and module resolution suitable for bundlers. The configuration includes JSON file imports, JSX preservation, and incremental compilation to speed up subsequent builds. Custom path aliases and type definitions are also handled, excluding `node_modules` from the compilation.                                                                                                                                |
| [postcss.config.js](https://github.com/ashu0singh/price-wise/blob/main/postcss.config.js)   | The `postcss.config.js` file configures PostCSS to use Tailwind CSS and Autoprefixer as plugins, enabling utility-first styling and automatic vendor prefixing for CSS compatibility across different browsers within the'price-wise' project that appears to be a web application for price tracking and product search, structured with API endpoints, reusable UI components, and backend integrations.                                                                                                                                                                                                                                                                                                        |

</details>

<details closed><summary>Types</summary>

| File                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/ashu0singh/price-wise/blob/main/types/index.ts) | The given code is from a price-tracking web application named "price-wise." It defines TypeScript types for the app's data structure, including `PriceHistoryItem`, `User`, `Product`, `NotificationType`, and email-related types. The `Product` type encapsulates details like pricing, stock status, and user tracking. The directory structure reveals a Next.js project with a typical organization including API endpoints, components, a library for backend functionality, and configuration files. Components suggest UI features like search, price tracking, and a carousel. |

</details>

<details closed><summary>App</summary>

| File                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [layout.tsx](https://github.com/ashu0singh/price-wise/blob/main/app/layout.tsx)   | The `layout.tsx` file defines the root layout for the Price Wise web application. It utilizes custom fonts from Google, global CSS, and React components. The root layout includes metadata for SEO, a non-scrollable page setup in English, and incorporates analytics tracking, a notification toaster, a navigation bar, and a dynamic child content area. The layout is designed for uniformity and performance across the application's pages.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [page.tsx](https://github.com/ashu0singh/price-wise/blob/main/app/page.tsx)       | The `price-wise` application consists of an e-commerce web platform with a service-oriented architecture. The `app` directory contains the front-end where `api` represents backend API endpoints like `cron` tasks and `getSearchProds`. The `product` folder suggests dynamic product pages. React components like carousels, navbar, and product cards are in `components`. Backend logic, including database models (`products`, `useremail`), mail services, and web scraping, is in `lib`. Configuration files for Next.js, Tailwind CSS, and TypeScript define framework and styling options.The `page.tsx` file defines a homepage component that displays a hero carousel and a search bar for users to find products, along with a section for trending products fetched via an asynchronous call to `getAllProducts()`, showcasing these products using the `ProductCard` component. |
| [globals.css](https://github.com/ashu0singh/price-wise/blob/main/app/globals.css) | The code establishes a global stylesheet for a web application named "price-wise", using Tailwind CSS for styling. It defines base styles for all elements, ensuring zero margins and padding by default, with a smooth scrolling behavior. It also creates responsive and base utility classes for scrollbars, buttons, text styles, product details, modals, navigation, price information, product cards, and search bar components. The styling focuses on uniformity, responsiveness, and visual aesthetics, applying various spacing, font, color, and layout details to the UI elements.                                                                                                                                                                                                                                                                                                 |

</details>

<details closed><summary>[id]</summary>

| File                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [page.tsx](https://github.com/ashu0singh/price-wise/blob/main/app/product/[id]/page.tsx) | The code defines a Next.js dynamic page component for individual products, aimed at e-commerce. It dynamically generates static paths for product pages using product IDs and pre-renders them with product details, including images, prices, ratings, and descriptions. It features components like ProductCard for related products and TrackPrice to monitor price changes, utilizing utility functions and types for data handling. The page offers product navigation, rating display, price comparison, and purchase options, enhancing user experience through a detailed and interactive product presentation. |

</details>

<details closed><summary>Getsearchprods</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [route.ts](https://github.com/ashu0singh/price-wise/blob/main/app/api/getSearchProds/route.ts) | The `route.ts` script provides a server-side API endpoint for searching products. It connects to a database, performs a case-insensitive search using the provided searchString, and retrieves a list of product fields (ID, category, title, currency, current price, and image). Search results are returned as JSON, or an error is logged on failure. This is part of a larger application with components for displaying products and user interfaces, utilities for tasks like email and scraping, and configurations for the Next.js framework. |

</details>

<details closed><summary>Cron</summary>

| File                                                                                 | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/ashu0singh/price-wise/blob/main/app/api/cron/route.ts) | The `route.ts` file manages a cron job that connects to a database, updates each product's price data by scraping Amazon, and recalculates their price statistics. If necessary, it triggers email notifications to users about price changes. After processing all products, it responds with a list of successfully updated product IDs, handling any errors that occur during the process.(Note: The provided directory tree contextualizes the script's location within the larger project structure, showing where related components, utilities, and configurations are stored.) |

</details>

<details closed><summary>Components</summary>

| File                                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Navbar.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/Navbar.tsx)                         | The `Navbar.tsx` component in the `components` directory creates a navigation bar for a website called PriceWise. This navigation bar includes a logo linked to the homepage, a search component (`SearchProd`), and icons for the wishlist and user profile. It utilizes `next/image` for optimized image loading and `next/link` for client-side navigation. The `NavIcons` array defines the image sources and alt text for the icons, which are rendered using a map function.                                                                                                                               |
| [PriceInfoComponent.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/PriceInfoComponent.tsx) | The `PriceInfoComponent.tsx` is a React component that displays a title, an image, and a value with a customizable left border color. It expects props for the `title`, `iconSrc`, `value`, and `borderColor`. The component uses TailwindCSS for styling and the `next/image` component for optimized image rendering.                                                                                                                                                                                                                                                                                          |
| [SearchBar.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/SearchBar.tsx)                   | This React component, `SearchBar`, provides an input field for users to submit Amazon product URLs for validation and processing. Upon submitting a valid URL, it triggers data scraping and storage for that product using the `scrapeAndStoreProduct` function. If successful, the user is redirected to a product-specific page. The component also displays a loading spinner during processing and shows error messages for invalid URLs. The URL validation logic specifically checks for Amazon domains.                                                                                                  |
| [ProductCard.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/ProductCard.tsx)               | The `ProductCard.tsx` component, part of a larger e-commerce platform, serves for rendering a clickable card containing a product image, title, category, and current price. It takes a `Product` object as a prop, leveraging Next.js's `Link` and `Image` for navigation and optimized image display. The card directs users to the product's detailed page using its unique ID in the URL when clicked.                                                                                                                                                                                                       |
| [SearchProd.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/SearchProd.tsx)                 | The `SearchProd` component provides a modal search interface allowing users to search for products asynchronously. Users trigger the modal with a button, input search terms, and submit the form. The search hits an API endpoint and retrieves relevant products; during the fetch, a spinner displays. Results render as clickable items inside the modal, which navigate to the product's page when selected. If no results are found, an appropriate message is displayed. The modal, input, and results are styled with JSX and Tailwind CSS classes.                                                      |
| [TrackPrice.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/TrackPrice.tsx)                 | The TrackPrice component allows users to track the price of a product by entering their email. It features a modal form that opens upon a button click. When submitted, it triggers an asynchronous request to add the user's email to the product's tracking list. Feedback is provided through a spinner during submission and a toast notification upon an error. The modal can be closed either after successful submission or by user action. This component uses Next.js Image for optimized images and Headless UI for accessible UI components.                                                          |
| [HeroCarousel.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/HeroCarousel.tsx)             | The `HeroCarousel.tsx` component is a client-side interactive carousel for a React-based web application, showcasing a series of images that auto-rotate every 2 seconds in an infinite loop without displaying thumbnails or status. The carousel is styled with responsive design considerations. Custom images for the carousel slides and a decorative arrow image are loaded using the Next.js `Image` component for optimized loading. This component is part of the `price-wise` application's UI, indicating a feature possibly used on the landing page for displaying featured products or promotions. |
| [Spinner.tsx](https://github.com/ashu0singh/price-wise/blob/main/components/Spinner.tsx)                       | The `Spinner.tsx` component provides a user interface element indicating a loading state, represented by an animated spinning circle. It accepts a `text` prop, presumably for accessibility purposes, which is visually hidden using the'sr-only' class but available to screen readers. This component can be used to signal to users that an asynchronous operation is in progress.                                                                                                                                                                                                                           |

</details>

<details closed><summary>Lib</summary>

| File                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mongoose.ts](https://github.com/ashu0singh/price-wise/blob/main/lib/mongoose.ts) | The code establishes a database connection using Mongoose, a MongoDB object modeling tool for Node.js. It exports a function `connectToDb` that connects to a MongoDB instance specified by the `MONGO_URI` environment variable. It sets query strictness and checks if an existing connection is already in place to avoid reinitializing. If the connection is not established earlier, it attempts to connect, sets the `isConnected` flag upon success, and logs the connection status. It also handles and logs connection errors.                                                                                                                                                                                                                                                                               |
| [utils.ts](https://github.com/ashu0singh/price-wise/blob/main/lib/utils.ts)       | The `lib/utils.ts` module provides utility functions to handle product info extraction, price analysis, and notification type determination for a price comparison application. It includes features to:-Extract raw and cleaned prices from HTML elements.-Retrieve currency symbols from text.-Gather product descriptions from multiple HTML elements.-Calculate the highest, lowest, and average prices from a product's price history.-Determine the type of email notification based on price drops, stock changes, or discount thresholds.-Format numbers for localization.-Extract single category names from HTML elements.-Create an array of image URLs from HTML image elements.-Extract numeric rating values from text.The notification types and a threshold percentage for discounts are also defined. |

</details>

<details closed><summary>Scraper</summary>

| File                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/ashu0singh/price-wise/blob/main/lib/scraper/index.ts) | The code implements a web scraping function'scrapAmazonProducts' to extract product details from Amazon URLs. It uses axios for HTTP requests and cheerio for parsing HTML. The function compiles product information including title, pricing, stock status, currency, discount, reviews, stars, category, description, and images. Proxy settings are configured for requests, and data is sanitized and structured into a JSON object. If scraping fails, an error is thrown describing the failure. Unused puppeteer code for dynamic scraping is commented out. |

</details>

<details closed><summary>Models</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [useremail.model.ts](https://github.com/ashu0singh/price-wise/blob/main/lib/models/useremail.model.ts) | The given code defines a Mongoose schema for user emails in a Node.js application, associating emails with IDs and adding timestamps for each record. The schema is then used to create a model named "User_Emails" which is exported for use elsewhere in the application. This model is part of a project structure that includes API endpoints, UI components, utilities, and configurations for a web application likely focused on product pricing information and tracking, as suggested by the directory names and contents. |
| [products.model.ts](https://github.com/ashu0singh/price-wise/blob/main/lib/models/products.model.ts)   | The code defines a MongoDB schema for a product in an e-commerce application, with attributes like URL, title, price details, description, and user tracking. It includes price history and metadata like stock status and reviews. It also sets up the model for database interactions using Mongoose.                                                                                                                                                                                                                             |

</details>

<details closed><summary>Actions</summary>

| File                                                                                | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/ashu0singh/price-wise/blob/main/lib/actions/index.ts) | The code in `lib/actions/index.ts` provides CRUD operations for product data scraped from Amazon within a web application. Its key functions include scraping product data and updating or creating product records with price history and price statistics (scrapeAndStoreProduct); retrieving a single product, all products, or products by category (getProductsById, getAllProducts, getProductsByCategory); managing user email subscriptions for product price updates (addUserEmailToProduct); and fetching all product IDs (getAllProductsID). It uses a MongoDB database for storage, with product and user email models, and sends emails via nodemailer. Additionally, it refreshes server-side rendered pages with Next.js revalidation after updates. |

</details>

<details closed><summary>Nodemailer</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/ashu0singh/price-wise/blob/main/lib/nodemailer/index.ts) | The provided code is part of a Node.js module for an email notification system within a price tracking application. It defines email templates for different notifications such as welcoming users, informing about stock changes, lowest price alerts, and discount thresholds. A central `generateEmailBody` function creates the email content based on product information and the notification type. The module leverages nodemailer to send these customized emails and handles errors during the sending process. It also includes a threshold value for discount notifications. |

</details>

---

## 🚀 Getting Started

**_Dependencies_**

List of Dependencies

```json
node >=v18.12.0
npm or yarn
```

### 🔧 Installation

1. Clone the price-wise repository:

```sh
git clone https://github.com/ashu0singh/price-wise.git
```

2. Change to the project directory:

```sh
cd price-wise
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running price-wise

```sh
npm run build && node dist/main.js
```

### 🧪 Tests

```sh
npm test
```

---

## 🛣 Project Roadmap

> -   [x] Task 1: Implement Search functionality so that uses can search for already added products
> -   [ ] Task 2: Implement user login system using NextAuth
> -   [ ] Task 3: Adding support to more websites

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

-   **[Submit Pull Requests](https://github.com/ashu0singh/price-wise/)**: Review open PRs, and submit your own PRs.
-   **[Join the Discussions](https://github.com/ashu0singh/price-wise/discussions)**: Share your insights, provide feedback, or ask questions.
-   **[Report Issues](https://github.com/ashu0singh/price-wise/issues)**: Submit bugs found or log feature requests for Ashu0Singh.

> Contact Details <br />
> Email : [work@ashu-singh.com](mailto:work@ashu-singh.com) <br />
> Twitter : [ashu_simgh](https://twitter.com/ashu_simgh)

#### _Contributing Guidelines_

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
    ```sh
    git clone <your-forked-repo-url>
    ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
    ```sh
    git checkout -b new-feature-x
    ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
    ```sh
    git commit -m 'Implemented new feature x.'
    ```
6. **Push to GitHub**: Push the changes to your forked repository.
    ```sh
    git push origin new-feature-x
    ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [MIT LICENSE](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [LICENSE](https://github.com/Ashu0Singh/Price-Wise/blob/master/LICENSE) file.


[**Return**](#Top)

---
