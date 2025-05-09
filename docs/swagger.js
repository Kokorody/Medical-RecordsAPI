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
        // Patient 
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
        },
        
        // Doctor 
        Doctor: {
          type: 'object',
          required: ['name_doctor', 'licence'],
          properties: {
            id_doctor: {
              type: 'integer',
              description: 'The id of the doctor'
            },
            name_doctor: {
              type: 'string',
              description: 'The doctor name'
            },
            specialization: {
              type: 'string',
              description: 'The doctor specialization'
            },
            licence: {
              type: 'string',
              description: 'The doctor licence number'
            }
          }
        },
        
        // Medical Record 
        MedicalRecord: {
          type: 'object',
          required: ['code_medrec', 'id_patient', 'id_doctor'],
          properties: {
            id_medrec: {
              type: 'integer',
              description: 'The id of the medical record'
            },
            code_medrec: {
              type: 'string',
              description: 'The unique code of the medical record'
            },
            id_patient: {
              type: 'integer',
              description: 'The id of the associated patient'
            },
            id_doctor: {
              type: 'integer',
              description: 'The id of the treating doctor'
            },
            diagnose: {
              type: 'string',
              description: 'The diagnosis given to the patient'
            },
            treatment: {
              type: 'string',
              description: 'The treatment prescribed'
            },
            notes: {
              type: 'string',
              description: 'Additional notes about the medical record'
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
      // ini swagger Patient docsnya jak
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
      },
      
      // ini Doctor docs
      '/doctor': {
        get: {
          summary: 'Get all doctors',
          responses: {
            '200': {
              description: 'The list of doctors',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Doctor'
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
          summary: 'Create a new doctor',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_doctor: {
                      type: 'integer',
                      description: 'Doctor ID'
                    },
                    name_doctor: {
                      type: 'string',
                      description: 'Doctor name'
                    },
                    specialization: {
                      type: 'string',
                      description: 'Doctor specialization'
                    },
                    licence: {
                      type: 'string',
                      description: 'Doctor licence number'
                    }
                  },
                  required: ['name_doctor', 'licence']
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Doctor created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Doctor'
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
      '/doctor/search': {
        get: {
          summary: 'Search doctors by name',
          parameters: [
            {
              in: 'query',
              name: 'name',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Doctor name to search'
            }
          ],
          responses: {
            '200': {
              description: 'Doctor(s) found',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Doctor'
                    }
                  }
                }
              }
            },
            '404': {
              description: 'No doctors found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/doctor/{id}': {
        get: {
          summary: 'Get doctor by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Doctor ID'
            }
          ],
          responses: {
            '200': {
              description: 'Doctor details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Doctor'
                  }
                }
              }
            },
            '404': {
              description: 'Doctor not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        },
        put: {
          summary: 'Update doctor by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Doctor ID'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name_doctor: {
                      type: 'string',
                      description: 'Doctor name'
                    },
                    specialization: {
                      type: 'string',
                      description: 'Doctor specialization'
                    },
                    licence: {
                      type: 'string',
                      description: 'Doctor licence number'
                    }
                  },
                  required: ['name_doctor', 'licence']
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Doctor updated successfully'
            },
            '404': {
              description: 'Doctor not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        },
        delete: {
          summary: 'Delete doctor by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Doctor ID'
            }
          ],
          responses: {
            '200': {
              description: 'Doctor deleted successfully'
            },
            '404': {
              description: 'Doctor not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/doctor/licence/{licence}': {
        get: {
          summary: 'Get doctor by licence number',
          parameters: [
            {
              in: 'path',
              name: 'licence',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Doctor licence number'
            }
          ],
          responses: {
            '200': {
              description: 'Doctor details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Doctor'
                  }
                }
              }
            },
            '404': {
              description: 'Doctor not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      
      // ini utk Medical Record 
      '/medrec': {
        get: {
          summary: 'Get all medical records',
          responses: {
            '200': {
              description: 'The list of medical records',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/MedicalRecord'
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
          summary: 'Create a new medical record',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_medrec: {
                      type: 'integer',
                      description: 'Medical record ID'
                    },
                    code_medrec: {
                      type: 'string',
                      description: 'Medical record code'
                    },
                    id_patient: {
                      type: 'integer',
                      description: 'Patient ID'
                    },
                    id_doctor: {
                      type: 'integer',
                      description: 'Doctor ID'
                    },
                    diagnose: {
                      type: 'string',
                      description: 'Diagnosis'
                    },
                    treatment: {
                      type: 'string',
                      description: 'Treatment'
                    },
                    notes: {
                      type: 'string',
                      description: 'Additional notes'
                    }
                  },
                  required: ['code_medrec', 'id_patient', 'id_doctor']
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Medical record created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/MedicalRecord'
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
      '/medrec/{id}': {
        get: {
          summary: 'Get medical record by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Medical record ID'
            }
          ],
          responses: {
            '200': {
              description: 'Medical record details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/MedicalRecord'
                  }
                }
              }
            },
            '404': {
              description: 'Medical record not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        },
        put: {
          summary: 'Update medical record by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Medical record ID'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code_medrec: {
                      type: 'string',
                      description: 'Medical record code'
                    },
                    id_patient: {
                      type: 'integer',
                      description: 'Patient ID'
                    },
                    id_doctor: {
                      type: 'integer',
                      description: 'Doctor ID'
                    },
                    diagnose: {
                      type: 'string',
                      description: 'Diagnosis'
                    },
                    treatment: {
                      type: 'string',
                      description: 'Treatment'
                    },
                    notes: {
                      type: 'string',
                      description: 'Additional notes'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Medical record updated successfully'
            },
            '404': {
              description: 'Medical record not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        },
        delete: {
          summary: 'Delete medical record by ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer'
              },
              required: true,
              description: 'Medical record ID'
            }
          ],
          responses: {
            '200': {
              description: 'Medical record deleted successfully'
            },
            '404': {
              description: 'Medical record not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/medrec/code/{code}': {
        get: {
          summary: 'Get medical record by code',
          parameters: [
            {
              in: 'path',
              name: 'code',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Medical record code'
            }
          ],
          responses: {
            '200': {
              description: 'Medical record details',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/MedicalRecord'
                  }
                }
              }
            },
            '404': {
              description: 'Medical record not found'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/medrec/treatment/{treatment}': {
        get: {
          summary: 'Get medical records by treatment',
          parameters: [
            {
              in: 'path',
              name: 'treatment',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Treatment keyword'
            }
          ],
          responses: {
            '200': {
              description: 'Medical records found',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/MedicalRecord'
                    }
                  }
                }
              }
            },
            '404': {
              description: 'No records found for given treatment'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/medrec/diagnose/{diagnose}': {
        get: {
          summary: 'Get medical records by diagnosis',
          parameters: [
            {
              in: 'path',
              name: 'diagnose',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Diagnosis keyword'
            }
          ],
          responses: {
            '200': {
              description: 'Medical records found',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/MedicalRecord'
                    }
                  }
                }
              }
            },
            '404': {
              description: 'No records found for given diagnosis'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/medrec/doctor/{doctorName}': {
        get: {
          summary: 'Get medical records by doctor name',
          parameters: [
            {
              in: 'path',
              name: 'doctorName',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Doctor name'
            }
          ],
          responses: {
            '200': {
              description: 'Medical records found',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/MedicalRecord'
                    }
                  }
                }
              }
            },
            '404': {
              description: 'No records found for doctor'
            },
            '500': {
              description: 'Server error'
            }
          }
        }
      },
      '/medrec/patient/{patientName}': {
        get: {
          summary: 'Get medical records by patient name',
          parameters: [
            {
              in: 'path',
              name: 'patientName',
              schema: {
                type: 'string'
              },
              required: true,
              description: 'Patient name'
            }
          ],
          responses: {
            '200': {
              description: 'Medical records found',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/MedicalRecord'
                    }
                  }
                }
              }
            },
            '404': {
              description: 'No records found for patient'
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