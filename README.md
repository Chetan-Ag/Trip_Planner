# 🏖️ TripPlanner - Your Holiday Adventure Starts Here!

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-0.104.1-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
</div>

<div align="center">
  <h3>✈️ Plan • 🗺️ Explore • 🎒 Adventure</h3>
  <p><em>A complete travel planning application for creating customized multi-city itineraries</em></p>
</div>

---

## 🌟 Features

### 🔐 **Authentication System**
- Secure user registration and login
- JWT token-based authentication
- Password hashing with bcrypt

### 🎯 **Trip Management**
- Create personalized trips with destinations and budgets
- Auto-generated itineraries based on country selection
- Interactive itinerary builder with day-by-day planning
- Real-time cost tracking and budget management

### 📅 **Itinerary Builder**
- Add activities with specific times and locations
- Edit and customize your daily schedule
- Cost breakdown per activity
- Visual timeline view of your entire trip

### 🔍 **Discovery Features**
- Search destinations and activities
- Community sharing and inspiration
- Calendar integration for trip visualization

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### 🔧 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python setup_db.py
python run.py
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🌐 Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

## 📱 Application Screens

### 🏠 **Dashboard**
Central hub showing upcoming trips, popular destinations, and quick actions

### ✈️ **Create Trip**
Intuitive form to start planning your adventure with dates, destinations, and budgets

### 🗺️ **Itinerary Builder**
Interactive interface to add cities, activities, and customize your day-by-day plan

### 📋 **Trip View**
Beautiful timeline visualization of your complete itinerary with cost breakdowns

### 👥 **Community**
Share your trips and get inspired by other travelers

---

## 🏗️ Architecture

### **Frontend (React)**
```
src/
├── components/     # Reusable UI components
├── pages/         # Application screens
├── services/      # API integration
└── utils/         # Helper functions
```

### **Backend (FastAPI)**
```
app/
├── models.py      # Database models
├── schemas.py     # Pydantic schemas
├── auth.py        # Authentication logic
├── trips.py       # Trip management
└── database.py    # Database configuration
```

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Fast build tool

### **Backend**
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Lightweight database
- **JWT** - Secure authentication
- **Pydantic** - Data validation

---

## 🎨 Key Features Showcase

### 🎯 **Smart Itinerary Generation**
```python
# Auto-generates activities based on destination
def generate_auto_itinerary(trip, db):
    activities = get_country_activities(trip.country)
    for day in range(trip_duration):
        create_daily_activities(day, activities)
```

### 💰 **Real-time Budget Tracking**
```javascript
const totalCost = itinerary.reduce((sum, section) => 
  sum + (parseFloat(section.cost) || 0), 0
)
```

### 🔒 **Secure Authentication**
```python
@router.post("/login")
async def login(credentials: LoginRequest):
    user = authenticate_user(credentials)
    token = create_access_token(user.id)
    return {"access_token": token, "user": user}
```

---

## 📊 Database Schema

### **Core Tables**
- **Users** - User accounts and profiles
- **Trips** - Trip information and metadata
- **Itinerary Sections** - Daily activities and schedules
- **Cities & Activities** - Destination data

---

## 🚀 Deployment

### **Development**
```bash
# Start backend
cd backend && python run.py

# Start frontend
cd frontend && npm run dev
```

### **Production**
```bash
# Build frontend
npm run build

# Deploy with your preferred hosting service
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 Acknowledgments

- Built for GlobalTrotters travel planning platform
- Designed with modern web development best practices
- Focused on user experience and performance

---

<div align="center">
  <h3>🌍 Start Planning Your Next Adventure Today! 🌍</h3>
  <p><em>Made with ❤️ for travelers around the world</em></p>
  <p>© 2026 TripPlanner - Making Dreams Come True ✨</p>
</div>