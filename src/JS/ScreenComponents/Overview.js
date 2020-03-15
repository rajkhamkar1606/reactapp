/*
Created by Oualid Faouzi
This component is responsible for rendering the overview of the registered invoice data.

NOTE: Session storage is used to store sensitive information about the user.
Session storage was NOT designed to be used as a secured storage mechanism in a browser.
If an attacker runs Javascript, they can retrieve all the data stored in the sessionstorage
and send it off to their own domain. This issue can be solved by integrating a database to store the data.

//<li class="list-group-item">Cras justo odio</li>
*/
import React, {
	Component
} from 'react'
import '../../CSS/Overview.css'

class Overview extends Component {

	componentDidMount() {
		var numOfInvoices = sessionStorage.getItem("numOfInvoicesRegistered");
		if (numOfInvoices != 0) {
			var invoiceData = new Array(numOfInvoices);
			var invoiceKey = 1;
			for (var i = 0; i < numOfInvoices; i++) {
				invoiceData[i] = JSON.parse(sessionStorage.getItem("obj" + (invoiceKey).toString()));
				invoiceKey++;
			}

			var node;
			var textnode;

			for (var j = 0; j < numOfInvoices; j++) {
				node = document.createElement("a");
				node.setAttribute("class", "list-group-item list-group-item-action");
				node.onclick = this.handleView;
				textnode = document.createTextNode("Invoice Number: " + invoiceData[j].invoice_no + " - Description: " + invoiceData[j].description);
				node.appendChild(textnode);
				document.getElementById("invoiceList").appendChild(node);
			}
		} else {
			console.log("No invoices registered.")
		}
	}

	handleView = () => {
		console.log("item list clicked.")
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