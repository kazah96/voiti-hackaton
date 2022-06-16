# uvicorn src.main:root --port 7609 --host 0.0.0.0 --reload

import uvicorn

if __name__ == "__main__":
    uvicorn.run("server.main:root", host="127.0.0.1",
                port=5000, reload=True, log_level="info")
