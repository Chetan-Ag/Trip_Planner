from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import random

from . import models, schemas
from .database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/trips", tags=["trips"])

@router.get("/", response_model=List[schemas.Trip])
def get_trips(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trips = db.query(models.Trip).filter(
        models.Trip.user_id == current_user.id
    ).all()
    return trips

@router.get("/{trip_id}", response_model=schemas.Trip)
def get_trip(
    trip_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    return trip

@router.post("/", response_model=schemas.Trip)
def create_trip(
    trip: schemas.TripCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Parse date strings - handle both formats
    try:
        if '/' in trip.start_date:
            start_date = datetime.strptime(trip.start_date, '%m/%d/%Y').date()
            end_date = datetime.strptime(trip.end_date, '%m/%d/%Y').date()
        else:
            start_date = datetime.strptime(trip.start_date, '%Y-%m-%d').date()
            end_date = datetime.strptime(trip.end_date, '%Y-%m-%d').date()
    except (ValueError, AttributeError):
        raise HTTPException(status_code=422, detail="Invalid date format. Use YYYY-MM-DD or MM/DD/YYYY")
    
    db_trip = models.Trip(
        name=trip.name,
        country=trip.country,
        description=trip.description,
        start_date=start_date,
        end_date=end_date,
        budget=trip.budget,
        user_id=current_user.id
    )
    db.add(db_trip)
    db.commit()
    db.refresh(db_trip)
    
    # Auto-generate itinerary
    generate_auto_itinerary(db_trip, db)
    
    return db_trip

def generate_auto_itinerary(trip: models.Trip, db: Session):
    """Generate automatic itinerary based on trip duration and budget"""
    start_date = trip.start_date
    end_date = trip.end_date
    total_days = (end_date - start_date).days + 1
    daily_budget = float(trip.budget or 0) / total_days if trip.budget else 100
    
    # Sample activities and places for different destinations
    sample_activities = {
        'morning': [
            'Visit local museum', 'Explore historic district', 'Morning market tour',
            'Sunrise viewpoint', 'Walking tour', 'Local breakfast spot'
        ],
        'afternoon': [
            'City sightseeing', 'Cultural site visit', 'Shopping district',
            'Local restaurant lunch', 'Park or garden visit', 'Art gallery tour'
        ],
        'evening': [
            'Sunset viewing', 'Local dinner', 'Night market',
            'Cultural show', 'Waterfront walk', 'Local nightlife'
        ]
    }
    
    for day in range(total_days):
        current_date = start_date + timedelta(days=day)
        day_number = day + 1
        
        # Morning activity
        morning_activity = random.choice(sample_activities['morning'])
        morning_section = models.ItinerarySection(
            trip_id=trip.id,
            day_number=day_number,
            title=f"Morning - {morning_activity}",
            description=f"Start your day {day_number} with {morning_activity.lower()}",
            start_time=datetime.strptime('09:00', '%H:%M').time(),
            end_time=datetime.strptime('12:00', '%H:%M').time(),
            cost=daily_budget * 0.3
        )
        
        # Afternoon activity
        afternoon_activity = random.choice(sample_activities['afternoon'])
        afternoon_section = models.ItinerarySection(
            trip_id=trip.id,
            day_number=day_number,
            title=f"Afternoon - {afternoon_activity}",
            description=f"Continue day {day_number} with {afternoon_activity.lower()}",
            start_time=datetime.strptime('13:00', '%H:%M').time(),
            end_time=datetime.strptime('17:00', '%H:%M').time(),
            cost=daily_budget * 0.4
        )
        
        # Evening activity
        evening_activity = random.choice(sample_activities['evening'])
        evening_section = models.ItinerarySection(
            trip_id=trip.id,
            day_number=day_number,
            title=f"Evening - {evening_activity}",
            description=f"End day {day_number} with {evening_activity.lower()}",
            start_time=datetime.strptime('18:00', '%H:%M').time(),
            end_time=datetime.strptime('21:00', '%H:%M').time(),
            cost=daily_budget * 0.3
        )
        
        db.add_all([morning_section, afternoon_section, evening_section])
    
    db.commit()

@router.put("/{trip_id}", response_model=schemas.Trip)
def update_trip(
    trip_id: int,
    trip_update: schemas.TripUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    for field, value in trip_update.dict(exclude_unset=True).items():
        setattr(trip, field, value)
    
    db.commit()
    db.refresh(trip)
    return trip

@router.delete("/{trip_id}")
def delete_trip(
    trip_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    db.delete(trip)
    db.commit()
    return {"message": "Trip deleted successfully"}

@router.get("/{trip_id}/itinerary", response_model=List[schemas.ItinerarySection])
def get_itinerary(
    trip_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    sections = db.query(models.ItinerarySection).filter(
        models.ItinerarySection.trip_id == trip_id
    ).order_by(models.ItinerarySection.day_number, models.ItinerarySection.start_time).all()
    
    return sections

@router.post("/{trip_id}/sections", response_model=schemas.ItinerarySection)
def add_itinerary_section(
    trip_id: int,
    section: schemas.ItinerarySectionCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    db_section = models.ItinerarySection(**section.dict(), trip_id=trip_id)
    db.add(db_section)
    db.commit()
    db.refresh(db_section)
    return db_section

@router.put("/{trip_id}/sections/{section_id}", response_model=schemas.ItinerarySection)
def update_itinerary_section(
    trip_id: int,
    section_id: int,
    section_update: schemas.ItinerarySectionUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    section = db.query(models.ItinerarySection).filter(
        models.ItinerarySection.id == section_id,
        models.ItinerarySection.trip_id == trip_id
    ).first()
    
    if not section:
        raise HTTPException(status_code=404, detail="Itinerary section not found")
    
    for field, value in section_update.dict(exclude_unset=True).items():
        setattr(section, field, value)
    
    db.commit()
    db.refresh(section)
    return section

@router.delete("/{trip_id}/sections/{section_id}")
def delete_itinerary_section(
    trip_id: int,
    section_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    section = db.query(models.ItinerarySection).filter(
        models.ItinerarySection.id == section_id,
        models.ItinerarySection.trip_id == trip_id
    ).first()
    
    if not section:
        raise HTTPException(status_code=404, detail="Itinerary section not found")
    
    db.delete(section)
    db.commit()
    return {"message": "Itinerary section deleted successfully"}