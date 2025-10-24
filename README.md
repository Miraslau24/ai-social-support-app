# Social Support Application with AI Assistance

This project is the front-end for a modern government social support portal, designed to make applying for financial assistance a seamless and accessible experience for all citizens. The core of the application is a user-friendly, multi-step form wizard that guides users through the process efficiently. To further simplify the application, it integrates the OpenAI GPT API, providing intelligent assistance to help users complete text-based sections with confidence and ease.

### ✨ Features

- **Multi-Step Wizard**: A clean, 3-step process + success screen
- **Persistent State**: Uses **redux-persist** to save form data to localStorage. Users can refresh the page and continue where they left off
- **Dynamic Form Generation**: ***The CustomForm*** component renders fields based on configuration files (constants/*.ts), making it easy to add or modify fields
- **On-the-fly Validation**: Uses ***react-hook-form*** and ***zod*** for robust validation. The Zod schema is also generated from the same constants
- **AI Assistant Integration**:
   - Requests to the ```OpenAI``` API for contextual suggestions
   - Adaptive UI: Renders as a sidebar on desktop and a modal on mobile
   - Loading state management (up to 3.5 minutes) using a Skeleton loader
   - TypewriterText animation for displaying the response
- **Localization (i18n)**: Support for English and Arabic using i18next
- **Modern Stack**: React 19, Vite, TypeScript, TailwindCSS 4

### 🛠 Tech Stack

- **Framework/Library**: React 19
- **Bundler**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **UI Components**: Ant Design 5.x
- **State Management**: Redux Toolkit, React-Redux
- **State Persistence**: Redux Persist
- **Forms**: React Hook Form
- **Schema Validation**: Zod
- **Localization**: i18next

### 🚀 Getting Started

#### 1. Prerequisites

- Node.js (v20.19+ or later recommended)
- npm


#### 2. Installation

  1. Clone the repository:
   ```bash
       git clone https://github.com/Miroslau/ai-social-support-app.git
       cd ai-social-support-app
   ```
   2. Install dependencies
   ```bash
     npm install
   ```

#### 3. Environment Setup (Setting the API Key) ⚠️ Important!

The project uses the ```OpenAi``` API for the "Help Me Write" feature. You must provide your own API key.

1) In the project root, find the ```.env.example``` file.
2) Create a copy of it named ```.env```:
```bash
   cp .env.example .env
   ```
3) Open ```.env``` and paste your API key:
```bash
   # .env file
   VITE_OPEN_AI_KEY=YOUR_API_KEY_GOES_HERE
   ```

#### 4. Running the Project
- For development (with hot-reload):
```bash
   npm run dev
   ```
Open ```http://localhost:5173``` (or the port Vite specifies in the console).
- For production build:
```bash
   npm run preview
   ```
- For previewing the production build:
```bash
   npm run preview
   ```



### 🏛 Architecture & Design Decisions
This section briefly explains why the application is built this way.

#### 'Flat' Redux Slices
Instead of one large ```applicationSlice```, we split the state into independent ```slices```:
- ```personalInfoSlice```
- ```familyFinancialInfoSlice```
- ```situationDescriptionSlice```
- ```wizardSlice``` (manages ```currentStep```)
- ```aiSuggestionSlice``` (manages the AI response)

#### Advantages

1. Clean redux-persist: We don't need transforms or autoMergeLevel2. In store.ts, we simply specify in the whitelist which slices to persist (e.g., ['personalInfo', 'wizard']) and which to ignore (aiSuggestion, submission).
2. Separation of Concerns: Each slice manages only its own part, simplifying the reducers.

#### Config-Driven UI

We did not write JSX for every form field. Instead:
1. constants/*.ts (e.g., personalInfoInputs.ts) define the model (model), type (type), validation (required), and format (format: 'email') for each field.
2. utils/validationSchema.ts reads these configs and automatically generates the Zod schema.
3. components/form/CustomForm.tsx reads these configs and automatically renders the correct components (TextInput, DatePicker, TextAreaInput).

#### Advantages

1. ***DRY (Don't Repeat Yourself):*** A single source of truth for fields.
2. ***Easy Maintenance:*** To add a new field, you only need to add one object to constants and one key to locales/*.json.

#### AI Assistant Architecture (Decoupling)

We intentionally decoupled the logic:

1. ```MultiStepForm``` (Step 2) contains the ```Help Me Write``` button. On click, it only calls ```onHelpMeWriteClick```, which it receives from ```App.tsx```.

2. ```App.tsx``` (our 'Layout') changes ```isAiPopupOpen``` from ```false``` to ```true```.

3. ```AiPopup.tsx``` (rendered in ```App.tsx```) 'sees' (```useEffect```) that its ```isOpen``` prop is true and its aiStatus is 'idle'.

4. ```AiPopup``` itself then dispatches fetchAiSuggestion(...).

#### Advantages:
1. ```MultiStepForm``` oesn't know how the fetch works; it just says "open."

2. ```AiPopup.tsx``` is fully autonomous: it manages its own fetch, Skeleton loading, and Typewriter animation

3. The AI is read-only to assist the user, not to interfere by auto-injecting text.

### 📈 Future Improvements
- ***Final Submission:*** The "Done" button on the last step currently goes to the "Success" screen. In handleSubmit (for currentStep === 2), a dispatch(submitFinalFormThunk(data)) should be added to send all collected slices (personalInfo, etc.) to a real backend.

- ***Improved Loading State:*** The "Done" button should show a loading spinner while submissionSlice.status is 'loading'.

- ***Error Handling (Toast):*** On a fetchAiSuggestion or submitFinalFormThunk error, show the user an Ant Design Alert or message.error() instead of just a console.error.

- ***"Accept" for AI:*** (If required) The "Accept" / "Edit" buttons we discussed could be implemented. This would require moving AiPopup inside MultiStepForm and passing the formRef to it, so it could call formRef.current.setFieldValue().