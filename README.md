
# Tech Task Time Tracker

**Tech Task Time Tracker** is a web-based tool built with React and Material-UI to help developers estimate the time required to complete a technical task. It factors in multiple variables such as working hours, task complexity, dependencies, stakeholder interactions, skill level, environmental factors, and planning fallacy (cognitive bias) to provide a more accurate time estimate.

## Features

- **Working Hours per Day:** Set how many hours you plan to work each day.
- **Estimated Time:** Input a rough estimate of the time required to complete the task, which can be toggled between hours and days.
- **Dependencies:** Adjust the impact of dependencies involving coordination and potential blockers.
- **Interactions with Stakeholders:** Account for time needed for communication with stakeholders, including meetings and approvals.
- **Skill and Context Level:** Adjust based on familiarity with the codebase and required technologies.
- **Environmental Factors:** Consider interruptions and context switching, such as meetings or on-call duties.
- **Planning Fallacy Adjustment:** Apply a percentage to account for optimism bias in your initial estimate.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tazril/tech-task-time-tracker.git
   cd tech-task-time-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the App

To start the development server, run:

```bash
npm start
```

or

```bash
yarn start
```

This will open the app in your default web browser at `http://localhost:3000`.

### Usage

1. **Set Working Hours per Day:** Adjust the slider to indicate how many hours per day you plan to work.
2. **Estimate Time:** Provide a rough estimate of how long the task will take, and choose whether the estimate is in hours or days.
3. **Adjust the Impact of Various Factors:**
   - Use the tabs to select the impact level (Low, Medium, High) for dependencies, interactions with stakeholders, skill level, and environmental factors.
   - The impact multiplier is displayed on the right, showing how much each factor increases the estimated time.
4. **Adjust for Planning Fallacy:** Use the slider to add a percentage to account for optimism bias.
5. **View Final Estimate:** The total estimated time is displayed at the bottom of the app.

## Customization

- **Impact Multipliers:** The impact of each factor (Low, Medium, High) can be adjusted in the code within the `getTabImpactMultiplier` function.
- **Planning Fallacy Adjustment:** You can modify the maximum adjustment allowed for planning fallacy in the slider component.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React components for faster and easier web development.
- **Icons**: Material-UI icons for intuitive user interactions.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Author

Made with ❤️ by [Tazril Ali](https://github.com/tazril)

