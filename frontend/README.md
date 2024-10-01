# Frontend - Getting Started

To set up the project, follow these steps:

### 1. Create a `.env.local` File

Begin by creating a `.env.local` file in the root folder. Use the variables and values from the `.env.local.example` file as a starting point.

### 2. Essential Configuration

When testing the production build using `yarn build` and `yarn start`, ensure that the `AUTH_TRUST_HOST` variable is set to match the URL you're testing with.

For example, if you're running the app locally on `http://localhost:3001`, your `.env.local` should include:
```
AUTH_TRUST_HOST=http://localhost:3001
```

Additionally, ensure that the backend's `baseURL` is correctly configured in the Axios instance. You can set it in:

```
frontend/src/service/axiosInstance/index.ts
```

### 3. Authentication Secret

The `AUTH_SECRET` variable is responsible for securing session hashes in cookies. Ensure this is properly set in your environment file.

---

## Running the Project

First, install all required dependencies:

```bash
yarn install
```

Make sure you have the backend running on the correct port and host.

To start the development server, run:

```bash
yarn dev
```

For testing the production version, follow these steps:

1. Build the project:
    ```bash
    yarn build
    ```
2. Start the production server:
    ```bash
    yarn start
    ```

Once the server is running, visit [http://localhost:3001](http://localhost:3001) in your browser to access the app.

---

## Running Tests

You can run end-to-end (e2e) tests using Cypress. Follow these steps:

1. Start the development server:
    ```bash
    yarn dev
    ```
2. Open Cypress for testing:
    ```bash
    yarn cy:open
    ```

Created by: Gabriel Logan
