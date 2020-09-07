
//Gloval Variables
var chai = require('chai')
,expect = chai.expect
,should = chai.should

/*
it('text',() => {
})
*/

//FUNCITONS
function inputStartData(date,time,format){
    cy.get('input[id=StartingDate]').clear()
    cy.get('input[id=StartingDate]').type(date)
    cy.get('input[id=StartingTime]').clear()
    cy.get('input[id=StartingTime]').type(time)
    cy.get('input[name=StartingTimeAMPM]').check(format)
}

function inputLeavingData(date,time,format){
    cy.get('input[id=LeavingDate]').clear()
    cy.get('input[id=LeavingDate]').type(date)
    cy.get('input[id=LeavingTime]').clear()
    cy.get('input[id=LeavingTime]').type(time)
    cy.get('input[name=LeavingTimeAMPM]').check(format)
}

function inputParkingLotData(name){
    cy.get('#ParkingLot').select(name).should('have.value',name)
}

function clickCalculate(){
    cy.get('input[type=submit]').click()
}

//BEGINNING OF TEST
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

        inputParkingLotData('Economy')
        inputStartData(dateStart,timeStart,amPmDataStart)
        inputLeavingData(dateLeaving,timeLeaving,amPmDataLeaving)
        clickCalculate()

        cy.get('input[id=StartingDate]').should('have.value', dateStart)
        cy.get('input[id=StartingTime]').should('have.value', timeStart)
        cy.get('input[id=LeavingDate]').should('have.value', dateLeaving)
        cy.get('input[id=LeavingTime]').should('have.value', timeLeaving)
    })

    it('The input date(Start) shouldn\'t accept dates in the next format MMDDYYYY',() => {
        const dateStart = '09102020'
        const timeStart = '10:00'
        const amPmDataStart = 'AM'

        const dateLeaving = '09102020'
        const timeLeaving = '13:00'
        const amPmDataLeaving = 'PM'

        
    })
})