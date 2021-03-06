const Place = require("../models/place");
const Location = require("../models/location");
const Ville = require("../models/ville");
const Localisation = require("../models/localisation");
const Libelle = require("../models/libelle");

module.exports = {

    index: async (req, res, next) => {
        const locations = await Location.find({}).populate(["locataire_details", {
            path: "place_details", 
            populate: {
                path: 'localisation',
                model: Localisation,
                populate: [
                    {
                        path: 'ville',
                        model: Ville
                    },
                    {
                        path: 'libelle',
                        model: Libelle
                    }
                ],
            }
        }]);

        locations.forEach(function(location){
            if(location){
                location.locataire = location.locataire_details;
                location.place = location.place_details;
            }
        });
        
        res.status(200).json(locations);
    },

    getPlace: async (req, res, next) => {
        const { placeId } = req.params;
        const place = await Place.findById(placeId);
        res.status(200).json(place);
    },

    editPlace: async (req, res, next) => {
        const { placeId } = req.params;
        const place = await Place.findByIdAndUpdate(placeId, req.body, {"message": "user has been edited successfully !!"});
        res.status(200).json(place);
    },

    deletePlace: async (req, res, next) => {
        const { placeId } = req.params;
        const place = await User.findOneAndDelete(placeId);
        res.status(200).json(place);
    },

    getAllCities: async (req, res, next) => {
        const cities = await Ville.find({});
        res.status(200).json(cities);
    },

    getRangePrices: async (req, res, next) => {
        const arr = await Location.aggregate([{ 
            "$group": { 
                "_id": null, 
                "max": { "$max": "$prix" },  
                "min": { "$min": "$prix" }
            } 
        }]);

        const prices = arr[0];
        delete prices._id

        res.send(prices);
    },



    fillterPlaces: async (req, res, next) => {
        const { ville, prix, dateStart, dateEnd } = req.body;
        
        const places = await Locations.find({
            
        }).populate({ 
            path: 'place',
            populate: {
              path: 'parking',
              model: 'parking'
            } 
        }).exec();
    
    }


}