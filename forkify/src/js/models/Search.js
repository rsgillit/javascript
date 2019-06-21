import axios from 'axios';
import * as config from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        try {
            //const key = '6a9e05d0add015d0b2da6cfa0ec44ae9';

            //const query = 'chicken%20breast'
            const url = `https://www.food2fork.com/api/search?key=${config.key}&q=${this.query}`;
            console.log(url);
            const res = await axios.get(url);
            this.result = res.data.recipes;
            console.log('this.result');
            console.log(this.result);
        } catch(err){
            console.log(err);
        }
    }
}