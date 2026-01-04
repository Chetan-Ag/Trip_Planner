from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
import time
from collections import defaultdict, deque
from typing import Dict, Deque
import asyncio

class RateLimiter:
    def __init__(self, max_requests: int = 5, window_seconds: int = 300):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: Dict[str, Deque[float]] = defaultdict(deque)
    
    def is_allowed(self, identifier: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds
        
        # Clean old requests
        while self.requests[identifier] and self.requests[identifier][0] < window_start:
            self.requests[identifier].popleft()
        
        # Check if under limit
        if len(self.requests[identifier]) < self.max_requests:
            self.requests[identifier].append(now)
            return True
        
        return False

# Global rate limiter instances
login_limiter = RateLimiter(max_requests=5, window_seconds=300)  # 5 attempts per 5 minutes
register_limiter = RateLimiter(max_requests=3, window_seconds=3600)  # 3 attempts per hour

async def rate_limit_middleware(request: Request, call_next):
    # Get client IP
    client_ip = request.client.host
    
    # Apply rate limiting to auth endpoints
    if request.url.path == "/api/auth/login":
        if not login_limiter.is_allowed(client_ip):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many login attempts. Please try again later."
            )
    
    elif request.url.path == "/api/auth/register":
        if not register_limiter.is_allowed(client_ip):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many registration attempts. Please try again later."
            )
    
    response = await call_next(request)
    return response