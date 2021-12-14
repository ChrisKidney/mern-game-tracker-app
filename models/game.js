const mongoose = require('mongoose');

const completionSchema = new mongoose.Schema({
    beaten: {
        type: Boolean,
        default: false
    },
    completed_achievements: {
        type: Boolean,
        default: false
    },
    endless: {
        type: Boolean,
        default: false
    },
    on_hold: {
        type: Boolean,
        default: false
    },
    dropped: {
        type: Boolean,
        default: false
    }
},
{ _id: false });

const reviewsSchema = new mongoose.Schema({
    num_reviews: {
        type: Number,
        default: 1
        // required: [true, 'Must have a value for num_reviews in steam_reviews.']
    },
    overall_rating: {
        type: String,
        default: 'Overwhelmingly Positive',
        enum: {
            values: [
                'Overwhelmingly Positive',
                'Very Postive',
                'Positive',
                'Mostly Positive',
                'Mixed',
                'Mostly Negative',
                'Negative',
                'Very Negative',
                'Overwhelmingly Negative',
                ''
            ],
            message: '{VALUE} is not supported.'
        },
        // required: [true, 'Must have a value for overall_rating in steam_reviews.']
    }
},
{ _id: false });

const gameSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: [true, 'Must have a value for title.']
    } ,
    developer: {
        type: String,
        required: [true, 'Must have a value for developer.']
    },
    release_date: {
        type: Date,
        required: [true, 'Must have a value for release_date.']
    },
    description: {
        type: String,
        required: [true, 'Must have a value for description.']
    },
    owned: {
        type: Boolean,
        default: false,
        required: [true, 'Must have a value for owned.']
    },
    completion_status: {
        type: completionSchema,
        required: [true, 'completion_status embedded object field must be included even without values set.']
    },
    steam_app_id: {
        type: Number,
        required: [true, 'Must have a value for steam_app_id']
    },
    steam_image: {
        type: String,
        required: [true, 'Must have a value for steam_image (this should be automatically created using genSteamImgUrl middleware and steam_app_id)']
    },
    tags: {
        type: [String]
    },
    steam_reviews: {
        type: reviewsSchema,
      //  required: [true, 'steam_reviews embedded object field must be included even without values set.']
    }
});

module.exports = mongoose.model('Game', gameSchema);