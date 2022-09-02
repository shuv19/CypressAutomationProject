/// <reference types="Cypress" />

const { values } = require("lodash")
const dataJson = require('../../fixtures/createuser')

describe('Post User Testcases', function()
{
    let accessToken = 'd7a1d7a75d309f092b85bf2927bc07620044805d5b31d398b8196f2a0d167dfe';
    let randomStr = "";
    let testEmail = "";

it('TC1 - Post User', function()
{
    var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for(var i=0;i<5;i++)
    {
        randomStr+=pattern.charAt(Math.floor(Math.random()*pattern.length));
        testEmail = randomStr+'@gmail.com'
    }
    //1st Call - post User
    cy.request({
        method : 'POST',
        url : 'https://gorest.co.in/public/v2/users',
        headers: {
            'Authorization': 'Bearer ' + accessToken
                },
        body: {
            "name": dataJson.name,
            "email": testEmail,
            "gender": dataJson.gender,
            "status": dataJson.status
             }
    }).then((res)=>{
            cy.log(JSON.stringify(res));
            expect(res.status).to.equal(201); // status 201 means data got created
            console.log("TC1 - Post User Passed");
            expect(res.body).has.property('email',testEmail);
            expect(res.body).has.property('gender',dataJson.gender);
            expect(res.body).has.property('status',dataJson.status);
            expect(res.body).has.property('name',dataJson.name);
            const userID = res.body.id;
            cy.log("User ID is "+ userID);
            //2nd Call - Get User
            cy.request({
                method : 'GET',
                url : 'https://gorest.co.in/public/v2/users/'+userID,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                        }
                }).then((res)=>{
                    expect(res.status).to.equal(200);
                    expect(res.body).has.property('id',userID);
                    expect(res.body).has.property('gender',dataJson.gender);
                    expect(res.body).has.property('status',dataJson.status);
                    expect(res.body).has.property('name',dataJson.name);
                })
    })
    //capture ID from POST call & use it in the next GET call

} )
} )