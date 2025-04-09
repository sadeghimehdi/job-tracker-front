# React + Vite

# Step 1: Create a Vite Project

Open your terminal and run the following command:

Using npm:

npm create vite@latest my-react-app --template react

Using yarn:

yarn create vite@latest my-react-app --template react

Using pnpm:

pnpm create vite@latest my-react-app --template react

Replace my-react-app with your preferred project name.

##  Step 2: Navigate to Your Project Directory

cd my-react-app

 ## Step 3: Install Dependencies

Run the following command based on your package manager:

Using npm:

npm install

Using yarn:

yarn install

Using pnpm:

pnpm install
 
## Step 4: Start the Development Server

To start the local development server with HMR:

npm run dev

Or:

yarn dev

Or:

pnpm dev

Your project should now be running, and you can access it at the URL shown in your terminal (usually http://localhost:5173).

##  Step 5: Add ESLint (Optional but Recommended)

To set up ESLint for better code quality and linting, run:

npm install -D eslint

Then initialize ESLint:

npx eslint --init

Follow the prompts to configure ESLint based on your preferences.

Step 6: Using TypeScript (Optional)

If you want TypeScript support, use this template instead when creating your project:

npm create vite@latest my-react-app --template react-ts

Additional Notes

Vite supports two official React plugins:

@vitejs/plugin-react (Babel-based, recommended for most users)

@vitejs/plugin-react-swc (uses SWC for faster compilation)

You can configure Vite further via vite.config.js or vite.config.ts.

## Next Steps

Now that your project is set up, you can start building your React application! Check out the Vite documentation for advanced configurations.

# Launch the project

To run the project for the first time, you will need to run the following command. 
NPM install.
then
vite

After that you should be able to run the project. 