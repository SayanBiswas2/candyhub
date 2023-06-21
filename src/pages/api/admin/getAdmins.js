import connectDb from "@/middleware/mongoose"
import Admin from "@/models/admin"

const handler = async(req, res) => {
    if(req.method == "POST"){
        let searchQuery = req.body.search;
        if(searchQuery == undefined){
            let from = req.body.from
            let admin = await Admin.find({}).distinct('_id')
            admin= admin.map(id=>id.toString())
            admin = admin.reverse()
            admin = admin.slice(from,from+21)
            if(admin.length < 20 ){
                res.status(503).json(admin)
            }else{
                res.status(200).json(admin)
            }
        }else{
            let admin;
            try{
                admin = await Admin.findById(searchQuery)
                admin = [searchQuery]
            }catch{
                admin = await Admin.find({keyWords:searchQuery}).distinct('_id')
                admin= admin.map(id=>id.toString())
                admin = admin.reverse()
            }
            res.status(200).json(admin)
        }
    }
}

export default connectDb(handler)