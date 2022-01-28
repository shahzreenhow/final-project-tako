const Stores = require('../models/storeModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const storeCtrl = {
    getStores: async(req, res) =>{
        try {
            const features = new APIfeatures(Stores.find(), req.query)
            .filtering().sorting().paginating()

            const stores = await features.query

            res.json({
                status: 'success',
                result: stores.length,
                stores: stores
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createStore: async(req, res) =>{
        try {
            const {store_id, store_title, phone, operating_hours, address, category} = req.body;

            const store = await Stores.findOne({store_id})
            if(store)
                return res.status(400).json({msg: "This product already exists."})

            const newStore = new Stores({
                store_id, store_title: store_title.toLowerCase(), phone, operating_hours, address, category
            })

            await newStore.save()
            res.json({msg: "Created a product"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteStore: async(req, res) =>{
        try {
            await Stores.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateStore: async(req, res) =>{
        try {
            const { store_title, phone, operating_hours, address, category} = req.body;

            await Stores.findOneAndUpdate({_id: req.params.id}, {
                store_title: store_title.toLowerCase(), phone, operating_hours, address, category
            })

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = storeCtrl