# Frontend - Getting Started

To set up the project, follow these steps:

### 1. Create a `.env.local` file in Root Folder

Start by creating a `.env.local` file with the same information as the `.env.local.example` file.

### 2. Important Configuration

When testing the production build with `yarn build` followed by `yarn start`, make sure to correctly set the `AUTH_TRUST_HOST` variable to match the URL you're using for testing.

For example, if you're testing locally at `http://localhost:3001`, your `.env.local` should include:
```
AUTH_TRUST_HOST=http://localhost:3001
```
Don't forget to set the backend baseURL in the axiosInstance file

frontend/src/service/axiosInstance/index.ts

### 3. Authentication Secret

The `AUTH_SECRET` variable is responsible for securing session hashes in cookies. Ensure this is properly set in your environment file.

---

## Running the Project

Install the project dependencies by running:

```bash
yarn install
```

To start the development server, run:

```bash
yarn dev
```

If you want to test the production build, follow these steps:

1. Build the project:
    ```bash
    yarn build
    ```
2. Start the production server:
    ```bash
    yarn start
    ```

Once the server is running, open [http://localhost:3001](http://localhost:3001) in your browser to view the app.

Created by: Gabriel Logan
