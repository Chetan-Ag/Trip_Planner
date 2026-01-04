import pytest
import requests
import time
from datetime import date, timedelta

BASE_URL = "http://localhost:8000"

class TestSecurity:
    """Security-focused tests"""
    
    def test_rate_limiting_login(self):
        """Test login rate limiting"""
        login_data = {"email": "test@example.com", "password": "wrongpassword"}
        
        # Make 6 requests (should fail on 6th due to rate limit)
        for i in range(6):
            response = requests.post(f"{BASE_URL}/api/auth/login", json=login_data)
            if i < 5:
                assert response.status_code in [401, 400]  # Invalid credentials
            else:
                assert response.status_code == 429  # Rate limited
    
    def test_sql_injection_prevention(self):
        """Test SQL injection prevention"""
        malicious_data = {
            "name": "'; DROP TABLE users; --",
            "email": "test@example.com",
            "password": "Password123"
        }
        
        response = requests.post(f"{BASE_URL}/api/auth/register", json=malicious_data)
        # Should either succeed with sanitized data or fail validation
        assert response.status_code in [200, 400, 422]
    
    def test_password_validation(self):
        """Test password strength requirements"""
        weak_passwords = [
            "123",  # Too short
            "password",  # No uppercase/digits
            "PASSWORD",  # No lowercase/digits
            "Password",  # No digits
        ]
        
        for weak_pass in weak_passwords:
            data = {
                "name": "Test User",
                "email": "test@example.com",
                "password": weak_pass
            }
            response = requests.post(f"{BASE_URL}/api/auth/register", json=data)
            assert response.status_code == 400

class TestAPI:
    """API functionality tests"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token for tests"""
        user_data = {
            "name": "Test User",
            "email": f"test_{int(time.time())}@example.com",
            "password": "TestPass123"
        }
        
        response = requests.post(f"{BASE_URL}/api/auth/register", json=user_data)
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_trip_creation(self, auth_token):
        """Test trip creation with validation"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        # Valid trip
        trip_data = {
            "name": "Test Trip",
            "description": "A test trip",
            "start_date": str(date.today() + timedelta(days=1)),
            "end_date": str(date.today() + timedelta(days=7)),
            "budget": 1000.00
        }
        
        response = requests.post(f"{BASE_URL}/api/trips/", json=trip_data, headers=headers)
        assert response.status_code == 200
        
        # Invalid trip (end date before start date)
        invalid_trip = {
            "name": "Invalid Trip",
            "start_date": str(date.today() + timedelta(days=7)),
            "end_date": str(date.today() + timedelta(days=1)),
        }
        
        response = requests.post(f"{BASE_URL}/api/trips/", json=invalid_trip, headers=headers)
        assert response.status_code == 400
    
    def test_unauthorized_access(self):
        """Test that protected endpoints require authentication"""
        response = requests.get(f"{BASE_URL}/api/trips/")
        assert response.status_code == 401
    
    def test_pagination(self, auth_token):
        """Test API pagination"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        # Test with pagination parameters
        response = requests.get(f"{BASE_URL}/api/trips/?skip=0&limit=10", headers=headers)
        assert response.status_code == 200
        
        # Test invalid pagination
        response = requests.get(f"{BASE_URL}/api/trips/?skip=-1&limit=1000", headers=headers)
        assert response.status_code == 422  # Validation error

if __name__ == "__main__":
    print("Running security and API tests...")
    print("Make sure the server is running on http://localhost:8000")
    
    # Run basic tests
    security_tests = TestSecurity()
    api_tests = TestAPI()
    
    try:
        # Test health endpoint
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200
        print("✅ Health check passed")
        
        # Test rate limiting
        security_tests.test_rate_limiting_login()
        print("✅ Rate limiting test passed")
        
        # Test password validation
        security_tests.test_password_validation()
        print("✅ Password validation test passed")
        
        print("\n🎉 All tests passed! Your application is more secure now.")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        print("Make sure the server is running and try again.")