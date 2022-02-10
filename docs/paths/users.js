module.exports = {
        get: {
          tags: {
            Users: "Get Tasks",
          },
          description: "Get users",
          operationId: "getUsers",
          parameters: [],
          responses: {
            200: {
              description: "Users were obtained",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/user",
                  },
                },
              },
            },
          },
        },
      }

  