from fastapi import FastAPI

app = FastAPI(
    title="AI Internship Recommendation System API",
    description="Backend API for AI Internship Recommendation System",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Internship Recommendation System API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

