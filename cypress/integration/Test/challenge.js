
//Gloval Variables
var chai = require('chai')
    , expect = chai.expect
    , should = chai.should



//FUNCITONS
function inputStartData(date, time, format) {
    cy.get('input[id=StartingDate]').clear()
    cy.get('input[id=StartingDate]').type(date)
    cy.get('input[id=StartingTime]').clear()
    cy.get('input[id=StartingTime]').type(time)
    cy.get('input[name=StartingTimeAMPM]').check(format)
}

function inputLeavingData(date, time, format) {
    cy.get('input[id=LeavingDate]').clear()
    cy.get('input[id=LeavingDate]').type(date)
    cy.get('input[id=LeavingTime]').clear()
    cy.get('input[id=LeavingTime]').type(time)
    cy.get('input[name=LeavingTimeAMPM]').check(format)
}

function inputParkingLotData(name) {
    cy.get('#ParkingLot').select(name).should('have.value', name)
}

function clickCalculate() {
    cy.get('input[type=submit]').click()
}

function expectedOutput(text) {
    cy.get('b').should('contain', text)
}


function notExpectedOutput(text) {
    cy.get('b').should('not.contain', text)
}

function testRate(title,parkingName,dateStart,timeStart,amPmDataStart,dateLeaving,timeLeaving,amPmDataLeaving,output){
    it(title,() => {
        inputParkingLotData(parkingName)
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        notExpectedOutput("ERROR!")
        expectedOutput(output)
    })
}

//BEGINNING OF TEST
describe('Naviagate to the site', () => {
    it('checking title', () => {
        cy.visit('http://www.shino.de/parkcalc/')
        cy.title().should('include', 'Parking Cost Calculator')
    })
})

describe('Testing elements from Parking Cost Calculator site', () => {
    it('After a click data values shouldn\'t change', () => {
        const dateStart = '09/10/2020'
        const timeStart = '10:00'
        const amPmDataStart = 'AM'

        const dateLeaving = '09/10/2020'
        const timeLeaving = '13:00'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Economy')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        cy.get('input[id=StartingDate]').should('have.value', dateStart)
        cy.get('input[id=StartingTime]').should('have.value', timeStart)
        cy.get('input[id=LeavingDate]').should('have.value', dateLeaving)
        cy.get('input[id=LeavingTime]').should('have.value', timeLeaving)
    })

    it('The input date(Start) shouldn\'t accept dates in the next format MMDDYYYY', () => {
        const dateStart = '09102020'
        const timeStart = '10:00'
        const amPmDataStart = 'AM'

        const dateLeaving = '09/11/2020'
        const timeLeaving = '10:00'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Economy')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("ERROR!")
    })

    it('The input date accepts date in the following format MMDDYYYY', () => {
        const dateStart = '09102020'
        const timeStart = '10:00'
        const amPmDataStart = 'AM'

        const dateLeaving = '09102020'
        const timeLeaving = '11:00'
        const amPmDataLeaving = 'AM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("$ 12.00")
    })

    it('The input date(Leaving) shouldn\'t accept dates in the next format MM-DD-YYYY', () => {
        const dateStart = '09/10/2020'
        const timeStart = '10:00'
        const amPmDataStart = 'AM'

        const dateLeaving = '09-11-2020'
        const timeLeaving = '10:00'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Economy')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("ERROR!")
    })

    it('The input date accepts date in the following format MM-DD-YYYY', () => {
        const dateStart = '09-10-2020'
        const timeStart = '10:00'
        const amPmDataStart = 'AM'

        const dateLeaving = '09-10-2020'
        const timeLeaving = '11:00'
        const amPmDataLeaving = 'AM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("$ 12.00")
    })

    it('Simulating that the user enters the correct data', () => {
        const dateStart = '09/10/2020'
        const timeStart = '13:00'
        const amPmDataStart = 'PM'

        const dateLeaving = '09/11/2020'
        const timeLeaving = '13:00'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        notExpectedOutput("ERROR! YOUR LEAVING DATE OR TIME IS BEFORE YOUR STARTING DATE OR TIME")
        expectedOutput("$ 18.00")
    })

    it('The input hour shouldn\'t accept data is not in the following format HH:MM', () => {
        const dateStart = '09/10/2020'
        const timeStart = '13000'
        const amPmDataStart = 'PM'

        const dateLeaving = '09/11/2020'
        const timeLeaving = '1300'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("ERROR!")
    })

    it('Expect to throw an error when the date (month) is not between a valid range', () => {
        const dateStart = '15/10/2020'
        const timeStart = '13:00'
        const amPmDataStart = 'PM'

        const dateLeaving = '99/11/2020'
        const timeLeaving = '13:00'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("ERROR!")
    })

    it('Expect to throw an error when the hour is not between a valid range', () => {
        const dateStart = '09/10/2020'
        const timeStart = '13:00'
        const amPmDataStart = 'PM'

        const dateLeaving = '09/11/2020'
        const timeLeaving = '25:65'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("ERROR!")
    })

    it('Expect to throw an error when the date have an invalid symbol', () => {
        const dateStart = '09/@10/%2020'
        const timeStart = '13:00'
        const amPmDataStart = 'PM'

        const dateLeaving = '09!!/11/2020*'
        const timeLeaving = '13:00'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("ERROR!")
    })

    it('Expect to throw an error when the input hour have an invalid symbol', () => {
        const dateStart = '09/10/2020'
        const timeStart = '1-3:00'
        const amPmDataStart = 'PM'

        const dateLeaving = '09/11/2020'
        const timeLeaving = '13+:00'
        const amPmDataLeaving = 'PM'

        inputParkingLotData('Valet')
        inputStartData(dateStart, timeStart, amPmDataStart)
        inputLeavingData(dateLeaving, timeLeaving, amPmDataLeaving)
        clickCalculate()

        expectedOutput("ERROR!")

    })

    /*
    it('text',() => {
    })
    */

   //testRate(title,parkingName,dateStart,timeStart,amPmDataStart,dateLeaving,timeLeaving,amPmDataLeaving,exptedOutput)

    describe('Testing parking rates (valet)', () => {
        testRate('Valet for one day parking','Valet','09/10/2020','13:00','PM','09/11/2020','13:00','PM',"$ 18.00")
        testRate('Valet five hours or less','Valet','09/10/2020','13:00','PM','09/10/2020','15:00','PM',"$ 12.00")
    })

    describe('Testing parking rates (Short-Term)', () => {
        testRate('Short-Term for one day parking','Short','09/10/2020','13:00','PM','09/10/2020','15:00','PM',"$ 12.00")
    })


})