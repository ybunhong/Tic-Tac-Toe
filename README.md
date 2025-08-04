# Tic-Tac-Toes

This project is a **Tic-Tac-toes**, built entirely with **vanilla JavaScript, HTML, and CSS/Tailwind**.

## Project Setup

### Prerequisites

Ensure the following tools are installed:

- **Git**  
  Check with: `git --version`  
  Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)

- **Git Flow** extension  
  (Optional but recommended for consistent branching)

- **Node.js & npm**  
  Download: [https://nodejs.org/en](https://nodejs.org/en)  
  (Install the **latest LTS version**)

---

### Installation Steps

#### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://git.clp.kr/ybunhonggg/Tic-Tac-Toe.git
```

### 2. Install Dependencies

```bash
npm install
```

This command will install all the required dependencies, including:

vite for local development

@commitlint/cli and @commitlint/config-conventional

husky for commit message linting

### 3. Activate Git Hooks (Husky)

```bash
npx husky install
```

This sets up Git hooks on your local machine to enforce commit message rules using Commitlint.

⚠️You must run this command once after cloning, or commit checks will not run.

## 📁 Project Structure

This project follows a modular and scalable file organization to support reusable Web Components, static assets, styles, and utility logic. Below is an overview of the key folders and their responsibilities.

### src/

The `src/` folder contains all application logic, components, styles, and assets.

---

#### src/assets/

Static resources used across the project, including:

- **Images**
- **Icons**

These are referenced by components and pages for visual elements.

---

#### src/components/

All reusable Web Components are stored here and organized in this folders.

#### src/style/

Contains global styling resources used across the application. **tailwind**

#### src/utils/

JavaScript helper functions and utilities.

Typical use cases include:

- Fetching or transforming data
- Formatting dates
- String and number manipulatio
