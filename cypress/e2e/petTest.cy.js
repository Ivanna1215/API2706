import { faker } from '@faker-js/faker';
import pet from '../fixtures/pet.json';

pet.name = faker.animal.dog();
pet.category.name = faker.animal.type();
// pet.category.id = faker.number.int({ min: 9000, max: 900000 })
pet.id = faker.number.int({ min: 9000, max: 900000 })

pet.tags[0].name = faker.animal.bear();
pet.tags[0].id = faker.number.int({ min: 9000, max: 900000 })
pet.tags[1] = pet.tags[0]
pet.tags[1].name = faker.animal.cat();
pet.tags[1].id = faker.number.int({ min: 9000, max: 900000 })

describe('PET test suite', () => {
  let petId;
  it('Create pet', () => {
    cy.log('Create pet')
    cy.request('POST', '/pet', pet).then((response) => {
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(pet.name);
      expect(response.body.category.id).to.eq(pet.category.id);
      expect(response.body.category.name).to.eq(pet.category.name);
      expect(response.body.tags[0].id).to.eq(pet.tags[0].id);
      expect(response.body.tags[1].id).to.eq(pet.tags[1].id);
      console.log(response)

      // cy.log(`${JSON.stringify(response.body)}`)
      // expect(response.body).to.deep.eq(pet)
      cy.log('Save petId')
      petId = response.body.id;
      // cy.log(petId)
      cy.log('Get pet by id and verify pet created');
      cy.request('GET', `/pet/${petId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(pet.name);
        expect(response.body.category.id).to.eq(pet.category.id);
        expect(response.body.category.name).to.eq(pet.category.name);
        expect(response.body.tags[0].id).to.eq(pet.tags[0].id);
        expect(response.body.tags[1].id).to.eq(pet.tags[1].id)
      })

    })


  })




})