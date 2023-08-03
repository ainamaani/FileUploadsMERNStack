const express = require('express');
const cors = require('cors');
const path = require('path')
const { default: mongoose } = require('mongoose');
const app = express();
const Movie = require('../backend/models/Movie');
const upload = require('../backend/controllers/UploadController');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req,res,next)=>{
    console.log(req.body,req.path,req.method);
    next();
})


mongoose.connect('mongodb+srv://ecommerce:com12345@trial.nacabxh.mongodb.net/Ecommerce?retryWrites=true&w=majority')
    .then(()=>{
        app.listen('6700',()=>{
            console.log('Listening.......');
        })
    })
    .catch((error)=>{
        console.log(error)
    })


// Image upload route
app.post('/upload', upload.fields([{ name: 'image',maxCount: 1},{ name: 'document',maxCount: 1 }]), async (req, res) => {
    try {
      // Get the uploaded file path from the request object
      const imagePath = req.files['image'][0].path;
      const documentPath = req.files['document'][0].path;
  
      // Get other data (movie title) from the request body
      const { title } = req.body;
  
      // Create a new Movie object with the provided data
      const newMovie = new Movie({
        title: title,
        image: imagePath,
        document: documentPath
      });
  
      // Save the movie object to the database
      await newMovie.save();
      res.status(200).json({ message: 'Movie uploaded successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  app.get('/movies',async(req,res)=>{
    try {
        const movies = await Movie.find({});
        if(movies){
            res.status(200).json(movies);
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
  })

