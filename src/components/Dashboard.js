import React, { Component } from 'react'


class Dashboard extends Component {

    constructor() {
        super();
    
        this.url = 'http://localhost:5001'
    }
    componentDidMount(){
          document.addEventListener('DOMContentLoaded',  ()=> {
          fetch(`${this.url}/getEmployeeProjects`)
          .then(response => response.json())
          .then(data => this.loadHTMLTree(data['data']))
        });
        }
        /////Present data in unordered list
        loadHTMLTree=(data) =>{
            const list = document.getElementById('userProjects');
            console.log("list",list)

            console.log("data",data)
            if(data){
                if (data.length === 0) {
                    // list.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
                    return;
                }
            }
            let listHtml = "";
            // const projectArray=Object.entries(data.projects)
            data.userProjects.map(function (project) {
                console.log("project",project)
                listHtml += `<li>${project.project_name}</li>`;
                console.log("listHtml",listHtml)

                // this.loadprojectHTMLTree(project.templates)              
            });

            data.userProjects.map(function(project){
                listHtml += `<li>${project.project_name}</li>`;
                data.projectTemplates.map(function(template){
                    console.log("template",template)
                    console.log("project",project)
                    if(project.project_unique_name === template.project_name)
                    {
                        console.log("template.project_name",template.project_name)
                        console.log("project.project_unique_name",project.project_unique_name)
                        data.templatesName.map(function(temp_name){
                            console.log("temp_name",temp_name)

                            listHtml += `<ul>`;
                            if(template.temp_id===temp_name[0].template_id)
                            {

                                listHtml += `<li>${temp_name[0].template_name}</li>`;


                            }
                        })   
                        listHtml += `</ul>`;
                    }
                }) 
            })

            console.log("listHtml",listHtml)
            list.innerHTML=listHtml
      }
      loadprojectHTMLTree=(templates)=>{
        let listHtml = "";
        templates.forEach(function ({template}) {
            listHtml += `<li>${template}</li>`;
           
        });
        return <ul>{listHtml}</ul>           

      }
        
        
    render(){
        return (
            <div className='center' >
<div >Welcome to Dashboard</div>
<ul id="userProjects">UserProject</ul>
<div ></div>
</div>
            );
        }
        }
        
export default Dashboard;