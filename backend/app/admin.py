from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, List

from . import models, schemas
from .database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

def verify_admin(current_user: models.User = Depends(get_current_user)):
    # In a real app, you'd have an admin role check
    # For now, we'll just check if user exists
    return current_user

@router.get("/stats")
def get_admin_stats(
    admin_user: models.User = Depends(verify_admin),
    db: Session = Depends(get_db)
) -> Dict:
    total_users = db.query(func.count(models.User.id)).scalar()
    total_trips = db.query(func.count(models.Trip.id)).scalar()
    total_cities = db.query(func.count(models.City.id)).scalar()
    total_activities = db.query(func.count(models.Activity.id)).scalar()
    
    return {
        "total_users": total_users,
        "total_trips": total_trips,
        "total_cities": total_cities,
        "total_activities": total_activities
    }

@router.get("/users", response_model=List[schemas.User])
def get_all_users(
    admin_user: models.User = Depends(verify_admin),
    db: Session = Depends(get_db)
):
    users = db.query(models.User).all()
    return users

@router.get("/trips", response_model=List[schemas.Trip])
def get_all_trips(
    admin_user: models.User = Depends(verify_admin),
    db: Session = Depends(get_db)
):
    trips = db.query(models.Trip).all()
    return trips

@router.post("/cities", response_model=schemas.City)
def create_city(
    city: schemas.CityBase,
    admin_user: models.User = Depends(verify_admin),
    db: Session = Depends(get_db)
):
    db_city = models.City(**city.dict())
    db.add(db_city)
    db.commit()
    db.refresh(db_city)
    return db_city

@router.post("/activities", response_model=schemas.Activity)
def create_activity(
    activity: schemas.ActivityBase,
    city_id: int,
    admin_user: models.User = Depends(verify_admin),
    db: Session = Depends(get_db)
):
    # Verify city exists
    city = db.query(models.City).filter(models.City.id == city_id).first()
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    
    db_activity = models.Activity(**activity.dict(), city_id=city_id)
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity