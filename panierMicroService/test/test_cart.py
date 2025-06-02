from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_cart():
    response = client.get("/cart/1")
    assert response.status_code == 200