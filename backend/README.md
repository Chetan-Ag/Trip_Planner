# Travel Planner Backend

A FastAPI-based backend for the Travel Planner application with SQLite database integration.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Trip Management**: Create, read, update, delete trips with itinerary planning
- **Search Functionality**: Search cities and activities with filters
- **Community Features**: Share trips and posts with other users
- **Budget Tracking**: Calculate and track trip expenses
- **Admin Dashboard**: Administrative functions for managing data

## Quick Start

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Setup Database**:
   ```bash
   python setup_db.py
   ```

3. **Start Server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   Or use the startup script:
   ```bash
   start.bat
   ```

4. **Access API Documentation**:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /logout` - User logout

### Trips (`/api/trips`)
- `GET /` - Get user's trips
- `POST /` - Create new trip
- `GET /{trip_id}` - Get specific trip
- `PUT /{trip_id}` - Update trip
- `DELETE /{trip_id}` - Delete trip
- `GET /{trip_id}/itinerary` - Get trip itinerary
- `POST /{trip_id}/sections` - Add itinerary section
- `PUT /{trip_id}/sections/{section_id}` - Update itinerary section
- `DELETE /{trip_id}/sections/{section_id}` - Delete itinerary section

### Search (`/api/search`)
- `GET /cities` - Search cities
- `GET /activities` - Search activities
- `GET /popular-cities` - Get popular cities
- `GET /cities/{city_id}/activities` - Get city activities

### Community (`/api/community`)
- `GET /trips` - Get public community trips
- `GET /posts` - Get community posts
- `POST /posts` - Create community post
- `GET /posts/{post_id}` - Get specific post
- `POST /posts/{post_id}/like` - Like a post

### Budget (`/api/budget`)
- `GET /trip/{trip_id}/summary` - Get trip budget summary
- `GET /estimates/activity/{activity_id}` - Get activity cost estimate

### Admin (`/api/admin`)
- `GET /stats` - Get system statistics
- `GET /users` - Get all users
- `GET /trips` - Get all trips
- `POST /cities` - Create new city
- `POST /activities` - Create new activity

## Database Schema

The application uses SQLite with the following main tables:
- `users` - User accounts and profiles
- `trips` - User trips and travel plans
- `cities` - Available cities for travel
- `activities` - Activities available in cities
- `itinerary_sections` - Detailed trip itinerary items
- `community_posts` - Community shared content

## Environment Variables

Create a `.env` file with:
```
DATABASE_URL=sqlite:///./travel_planner.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Development

The backend is structured as follows:
- `app/main.py` - FastAPI application entry point
- `app/database.py` - Database connection and session management
- `app/models.py` - SQLAlchemy database models
- `app/schemas.py` - Pydantic request/response schemas
- `app/auth.py` - Authentication endpoints and JWT handling
- `app/trips.py` - Trip management endpoints
- `app/search.py` - Search functionality endpoints
- `app/community.py` - Community features endpoints
- `app/budget.py` - Budget calculation endpoints
- `app/admin.py` - Admin dashboard endpoints

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS configured for frontend integration
- Input validation using Pydantic schemas