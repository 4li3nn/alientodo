function validateEntityFields(schema, entity) {
  let validationError = "";
  Object.keys(schema).every((field) => {
    if (schema[field].required && entity[field] === undefined) {
      validationError = `${field} is required`;
      return false;
    }

    if (schema[field].type !== typeof entity[field]) {
      validationError = `Invalid type of field ${field}`;
      return false;
    }
    return true;
  });
  return validationError;
}

function validateEntityUniqueness(schema, entity, existingEntities) {
  let validationError = "";
  Object.keys(schema)
    .filter((field) => schema[field].unique)
    .some((field) => {
      if (existingEntities.some((item) => item[field] === entity[field])) {
        validationError = `${field} is already existed`;
      }
    });
  return validationError;
}

module.exports = { validateEntityFields, validateEntityUniqueness };

//*INFO: Explain code above
// 1. We have 2 functions: validateEntityFields and validateEntityUniqueness
// 2. validateEntityFields takes 3 arguments: schema, entity, existingEntities
// 2.1. We loop through all the fields in the schema
// 2.2. If the field is id, we skip it
// 2.3. If the field is required and the entity does not have that field, we return an error
// 2.4. If the type of the field in the schema is not the same as the type of the field in the entity, we return an error
// 2.5. If there is no error, we return an empty string
// 3. validateEntityUniqueness takes 3 arguments: schema, entity, existingEntities
// 3.1. We loop through all the fields in the schema
// 3.2. If the field is unique and the entity has the same value with any existing entity, we return an error
// 3.3. If there is no error, we return an empty string
// 4. We export the 2 functions to use in other files
