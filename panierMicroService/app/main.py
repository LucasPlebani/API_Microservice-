from fastapi import FastAPI
from app.routes.cart_routes import router as cart_router

app = FastAPI()
app.include_router(cart_router, prefix="/cart", tags=["Cart"])