from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging
from typing import Union

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ErrorHandler:
    @staticmethod
    async def http_exception_handler(request: Request, exc: HTTPException):
        """Handle HTTP exceptions with consistent format"""
        logger.warning(f"HTTP {exc.status_code}: {exc.detail} - {request.url}")
        
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": True,
                "message": exc.detail,
                "status_code": exc.status_code
            }
        )
    
    @staticmethod
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        """Handle validation errors with user-friendly messages"""
        logger.warning(f"Validation error: {exc.errors()} - {request.url}")
        
        # Extract field names and create user-friendly message
        errors = []
        for error in exc.errors():
            field = " -> ".join(str(x) for x in error["loc"][1:])  # Skip 'body'
            message = error["msg"]
            errors.append(f"{field}: {message}")
        
        return JSONResponse(
            status_code=422,
            content={
                "error": True,
                "message": "Validation failed",
                "details": errors,
                "status_code": 422
            }
        )
    
    @staticmethod
    async def general_exception_handler(request: Request, exc: Exception):
        """Handle unexpected exceptions"""
        logger.error(f"Unexpected error: {str(exc)} - {request.url}", exc_info=True)
        
        return JSONResponse(
            status_code=500,
            content={
                "error": True,
                "message": "An unexpected error occurred. Please try again later.",
                "status_code": 500
            }
        )

# Custom exceptions
class TripNotFoundError(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Trip not found or access denied")

class InvalidDateRangeError(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail="End date must be after start date")

class DuplicateEmailError(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail="Email address is already registered")

class WeakPasswordError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=400, 
            detail="Password must be at least 8 characters with uppercase, lowercase, and digit"
        )