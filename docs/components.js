module.exports = {
    components:{
        schemas:{
            user:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:"user identification number",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    username:{
                        type:'string',
                        description:"user's name",
                        example:"pepito23"
                    },
                    email:{
                        type:"string",
                        description:"user's email",
                        example:"pepito23@gmail.com"
                    },
                    password:{
                        type:"string",
                        description:"account password",
                        example:"password123"
                    },
                    role:{
                        type:"string",
                        description: "user's role, can be admin or user",
                        example:"user"
                    },
                    confirmed:{
                        type: "boolean",
                        description: "confirmation's status, it depends on the email confirmation",
                        example: false
                    },
                    token:{
                        type: "array",
                        description: "tokens are obtained ones you confirm your email, and they are saved here",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjAzYWM4YTQ3N2Y0MTMzMTE0MWVjYWIiLCJpYXQiOjE2NDQ0MDgwMjZ9.N6_TDp6YXWclkz0tcYYue6N-85PycPn5vICWBnzqbMo"
                    },
                    postIds:{
                        type:"ObjectId",
                        description: "IDs from posts that users have done",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    followers: {
                        type:"ObjectId",
                        description: "IDs from users that are following the current user",
                        example: "6201064b0028de7866e2b2c4"
                    }


                }
            },
            UserInput:{
                type:'object',
                properties:{
                    username:{
                        type:'string',
                        description:"user's name",
                        example:"pepito23"
                    },
                    email:{
                        type:"string",
                        description:"user's email",
                        example:"pepito23@gmail.com"
                    },
                    password:{
                        type:"string",
                        description:"account password",
                        example:"password123"
                    },
                    role:{
                        type:"string",
                        description: "user's role, can be admin or user",
                        example:"user"
                    },
                    confirmed:{
                        type: "boolean",
                        description: "confirmation's status, it depends on the email confirmation",
                        example: false
                    },
                    token:{
                        type: "array",
                        description: "tokens are obtained ones you confirm your email, and they are saved here",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjAzYWM4YTQ3N2Y0MTMzMTE0MWVjYWIiLCJpYXQiOjE2NDQ0MDgwMjZ9.N6_TDp6YXWclkz0tcYYue6N-85PycPn5vICWBnzqbMo"
                    },
                    postIds:{
                        type:"ObjectId",
                        description: "IDs from posts that users have done",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    followers: {
                        type:"ObjectId",
                        description: "IDs from users that are following the current user",
                        example: "6201064b0028de7866e2b2c4"
                    }
                }
            },

            post:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:"post identification number",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    title:{
                        type:'string',
                        description:"Post's title",
                        example:"This is the title"
                    },
                    body:{
                        type:"string",
                        description:"Publication's body",
                        example:"This is the body of the post"
                    },
                    userId: {
                        type: "objectId",
                        description:"Publication's owner ID",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    imagePost: {
                        type: "string",
                        description: "Image for the post",
                        example:"image.png"
                    },
                    comments: {
                        type: "Array",
                        description: "Array of objects that contains the ID of the user that wrote the comment, an image for the comment, the comment and its ID",
                        example: "[UserId, Image, comment, _id ]"
                    },
                    likes: {
                        type: "Array",
                        description:"Array of Ids from users that have liked the post",
                        example: "[6201064b0028de7866e2b2c4]"
                    }
                }
            },
            PostInput:{
                type:'object',
                properties:{
                    title:{
                        type:'string',
                        description:"Post's title",
                        example:"This is the title"
                    },
                    body:{
                        type:"string",
                        description:"Publication's body",
                        example:"This is the body of the post"
                    },
                    userId: {
                        type: "objectId",
                        description:"Publication's owner ID",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    imagePost: {
                        type: "string",
                        description: "Image for the post",
                        example:"image.png"
                    },
                    comments: {
                        type: "Array",
                        description: "Array of objects that contains the ID of the user that wrote the comment, an image for the comment, the comment and its ID",
                        example: "[UserId, Image, comment, _id ]"
                    },
                    likes: {
                        type: "Array",
                        description:"Array of Ids from users that have liked the post",
                        example: "[6201064b0028de7866e2b2c4]"
                    }
                }
            }
        
        }
    }
}
