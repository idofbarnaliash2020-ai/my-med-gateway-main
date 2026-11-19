from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from database import get_connection, create_table
import uuid
import re
app = FastAPI(title="My Med Gateway API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)
create_table()
class AmbulanceRequest(BaseModel):
    pickup: str = Field(min_length=5, max_length=200)
    destination: str
    category: str
    name: str = Field(min_length=2, max_length=80)
    phone: str
    notes: str = ""
@app.get("/")
def home():
    return {
        "message": "My Med Gateway Backend Running Successfully"
    }
@app.post("/api/ambulance-requests")
def create_request(data: AmbulanceRequest):
    if not re.fullmatch(r"[6-9][0-9]{9}", data.phone):
        raise HTTPException(
            status_code=400,
            detail="Invalid mobile number"
        )
    request_id = "AMB-" + uuid.uuid4().hex[:8].upper()
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        INSERT INTO ambulance_requests
        (request_id, pickup, destination, category, name, phone, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            request_id,
            data.pickup,
            data.destination,
            data.category,
            data.name,
            data.phone,
            data.notes
        ))
        conn.commit()
    except Exception:
        conn.close()
        raise HTTPException(
            status_code=500,
            detail="Unable to save request"
        )
    conn.close()
    return {
        "success": True,
        "request_id": request_id,
        "status": "REQUEST_RECEIVED",
        "message": "Ambulance request successfully recorded"
    }
@app.get("/api/ambulance-requests")
def get_all_requests():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM ambulance_requests
    ORDER BY created_at DESC
    """)
    result = cursor.fetchall()
    conn.close()
    return [dict(row) for row in result]
@app.get("/api/ambulance-requests/{request_id}")
def get_request(request_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM ambulance_requests
    WHERE request_id = ?
    """, (request_id,))
    result = cursor.fetchone()
    conn.close()
    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )
    return dict(result)