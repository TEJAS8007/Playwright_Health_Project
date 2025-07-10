const {test,expect}=require('@playwright/test');
const utils= require('../Utilities/Common_Methods');

export class Login_Page {


    constructor(page) {
        this.page=page;
        this.login_Username="//input[contains(@id,'txt-username')]";
        this.login_password="//input[contains(@id,'txt-pas')]";
        this.loginButton="//button[contains(@id,'btn-login')]";
    }
    

    async Verify_Login_page_title_url(title,url) {
        await utils.VerifyUrl_Title(this.page,title,url);
    }

    async perform_login(un,ps) {
        await utils.waitForLcators(this.page,this.login_Username);
        await this.page.locator(this.login_Username).fill(un);

        await utils.waitForLcators(this.page,this.login_password);
        await this.page.locator(this.login_password).fill(ps);

        await utils.clickButton(this.page,this.loginButton);
        //await this.page.locator(this.loginButton).click();
    }

}

module.exports={Login_Page};