describe('Test Saucedemo', () => {
    it('Test 1 - Berhasil melakukan login', async () => {
        await browser.url("https://www.saucedemo.com/")

        const usernameTextbox = await browser.$("#user-name")
        const passwordTextbox = await browser.$("#password")
        const loginButton = await browser.$('//input[@type="submit"]')

        await usernameTextbox.addValue("standard_user")
        await browser.pause(1000)
        await passwordTextbox.addValue("secret_sauce")
        await browser.pause(1000)
        await loginButton.click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')  
        await expect(browser).toHaveTitle('Swag Labs')
    });

    it('Test 2 - Memeriksa Judul dari Item yang dipilih', async() => {
        await browser.url('https://www.saucedemo.com/inventory.html')
        const titleItem = await browser.$('//*[@id="item_4_title_link"]/div');
        await expect(titleItem).toHaveText('Sauce Labs Backpack');
    });

    it('Test 3 - Memeriksa Deskripsi dari item yang dipilih', async() => {
        const itemDescription = await browser.$('//*[@id="inventory_container"]/div/div[1]/div[2]/div[1]/div');
        await expect(itemDescription).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    });

    it('Test 4 - Memeriksa harga dari item yang dipilih', async() => {
        const itemPrice = await browser.$('//*[@id="inventory_container"]/div/div[1]/div[2]/div[2]/div');
        await expect(itemPrice).toHaveText('$29.99');
    });

    it('Test 5 - Memeriksa deskripsi dari button', async() => {
        const buttonDescription = await browser.$('#add-to-cart-sauce-labs-backpack');
        await expect(buttonDescription).toHaveText('Add to cart');
        await browser.pause(1000);
    });


    it('Test 6 - Melakukan click untuk memasukan item pada chart', async() => {
        //functionalitas untuk melakukan klik pada suatu item
        const clickItem = await browser.$('#add-to-cart-sauce-labs-backpack')
        const buttonCLicked = await browser.$('#remove-sauce-labs-backpack');
        const chartIcon = await browser.$('//*[@id="shopping_cart_container"]/a/span')
        await clickItem.click();
        await browser.pause(1000);

        // Assertionnya
        await expect(buttonCLicked).toHaveText('Remove');
        await expect(chartIcon).toHaveText('1');
    });

    it('Test 7 - Memvalidasi item yang dimasukan kedalam keranjang', async() => {
        //kode automasi untuk memeriksa apakah item yang dimasukan sudah benar
        const chartBox = await browser.$('//*[@id="shopping_cart_container"]/a');

        await chartBox.click();
        // Assertionnya
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await browser.pause(5000);
    });

    it('Test 8 - Memvalidasi data item yang dimasukan sudah benar', async() => {
        // Check kebenaran detail datanya
        const myChart = await browser.$('//*[@id="header_container"]/div[2]/span');
        const item = await browser.$('//*[@id="item_4_title_link"]/div');
        const price = await browser.$('//*[@id="cart_contents_container"]/div/div[1]/div[3]/div[2]/div[2]/div');

        // Assertion untuk memastikan bahwa halaman memang sudah ada di dalam chart
        await expect(myChart).toHaveText('Your Cart');
        await expect(item).toHaveText('Sauce Labs Backpack');
        await expect(price).toHaveText('$29.99');
    });

    it('Test 9 - Click button checkout', async() => {
        const checkoutButton = await browser.$('#checkout');
        await checkoutButton.click();
        

        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        browser.pause(2000);
        expect(browser).toHaveTitle('Swag Labs');
    });

    it('Test 10 - Memasukan data diri untuk checkout', async() => {
        const firstName = await browser.$('#first-name');
        const lastName = await browser.$('#last-name');
        const address = await browser.$('#postal-code');

        await firstName.addValue('Reza');
        await lastName.addValue('Paramarta');
        await address.addValue('12345');
        await browser.pause(1000);

        const continueButton = await browser.$('#continue');
        await continueButton.click();

        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        browser.pause(2000);
    });
    it('Test 11 - Finish Transaction', async() => {
        const buttonFinish = await browser.$('#finish');

        await buttonFinish.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/order-receipt.html');
    });
});

