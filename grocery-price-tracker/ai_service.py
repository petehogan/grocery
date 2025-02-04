import os
from openai import OpenAI
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class LocationRequest(BaseModel):
    location: str

@app.post("/find-stores")
async def find_stores(request: LocationRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that provides names of grocery stores."},
                {"role": "user", "content": f"List 5 fictional grocery store names for {request.location}. Respond with only the names, separated by commas."}
            ]
        )
        stores = response.choices[0].message.content.split(',')
        return {"stores": [store.strip() for store in stores]}
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": "Failed to generate store names"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)