from sqlalchemy import Column, Integer, String, Text, DateTime, Date, Time, Boolean, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(20))
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    trips = relationship("Trip", back_populates="user")
    community_posts = relationship("CommunityPost", back_populates="user")

class Trip(Base):
    __tablename__ = "trips"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(200), nullable=False)
    country = Column(String(100))
    description = Column(Text)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    budget = Column(Numeric(10, 2))
    status = Column(String(20), default="upcoming")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    user = relationship("User", back_populates="trips")
    itinerary_sections = relationship("ItinerarySection", back_populates="trip")
    community_posts = relationship("CommunityPost", back_populates="trip")

class City(Base):
    __tablename__ = "cities"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    latitude = Column(Numeric(10, 8))
    longitude = Column(Numeric(11, 8))
    description = Column(Text)
    image_url = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())
    
    activities = relationship("Activity", back_populates="city")

class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    category = Column(String(50))
    price = Column(Numeric(8, 2))
    duration = Column(Integer)  # in minutes
    rating = Column(Numeric(3, 2))
    image_url = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())
    
    city = relationship("City", back_populates="activities")

class ItinerarySection(Base):
    __tablename__ = "itinerary_sections"
    
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    day_number = Column(Integer, nullable=False)
    title = Column(String(200))
    description = Column(Text)
    start_time = Column(Time)
    end_time = Column(Time)
    location = Column(String(200))
    cost = Column(Numeric(8, 2))
    created_at = Column(DateTime, server_default=func.now())
    
    trip = relationship("Trip", back_populates="itinerary_sections")

class CommunityPost(Base):
    __tablename__ = "community_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    trip_id = Column(Integer, ForeignKey("trips.id"))
    title = Column(String(200), nullable=False)
    content = Column(Text)
    is_public = Column(Boolean, default=True)
    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
    
    user = relationship("User", back_populates="community_posts")
    trip = relationship("Trip", back_populates="community_posts")