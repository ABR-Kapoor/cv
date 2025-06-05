# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import razorpay
import os

app = FastAPI()

# Use env variables or config for these keys securely
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "YOUR_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "YOUR_KEY_SECRET")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

class OrderRequest(BaseModel):
    amount: int  # amount in INR paisa (e.g. 49900 for 499 INR)
    currency: str = "INR"
    receipt: str

@app.post("/create_order")
def create_order(order: OrderRequest):
    try:
        razorpay_order = client.order.create({
            "amount": order.amount,
            "currency": order.currency,
            "receipt": order.receipt,
            "payment_capture": 1
        })
        return {
            "order_id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "key": RAZORPAY_KEY_ID
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
