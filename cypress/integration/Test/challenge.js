
//Gloval Variables
var chai = require('chai')
,expect = chai.expect
,should = chai.should

/*
it('text',() => {
})
*/

describe('Naviagate to the site', () => {
    it('checking title',() => {
        cy.visit('http://www.shino.de/parkcalc/')
        cy.title().should('include','Parking Cost Calculator')
    })
})

describe('Testing elements from Parking Cost Calculator site', () => {
    it('After a click data values shouldn\'t change',() => {
        const dateStart = '09/10/2020'
        const timeStart = '10:00'
        const amPmDataStart = 'AM'

        const dateLeaving = '09/10/2020'
        const timeLeaving = '13:00'
        const amPmDataLeaving = 'PM'

        cy.get('input[id=StartingDate]').clear()
        cy.get('input[id=StartingDate]').type(dateStart)
        cy.get('input[id=StartingTime]').clear()
        cy.get('input[id=StartingTime]').type(timeStart)
        cy.get('input[name=StartingTimeAMPM]').check(amPmDataStart)

        cy.get('input[id=LeavingDate]').clear()
        cy.get('input[id=LeavingDate]').type(dateLeaving)
        cy.get('input[id=LeavingTime]').clear()
        cy.get('input[id=LeavingTime]').type(timeLeaving)
        cy.get('input[name=LeavingTimeAMPM]').check(amPmDataLeaving)

        cy.get('input[id=StartingDate]').should('have.value', dateStart)

    })
})