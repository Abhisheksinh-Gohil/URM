import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../Card/Card'
import ChatsCard from '../../ChatsCard/ChatsCard'
import './AdminDashboardComponent.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function AdminDashboardComponent() {

  const [urmData, setUrmData] = useState([{}]);
  const [recData, setRecData] = useState([{}]);
  const [allUserData, setAllUserData] = useState([{}]);
  const [chatData, setChatData] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [email, setEmail] = useState(userData.email);

  const [recSeries, setRecSeries] = useState([{}]);
  const [urmSeries, setUrmSeries] = useState([{}]);
  const [recOptions, setRecOptions] = useState({});
  const [urmOptions, setUrmOptions] = useState({});

  const [obj, setObj] = useState([{}]);

  const getAllUsers = () => {
    axios.get("https://aag0621.uta.cloud/wdmBackend/adminGetAllUsers.php").then((res) => {
      setAllUserData(res.data);
    })
  }

  const getAllURMData = () => {
    axios.get("https://aag0621.uta.cloud/wdmBackend/adminCandidateInfo.php").then((res) => {
      setUrmData(res.data);
      const tempSeries = res.data.map((data) => {
        setUrmSeries([...recSeries, { name: data.firstName, y: parseInt(data.totalApplications) }]);
        return { name: data.firstName, y: parseInt(data.totalApplications) }
      })
      setUrmOptions({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'URM candidate and applications',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y}'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: tempSeries
        }]
      })
    })
  }

  const getAllJobs = () => {
    axios.post('https://aag0621.uta.cloud/wdmBackend/candidateNotAppliedJob.php', {
      email,
    }).then(response => {
        setObj(response.data);
      })
      .catch(error => {
        console.error('Error fetching all job posts:', error);
      });
  }

  const getAllRecruiterData = () => {
    axios.get("https://aag0621.uta.cloud/wdmBackend/adminRecruiterInfo.php").then((res) => {
      setRecData(res.data);
      const tempSeries = res.data.map((data) => {
        setRecSeries([...recSeries, { name: data.firstName, y: parseInt(data.totalApplications) }]);
        return { name: data.firstName, y: parseInt(data.totalApplications) }
      })
      setRecOptions({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Recruiter and job posts',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y}'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: tempSeries
        }]
      })
    })
  }

  const getChatList = () => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/getAllChatList.php", { email }).then((res) => {
      setChatData(res.data);
    })
  }

  useEffect(() => {
    getAllURMData();
    getAllRecruiterData();
    getAllUsers();
    getChatList();
    getAllJobs();
  }, [])

  const approveUser = (user) => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/adminVerifyUsers.php", {email: user}).then((res)=> {
      console.log("user:", res.data);
      getAllUsers();
    })
  }

  const rejectUser = (user) => {
    axios.post("https://aag0621.uta.cloud/wdmBackend/adminRejectsUsers.php", {email: user}).then((res)=> {
      console.log("user:", res.data);
      getAllUsers();
    })
  }

  let keys = Object.keys(allUserData[0])
  let urmKeys = Object.keys(urmData[0])
  let recKeys = Object.keys(recData[0])
  keys = [...keys, "", ""]
  return (
    <div className='body'>
      <div className='admin-table-card'>
        <div>
          <b>All Users: </b>
        </div>
        <div>
          <table className='tbl'>
            <tr>
              {
                keys.map((key) => {
                  return <th className='t-head'>{key}</th>
                })
              }
            </tr>

            {
              allUserData.map((row) => {
                return (
                  <tr>
                    {
                      keys.map((key, index) => {
                        if (key === "") {
                          if (index === keys.length - 1) {
                            return <td className='t-data-wo-border'><img src='delete.png' alt='' width={30} onClick={()=> rejectUser(row.email)}/></td>
                          }
                          return <td className='t-data-wo-border'><button className='approve-btn' onClick={()=> approveUser(row.email)}>Approve</button></td>

                        }
                        return <td className='t-data'>{row[key]}</td>
                      })
                    }
                  </tr>
                )
              })
            }
          </table>
        </div>

      </div>

      <div className='postings'>
        All Job Postings:
      </div>
      <div className='postings'>
        {obj && obj.map((arr, index) => {
          return <Card 
          title={arr.title}
          description={arr.description}
          date= {arr.datePosted}
          />
        })
        }
      </div>

      <div className='two-table-row'>
        <div className='admin-table-card'>
          <div>
            <b>URM candidate and applications: </b>
          </div>
          <div>
            <table className='tbl-half'>
              <tr>
                {
                  urmKeys.map((key) => {
                    return <th className='t-head'>{key}</th>
                  })
                }
              </tr>
              {
                urmData.map((row) => {
                  return (
                    <tr>
                      {
                        urmKeys.map((key) => {
                          return <td className='t-data'>{row[key]}</td>
                        })
                      }
                    </tr>
                  )
                })
              }
            </table>
            <HighchartsReact
              highcharts={Highcharts}
              options={urmOptions}
            />
          </div>
        </div>
        <div className='admin-table-card'>
          <div>
            <b>Recruiter and job posts:</b>
          </div>
          <div>
            <table className='tbl-half'>
              <tr>
                {
                  recKeys.map((key) => {
                    return <th className='t-head'>{key}</th>
                  })
                }
              </tr>
              {
                recData.map((row) => {
                  return (
                    <tr>
                      {
                        recKeys.map((key) => {
                          return <td className='t-data'>{row[key]}</td>
                        })
                      }
                    </tr>
                  )
                })
              }
            </table>
            <HighchartsReact
              highcharts={Highcharts}
              options={recOptions}
            />
          </div>
        </div>
      </div>
      <div className='table-div'>
        <ChatsCard data={chatData} />
      </div>
    </div>
  )
}
