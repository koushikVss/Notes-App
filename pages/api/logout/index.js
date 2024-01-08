


export default function logout (req,res) {
    // req.logout((err)=>{
    //     if(!err){
    //     }
    // })
    res.status(200).json({loggedout:true,message:'logged out'})
}

