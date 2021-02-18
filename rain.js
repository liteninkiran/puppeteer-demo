
    const puppeteer = require('puppeteer');

    const searchText = process.argv[2];

    if(!searchText)
    {
        console.error('Please supply Job Seach Text');
        process.exit(1);
    }

    (async () => {

        const urlLogin = 'https://www.spectrumit.co.uk/users/login';
        const urlSearch = 'https://www.spectrumit.co.uk/job-search';
        const browser = await puppeteer.launch( /* { headless:false } */ );
        const page = await browser.newPage();

        await page.goto(urlLogin);

        // Enter credentials
        await page.type('#user_email', 'me@domain.com');
        await page.type('#user_password', 'password');

        // Click on the "Got It" link for cookie consent
        await page.click('div.cc-compliance a');

        // Click login
        await Promise.all(
            [
                page.waitForNavigation(),
                page.click('input[type=submit]')
            ]);

        // Go to the job search page
        await page.goto(urlSearch);

        // Search for jobs
        await page.type('#search_query', searchText);
        await page.type('#search_location', 'London');

        // Click submit
        await page.click('input[type=submit]');

        // Take a screenshot
        await page.screenshot({ path: 'example-search.png' });

        // Close the browser
        await browser.close();

    })();
