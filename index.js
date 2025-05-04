const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    const q = new URL(req.url, `http://${req.headers.host}`); // takes the full URL
    let pathname = q.pathname; // takes the pathname from the URL and adds the '.' to it

    // if the pathname is empty, it returns the index.html file
    if (pathname === "/") {
      pathname = "/index.html";

      // if the file doesn't exist then it adds .html to the pathname and then add the '.' to it.
    } else if (!path.extname(pathname)) pathname += ".html";

    const filename = "." + pathname;

    // reads the file, if the file doesn't exist, it returns a 404 error in html format
    // and if it does, it returns the file
    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile("404.html", function (err404, data404) {
          res.writeHead(404, { "Content-Type": "text/html" });
          if (err404) {
            res.write("Error loading 404.html");
            return res.end();
          } else {
            return res.end(data404);
          }
        });
      } else {
        // if the file exists, it returns the file
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(data);
      }
    });
  })
  .listen(8080);
