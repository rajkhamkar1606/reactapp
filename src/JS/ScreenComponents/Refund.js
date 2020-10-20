/*
Created by Oualid Faouzi
This component is responsible for the QR code scanning function.
Link to the QR scanner package:
https://www.npmjs.com/package/react-qr-reader

NOTE: If the QR code JSON format differs from the following example processing the data will fail.
Example:
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
import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../../CSS/Refund.css';

class Refund extends Component {
	state = {
    	result: 'No result',
    	idList: [
      		"sender",
      		"invoiceNo",
      		"description",
      		"price",
      		"vatRate",
      		"vatAmount"
      	]
  	}

	handleScan = data => {
		if (data && this.state.result === 'No result') {
	    	this.setState({
	   			result: JSON.parse(data)
	      	})

      	//Reminder: find solution to static parsing to make the product scalable.
      	var sender = JSON.stringify(this.state.result.sender).replace(/\"/g, "");
      	var invoiceNo = JSON.stringify(this.state.result.invoice_no).replace(/\"/g, "");
      	var description = JSON.stringify(this.state.result.description).replace(/\"/g, "");
      	var totalPrice = JSON.stringify(this.state.result.amount);
      	var vatRate = JSON.stringify(this.state.result.vat[0].rate);
      	var vatAmount = JSON.stringify(this.state.result.vat[0].amount);

      	var nodes = new Array(6);
      	var textNodes = new Array(6);
      	var len = undefined;

      	len = nodes.length;

		for (var i = 0; i < len; i++)
			nodes[i] = document.createElement("p");

		//Reminder: find solution to static parsing to make the product scalable.
      	textNodes[0] = document.createTextNode("Sender: " + sender);
		textNodes[1] = document.createTextNode("Invoice number: " + invoiceNo);
		textNodes[2] = document.createTextNode("Product description: " + description);
		textNodes[3] = document.createTextNode("Total price: " + totalPrice + " EUR");
	    textNodes[4] = document.createTextNode("VAT rate: " + vatRate + "%");
		textNodes[5] = document.createTextNode("VAT amount: " + vatAmount + " EUR");

		len = textNodes.length;

		for (var j = 0; j < len; j++)
			nodes[j].appendChild(textNodes[j]);

		len = this.state.idList.length;

		for (var k = 0; k < len; k++)
			document.getElementById(this.state.idList[k]).appendChild(nodes[k]);

		document.getElementById("buttonLayout").style.display = "block";
	    }
	}

	handleError = err => {
		console.error(err)
	}


	confirmInvoice = () => {
		//Implement data storage
		return;
	}

	cancelInvoice = () => {
		this.setState({
	   		result: 'No result'
	    })
        var len = this.state.idList.length;
        var id = undefined;
	    for (var i = 0; i < len; i++) {
	    	id = this.state.idList[i];
			$('#' + id).empty();
		}
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
	    		<div id="buttonLayout">
	    			<button type="button" class="btn btn-primary btn-lg" onClick={this.confirmInvoice}>Confirm</button>
					<button type="button" class="btn btn-secondary btn-lg" onClick={this.cancelInvoice}>Cancel</button>
				</div>
	    	</div>
		)
	}
}

export default Refund;