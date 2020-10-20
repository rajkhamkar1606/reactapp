/*
Created by Oualid Faouzi
This component is responsible for rendering the overview of the registered invoice data.

NOTE: Session storage is used to store sensitive information about the user.
Session storage was NOT designed to be used as a secured storage mechanism in a browser.
If an attacker runs Javascript, they can retrieve all the data stored in the sessionstorage
and send it off to their own domain. This issue can be solved by integrating a database to store the data.
*/

import React, {
	Component
} from 'react'
import '../../CSS/Overview.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'

class Overview extends Component {
	componentDidMount() {
		var numOfInvoices = sessionStorage.getItem("numOfInvoicesRegistered");
		var buttonNode;
		var textNode;
		if (numOfInvoices != 0) {
			document.getElementById("infoMessage").style.display = "block";
			var invoiceData = new Array(numOfInvoices);
			var invoiceKey = 1;
			for (var i = 0; i < numOfInvoices; i++) {
				invoiceData[i] = JSON.parse(sessionStorage.getItem("obj" + (invoiceKey).toString()));
				invoiceKey++;
			}
			for (var j = 0; j < numOfInvoices; j++) {
				buttonNode = document.createElement("button");
				buttonNode.setAttribute("class", "list-group-item list-group-item-action");
				buttonNode.setAttribute("id", "button" + j);
				buttonNode.onclick = (function(objNum, numOfInvoices){
	     			return function() {
		        		document.getElementById("obj" + objNum + "view").style.display = "block";
		        		document.getElementById("goBackButton").style.display = "block";
		        		document.getElementById("infoMessage").style.display = "none";
		        		for(var i = 0; i < numOfInvoices; i++) {
		        				document.getElementById("button" + i).style.display = "none";
		        		}
	     			}
  				})(j, numOfInvoices);
  				textNode = document.createTextNode("Invoice Number: " + invoiceData[j].invoice_no + " - Description: " + invoiceData[j].description);
				buttonNode.appendChild(textNode);
				document.getElementById("invoiceList").appendChild(buttonNode);

				var innerNode;

				innerNode = document.createElement("div");
				innerNode.setAttribute("class", "card card-body");
				innerNode.setAttribute("id", "obj" + j + "view");
				innerNode.setAttribute("style", "display: none;");

				textNode = document.createTextNode("Invoice Number: " + invoiceData[j].invoice_no);
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("Description: " + invoiceData[j].description);
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("Sender: " + invoiceData[j].sender);
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("Total cost (VAT included): " + invoiceData[j].amount + " EUR");
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("VAT rate: " + invoiceData[j].vat[0].rate + "%");
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("VAT: " + invoiceData[j].vat[0].amount + " EUR")
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("Total refund: " + invoiceData[j].refundAmount + " EUR");
				innerNode.appendChild(textNode);

				document.getElementById("invoiceList").appendChild(innerNode);
			}
		} else {
			var node;
			var textNode;
			node = document.createElement("p");
			node.setAttribute("id", "emptyMessage");
			textNode = document.createTextNode("No invoices registered.");
			node.appendChild(textNode);
			document.getElementById("invoiceView").appendChild(node);
		}
		buttonNode = document.createElement("button");
		buttonNode.setAttribute("class", "btn btn-secondary btn-lg");
		buttonNode.setAttribute("id", "goBackButton");
		buttonNode.setAttribute("style", "display: none;");
		buttonNode.onclick = (function(numOfInvoices){
 			return function() {
	    		document.getElementById("goBackButton").style.display = "none";
	    		document.getElementById("infoMessage").style.display = "block";
	    		for(var i = 0; i < numOfInvoices; i++) {
	    			document.getElementById("obj" + i + "view").style.display = "none";
	    			document.getElementById("button" + i).style.display = "block";
	    		}
 			}
  		})(numOfInvoices);
		buttonNode.innerHTML = "Go Back";
		document.getElementById("invoiceList").appendChild(buttonNode);
	}

	breakLine = node => {
		var breakTag;
		for (var i = 0; i < 2; i++) {
			breakTag = document.createElement("br");
			node.appendChild(breakTag);
		};
	}

	render(){
		return (
			<div>
				<h2>Overview</h2>
				<p id="infoMessage">Click an item in the list for more information</p>
				<div id="invoiceView">
					<div className="list-group" id="invoiceList">
					</div>
				</div>
			</div>
		)
	}
}

export default Overview;