
import { Table ,Avatar} from 'antd';
import React, { useState, useEffect ,useCallback }from 'react';
import { Space , Input } from 'antd';
import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme , Button , Modal} from 'antd';
import { DeleteOutlined , EditOutlined} from '@ant-design/icons'
//import Ajout from './Ajout';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];


function App() {  
  const[query,setQuery] = useState("");

  const [isEditing,setIsEditing]= useState(false);
  const [editingrow,setEditingrow]=useState(null);
  const[isInserting,setIsInserting]=useState(false);
  const [newrow,setNewrow]=useState(null);

  const onInsert = (record)=>{
    setIsInserting(true);
    setNewrow({...record});
  }
  const resetInsert = () => {
    setIsInserting(false);
    setNewrow(null);
  };
  const onEditrow =(record)=>{
    setIsEditing(true);
    setEditingrow({...record})
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingrow(null);
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
      sorter: ((a, b) => (a.firstName > b.firstName ? 1 : -1)),
      width: '20%',


    },
    
   {   
    title: 'LastName',
    dataIndex: 'lastName',
    sorter: ((a, b) => (a.lastName > b.lastName ? 1 : -1)),
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

  
 
  const handleDelete =(record)=>{
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
  
  const Bouton = (record) =>{

    const [ip,setIsper]=useState(null)
    return(
      <>
  <Button type="primary"  onClick={() => {
    onInsert (record)}} block >
Ajouter
</Button>
</>
)}
  


  const [table, setTable] = useState([]);
  useEffect(() => {
  fetch('https://hub.dummyapis.com/employee?noofRecords=100&idStarts=1')
  .then(response => response.json())
  .then(data => setTable(data));
}, []);
const [collapsed, setCollapsed] = useState(true);
const {
  token: { colorBgContainer },
} = theme.useToken();

  return (    <Layout
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
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      />
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
   <Bouton ></Bouton>
    <Modal
          title="inserer"
          visible={isInserting}
          okText="Save"
          onCancel={() => {
            resetInsert();
          }}
          onOk={() => {
            setTable((pre) => {
              const net=[newrow,...table] ;
              return(
               net             
              )
            });
            resetInsert();

          }}
        >
          <output>FirstName :</output>
          <Input
            
            value={newrow?.firstName}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
          />
          <output>lastName :</output>
          <Input
            
            value={newrow?.lastName}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, lastName: e.target.value };
              });
            }}
          />
          <output>email :</output>
          <Input
            
            value={newrow?.email}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <output>contactNumber :</output>
          <Input
            
            value={newrow?.contactNumber}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, contactNumber: e.target.value };
              });
            }}
          />
          <output>age :</output>
          <Input
            
            value={newrow?.age}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, age: e.target.value };
              });
            }}
          />
          <output>date de naissance :</output>
          <Input
            
            value={newrow?.dob}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, dob: e.target.value };
              });
            }}
          />
          <output>salary :</output>
          <Input
            
            value={newrow?.salary}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, salary: e.target.value };
              });
            }}
          />
          <output>address :</output>
          <Input
            
            value={newrow?.address}
            onChange={(e) => {
              setNewrow((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          /></Modal>
        <div><Input type='text' placeholder='recherche' onChange={(e) => setQuery(e.target.value)}></Input>
  <Table columns={columns} dataSource={Search(table)} onChange={onChange}  bordered      title={() => 'Table'}/></div>
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
                  return editingrow; 
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
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
          />
          <output>lastName :</output>
          <Input
            value={editingrow?.lastName}
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, lastName: e.target.value };
              });
            }}
          />      
          <output>email :</output>  
          <Input
            value={editingrow?.email}
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <output>contactNumber :</output>
          <Input
            value={editingrow?.contactNumber}
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, contactNumber: e.target.value };
              });
            }}
          />
          <output>age :</output>
          <Input
            value={editingrow?.age}
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, age: e.target.value };
              });
            }}
          />
          <output>date de naissance :</output>
          <Input
            value={editingrow?.dob}
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, dob: e.target.value };
              });
            }}
          />
          <output>salary :</output>
          <Input
            value={editingrow?.salary}
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, salary: e.target.value };
              });
            }}
          />
          <output>address :</output>
          <Input
            value={editingrow?.address}
            onChange={(e) => {
              setEditingrow((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
    </Layout>
  </Layout>
  );
}

export default App;