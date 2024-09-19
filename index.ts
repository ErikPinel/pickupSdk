const server = Bun.serve({
    fetch(req) {
      const url = new URL(req.url);
      console.log("Request received:", url.pathname);
  
      const headers = {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": "*",  // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET, OPTIONS",  // Allow necessary HTTP methods
        "Access-Control-Allow-Headers": "Content-Type",  // Allow necessary headers
      };
  
      if (url.pathname === "/sdk.js") {
        return new Response(Bun.file("./sdk.js"), { headers });
      }
  
      return new Response("Bun server running!", { status: 200 });
    },
  });
  
  console.log("Server running...");
  