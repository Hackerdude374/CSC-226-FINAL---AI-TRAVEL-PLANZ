# TripPlanner Backend Setup Guide

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/)
- Your favorite IDE (Visual Studio Code, Visual Studio, etc.)

## Database Setup

1. Connect to PostgreSQL:
```bash
psql -U postgres
```

2. Create database and setup schema:
```sql
-- Create database
CREATE DATABASE tripplanner;

-- Connect to database
\c tripplanner

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create trips table
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    user_selection JSONB NOT NULL,
    trip_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX idx_trips_user_email ON trips(user_email);
```

## Backend Project Setup

1. Create new Web API project:
```bash
dotnet new webapi -n TripPlanner.API
cd TripPlanner.API
```

2. Add required NuGet packages:
```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design
```

3. Create project structure:
```
TripPlanner.API/
├── Controllers/
│   └── TripsController.cs
├── Models/
│   └── Trip.cs
├── Data/
│   └── TripPlannerContext.cs
├── Program.cs
└── appsettings.json
```

4. Update appsettings.json with your database connection:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=tripplanner;Username=postgres;Password=your_password"
  }
}
```

## Running the Application

1. Make sure PostgreSQL is running

2. Start the application:
```bash
dotnet run
```

3. Access Swagger UI:
- Navigate to `https://localhost:7000/swagger` (port may vary)

## Available Endpoints

- `POST /api/trips` - Create new trip
- `GET /api/trips/{id}` - Get specific trip
- `GET /api/trips/user/{email}` - Get all trips for user

## Testing the API

Using curl or Postman:

1. Create a trip:
```bash
curl -X POST https://localhost:7000/api/trips \
  -H "Content-Type: application/json" \
  -d '{
    "userEmail": "test@example.com",
    "userSelection": {"location": {"label": "Paris"}, "noOfDays": 3},
    "tripData": {"hotels": [], "itinerary": []}
  }'
```

2. Get user's trips:
```bash
curl https://localhost:7000/api/trips/user/test@example.com
```

## Troubleshooting

1. Database connection issues:
- Verify PostgreSQL is running
- Check connection string in appsettings.json
- Ensure database and table exist

2. CORS issues:
- Backend is configured to allow all origins in development
- Check frontend URL matches allowed origins

## Next Steps

1. Test each endpoint using Swagger UI
2. Update frontend to use new API endpoints
3. Add authentication if needed
4. Deploy to production environment

Need help? Open an issue in the repository!