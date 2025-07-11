const utils = require('../Utilities/Common_Methods');
/**
 * @typedef {import('@playwright/test').Page} Page
 */

class Appointment_Page {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.makeAppointment="//a[text()='Make Appointment']";
        this.facilty = "//select[starts-with(@name,'faci')]";
        this.hsopital_readmission = "//input[contains(@id,'chk_hospotal_re')]";
        this.medical_Aid = "//input[contains(@id,'radio_program_medicaid')]";
        this.apt_Date = "//input[@id='txt_visit_date']";
        this.txt_Area = "#txt_comment";
        this.book_appointment_button = "//button[text()='Book Appointment']";

        //Updated booking Details
        this.updated_Facility="//p[@id='facility']";
        this.updated_readmission="//p[@id='hospital_readmission']";
        this.updated_program="//p[starts-with(@id,'program')]";
        this.updated_Date="//p[@id='visit_date']";
        this.select_Date="//td[text()='9']";
        this.updated_Comment="//p[@id='comment']";
    }


    async check_Appointment_Page_title_url(title, url) {
        await utils.VerifyUrl_Title(this.page, title, url);
    }
  
    async select_facility(selecting_facility) {
        //await this.page.click(this.makeAppointment);
        await this.page.selectOption(this.facilty, selecting_facility);
    }

    async click_on_hospital_readmision() {
        await this.page.check(this.hsopital_readmission);
    }

    async click_on_medical_aid() {
        await this.page.check(this.medical_Aid);
    }

    async enter_Date() {
       await this.page.click(this.apt_Date);      
       await this.page.click(this.select_Date);   

    }

    async enter_txt(text) {
        await this.page.click(this.txt_Area);
        await this.page.locator(this.txt_Area).fill(text);
    }

    async click_on_bookAppointmnet() {
        utils.clickButton(this.page,this.book_appointment_button);
    }

   async validate_Booking_details(facility, redmission, program, date, comment) {
    try {
        const actualFacility = await this.page.locator(this.updated_Facility).textContent();
        const actualRedmission = await this.page.locator(this.updated_readmission).textContent();
        const actualProgram = await this.page.locator(this.updated_program).textContent();
        const actualDate = await this.page.locator(this.updated_Date).textContent();
        const actualComment = await this.page.locator(this.updated_Comment).textContent();

        if (!actualFacility.includes(facility))
        throw new Error(`Facility mismatch: expected "${facility}", got "${actualFacility}"`);

        if (!actualRedmission.includes(redmission))
        throw new Error(`Readmission mismatch: expected "${redmission}", got "${actualRedmission}"`);

        if (!actualProgram.includes(program))
        throw new Error(`Program mismatch: expected "${program}", got "${actualProgram}"`);

        if (!actualDate.includes(date))
        throw new Error(`Date mismatch: expected "${date}", got "${actualDate}"`);

        if (!actualComment.includes(comment))
        throw new Error(`Comment mismatch: expected "${comment}", got "${actualComment}"`);

        console.log("Booking details validated successfully.");
    } catch (error) {
        console.error("Booking detail validation failed.");
        throw error;
    }
}

}

module.exports = { Appointment_Page };
