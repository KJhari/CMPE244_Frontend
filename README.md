# IoT-Based Motor Control Frontend

## Description
This is the frontend of an IoT-based motor control system that integrates with a ChatGPT-like model. It provides a user-friendly web interface for controlling motor functions and interacting with the model for queries related to the motor operations.

## Features
- Interactive form for motor control with validations.
- Chat interface for communication with a ChatGPT-like model.
- Responsive design for accessibility across various devices.

## Technologies Used
- Angular
- TypeScript
- Bootstrap for styling

## Installation

### Prerequisites
- Node.js and npm (https://nodejs.org/)
- Angular CLI (Install via `npm install -g @angular/cli`)

### Setup
1. Clone the repository or download the source code.
2. Navigate to the frontend directory: `cd path/to/frontend`
3. Install dependencies: `npm install`
4. change the 'apiUrl' and 'gptapiUrl' in the api.service.ts according to the backend running device's IP
5. Run the Angular application: `ng serve`
6. Access the application at `http://localhost:4200`

## Usage
1. On accessing the web application, you'll be presented with a form to control the motor.
2. Enter the desired parameters for motor control like Frequency, Duty Cycle, Direction, Time, and Degrees.
3. Submit the form to see the motor response and sensor data.
4. Use the Chat Support tab to interact with the ChatGPT-like model for queries or support.

## Contributing
We welcome contributions to enhance the functionality and user experience of this frontend application. To contribute:
1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`.
3. Make changes and commit them: `git commit -m 'Add some feature'`.
4. Push to your branch: `git push origin feature/your-feature-name`.
5. Open a pull request against the main branch.


## Feedback
If you have any feedback or suggestions, please open an issue in the repository, or contact us directly.


