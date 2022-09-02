/// <reference types="Cypress" />

const { values } = require("lodash")

describe('Get User Testcasea', function()
{
    let accesstoken = 'kuchBHi*****9999';

it('TC1 - Get User', function()
{
    cy.request({
        method : 'GET',
        url : 'https://gorest.co.in/public-api/users',
        headers: {
            'autherization': "Bearer" +accesstoken
                }
    }).then((res)=>{
            expect(res.status).to.equal(200);
            expect(res.body.meta.pagination.limit).to.equal(20);
    })

} )

it.only('TC2 - Get User', function()
{
    cy.request({
        method : 'GET',
        url : 'https://gorest.co.in/public-api/users/2',
        headers: {
            'autherization': "Bearer" +accesstoken
        }
    }).then((res)=>{
            expect(res.status).to.equal(200);
            expect(res.body.data.name).to.equal('Bhavani Arora');
    })

} )


} )