const server = Bun.serve({
    port: 4000,  // Change port to 4000
    fetch(req) {
      const url = new URL(req.url);
      console.log("meow1")

      if (url.pathname === "/sdk.js") {
        console.log("meow")
        return new Response(Bun.file("./sdk.js"), {
          headers: { "Content-Type": "application/javascript" },
        });
      }
      
      return new Response("Bun server running!", { status: 200 });
    },
  });
  
  console.log(`Listening on http://localhost:4000 ...`);
