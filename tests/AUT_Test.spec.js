// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const data = require('../Utilities/data.json');
const apt_data = require('../Utilities/Appointment.json');
const { Login_Page } = require('../Pages/Login_Page');
const { Appointment_Page } = require('../Pages/Appointment_Page');

let login, apt;
let browser, context, page;

test.beforeEach(async () => {
  browser = await chromium.launch({ headless: false });

  context = await browser.newContext({
    // recordVideo: {
    //   dir: 'Video_Folder/',  
    // }
  });

  page = await context.newPage();

  login = new Login_Page(page);
  apt = new Appointment_Page(page);

  await page.goto(data.application_url, {
    waitUntil: 'domcontentloaded'
  });
});

test.afterEach(async () => {
  // if (page) {
  //   const videoPath = await page.video().path();  
  //   console.log(`Video saved at: ${videoPath}`);
  //   await page.close();
  // }

  // if (context) {
  //   await context.close();  
  // }

  // if (browser) {
  //   await browser.close();
  // }
});


  test('Login and Book Appointment Flow', async () => {
  console.log('Starting Login Test...');
  await login.Verify_Login_page_title_url(data['login_page-title'], data.login_page_url);
  await login.perform_login(data.userName, data.password);
  console.log('Login test completed.');

  console.log('Starting Appointment Test...');
  await apt.check_Appointment_Page_title_url(apt_data['appointment-Title'], apt_data.appointment_Url);
  await apt.select_facility(apt_data.facility);
  await apt.click_on_hospital_readmision();
  await apt.click_on_medical_aid();
  await apt.enter_Date(apt_data.visit_Date);
  await apt.enter_txt(apt_data.comment);
  await apt.click_on_bookAppointmnet();
  await apt.validate_Booking_details(
    apt_data.facility,
    apt_data.readmission,
    apt_data.Health_Program,
    apt_data.visit_Date,
    apt_data.comment
  );
  console.log('Appointment test completed.');
});
