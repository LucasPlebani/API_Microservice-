from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.cart_routes import router as cart_router

app = FastAPI()

# Configuration CORS
origins = [
    "http://localhost:4200", # route frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Autorise toutes les méthodes (GET, POST, etc)
    allow_headers=["*"], # Autorise tous les headers
)


app.include_router(cart_router, prefix="/panier/cart", tags=["Cart"])