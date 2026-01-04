from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict

from . import models
from .database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/budget", tags=["budget"])

@router.get("/trip/{trip_id}/summary")
def get_trip_budget_summary(
    trip_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict:
    # Verify trip belongs to user
    trip = db.query(models.Trip).filter(
        models.Trip.id == trip_id,
        models.Trip.user_id == current_user.id
    ).first()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Calculate total spent from itinerary sections
    total_spent = db.query(func.sum(models.ItinerarySection.cost)).filter(
        models.ItinerarySection.trip_id == trip_id
    ).scalar() or 0
    
    # Get budget breakdown by day
    daily_costs = db.query(
        models.ItinerarySection.day_number,
        func.sum(models.ItinerarySection.cost).label('daily_total')
    ).filter(
        models.ItinerarySection.trip_id == trip_id
    ).group_by(models.ItinerarySection.day_number).all()
    
    budget_remaining = float(trip.budget or 0) - float(total_spent)
    
    return {
        "trip_id": trip_id,
        "total_budget": float(trip.budget or 0),
        "total_spent": float(total_spent),
        "budget_remaining": budget_remaining,
        "daily_breakdown": [
            {
                "day": day,
                "amount": float(amount)
            }
            for day, amount in daily_costs
        ]
    }

@router.get("/estimates/activity/{activity_id}")
def get_activity_cost_estimate(
    activity_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict:
    activity = db.query(models.Activity).filter(
        models.Activity.id == activity_id
    ).first()
    
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    
    return {
        "activity_id": activity_id,
        "name": activity.name,
        "base_price": float(activity.price or 0),
        "duration_minutes": activity.duration,
        "category": activity.category
    }