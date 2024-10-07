# BeeHive - Meeting Room Booking System for Co-working spaces

This Meeting Room Booking System Platform allows users to book room spaces based on available slots with ease and provides admins the ability to manage these slots and bookings.

---

### [Live Server](https://beehive-server.vercel.app/)

```console
https://beehive-server.vercel.app/
```

---

![POSTMAN COLLECTION](./postman_collection.json)

Description: This is a postman collection of all the API endpoints.Download this , and import it in your postman if you needed.

---

## Used Technologies:

- TypeScript
- Node.js
- Express.js
- Mongoose
- JsonWebToken
- Zod

## Features:

- **User Authentication and Authorization:**
  Users can sign up and log in using their email and password. Admins have additional powers for managing slots and bookings.

- **Room Management:**
  Admins can create, update, and delete Rooms. Each Room has details like name, room no, capacity, floor no, price per slot and amenities.

- **Slot System:**
  Admins can create slots by specifying the room(mongodb objectid), date, start time, and end time. The system calculates the slots time based on the start time and end time.

- **Booking System:**
  Users can book slots by specifying the date, slot, room and user. The system calculates the payable amount based on the price per slot.

- **Availability Checking:**
  Users can check the availability of slots for a specific room and date.

- **View Bookings:**
  Admins can view all bookings, while users can view only their own bookings. This helps in managing and tracking reservations efficiently.

- **Booking Cancellation:**
  Admin have the ability to cancel user's bookings.

- **Error Handling:**
  Comprehensive error handling ensures proper responses and messages for validation errors, duplicate entries, and not found routes.

- **Authentication Middleware:**
  Middleware is implemented to protect routes, ensuring that only authenticated users and admins can access their respective routes.

- **Security:**
  JWT based authentication is implemented to protect routes and ensure that only authorized users and admins can access their respective routes.

## How to setup in local computer:

### Clone the Repository:

```plain
git clone https://github.com/rudro987/Bee-Hive-Server.git
```

### Install Dependencies:

```markdown
npm install OR pnpm install
```

### Environment Variables:

- Create a `.env` file in the root directory.
- Add the following environment variables:

```markdown
PORT=5000
DATABASE_URL=your_database_url
BCRYPT_SALT_ROUNDS=any_integer_number
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
```

### Run the Application:

```markdown
npm run start:dev or pnpm start:dev
```

## How to use the application:

### 1. User Sign Up

- Endpoint: POST `/api/auth/signup`

- Request Body:

```json
{
  "name": "Beehive User",
  "email": "user@beehive.com",
  "password": "user123",
  "phone": "1234567890",
  "role": "user",
  "address": "123 Main Street, City, Country"
}
```

-Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Beehive User",
    "email": "user@beehive.com",
    "phone": "1234567890",
    "role": "user",
    "address": "123 Main Street, City, Country"
  }
}
```

### 2. User Login

- Endpoint: POST `/api/auth/login`

- Request Body:

```json
{
  "email": "user@beehive.com",
  "password": "user123"
}
```

- Request Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Beehive User",
    "email": "user@beehive.com",
    "phone": "1234567890",
    "role": "user",
    "address": "123 Main Street, City, Country"
  }
}
```

### 3. Create Room (Admin Only)

- Endpoint: POST `/api/rooms`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

### 4. Get All Rooms 

- Endpoint: GET `/api/rooms`

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Rooms retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "name": "Meeting Room",
      "roomNo": 301,
      "floorNo": 2,
      "capacity": 10,
      "pricePerSlot": 200,
      "amenities": ["Whiteboard"],
      "isDeleted": false
    }
    // Other available rooms
  ]
}
```

### 5. Get a Room

- Endpoint: GET `/api/rooms/:id`

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room retrieved successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

### 6. Update Room (Only Accessible by Admin)

- Endpoint: PUT `/api/rooms/:id`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
  "pricePerSlot": 200 //we can update any field dynamically, (e.g., name, roomNo, floorNo, capacity, pricePerSlot, amenities)..
}
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

### 7. Delete a Room (Soft Delete, Only Accessible by Admin)

- Endpoint: DELETE `/api/rooms/:id`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": true
  }
}
```

### 8. Create Slot (Only Accessible by Admin)

- Endpoint: POST `/api/slots`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "09:00",
    "endTime": "14:00"
}
```

**Note:** The startTime and endTime should be in `HH:MM` with 24 hours format and date should be in `YYYY-MM-DD` format.

- Response Body:

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Slots created successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "09:00",
            "endTime": "10:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "10:00",
            "endTime": "11:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c8",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "11:00",
            "endTime": "12:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c9",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "12:00",
            "endTime": "13:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1ca",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "13:00",
            "endTime": "14:00",
            "isBooked": false
        }
    ]
}
```

**Note:** Slots will be calculated based on startTime and endTime. when sending the request slots will be automatically calculated by 60 min duration.

### 9. Get available slots

- Endpoint: GET `/api/slots/availability`

- Query parameters: date, roomId

-Query endpoint example: `/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5`

- Response Body:

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Available slots retrieved successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "room": {
                "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Conference Room",
                "roomNo": 201,
                "floorNo": 1,
                "capacity": 20,
                "pricePerSlot": 100,
                "amenities": ["Projector", "Whiteboard"],
                "isDeleted": false
            },
            "date": "2024-06-15",
            "startTime": "09:00",
            "endTime": "10:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "room": {
                "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Conference Room",
                "roomNo": 201,
                "floorNo": 1,
                "capacity": 20,
                "pricePerSlot": 100,
                "amenities": ["Projector", "Whiteboard"],
                "isDeleted": false
            },
            "date": "2024-06-15",
            "startTime": "10:00",
            "endTime": "11:00",
            "isBooked": false
        }
    ]
}
```

### 10. Create a Booking (Only Accessible by Authenticated User)

- Endpoint: GET `/api/bookings`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c9",
    "date": "2024-06-15",
    "slots": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "10:00",
        "isBooked": true
      },
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "11:00",
        "isBooked": true
      }
    ],
    "room": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    "user": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "address": "123 Main St, Anytown, USA",
      "role": "user"
    },
    "totalAmount": 200,
    "isConfirmed": "unconfirmed",
    "isDeleted": false
  }
}
```

### 11. Get All Bookings (Only Accessible by Admin)

- Endpoint: GET `/api/bookings`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All bookings retrieved successfully",
  "data": [
    {
    "_id": "60d9c4e4f3b4b544b8b8d1c9",
    "date": "2024-06-15",
    "slots": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "10:00",
        "isBooked": true
      },
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "11:00",
        "isBooked": true
      }
    ],
    "room": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    "user": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "address": "123 Main St, Anytown, USA",
      "role": "user"
    },
    "totalAmount": 200,
    "isConfirmed": "unconfirmed",
    "isDeleted": false
  },
   // other bookings ( If any )
  ]
}
```

### 12. Get User's Bookings (Only Accessible by Authenticated User)

- Endpoint: GET `/api/my-bookings`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
       {
         "_id": "60d9c4e4f3b4b544b8b8d1ca",
         "date": "2024-06-15",
         "slots": [
              {
                "_id": "60d9c4e4f3b4b544b8b8d1c6",
                "room": "60d9c4e4f3b4b544b8b8d1c5",
                "date": "2024-06-15",
                "startTime": "09:00",
                "endTime": "10:00",
                "isBooked": true
              },
              {
                "_id": "60d9c4e4f3b4b544b8b8d1c7",
                "room": "60d9c4e4f3b4b544b8b8d1c5",
                "date": "2024-06-15",
                "startTime": "10:00",
                "endTime": "11:00",
                "isBooked": true
              }
            ],
            "room": {
              "_id": "60d9c4e4f3b4b544b8b8d1c5",
              "name": "Conference Room",
              "roomNo": 201,
              "floorNo": 1,
              "capacity": 20,
              "pricePerSlot": 100,
              "amenities": ["Projector", "Whiteboard"],
              "isDeleted": false
            },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
  ]
}
```

### 13. Update Booking (Only Accessible by Admin)

- Endpoint: PUT `/api/bookings/:id`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
  "isConfirmed": "confirmed"
}
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": false
  }
}
```

### 14. Delete Booking (Soft Delete, Only Accessible by Admin)

- Endpoint: DELETE `/api/bookings/:id`

- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": true
  }
}
```

### Error Handling

The application handles errors such as validation errors, duplicate entries, and not found routes with appropriate error messages and status codes.

### No Data Found

No data found route if no matching data is found when retrieving data from database.

- Response Body:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data":[]
}
```
### Not Found Route

Global Not found route handler for unmatched route.

- Response Body:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found",
}
```

## Happy Coding 😎
