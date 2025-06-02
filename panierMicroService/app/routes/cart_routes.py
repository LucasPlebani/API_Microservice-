from fastapi import APIRouter, HTTPException
from app.services.cart_service import get_cart, add_item_to_cart, remove_item_from_cart
from app.models.cart import CartItem

router = APIRouter()

@router.get("/{user_id}")
async def read_cart(user_id: int):
    return await get_cart(user_id)

@router.post("/{user_id}/add")
async def add_item(user_id: int, item: CartItem):
    return await add_item_to_cart(user_id, item)

@router.delete("/{user_id}/remove/{product_id}")
async def remove_item(user_id: int, product_id: int):
    success = await remove_item_from_cart(user_id, product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    return {"message": "Item removed"}