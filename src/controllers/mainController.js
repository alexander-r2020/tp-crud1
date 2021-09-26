const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	

	index: (req, res) => {
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let visitado = products.filter(e=> e.category === "visited");
		let ofert = products.filter(e=> e.category === "in-sale");

		res.render('index',{visitado,ofert,toThousand})
	},
	search: (req, res) => {
		const search = req.query.keywords.trim()
		if(search !==''){
			const result = products.filter(e=> e.name.toLowerCase().includes(search.toLowerCase()) )
			res.render('results',{result,toThousand,search})
		}else{
			res.redirect('/')
		}

	},
};

module.exports = controller;
