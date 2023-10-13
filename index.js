const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemp = require("./modules/replaceTemp");
const overviewTemp = fs.readFileSync(
  `${__dirname}/templete/templete-overview.html`,
  "utf-8"
);
const productTemp = fs.readFileSync(
  `${__dirname}/templete/templete-product.html`,
  "utf-8"
);
const cardTemp = fs.readFileSync(
  `${__dirname}/templete/templete-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`./dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(query);

  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, { "Context-Type": "text/html" });
    const cardHtml = dataObj.map((el) => replaceTemp(cardTemp, el)).join("");
    const output = overviewTemp.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
  } else if (pathname === "/products") {
    res.writeHead(200, { "Context-Type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemp(productTemp, product);
    // console.log(query);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});
server.listen(8000, () => {
  console.log("listining on port 8000");
});
