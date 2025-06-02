from app.db.collections import cart_collection
from app.models.cart import Cart, CartItem

async def get_cart(user_id: int):
    cart = await cart_collection.find_one({"user_id": user_id})
    if not cart:
        return {"user_id": user_id, "items": []}
    return cart

async def add_item_to_cart(user_id: int, item: CartItem):
    await cart_collection.update_one(
        {"user_id": user_id},
        {"$push": {"items": item.dict()}},
        upsert=True
    )
    return {"message": "Item added", "item": item}

async def remove_item_from_cart(user_id: int, product_id: int) -> bool:
    result = await cart_collection.delete_one({"user_id": user_id, "product_id": product_id})
    return result.deleted_count > 0