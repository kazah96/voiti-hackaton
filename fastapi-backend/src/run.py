import os
import uvicorn

isProduction = 'MODE' in os.environ and os.environ['MODE'] == 'prod'

if __name__ == "__main__":
    uvicorn.run("server.main:root", host="0.0.0.0",
                port=5000, reload=not isProduction, log_level="info")
