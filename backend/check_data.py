from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models

def check_and_populate():
    db = SessionLocal()
    
    try:
        # Check current data
        city_count = db.query(models.City).count()
        activity_count = db.query(models.Activity).count()
        
        print(f"Current cities: {city_count}")
        print(f"Current activities: {activity_count}")
        
        if city_count == 0:
            print("No cities found. Adding sample data...")
            
            # Sample cities
            cities_data = [
                {"name": "Paris", "country": "France", "latitude": 48.8566, "longitude": 2.3522, 
                 "description": "The City of Light, famous for the Eiffel Tower and art museums"},
                {"name": "Tokyo", "country": "Japan", "latitude": 35.6762, "longitude": 139.6503,
                 "description": "Modern metropolis blending tradition with cutting-edge technology"},
                {"name": "New York", "country": "USA", "latitude": 40.7128, "longitude": -74.0060,
                 "description": "The Big Apple, home to Times Square and Central Park"},
                {"name": "London", "country": "UK", "latitude": 51.5074, "longitude": -0.1278,
                 "description": "Historic city with royal palaces and modern attractions"},
                {"name": "Rome", "country": "Italy", "latitude": 41.9028, "longitude": 12.4964,
                 "description": "The Eternal City with ancient ruins and Renaissance art"}
            ]
            
            # Create cities
            for city_data in cities_data:
                city = models.City(**city_data)
                db.add(city)
            
            db.commit()
            
            # Sample activities
            activities_data = [
                {"city_id": 1, "name": "Eiffel Tower Visit", "description": "Iconic iron tower with city views", "category": "Sightseeing", "price": 25.90, "duration": 120, "rating": 4.5},
                {"city_id": 1, "name": "Louvre Museum", "description": "World's largest art museum", "category": "Culture", "price": 17.00, "duration": 180, "rating": 4.7},
                {"city_id": 2, "name": "Tokyo Skytree", "description": "Tallest structure in Japan", "category": "Sightseeing", "price": 18.00, "duration": 90, "rating": 4.4},
                {"city_id": 2, "name": "Senso-ji Temple", "description": "Ancient Buddhist temple", "category": "Culture", "price": 0.00, "duration": 60, "rating": 4.6},
                {"city_id": 3, "name": "Statue of Liberty", "description": "Symbol of freedom", "category": "Sightseeing", "price": 23.50, "duration": 180, "rating": 4.5},
                {"city_id": 3, "name": "Central Park", "description": "Large public park", "category": "Nature", "price": 0.00, "duration": 120, "rating": 4.6},
                {"city_id": 4, "name": "Big Ben", "description": "Iconic clock tower", "category": "Sightseeing", "price": 0.00, "duration": 45, "rating": 4.4},
                {"city_id": 4, "name": "British Museum", "description": "World history museum", "category": "Culture", "price": 0.00, "duration": 150, "rating": 4.7},
                {"city_id": 5, "name": "Colosseum", "description": "Ancient Roman amphitheater", "category": "Culture", "price": 16.00, "duration": 90, "rating": 4.6},
                {"city_id": 5, "name": "Vatican Museums", "description": "Papal art collection", "category": "Culture", "price": 20.00, "duration": 180, "rating": 4.8}
            ]
            
            for activity_data in activities_data:
                activity = models.Activity(**activity_data)
                db.add(activity)
            
            db.commit()
            print(f"Added {len(cities_data)} cities and {len(activities_data)} activities")
        else:
            print("Data exists. Listing first 5 cities:")
            cities = db.query(models.City).limit(5).all()
            for city in cities:
                print(f"- {city.name}, {city.country}")
                
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    check_and_populate()