import requests
import json

BASE_URL = "http://localhost:8000"

def test_backend():
    print("Testing Travel Planner Backend...")
    
    # Test health endpoint
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✓ Health check passed")
        else:
            print("✗ Health check failed")
    except Exception as e:
        print(f"✗ Health check error: {e}")
        return
    
    # Test user registration
    test_user = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "testpassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/register", json=test_user)
        if response.status_code == 200:
            print("✓ User registration passed")
            token_data = response.json()
            token = token_data["access_token"]
        else:
            print(f"✗ User registration failed: {response.text}")
            return
    except Exception as e:
        print(f"✗ User registration error: {e}")
        return
    
    # Test authentication
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        response = requests.get(f"{BASE_URL}/api/auth/profile", headers=headers)
        if response.status_code == 200:
            print("✓ Authentication passed")
        else:
            print(f"✗ Authentication failed: {response.text}")
    except Exception as e:
        print(f"✗ Authentication error: {e}")
    
    # Test trip creation
    test_trip = {
        "name": "Test Trip",
        "description": "A test trip",
        "start_date": "2024-06-01",
        "end_date": "2024-06-07",
        "budget": 1000.00
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/trips/", json=test_trip, headers=headers)
        if response.status_code == 200:
            print("✓ Trip creation passed")
            trip_data = response.json()
            trip_id = trip_data["id"]
        else:
            print(f"✗ Trip creation failed: {response.text}")
            return
    except Exception as e:
        print(f"✗ Trip creation error: {e}")
        return
    
    # Test search functionality
    try:
        response = requests.get(f"{BASE_URL}/api/search/cities?query=Paris", headers=headers)
        if response.status_code == 200:
            print("✓ City search passed")
        else:
            print(f"✗ City search failed: {response.text}")
    except Exception as e:
        print(f"✗ City search error: {e}")
    
    print("\\nBackend testing completed!")

if __name__ == "__main__":
    test_backend()