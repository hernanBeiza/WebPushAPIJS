const { red, blue, yellow, cyan, green } = require("colorette")

var index = require("../daos/IndexDAO");

function saludar(req,res) {
	res.json({
		mensaje:index.mensaje()
	});
}

module.exports = {
	saludar:saludar,
};
