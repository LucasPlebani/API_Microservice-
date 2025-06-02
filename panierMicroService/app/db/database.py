from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    database = client[MONGO_DB]
except Exception as e:
    print(f"Erreur de connexion à MongoDB : {e}")

