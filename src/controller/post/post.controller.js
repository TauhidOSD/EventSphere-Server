const { ObjectId } = require("mongodb");
const Posts = require("../../models/Posts");

const getAllPost = async (req, res) => {
  try {
    const allPost = await Posts.find();
    res.status(200).json(allPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async(req, res)=> {
    try{
        const {email} = req.params;
        console.log(email)
        const query = {"user.email": email}
        const result = await Posts.find(query)
        if(!result){
            return res.status(404).send({message: "Post not found"})
        }
        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


module.exports = { getAllPost, getUserPosts };
