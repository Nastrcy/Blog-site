import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing form data
app.use(methodOverride("_method")); 
app.set("view engine", "ejs");

let posts = []; // global array to store posts

app.get("/", (req, res) => {
  res.render("index.ejs", { cont: posts });
});

app.get("/posts", (req, res)=>{
    res.render("posts.ejs", { cont: posts });
})
app.post("/submit", (req, res) => {
  const content = req.body.text;
  posts.push(content);
  res.redirect("/");
});
 

app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index)) {
      posts.splice(index, 1);
    }
    res.redirect("/");
  });

  
  app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    res.render("edit.ejs", { post, index });
  });
  
 
  app.put("/update/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const updatedContent = req.body.text;
    
    if (!isNaN(index) && index >= 0 && index < posts.length) {
      posts[index] = updatedContent;
      res.redirect("/");
    } else {
      res.status(400).send("Invalid post index");
    }
  });

app.listen(port, ()=>{
    console.log(`server is runing on port ${port}`);
});
