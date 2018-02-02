const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const useragent = require('express-useragent');

const app = express();


// Static Folder Path Middleware
app.use(express.static(path.join(__dirname, 'public')));


// UserAgent Middleware
app.use(useragent.express());


// Handlebars Middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');




// Index Route
app.get('/api/whoami/', (req, res) => {
	const ipaddress = req.ip;
	const language = req.acceptsLanguages();
	const os = req.useragent.source;
	const result = { ipaddress: ipaddress, language: language[0], software: os.slice(13, 40) };
	const finalResult = res.json(result);
});



const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});