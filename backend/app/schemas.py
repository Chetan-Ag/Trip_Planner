from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import date, datetime, time
from decimal import Decimal
import re

# Custom email validator that's more lenient
def validate_email(email: str) -> str:
    if '@' in email and len(email) > 3:
        return email
    raise ValueError('Invalid email format')

class EmailField(str):
    @classmethod
    def __get_validators__(cls):
        yield validate_email

# User schemas
class UserBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    profilePhoto: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Trip schemas
class TripBase(BaseModel):
    name: str
    country: Optional[str] = None
    description: Optional[str] = None
    start_date: date  # Changed to date type
    end_date: date    # Changed to date type
    budget: Optional[Decimal] = None

class TripCreate(TripBase):
    pass

class TripUpdate(BaseModel):
    name: Optional[str] = None
    country: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    budget: Optional[Decimal] = None
    status: Optional[str] = None

class Trip(TripBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# City schemas
class CityBase(BaseModel):
    name: str
    country: str
    latitude: Optional[Decimal] = None
    longitude: Optional[Decimal] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

class City(CityBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Activity schemas
class ActivityBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[Decimal] = None
    duration: Optional[int] = None
    rating: Optional[Decimal] = None
    image_url: Optional[str] = None

class Activity(ActivityBase):
    id: int
    city_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Itinerary section schemas
class ItinerarySectionBase(BaseModel):
    day_number: int
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    location: Optional[str] = None
    cost: Optional[Decimal] = None

class ItinerarySectionCreate(ItinerarySectionBase):
    pass

class ItinerarySectionUpdate(BaseModel):
    day_number: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    location: Optional[str] = None
    cost: Optional[Decimal] = None

class ItinerarySection(ItinerarySectionBase):
    id: int
    trip_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Community post schemas
class CommunityPostBase(BaseModel):
    title: str
    content: Optional[str] = None
    is_public: bool = True

class CommunityPostCreate(CommunityPostBase):
    trip_id: Optional[int] = None

class CommunityPost(CommunityPostBase):
    id: int
    user_id: int
    trip_id: Optional[int] = None
    likes_count: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class LoginRequest(BaseModel):
    email: str
    password: str