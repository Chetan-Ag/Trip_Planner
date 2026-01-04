from fastapi import HTTPException, status
from pydantic import ValidationError
import re
from typing import Any

class InputValidator:
    @staticmethod
    def validate_email(email: str) -> bool:
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def validate_password(password: str) -> bool:
        # At least 8 characters, 1 uppercase, 1 lowercase, 1 digit
        if len(password) < 8:
            return False
        if not re.search(r'[A-Z]', password):
            return False
        if not re.search(r'[a-z]', password):
            return False
        if not re.search(r'\d', password):
            return False
        return True
    
    @staticmethod
    def sanitize_string(value: str) -> str:
        # Remove potentially dangerous characters
        if not value:
            return value
        # Remove SQL injection patterns
        dangerous_patterns = [
            r'(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)',
            r'(--|#|/\*|\*/)',
            r'(\bOR\b.*=.*\bOR\b)',
            r'(\bAND\b.*=.*\bAND\b)'
        ]
        
        for pattern in dangerous_patterns:
            value = re.sub(pattern, '', value, flags=re.IGNORECASE)
        
        return value.strip()

def validate_user_input(data: dict) -> dict:
    """Validate and sanitize user input"""
    if 'email' in data and data['email']:
        if not InputValidator.validate_email(data['email']):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid email format"
            )
    
    if 'password' in data and data['password']:
        if not InputValidator.validate_password(data['password']):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters with uppercase, lowercase, and digit"
            )
    
    # Sanitize string fields
    for key, value in data.items():
        if isinstance(value, str):
            data[key] = InputValidator.sanitize_string(value)
    
    return data