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

	breakLine = node => {
		var breakTag;
		for (var i = 0; i < 2; i++) {
			breakTag = document.createElement("br");
			node.appendChild(breakTag);
		};
	}

	componentDidMount() {
		var numOfInvoices = sessionStorage.getItem("numOfInvoicesRegistered");
		if (numOfInvoices != 0) {
			var invoiceData = new Array(numOfInvoices);
			var invoiceKey = 1;
			for (var i = 0; i < numOfInvoices; i++) {
				invoiceData[i] = JSON.parse(sessionStorage.getItem("obj" + (invoiceKey).toString()));
				invoiceKey++;
			}

			var linkNode;
			var itemNode;
			var innerNode;
			var textNode;

			for (var j = 0; j < numOfInvoices; j++) {
				linkNode = document.createElement("a");
				linkNode.setAttribute("class", "list-group-item list-group-item-action");
				linkNode.setAttribute("data-toggle", "collapse");
				linkNode.setAttribute("href", "#collapseListItem" + j.toString());
				linkNode.setAttribute("role", "button");
				linkNode.setAttribute("aria-expanded", "false");
				linkNode.setAttribute("aria-controls", "collapseListItem" + j.toString());
				textNode = document.createTextNode("Invoice Number: " + invoiceData[j].invoice_no + " - Description: " + invoiceData[j].description);
				linkNode.appendChild(textNode);
				document.getElementById("invoiceList").appendChild(linkNode);

				itemNode = document.createElement("div");
				itemNode.setAttribute("class", "collapse");
				itemNode.setAttribute("id", "collapseListItem" + j.toString());
				linkNode.appendChild(itemNode);

				innerNode = document.createElement("div");
				innerNode.setAttribute("class", "card card-body");

				textNode = document.createTextNode("Sender: " + invoiceData[j].sender)
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("Total cost (VAT included): " + invoiceData[j].amount + " EUR")
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("VAT rate: " + invoiceData[j].vat[0].rate + "%")
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("VAT: " + invoiceData[j].vat[0].amount + " EUR")
				innerNode.appendChild(textNode);

				this.breakLine(innerNode);

				textNode = document.createTextNode("Total refund: " + invoiceData[j].refundAmount + " EUR")
				innerNode.appendChild(textNode);

				itemNode.appendChild(innerNode);
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
	}

	render(){
		return (
			<div>
				<h2>Overview</h2>
				<div id="invoiceView">
					<div className="list-group" id="invoiceList">
					</div>
				</div>
			</div>
		)
	}
}

export default Overview;