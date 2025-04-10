import userModel from "../models/usermodel.js";

//Add to Cart
const addToCart = async (req,res) => {
      try {
        const {userId , itemId} = req.body
       const userData = await userModel.findById(userId)
      let cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId]) {
                cartData[itemId] += 1
            }
            else{
                cartData[itemId] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId] = 1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true , message:"Added to Cart "})

      } catch (error) {
        console.log(error)
        res.json({success:false, message : error.message})
        
      }   
}

//Update to Cart
const updateCart = async (req,res) => {
  try {
    
    const {userId,itemId,quantity} = req.body
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData;

     cartData[itemId]=quantity
     await userModel.findByIdAndUpdate(userId,{cartData})
     res.json({success:true , message:"Cart Updated "})
  }
  catch(error){
    console.log(error)
        res.json({success:false, message : error.message})
        
  }
    }

//Get User Cart
const getUserCart = async (req,res) => {
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true , cartData});
    } catch (error) {
        
    console.log(error)
    res.json({success:false, message : error.message})
    
    }
}

export { addToCart , updateCart , getUserCart}