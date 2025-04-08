const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 6969;
const mongoUrl = "mongodb://localhost:27017/batchM";
app.use(express.json());
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

const saleSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const saleData = mongoose.model("students", saleSchema);

// app.get('/local',async (req,res)=>{
//    const mongoData= await saleData.find()
//    res.status(200).json(mongoData)
// })

// app.get('/local/:id/:name',async (req,res)=>{
//     // const mongoData= await saleData.find()
//     // console.log(req.params)
//     const {id}=req.params
//     const {name}=req.params
//     console.log(name)
//     // const mongoData= await saleData.findOne({_id:id,name:name})
//     // const mongoData= await saleData.findById({_id})
//     console.log(mongoData)
//     res.status(200).json(mongoData)
//  })

// app.delete("/local/", async (req, res) => {
//   // const mongoData= await saleData.find()
//   // console.log(req.params)
//   const { id } = req.query;
// //   const {name}=req.query
//   console.log(id);
// //   console.log(name);
//   // const mongoData= await saleData.findOne({id:id,name:name})
// //   const mongoData = await saleData.findOne({ _id: id ,name:name});
//   const mongoData = await saleData.findByIdAndDelete({ _id: id });
//   console.log(mongoData);
//   res.status(200).json(mongoData);
// });

app.delete("/local/", async (req, res) => {
    const { id } = req.query;
    console.log(id);
    const mongoData = await saleData.findByIdAndDelete({ _id: id });
    console.log(mongoData);
    res.status(200).json(
        {
            message:"data removed",
            data:mongoData
        }
    );
  })
  
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// const express = require('express')
// const mongoose = require("mongoose")
// const app = express()
// const port = 6969
// const mongoUrl = 'mongodb://localhost:27017/local'

// app.use(express.json())

// mongoose.connect(mongoUrl)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('MongoDB Connection Error:', err))

// const saleSchema = new mongoose.Schema({
//     data: mongoose.Schema.Types.Mixed
// })

// const saleData = mongoose.model('startup_log', saleSchema, 'startup_log')

// app.get('/local', async (req, res) => {
//     try {
//         const mongoData = await saleData.find()
//         res.status(200).json(mongoData)
//     } catch (err) {
//         res.status(500).json({ error: "Internal Server Error", details: err.message })
//     }
// })

// app.listen(port, () => console.log(`Server is running on port ${port}`))
