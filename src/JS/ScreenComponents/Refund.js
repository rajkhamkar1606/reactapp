/*
Created by Oualid Faouzi
This component is responsible for the QR code scanning function.
Link to the QR scanner package:
https://www.npmjs.com/package/react-qr-reader

Example of QR code data in JSON:

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

NOTE: Session storage is used to store sensitive information about the user.
Session storage was NOT designed to be used as a secured storage mechanism in a browser.
If an attacker runs Javascript, they can retrieve all the data stored in the sessionstorage
and send it off to their own domain. This issue can be solved by integrating a database to store the data.
*/
import React, {
	Component
} from 'react';
import QrReader from 'react-qr-reader';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
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
		],
		refundPercentage: 0
	}

	handleScan = data => {
		if (data && this.state.result === 'No result') {
			this.setState({
				result: JSON.parse(data)
			})

			//Reminder: find solution to static parsing to make the product scalable.
			var sender = JSON.stringify(this.state.result.sender).replace(/"/g, "");
			var invoiceNo = JSON.stringify(this.state.result.invoice_no).replace(/"/g, "");
			var description = JSON.stringify(this.state.result.description).replace(/"/g, "");
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

			document.getElementById("qrCanvas").style.display = "none";
			document.getElementById("confirmationLayout").style.display = "block";
		}
	}

	handleError = err => {
		console.error(err)
	}

	clearDataView = () => {
		this.setState({
			result: 'No result',
			refundPercentage: 0
		})
		var len = this.state.idList.length;
		var id;

		for (var i = 0; i < len; i++) {
			id = this.state.idList[i];
			$('#' + id).empty();
		}

		document.getElementById("qrCanvas").style.display = "block";
		document.getElementById("confirmationLayout").style.display = "none";
	}

	confirmInvoice = () => {
		console.log(this.state.refundPercentage);
		if (this.state.refundPercentage > 0 && this.state.refundPercentage <= 100) {
			this.state.result.refundPercentage = parseInt(this.state.refundPercentage);

			var numOfInvoices = sessionStorage.getItem("numOfInvoicesRegistered");
			numOfInvoices++;

			sessionStorage.setItem("obj" + numOfInvoices, JSON.stringify(this.state.result));

			sessionStorage.setItem("numOfInvoicesRegistered", numOfInvoices);

			console.log(sessionStorage.getItem("obj1"));

			//ADD FEEDBACK FOR THE USER
			this.clearDataView();
		} else {
			console.log("invalid percentage input.");
			//ADD FEEDBACK FOR THE USER
			this.clearDataView();
		}
	}

	cancelInvoice = () => {
		//ADD FEEDBACK FOR THE USER
		this.clearDataView();
	}

	handleChange = (e) => {
		this.setState({
			refundPercentage: e.target.value
		})
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
				<div id="confirmationLayout">
					<form>
						<div className="form-group">
							<label>Specify the percentage of the invoice amount to be refunded (including VAT)</label>
							<input type="number" className="form-control" id="inputRefundPercentage" value={this.state.refundPercentage} onChange={this.handleChange}/>
						</div>
					</form>
					<p>Do you want to refund this product?</p>
					<button type="button" className="btn btn-primary btn-lg" onClick={this.confirmInvoice}>Confirm</button>
					<button type="button" className="btn btn-secondary btn-lg" onClick={this.cancelInvoice}>Cancel</button>
				</div>
			</div>
		)
	}
}

export default Refund;