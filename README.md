# Trading Workflow Automation Platform

A visual workflow automation platform inspired by n8n that allows users to create, manage, and execute trading workflows using drag-and-drop nodes.

## Features

* User Authentication (JWT)
* Create and Manage Workflows
* Visual Workflow Builder using React Flow
* Trigger Nodes

  * Timer Trigger
  * Price Trigger
* Action Nodes

  * Hyperliquid
  * Backpack
  * Lighter
* Workflow Execution Tracking
* MongoDB Database Integration
* REST API Backend
* TypeScript Support

---

## Tech Stack

### Frontend

* React
* TypeScript
* React Flow
* Axios
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Zod Validation

---

## Project Structure

```bash
apps/
├── Backend/
│   ├── index.ts
│   ├── middleware.ts
│   ├── db.ts
│   └── routes
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── nodes/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── App.tsx
│
packages/
└── common/
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/trading-workflow.git
cd trading-workflow
```

### Install Dependencies

```bash
bun install
```

or

```bash
npm install
```

---

## Environment Variables

### Backend

Create `.env`

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

### Frontend

Create `.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## Running the Project

### Backend

```bash
cd apps/Backend
bun run dev
```

### Frontend

```bash
cd apps/Frontend
bun run dev
```

---

## API Endpoints

### Authentication

#### Signup

```http
POST /signup
```

#### Signin

```http
POST /signin
```

---

### Workflows

#### Create Workflow

```http
POST /workflow
```

#### Update Workflow

```http
PUT /workflow/:workflowId
```

#### Get Workflow

```http
GET /workflow/:workflowId
```

#### List Workflows

```http
GET /workflows
```

---

### Executions

#### List Workflow Executions

```http
GET /workflow/executions/:workflowId
```

---

## Example Workflow Payload

```json
{
  "nodes": [
    {
      "nodeId": "6a262bc1ffdabfe7114281a3",
      "id": "1",
      "position": {
        "x": 100,
        "y": 100
      },
      "data": {
        "kind": "TRIGGER",
        "metadata": {
          "time": 5
        }
      }
    }
  ],
  "edges": []
}
```

---

## Authentication

Protected routes require:

```http
Authorization: Bearer <jwt_token>
```

---

## Future Improvements

* Workflow Scheduler
* Real-time Workflow Execution
* Webhook Trigger Support
* Retry Mechanism
* Workflow Versioning
* Node Marketplace
* Docker Deployment
* Kubernetes Support

---

## Author

Mohamed Fazil

Built with ❤️ using React, TypeScript, Express, MongoDB, and React Flow.
