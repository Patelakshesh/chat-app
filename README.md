# Socket.io Chat App

A real-time chat application built using Socket.io, designed for learning and demonstrating socket-based communication. This project includes a fully functional frontend and backend with proper authentication flow, making it a practical example for implementing real-time features in web applications.

## Live Demo

Check out the live version of the app here:  
[https://chat-app-six-pi-51.vercel.app/](https://chat-app-six-pi-51.vercel.app/)

## Features

- Real-time messaging with Socket.io
- User authentication with JWT
- Responsive and user-friendly frontend
- Secure backend with proper API routes
- Online user tracking
- Image upload and cloud storage integration
- Clean and maintainable code structure

## Technologies Used

- **Frontend:** React, Redux (or context), CSS
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Cloud Storage:** Cloudinary for image hosting

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB account with connection URI
- Cloudinary account for image storage

### Environment Variables

Create a `.env` file in your backend root and add the following variables:

MONGODB_URI="mongodb+srv://username:password@cluster0.abcde.mongodb.net/your-database-name?retryWrites=true&w=majority"
PORT=5000
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz123456"

text

### Installation

1. Clone this repository:
git clone https://github.com/Patelakshesh/chat-app.git

text
2. Navigate into project directories:
- For backend:
  ```
  cd chat-app/backend
  npm install
  ```
- For frontend:
  ```
  cd ../frontend
  npm install
  ```
3. Set up environment variables as shown above.
4. Start the backend server:
npm run dev

text
5. Start the frontend development server (in another terminal):
npm run dev

text
6. Open `http://localhost:5173` in your browser to use the app locally.

## Usage

- Register or login with your credentials.
- Start chatting with online users instantly.
- Send and receive messages with real-time updates.
- Upload and share images in chat messages.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the app.

## License

This project is open source and available under the MIT License.

---

Built with ❤️ for learning and sharing knowledge about real-time web applications and socket programming.
