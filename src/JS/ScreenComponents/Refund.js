/*
Created by Oualid Faouzi for Visualisation & Application
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
Link to the QR code:
https://duckduckgo.com/?q=qr+code+%7B%22sender%22%3A+%22IKEA+BV%22%2C+%22invoice_no
%22%3A+%222020000042%22%2C+%22description%22%3A+%22Kallax%22%2C+%22
amount%22%3A+59.95%2C+%22vat%22%3A+%5B+%7B+%22rate%22%3A+21%2C+%22
amount%22%3A+10.4+%7D+%5D+%7D&t=h_&ia=answer

NOTE: Session storage is used to store sensitive information about the user.
Session storage was NOT designed to be used as a secured storage mechanism in a browser.
If an attacker runs Javascript, they can retrieve all the data stored in the sessionstorage
and send it off to their own domain. This issue can be solved by integrating a database to store the data.
*/
import React, {
	Component
} from 'react';
import '../decimalNotationRegEx.js' //This import is used to truncate decimal numbers to decimal places.
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
		refundPercentage: 0,
		refundAmount: 0
	}
	//This function is called when the QR code scanner succesfully scanned.
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
	//This function is called when the QR code scanner returns an error. Error will be logged in console for development.
	handleError = err => {
		console.error(err)
	}

	//This function uses jquery to loop through all div elements and empty their contents. (div className = myResults)
	clearDataView = () => {
		this.setState({
			result: 'No result',
			refundPercentage: 0,
			refundAmount: 0
		})
		var len = this.state.idList.length;
		var id;

		for (var i = 0; i < len; i++) {
			id = this.state.idList[i];
			$('#' + id).empty();
		}
		document.getElementById("confirmationLayout").style.display = "none";
	}

	//This function gets called when the user clicks on the confirm button and they want to refund the product.
	confirmInvoice = () => {
		//If refund percentage is a valid input, confirm
		if (this.state.refundPercentage >= 1 && this.state.refundPercentage <= 100) {
			this.state.result.refundPercentage = parseInt(this.state.refundPercentage);
			this.state.result.refundAmount = parseFloat(this.state.refundAmount);

			var numOfInvoices = sessionStorage.getItem("numOfInvoicesRegistered");
			numOfInvoices++;

			sessionStorage.setItem("obj" + numOfInvoices, JSON.stringify(this.state.result));

			sessionStorage.setItem("numOfInvoicesRegistered", numOfInvoices);

			this.clearDataView();
			document.getElementById("loaderView").style.display = "block";
			//Timeout is used to wait 4 seconds and display the custom css loading indicator
			setTimeout(function(){
				document.getElementById("loaderView").style.display = "none";
				document.getElementById("okButton").style.display = "block";
				document.getElementById("confirmationAlert").style.display = "block";
			}, 4000);
		//Else, give the user feedback and give the option to try it again
		} else {
			this.clearDataView();
			document.getElementById("tryAgainButton").style.display = "block";
			document.getElementById("inputAlert").style.display = "block";
		}
	}

	//Function called when the user presses the cancel button.
	cancelInvoice = () => {
		this.clearDataView();
		document.getElementById("tryAgainButton").style.display = "block";
		document.getElementById("cancelAlert").style.display = "block";
	}

	//Function called to reset all elements to their original state.
	resetView = () => {
		this.clearDataView();
		document.getElementById("tryAgainButton").style.display = "none";
		document.getElementById("okButton").style.display = "none";
		document.getElementById("qrCanvas").style.display = "block";
		document.getElementById("inputAlert").style.display = "none";
		document.getElementById("cancelAlert").style.display = "none";
		document.getElementById("confirmationAlert").style.display = "none";
		document.getElementById("loaderView").style.display = "none";
	}

	//This function is called when the user changes the input value of the refund percentage, it also gives an updated refund amount to give the user feedback.
	handleChange = (e) => {
		this.setState({
			refundPercentage: e.target.value
		})
		var percentageValue = document.getElementById("inputRefundPercentage").value;
		if(percentageValue >= 1 && percentageValue <= 100) {
			var initialPrice = parseFloat(this.state.result.amount);
			var refundMultiplier = parseFloat((percentageValue / 100.0));
			var currentRefundAmount = (initialPrice * refundMultiplier);
			currentRefundAmount = currentRefundAmount.toFixedDown(2);
			document.getElementById("refundPrice").innerHTML = "Price to be refunded: " + currentRefundAmount + " EUR";
			this.setState({
				refundAmount: currentRefundAmount
			})
		} else {
			document.getElementById("refundPrice").innerHTML = "Please enter a valid percentage value. (1 up to 100)";
		}
	}

	render() {
		var scanDelay = 300;
		return (
			<div>
				<div id="loaderView">
					<p id="loaderMessage">Saving invoice data...</p>
					<div className="loader"></div>
				</div>
				<div className="qrCodeWindow" id="qrCanvas">
					<QrReader delay={scanDelay} onError={this.handleError} onScan={this.handleScan}/>
					<p>Use the camera of your device and scan the QR code.</p>
				</div>
				<div className="myResults">
					<div id="sender"></div>
					<div id="invoiceNo"></div>
					<div id="description"></div>
					<div id="price"></div>
					<div id="vatRate"></div>
					<div id="vatAmount"></div>
				</div>
				<div id="confirmationLayout">
					<form>
						<div className="form-group">
							<label>Specify the percentage of the invoice amount to be refunded (including VAT)</label>
							<input type="number" className="form-control" id="inputRefundPercentage" value={this.state.refundPercentage} onChange={this.handleChange}/>
						</div>
					</form>
					<p id="refundPrice">Please enter a valid percentage value. (1 up to 100)</p>
					<p>Do you want to refund this product?</p>
					<button type="button" className="btn btn-primary btn-lg" onClick={this.confirmInvoice}>Confirm</button>
					<button type="button" className="btn btn-secondary btn-lg" onClick={this.cancelInvoice}>Cancel</button>
				</div>
				<div className="alert alert-success" id="confirmationAlert" role="alert">
					You have successfully registered this invoice to be refunded!
				</div>
				<div className="alert alert-danger" id="cancelAlert" role="alert">
					You have canceled the registration.
				</div>
				<div className="alert alert-warning" id="inputAlert" role="alert">
					Invalid percentage value, please enter a valid percentage value (1 up to 100).
				</div>
				<div id="tryAgainButton">
					<button type="button" className="btn btn-primary btn-lg" onClick={this.resetView}>Try again</button>
				</div>
				<div id="okButton">
					<button type="button" className="btn btn-primary btn-lg" onClick={this.resetView}>Okay</button>
				</div>
			</div>
		)
	}
}

export default Refund;