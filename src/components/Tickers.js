import React, { Component } from 'react';
import './Tickers.css';
import Cryptocurrency from './Cryptocurrency.js';
import axios from 'axios';

class Tickers extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [
                {
                    id: "bitcoin",
                    name:"Bitcoin",
                    symbol:"BTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "ethereum",
                    name: "Etherum",
                    symbol: "ETH",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",

                },
                {
                    id: "litecoin",
                    name: "Litecoin",
                    symbol: "LTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                }

            ]
        };

    }

    componentDidMount(){
        this.fetchCryptocurrencyData();
        this.interval = setInterval(() => this.fetchCryptocurrencyData(), 10*1000);
    }

    fetchCryptocurrencyData(){
        axios.get("https://api.coinmarketcap.com/v1/ticker/")
        .then(response => {
            var wanted = ["bitcoin", "ethereum", "litecoin"];
            var result = response.data.filter(currency => wanted.includes(currency.id));
            this.setState({ data: result});
        })
        .catch(err => console.log(err));
    }


    render(){
        var tickers = this.state.data.map((currency) =>
        // <li key= {currency.id}>
        //     <h3>{currency.id}</h3>
        //     <h4>{currency.price} USD</h4>
        // </li>
        <Cryptocurrency data = {currency} key={currency.id} />
        );

        return(
            <div className= "tickers-container">
                <ul className= "tickers">{tickers}</ul>
                <p>This Information gets updated after every 10 secs courtesy of coinmarketcap.com</p>
            </div>

        );
    }
}

export default Tickers;
