# This is simple epxress app that use session and jwt for authentication

## Installation

```bash
npm install
```

## Configuration

Edit the `.env` file and update the following variables:

```bash
PORT=3000
SESSION_SECRET=secret
JWT_SECRET=your_secret_value
EXPIRES_IN=3600 # 1 hour
REDIS_URL=redis://localhost:6379
MONGO_URI=mongodb://localhost:27017/express-auth
```

## Usage

```bash
npm run dev
```

# Postman Collection

there is a postman collection that you can use to test the api `auth.postman_collection.json`
