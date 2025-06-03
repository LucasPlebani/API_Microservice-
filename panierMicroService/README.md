---

lancer le server : python -m uvicorn app.main:app --reload
pip install -r requirement.txt

---
docker compose down
docker compose up --build
requete panier GET http://localhost:8080/panier/cart/(id) 