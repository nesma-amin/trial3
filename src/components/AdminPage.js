import React, { Component } from 'react'


class adminPage extends Component {
  constructor() {
    super();

    this.url = 'http://localhost:5001'
    this.loadHTMLTable = this.loadHTMLTable.bind(this);
    this.insertRowIntoTable =this.insertRowIntoTable.bind(this);
    this.handleRowEditDelet=this.handleRowEditDelet.bind(this);
    this.deleteRowById = this.deleteRowById.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    

  }
  state = {
    inputUser:'',
    selectedFile:'',
    logo:''

  }
  handleAddUser = (e) => {
    const text = e
    let input
    if(text){
      input=text.trimStart();
      // this.setState(() => ({inputUser: input}))
      this.setState({inputUser: input}, () => {
        console.log(this.state.inputUser, 'inputuser');
      });
     
    }
else{
    this.setState(() => ({
      inputUser:""
    }))
  }//else
  }
  handleLogin=()=>{
    //const user=this.inputUser
    console.log("data",this.state.inputUser)
    fetch(`${this.url}/insert`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username : this.state.inputUser})
        
    })
    .then(response => response.json())
    .then(data => this.insertRowIntoTable(data['data']));

   console.log("hereee");
  }

   insertRowIntoTable = (data) =>{
     console.log("entered")
    console.log("Data to be inserted",data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'registrationDate') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    // tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    // tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}
  
  loadHTMLTable=(data) =>{
    const table = document.querySelector('table tbody');
console.log("data",data)
if(data){
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ID,username, realName, registrationDate,nationalID,mobileNo,email,userCode,companyCode}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${username}</td>`;
        tableHtml += `<td>${realName}</td>`;
        tableHtml += `<td>${new Date(registrationDate).toLocaleString()}</td>`;
        tableHtml += `<td>${nationalID}</td>`;
        tableHtml += `<td>${mobileNo}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${userCode}</td>`;
        tableHtml += `<td>${companyCode}</td>`;

        tableHtml += `<td><button class="delete-row-btn" data-id=${ID}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${ID}>Edit</td>`;
        tableHtml += "</tr>";
    });
 

    table.innerHTML = tableHtml;
  }
}
  componentDidMount(){
  //   document.addEventListener('DOMContentLoaded',  ()=> {
  //   fetch(`${this.url}/getAll`)
  //   .then(response => response.json())
  //   .then(data => this.loadHTMLTable(data['data']));  
  // });
  }


 insertName =  ()=> {

  fetch(`${this.url}/insert`, {
      headers: {
          'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name : this.state.inputUser})
  })
  .then(response => response.json())
  .then(data => this.insertRowIntoTable(data['data']));
}
 deleteRowById=(id) =>{
   console.log("ID",id)
  fetch(`${this.url}/delete/` + id, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          window.location.reload();
      }
  });
}

 handleEditRow=(id) =>{
  const updateSection = document.querySelector('#update-row');
  updateSection.hidden = false;
  document.querySelector('#update-name-input').dataset.id = id;
}
handleUpdateRow =(event)=> {
  const updateNameInput = document.querySelector('#update-name-input');


  console.log("eventttttt",event);

  fetch(`${this.url}/update`, {
      method: 'PATCH',
      headers: {
          'Content-type' : 'application/json'
      },
      body: JSON.stringify({
          id: updateNameInput.dataset.id,
          name: updateNameInput.value
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          window.location.reload();
      }
  })
}
handleRowEditDelet=(event)=>{
  console.log("table event",event)
  console.log("event.target.class",event.target.className)
  // document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
      console.log("call delet")
        this.deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        this.handleEditRow(event.target.dataset.id);
    }
// });
}
///Handle File Upload:
fileChangeHandler=(event)=>{
  this.setState(() => ({
    selectedFile: event.target.files[0]
  }))
}
////////////////////////////////File Upload//////////////////////////////////////////////
uploadFile=(event)=>{
  const formData = new FormData();
  console.log("selcted file", this.state.selectedFile)
  formData.append('upload_file1', this.state.selectedFile);

		fetch(
			`${this.url}/fileupload`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
        this.setState(() => ({
          logo: result.filename
        }))
				// console.log('Success:', result);
        // window.alert('Success:', result)
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

  render(){
  return (
<div className='center' >
<div>Welcome to Database test</div>

{/* <form name="upload_form" enctype="multipart/form-data" action="php-files-upload-save-mysql.php" method="POST"> */}
<form name= "upload_form">
	<fieldset>
		<legend>Files Save into MySQL database using PHP</legend>
		<section>
			<label>Browse a file</label>
			<label>
				<input type="file" name="upload_file1" id="upload_file1" readOnly={true} 
        onChange={(event) => this.fileChangeHandler(event)}/>
			</label>
			<div id="moreFileUpload"></div>
			{/* <div style="clear:both;"></div>
			<div id="moreFileUploadLink" style="display:none;margin-left: 10px;"> */}
      <div id="moreFileUploadLink" >
			</div>
      <label>{this.state.logo}</label>
      <img src={this.state.logo} alt="Logo" />
      <input type="submit" name="upload" value="Upload" onClick={this.uploadFile}/>
		</section>
	</fieldset>
	<div>&nbsp;</div>
</form>
<div>
  <br></br>
    <label>Name</label>
   
    <input type="text" id="inputName"
    onChange={(event) => this.handleAddUser(event.target.value)}/>
    </div>
    <br></br>
    <button className='center'
    onClick={this.insertName}
    >Add Name</button>
    <button 
     className='btn'
     type='submit'
     onClick={this.handleLogin}
     >LogIn</button>

      <table id="table">
            <thead>
                 <th>ID</th>
                <th>username</th>
                <th>actualName</th>
                <th>Date Added</th>
                <th>nationalID</th>
                <th>mobileNo</th>
                <th>email</th>
                <th>userCode</th>
                <th>companyCode</th>
            </thead>
            <tbody
            onClick={(event) =>this.handleRowEditDelet(event)}
            >
            </tbody>
        </table>
        <section hidden id="update-row">
            <label>Name:</label>
            <input type="text" id="update-name-input"/>
            <button id="update-row-btn"
            onClick={(event) =>this.handleUpdateRow(event)}
            >Update</button>
        </section>
       
    </div>
  );
}
}

export default adminPage;
    