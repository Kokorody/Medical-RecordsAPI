const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medical Records API',
      version: '1.0.0',
      description: 'API for medical records'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key'
        }
      },
      schemas: {
        Patient: {
          type: 'object',
          required: ['code_patient', 'name_patient'],
          properties: {
            id_patient: {
              type: 'integer',
              description: 'The auto-generated id of the patient'
            },
            code_patient: {
              type: 'string',
              description: 'The patient code'
            },
            name_patient: {
              type: 'string',
              description: 'The patient name'
            },
            dob_patient: {
              type: 'string',
              format: 'date',
              description: 'The patient date of birth'
            },
            gender_patient: {
              type: 'string',
              description: 'The patient gender'
            },
            phone_patient: {
              type: 'string',
              description: 'The patient phone number'
            },
            address_patient: {
              type: 'string',
              description: 'The patient address'
            }
          }
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ],
    paths: {
      '/patient': {
        get: {
          summary: 'Get all patients',
          responses: {
            '200': {
              description: 'The list of patients',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Patient'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Server error'
            }
          }
        },
        post: {
          summary: 'Create a new patient',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code_patient: {
                      type: 'string',
                      description: 'Patient code'
                    },
                    name_patient: {
                      type: 'string',
                      description: 'Patient name'
                    },
                    dob_patient: {
                      type: 'string',
                      format: 'date',
                      description: 'Patient date of birth'
                    },
                    gender_patient: {
                      type: 'string',
                      description: 'Patient gender'
                    },
                    phone_patient: {
                      type: 'string',
                      description: 'Patient phone number'
                    },
                    address_patient: {
                      type: 'string',
                      description: 'Patient address'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Patient created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Patient'
                  }
                }
              }
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/patient/search': {
        get: {
          summary: 'Search patients by name',
          parameters: [
            {
              in: 'query',
              name: 'name',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Patient name to search'
            }
          ],
          responses: {
            '200': {
              description: 'Patient(s) found',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Patient'
                    }
                  }
                }
              }
            },
            '404': {
              description: 'No patients found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/patient/{id}': {
        get: {
          summary: 'Get patient by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Patient ID'
            }
          ],
          responses: {
            '200': {
              description: 'Patient details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Patient'
                  }
                }
              }
            },
            '404': {
              description: 'Patient not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        },
        put: {
          summary: 'Update patient by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Patient ID'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code_patient: {
                      type: 'string',
                      description: 'Patient code'
                    },
                    name_patient: {
                      type: 'string',
                      description: 'Patient name'
                    },
                    dob_patient: {
                      type: 'string',
                      format: 'date',
                      description: 'Patient date of birth'
                    },
                    gender_patient: {
                      type: 'string',
                      description: 'Patient gender'
                    },
                    phone_patient: {
                      type: 'string',
                      description: 'Patient phone number'
                    },
                    address_patient: {
                      type: 'string',
                      description: 'Patient address'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Patient updated successfully'
            },
            '404': {
              description: 'Patient not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        },
        delete: {
          summary: 'Delete patient by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Patient ID'
            }
          ],
          responses: {
            '200': {
              description: 'Patient deleted successfully'
            },
            '404': {
              description: 'Patient not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/patient/code/{code}': {
        get: {
          summary: 'Get patient by code',
          parameters: [
            {
              in: 'path',
              name: 'code',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Patient code'
            }
          ],
          responses: {
            '200': {
              description: 'Patient details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Patient'
                  }
                }
              }
            },
            '404': {
              description: 'Patient not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

module.exports = swaggerJsDoc(swaggerOptions);