
import { Table ,Avatar} from 'antd';
import axios from "axios"
import React, { useState, useEffect  }from 'react';
import { Space , Input } from 'antd';
import { PieChartOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme , Button , Modal} from 'antd';
import { DeleteOutlined , EditOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Table', '1', <PieChartOutlined />),

];


function App() {  
  const[query,setQuery] = useState("");

  const [isEditing,setIsEditing]= useState(false);
  const [editingrow,setEditingrow]=useState(null);
  const[isInserting,setIsInserting]=useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setConatactnumber] = useState("");
  const [age  , setAge] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const { id } = useParams();



  const Deleteall  =async()=>{
    try {
      await axios.delete('/deleteall');
      window.location.reload()
    } catch (error) {
      console.log(error);
    }   

}
const getUserById = async () => {
  const response = await axios.get(`/get/${id}`);
  setFirstname(response.data.name);
  setLastname(response.data.lastName);
  setEmail(response.data.email);
  setConatactnumber(response.data.contactNumber);
  setAge(response.data.age);
  setDob(response.data.dob);
  setSalary(response.data.salary);
  setAddress(response.data.address);

};

useEffect(() => {
  getUserById();
}, []);

  const Add  =async()=>{
    try {
      await axios.get(`/get`);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }   

}
const navigate = useNavigate();

  const onInsert = async(e)=>{
    e.preventDefault();
    var data = {
             address:address,
             salary:salary,
             dob:dob,
             contactNumber:contactNumber,
             lastName:lastName,
             firstName:firstName,
             age:age,
             email:email
            }
     navigate('/app')
     var url = '/create';
     axios.post(url,data)
      .then(response=>console.log(response))
      .catch(e=>console.log(e))
      window.location.reload()
  }
  const resetInsert = () => {
    setIsInserting(false);

  };
  const onEditrow =(record)=>{
    setIsEditing(true);
    setEditingrow({...record})
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingrow(null);
  };
  const updateUser = async (record) => {
    try {
      await axios.put(`/edit/${record.id}`, {
        firstName,
        lastName,
        email,
        contactNumber,
        age,
        dob,
        salary,
        address
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    
  };
  

  const Search = (dat) =>{
    return dat.filter((item) => item.firstName.toLowerCase().includes(query) || item.address.toLowerCase().includes(query)|| item.age.toString().includes(query) || item.lastName.toLowerCase().includes(query));
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  const columns = [

    {
      title: "imageUrl",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text, record) => {
        return (
          <div>
            {<Avatar src={record.imageUrl}style={{ width: '100%' ,height:'30%'}}/>}
          </div>
        );
      }
    },
    {
      
      title: 'FirstName',
      dataIndex: 'firstName',
      filters: [
        {
          text: 'J',
          value: 'J',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.firstName.includes(value),
      sorter: ((a, b) => (a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1)),
      width: '20%',


    },
    
   {   
    title: 'LastName',
    dataIndex: 'lastName',
    sorter: ((a, b) => (a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1)),
    width: '20%',



  },
  {   
    title: 'Email',
    dataIndex: 'email',
    

  },
 
  {   
    title: 'contactNumber',
    dataIndex: 'contactNumber',
    

  },


    {
      title: 'Age',
      dataIndex: 'age',
      sorter: ((a, b) => (a.age > b.age ? 1 : -1)),
    },
    {   
      title: 'date de naissance',
      dataIndex: 'dob',
      width: '20%',

    },
    {   
      title: 'salary',
      dataIndex: 'salary',
      sorter: ((a, b) => (a.salary > b.salary ? 1 : -1)),
  
    },
    

    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'Address1',
          value: 'Address1',
        },
        {
          text: 'Address2',
          value: 'Address2',
        },
        {   
      title: 'salary',
      dataIndex: 'salary',
      sorter: ((a, b) => (a.salary > b.salary ? 1 : -1)),
  
    },
    
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: '20%',
    },
    { 
      
      render : (record) =>{
        return(
        <>
        <EditOutlined
              onClick={() => {
                onEditrow(record);
              }}
            />
        <DeleteOutlined onClick=  {()=>
        handleDelete(record)} style={{ color:"red"}}/>
        </>
      )
      },      width: '20%',

    },

  ];


 
    const handleDelete =async(record)=>{
      try {
        await axios.delete(`/delete/${record.id}`);
        
      } catch (error) {
        console.log(error);
      }
    Modal.confirm({
      title:"surreee ??",
      okText:"Yes",
      okType:"dang",
      onOk: ()=>{
        setTable((pre)=>{
          return pre.filter((person)=> person.id !== record.id);
        });
      }
    })
    
  };
  const onOpen = (e) => {
    setIsInserting(true);

  };  const Bouton = (record) =>{
    return(
      <>
  <Button type="primary"  onClick={(e) => {
    onOpen (e)}} block >
Ajouter
</Button>
</>
)}
  


  const [table, setTable] = useState([]);
  useEffect(() => {
  fetch('/index')
  .then(response => response.json())
  .then(data => setTable(data));
}, []);
const [collapsed, setCollapsed] = useState(true);
const {
  token: { colorBgContainer },
} = theme.useToken();

  return (   <Layout
    style={{
      minHeight: '100vh',
    }}
  >
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
        }} 
      />
      
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
    <Layout className="site-layout">

      <Content
        style={{
          margin: '0 16px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
         
        </Breadcrumb>
        <Space direction="vertical" style={{ width: '100%' }}>
   </Space>
   <Button onClick={() => {
    Add()}}>Add the Api Data</Button>
       <Button onClick={() => {
    Deleteall()}}>Delete all Data</Button>
   <Bouton ></Bouton>
    <Modal
          title="inserer"
          visible={isInserting}
          okText="Save"
          onCancel={() => {
            resetInsert();
          }}
          onOk={(e) => {
            onInsert (e)}}
        >   

          <output>FirstName :</output>
          <Input
            
            value={firstName}
            onChange={(e) => {
              setFirstname(e.target.value );
            }}
          />
          <output>lastName :</output>
          <Input
            
            value={lastName}
            onChange={(e) => {
              setLastname(e.target.value );
            }}
          />
          <output>email :</output>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value );
            }}
          />
          <output>contactNumber :</output>
          <Input
            
            value={contactNumber}
            onChange={(e) => {
              setConatactnumber(e.target.value );
            }}
          />
          <output>age :</output>
          <Input
            
            value={age}
            onChange={(e) => {
              setAge(e.target.value );
            }}
          />
          <output>date de naissance :</output>
          <Input
            
            value={dob}
            onChange={(e) => {
              setDob(e.target.value );
            }}
          />
          <output>salary :</output>
          <Input
            
            value={salary}
            onChange={(e) => {
              setSalary(e.target.value );
            }}
          />
          <output>address :</output>
          <Input
            
            value={address}
            onChange={(e) => {
              setAddress(e.target.value );
            }}
          /></Modal>
        <div><Input type='text' placeholder='recherche' onChange={(e) => setQuery(e.target.value)}></Input>
  <Table columns={columns} dataSource={Search(table)} onChange={onChange}     title={() => 'Table'}/></div>
      </Content>
      <Modal
          title="Editer"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setTable((pre) => {
              return pre.map((table) => {
                if (table.id === editingrow.id) {
                  return (
                    updateUser(editingrow)

                  )
                } else {
                  return table;
                }
              });
            });
            resetEditing();
          }}
        >
          <output>FirstName :</output>
          <Input
            
            value={editingrow?.firstName}
                  onChange={(e) =>{ 
                    setEditingrow((pre) => {
                      return { ...pre, firstName: e.target.value };
                    });
                  
                    setFirstname(e.target.value)}}
          />
          <output>lastName :</output>
          <Input
            value={editingrow?.lastName}
            onChange={(e) =>{ 
              setEditingrow((pre) => {
                return { ...pre, lastName: e.target.value };
              });
               setLastname(e.target.value)}}
          />      
          <output>email :</output>  
          <Input
            value={editingrow?.email}
            onChange={(e) =>
              { 
                setEditingrow((pre) => {
                  return { ...pre, email: e.target.value };
                }); setEmail(e.target.value)}}
          />
          <output>contactNumber :</output>
          <Input
            value={editingrow?.contactNumber}
            onChange={(e) =>
              { 
                setEditingrow((pre) => {
                  return { ...pre, contactNumber: e.target.value };
                }); setConatactnumber(e.target.value)}}
          />
          <output>age :</output>
          <Input
            value={editingrow?.age}
            onChange={(e) => 
              { 
                setEditingrow((pre) => {
                  return { ...pre, age: e.target.value };
                });setAge(e.target.value)}}

          />
          <output>date de naissance :</output>
          <Input
            value={editingrow?.dob}
            onChange={(e) =>
              { 
                setEditingrow((pre) => {
                  return { ...pre, dob: e.target.value };
                }); setDob(e.target.value)}}

          />
          <output>salary :</output>
          <Input
            value={editingrow?.salary}
            onChange={(e) =>
              { 
                setEditingrow((pre) => {
                  return { ...pre, salary: e.target.value };
                }); setSalary(e.target.value)}}

          />
          <output>address :</output>
          <Input
            value={editingrow?.address}
            onChange={(e) => 
              { 
                setEditingrow((pre) => {
                  return { ...pre, address: e.target.value };
                });setAddress(e.target.value)}}

          />
        </Modal>
    </Layout>
  </Layout>
  );
}

export default App;