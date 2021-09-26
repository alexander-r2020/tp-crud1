const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const discountPrice = (price,discount) => Math.round(price-(price*discount)/100)

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products,toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id
		let idProduct = products.find(e=>{
			return e.id === +id
		})
		res.render('detail',{idProduct,toThousand,discountPrice})
	},

	// Create - Form to create
	create: (req, res) => {
		
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const formCreate = req.body

		formCreate.id = products.length + 1

		products.push(formCreate);

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2))

		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id
		let idFind=products.find(e=>{
			return e.id === +id
		})


		res.render('product-edit-form',{idFind})
	},
	// Update - Method to update
	update: (req, res) => {
		const upDate = products.find(e=> e.id === +req.params.id)
		if(upDate){
			upDate.name = req.body.name
			upDate.price = req.body.price
			upDate.discount = req.body.discount
			upDate.category = req.body.category
			upDate.description = req.body.description

			fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2))
			res.redirect(`/products/detail/${req.params.id}`)

		}else{
			res.redirect('/')
		}

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		products=products.filter(e=> e.id !== +req.params.id)

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2))
		res.redirect('/')
	}
};

module.exports = controller;