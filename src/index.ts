import express from 'express';

import { didWeWin } from './service';

/**
 * The root of the Express application
 */
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', didWeWin);

app.listen(app.get('port'), () => { });
