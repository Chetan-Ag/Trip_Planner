from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models

def create_sample_data():
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(models.City).count() > 0:
            print("Data already exists. Skipping...")
            return
        
        # Sample cities
        cities_data = [
            {"name": "Paris", "country": "France", "latitude": 48.8566, "longitude": 2.3522, 
             "description": "The City of Light, famous for the Eiffel Tower and art museums", 
             "image_url": "https://images.unsplash.com/photo-1502602898536-47ad22581b52"},
            {"name": "Tokyo", "country": "Japan", "latitude": 35.6762, "longitude": 139.6503,
             "description": "Modern metropolis blending tradition with cutting-edge technology",
             "image_url": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"},
            {"name": "New York", "country": "USA", "latitude": 40.7128, "longitude": -74.0060,
             "description": "The Big Apple, home to Times Square and Central Park",
             "image_url": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9"},
            {"name": "London", "country": "UK", "latitude": 51.5074, "longitude": -0.1278,
             "description": "Historic city with royal palaces and modern attractions",
             "image_url": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"},
            {"name": "Rome", "country": "Italy", "latitude": 41.9028, "longitude": 12.4964,
             "description": "The Eternal City with ancient ruins and Renaissance art",
             "image_url": "https://images.unsplash.com/photo-1552832230-c0197dd311b5"},
            {"name": "Barcelona", "country": "Spain", "latitude": 41.3851, "longitude": 2.1734,
             "description": "Vibrant city known for Gaudí architecture and beaches",
             "image_url": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4"},
            {"name": "Dubai", "country": "UAE", "latitude": 25.2048, "longitude": 55.2708,
             "description": "Futuristic city with luxury shopping and modern architecture",
             "image_url": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"},
            {"name": "Sydney", "country": "Australia", "latitude": -33.8688, "longitude": 151.2093,
             "description": "Harbor city famous for Opera House and Harbour Bridge",
             "image_url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
        ]
        
        # Create cities
        cities = []
        for city_data in cities_data:
            city = models.City(**city_data)
            db.add(city)
            cities.append(city)
        
        db.commit()
        
        # Sample activities for each city
        activities_data = [
            # Paris activities
            {"city_id": 1, "name": "Eiffel Tower Visit", "description": "Iconic iron tower with city views", "category": "Sightseeing", "price": 25.90, "duration": 120, "rating": 4.5},
            {"city_id": 1, "name": "Louvre Museum", "description": "World's largest art museum", "category": "Culture", "price": 17.00, "duration": 180, "rating": 4.7},
            {"city_id": 1, "name": "Seine River Cruise", "description": "Scenic boat tour along the Seine", "category": "Tours", "price": 15.00, "duration": 60, "rating": 4.3},
            
            # Tokyo activities
            {"city_id": 2, "name": "Tokyo Skytree", "description": "Tallest structure in Japan with panoramic views", "category": "Sightseeing", "price": 18.00, "duration": 90, "rating": 4.4},
            {"city_id": 2, "name": "Senso-ji Temple", "description": "Ancient Buddhist temple in Asakusa", "category": "Culture", "price": 0.00, "duration": 60, "rating": 4.6},
            {"city_id": 2, "name": "Shibuya Crossing", "description": "World's busiest pedestrian crossing", "category": "Sightseeing", "price": 0.00, "duration": 30, "rating": 4.2},
            
            # New York activities
            {"city_id": 3, "name": "Statue of Liberty", "description": "Symbol of freedom and democracy", "category": "Sightseeing", "price": 23.50, "duration": 180, "rating": 4.5},
            {"city_id": 3, "name": "Central Park", "description": "Large public park in Manhattan", "category": "Nature", "price": 0.00, "duration": 120, "rating": 4.6},
            {"city_id": 3, "name": "Broadway Show", "description": "World-class theater performances", "category": "Entertainment", "price": 85.00, "duration": 150, "rating": 4.8},
            
            # London activities
            {"city_id": 4, "name": "Big Ben & Parliament", "description": "Iconic clock tower and government buildings", "category": "Sightseeing", "price": 0.00, "duration": 45, "rating": 4.4},
            {"city_id": 4, "name": "British Museum", "description": "World history and culture museum", "category": "Culture", "price": 0.00, "duration": 150, "rating": 4.7},
            {"city_id": 4, "name": "London Eye", "description": "Giant observation wheel on Thames", "category": "Sightseeing", "price": 32.00, "duration": 30, "rating": 4.3},
            
            # Rome activities
            {"city_id": 5, "name": "Colosseum", "description": "Ancient Roman amphitheater", "category": "Culture", "price": 16.00, "duration": 90, "rating": 4.6},
            {"city_id": 5, "name": "Vatican Museums", "description": "Papal art collection including Sistine Chapel", "category": "Culture", "price": 20.00, "duration": 180, "rating": 4.8},
            {"city_id": 5, "name": "Trevi Fountain", "description": "Baroque fountain for coin wishes", "category": "Sightseeing", "price": 0.00, "duration": 20, "rating": 4.5},
            
            # Barcelona activities
            {"city_id": 6, "name": "Sagrada Familia", "description": "Gaudí's unfinished masterpiece basilica", "category": "Culture", "price": 26.00, "duration": 90, "rating": 4.7},
            {"city_id": 6, "name": "Park Güell", "description": "Colorful mosaic park by Gaudí", "category": "Nature", "price": 10.00, "duration": 120, "rating": 4.5},
            {"city_id": 6, "name": "Las Ramblas", "description": "Famous pedestrian street", "category": "Shopping", "price": 0.00, "duration": 60, "rating": 4.2},
            
            # Dubai activities
            {"city_id": 7, "name": "Burj Khalifa", "description": "World's tallest building", "category": "Sightseeing", "price": 37.00, "duration": 60, "rating": 4.6},
            {"city_id": 7, "name": "Dubai Mall", "description": "Massive shopping and entertainment complex", "category": "Shopping", "price": 0.00, "duration": 180, "rating": 4.4},
            {"city_id": 7, "name": "Desert Safari", "description": "4WD adventure in Arabian desert", "category": "Adventure", "price": 65.00, "duration": 360, "rating": 4.7},
            
            # Sydney activities
            {"city_id": 8, "name": "Sydney Opera House", "description": "Iconic performing arts venue", "category": "Culture", "price": 43.00, "duration": 60, "rating": 4.6},
            {"city_id": 8, "name": "Harbour Bridge Climb", "description": "Climb the famous bridge for city views", "category": "Adventure", "price": 174.00, "duration": 210, "rating": 4.8},
            {"city_id": 8, "name": "Bondi Beach", "description": "Famous surf beach with golden sand", "category": "Nature", "price": 0.00, "duration": 180, "rating": 4.4}
        ]
        
        # Create activities
        for activity_data in activities_data:
            activity = models.Activity(**activity_data)
            db.add(activity)
        
        db.commit()
        print(f"Created {len(cities_data)} cities and {len(activities_data)} activities")
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()