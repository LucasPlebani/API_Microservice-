from pydantic import BaseModel
from typing import List, Optional

class CartItem(BaseModel):
    product_id: int
    volume: int
    name : Optional[str] = None
    price: Optional[float] = None

class Cart(BaseModel):
    user_id: int
    items: List[CartItem] = []

        