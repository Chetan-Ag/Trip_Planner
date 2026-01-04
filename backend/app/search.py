from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional

from . import models, schemas
from .database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/search", tags=["search"])

@router.get("/cities", response_model=List[schemas.City])
def search_cities(
    query: str = Query(..., min_length=1),
    country: Optional[str] = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cities_query = db.query(models.City).filter(
        or_(
            models.City.name.ilike(f"%{query}%"),
            models.City.country.ilike(f"%{query}%")
        )
    )
    
    if country:
        cities_query = cities_query.filter(models.City.country.ilike(f"%{country}%"))
    
    cities = cities_query.limit(20).all()
    return cities

@router.get("/activities", response_model=List[schemas.Activity])
def search_activities(
    query: str = Query(..., min_length=1),
    city_id: Optional[int] = None,
    category: Optional[str] = None,
    max_price: Optional[float] = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    activities_query = db.query(models.Activity).filter(
        or_(
            models.Activity.name.ilike(f"%{query}%"),
            models.Activity.description.ilike(f"%{query}%"),
            models.Activity.category.ilike(f"%{query}%")
        )
    )
    
    if city_id:
        activities_query = activities_query.filter(models.Activity.city_id == city_id)
    
    if category:
        activities_query = activities_query.filter(models.Activity.category.ilike(f"%{category}%"))
    
    if max_price:
        activities_query = activities_query.filter(models.Activity.price <= max_price)
    
    activities = activities_query.limit(50).all()
    return activities

@router.get("/popular-cities", response_model=List[schemas.City])
def get_popular_cities(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Return top 10 cities (in a real app, this would be based on popularity metrics)
    cities = db.query(models.City).limit(10).all()
    return cities

@router.get("/cities/{city_id}/activities", response_model=List[schemas.Activity])
def get_city_activities(
    city_id: int,
    category: Optional[str] = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    activities_query = db.query(models.Activity).filter(models.Activity.city_id == city_id)
    
    if category:
        activities_query = activities_query.filter(models.Activity.category.ilike(f"%{category}%"))
    
    activities = activities_query.all()
    return activities

# Public endpoints for testing (no auth required)
@router.get("/public/cities", response_model=List[schemas.City])
def public_search_cities(
    query: Optional[str] = None,
    db: Session = Depends(get_db)
):
    if query:
        cities = db.query(models.City).filter(
            or_(
                models.City.name.ilike(f"%{query}%"),
                models.City.country.ilike(f"%{query}%")
            )
        ).limit(20).all()
    else:
        cities = db.query(models.City).limit(10).all()
    return cities

@router.get("/public/activities", response_model=List[schemas.Activity])
def public_search_activities(
    query: Optional[str] = None,
    city_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    activities_query = db.query(models.Activity)
    
    if query:
        activities_query = activities_query.filter(
            or_(
                models.Activity.name.ilike(f"%{query}%"),
                models.Activity.description.ilike(f"%{query}%"),
                models.Activity.category.ilike(f"%{query}%")
            )
        )
    
    if city_id:
        activities_query = activities_query.filter(models.Activity.city_id == city_id)
    
    activities = activities_query.limit(20).all()
    return activities