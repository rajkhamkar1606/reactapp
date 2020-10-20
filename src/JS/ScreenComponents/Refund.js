/*
Created by Oualid Faouzi
This component is responsible for the QR code scanning function.
Link to the QR scanner package:
https://www.npmjs.com/package/react-qr-reader
*/

import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import '../../CSS/Refund.css'

/* JSON Example

{
   "sender":"IKEA BV",
   "invoice_no":"2020000042",
   "description":"Kallax",
   "amount":59.95,
   "vat":[
      {
         "rate":21,
         "amount":10.4
      }
   ]
}

*/

class Refund extends Component {
	state = {
    	result: 'No result'
  	}

	handleScan = data => {
		if (data && this.state.result === 'No result') {
	    	this.setState({
	   			result: 'result found'

	      	})
	      	var dataParse = JSON.parse(data);
	      	var nodes = new Array(6);
	      	var textNodes = new Array(6);
	      	var idList = [
	      		"sender",
	      		"invoiceNo",
	      		"description",
	      		"price",
	      		"vatRate",
	      		"vatAmount"
	      	]
	      	var len = undefined;

	      	len = nodes.length;

			for (var i = 0; i < len; i++)
    			nodes[i] = document.createElement("p");

	      	textNodes[0] = document.createTextNode("Sender: " + JSON.stringify(dataParse.sender).replace(/\"/g, ""));
			textNodes[1] = document.createTextNode("Invoice number: " + JSON.stringify(dataParse.invoice_no).replace(/\"/g, ""));
			textNodes[2] = document.createTextNode("Product description: " + JSON.stringify(dataParse.description).replace(/\"/g, ""));
			textNodes[3] = document.createTextNode("Total price: " + JSON.stringify(dataParse.amount) + " EUR");
		    textNodes[4] = document.createTextNode("VAT rate: " + JSON.stringify(dataParse.vat[0].rate) + "%");
			textNodes[5] = document.createTextNode("VAT amount: " + JSON.stringify(dataParse.vat[0].amount) + " EUR");

			len = textNodes.length;

			for (var j = 0; j < len; j++)
    			nodes[j].appendChild(textNodes[j]);

    		len = idList.length;

    		for (var k = 0; k < len; k++)
    			document.getElementById(idList[k]).appendChild(nodes[k]);
	    }
	}

	handleError = err => {
		console.error(err)
	}

	render() {
		var scanDelay = 300;
		return (
	  		<div>
	  			<div className="qrCodeWindow" id="qrCanvas">
	    			<QrReader delay={scanDelay} onError={this.handleError} onScan={this.handleScan}/>
	    		</div>
	    		<div className="myResults">
	    			<div id="sender">
	    			</div>
	    			<div id="invoiceNo">
	    			</div>
	    			<div id="description">
	    			</div>
	    			<div id="price">
	    			</div>
	    			<div id="vatRate">
	    			</div>
	    			<div id="vatAmount">
	    			</div>
	    		</div>
	    	</div>
		)
	}

}

export default Refund;