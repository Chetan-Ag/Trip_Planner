from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas
from .database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/community", tags=["community"])

@router.get("/trips", response_model=List[schemas.Trip])
def get_community_trips(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get public trips from community posts
    public_trips = db.query(models.Trip).join(models.CommunityPost).filter(
        models.CommunityPost.is_public == True
    ).limit(20).all()
    
    return public_trips

@router.get("/posts", response_model=List[schemas.CommunityPost])
def get_community_posts(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    posts = db.query(models.CommunityPost).filter(
        models.CommunityPost.is_public == True
    ).order_by(models.CommunityPost.created_at.desc()).limit(50).all()
    
    return posts

@router.post("/posts", response_model=schemas.CommunityPost)
def create_community_post(
    post: schemas.CommunityPostCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verify trip belongs to user if trip_id is provided
    if post.trip_id:
        trip = db.query(models.Trip).filter(
            models.Trip.id == post.trip_id,
            models.Trip.user_id == current_user.id
        ).first()
        
        if not trip:
            raise HTTPException(status_code=404, detail="Trip not found")
    
    db_post = models.CommunityPost(**post.dict(), user_id=current_user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/posts/{post_id}", response_model=schemas.CommunityPost)
def get_community_post(
    post_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = db.query(models.CommunityPost).filter(
        models.CommunityPost.id == post_id,
        models.CommunityPost.is_public == True
    ).first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post

@router.post("/posts/{post_id}/like")
def like_post(
    post_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = db.query(models.CommunityPost).filter(
        models.CommunityPost.id == post_id
    ).first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post.likes_count += 1
    db.commit()
    
    return {"message": "Post liked successfully", "likes_count": post.likes_count}