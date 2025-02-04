import os
from openai import OpenAI
from fastapi import FastAPI
from pydantic import BaseModel
os.environ['OPENAI_API_KEY'] = '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'
app = FastAPI()
#client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class LocationRequest(BaseModel):
    location: str

@app.post("/find-stores")
async def find_stores(request: LocationRequest):
    try:
        # response = client.chat.completions.create(
        #     model="gpt-4o-mini",
        #     messages=[
        #         {"role": "system", "content": "You are a helpful assistant that provides names of grocery stores."},
        #         {"role": "user", "content": f"List 5 fictional grocery store names for {request.location}. Respond with only the names, separated by commas."}
        #     ]
        # )
        # stores = response.choices[0].message.content.split(',')
        stores = ['King Sooper','Whole Foods','Ur Mothers Clam']
        return {"stores": [store.strip() for store in stores]}
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": "Failed to generate store names"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)