module.exports = {


        get: {
          tags: {
            Posts: "Get Posts",
          },
          description: "Get Posts",
          operationId: "getPosts",
          parameters: [],
          responses: {
            200: {
              description: "Posts were obtained",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/post",
                  },
                },
              },
            },
          }, 
    },
  };
  