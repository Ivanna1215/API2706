import { faker } from '@faker-js/faker';
import pet from '../fixtures/pet.json';

pet.name = faker.animal.dog();
pet.category.name = faker.animal.type();
pet.category.id = faker.number.int({ min: 9000, max: 900000 })
pet.tags[0].name = faker.animal.bear();
pet.tags[0].id = faker.number.int({ min: 9000, max: 900000 })
pet.tags[1] = pet.tags[0]
pet.tags[1].name = faker.animal.cat();
pet.tags[1].id = faker.number.int({ min: 9000, max: 900000 })

describe('PET test suite', () => {
  it('Create pet', () => {
    cy.log('Create pet')
    cy.log(`Pet:${JSON.stringify(pet)}`)
    cy.request('POST', '/pet', pet)
  })


})