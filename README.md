# mysql-cli-app
The app will take in orders from customers and deplete stock from the store's inventory. The app will also allow managers to handle inventory. 

## Using bamazonCustomer.js
1. Prompts user for the ID of the product they would like to buy.

2. Message will ask how many units of the product the user would like to buy.

3. Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.
	- If not, the app will log "Insufficient quantity in stock!", and then prevent the order from going through.	
![Customer-Demo2](https://user-images.githubusercontent.com/28641223/32704974-3260e450-c7c3-11e7-967d-3739e072ffc6.gif)

4. If the place order is successful, the total purchase price will be be displayed.
![Customer-Demo1](https://user-images.githubusercontent.com/28641223/32704975-3281736e-c7c3-11e7-8341-7a26b12f530c.gif)

## Using bamazonManager.js

Running the application will list a set of menu options:
 - **View Products for Sale**
 	- The app will list every available item: the item IDs, names, prices, and quantities.
 	![Manager-Demo1](https://user-images.githubusercontent.com/28641223/32704857-49c98c8e-c7c1-11e7-936e-70589a56a154.gif)
 - **View Low Inventory**
 	- The app will list all items with an inventory count lower than five.
 	![Manager-Demo2](https://user-images.githubusercontent.com/28641223/32704875-7d0ff39e-c7c1-11e7-91c0-74704a14ea27.gif)
 - **Add to Inventory**
 	- The app will display a prompt that will let the manager "add more" of any item currently in the store.

 	![Manager-Demo3-1](https://user-images.githubusercontent.com/28641223/32704888-a1e2b18e-c7c1-11e7-9c69-fc53c2f89b2b.gif)
    
 	![Manager-Demo3-2](https://user-images.githubusercontent.com/28641223/32704889-a2110a48-c7c1-11e7-8f29-518b93035264.gif)
 - **Add New Product**
 	- The app will allow the manager to add a completely new product to the store.
 	
 	![Manager-Demo4-1](https://user-images.githubusercontent.com/28641223/32704905-de5cc1ae-c7c1-11e7-8914-9edd7c68b313.gif)
    
 	![Manager-Demo4-2](https://user-images.githubusercontent.com/28641223/32704966-ffb7436e-c7c2-11e7-8be5-99cf71a7c0c5.gif)


## Technologies Used

- Node
- JavaScript

## Authors

* **Fausto Rendon** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
