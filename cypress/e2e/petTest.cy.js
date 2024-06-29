
import petTemplate from '../fixtures/pet.json';
import { generateRandomPet } from '../support/helper';

let pet = generateRandomPet(petTemplate, true, true, true, true, true);
let petId;
describe('PET test suite', () => {

  it('Create pet', () => {
    cy.log('Create pet')
    cy.request('POST', '/pet', pet).then((response) => {
      console.log(response);
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(pet.name);
      expect(response.body.category.id).to.eq(pet.category.id);
      expect(response.body.category.name).to.eq(pet.category.name);
      expect(response.body.tags[0].id).to.eq(pet.tags[0].id);
      expect(response.body.tags[0].name).to.eq(pet.tags[0].name);
      expect(response.body.tags[1].id).to.eq(pet.tags[1].id)
      expect(response.body.tags[1].name).to.eq(pet.tags[1].name);
      expect(response.body.status).to.eq(pet.status);
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
        expect(response.body.tags[0].name).to.eq(pet.tags[0].name);
        expect(response.body.tags[1].id).to.eq(pet.tags[1].id)
        expect(response.body.tags[1].name).to.eq(pet.tags[1].name);
        expect(response.body.status).to.eq(pet.status);
      })

    })

  })

})

describe('PET test suite', () => {

  pet = generateRandomPet(petTemplate, false, true, true, true, true);


  it('Update pet', () => {
    cy.log('Update pet');

    cy.request('PUT', '/pet', pet).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(pet.name);
      expect(response.body.category.id).to.eq(pet.category.id);
      expect(response.body.category.name).to.eq(pet.category.name);
      expect(response.body.tags[0].id).to.eq(pet.tags[0].id);
      expect(response.body.tags[0].name).to.eq(pet.tags[0].name);
      expect(response.body.tags[1].id).to.eq(pet.tags[1].id)
      expect(response.body.tags[1].name).to.eq(pet.tags[1].name);
      expect(response.body.status).to.eq(pet.status);

      // cy.log(petId)
      cy.log('Get pet by id and verify pet created');
      cy.request('GET', `/pet/${petId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(pet.name);
        expect(response.body.category.id).to.eq(pet.category.id);
        expect(response.body.category.name).to.eq(pet.category.name);
        expect(response.body.tags[0].id).to.eq(pet.tags[0].id);
        expect(response.body.tags[0].name).to.eq(pet.tags[0].name);
        expect(response.body.tags[1].id).to.eq(pet.tags[1].id)
        expect(response.body.tags[1].name).to.eq(pet.tags[1].name);
        expect(response.body.status).to.eq(pet.status);
      })

    })

  })

  it('Find pet by status', () => {
    cy.log('Find pet by status')
    cy.request('GET', `/pet/findByStatus?status=${pet.status}`).then((response) => {
      expect(response.status).to.eq(200);
      response.body.forEach(pet => {
        expect(pet.status).to.eq(pet.status)
      });

      let petFound = response.body.filter(pet => pet.id === petId);
      expect(petFound.length).to.eq(1)
    })

   

  })

})