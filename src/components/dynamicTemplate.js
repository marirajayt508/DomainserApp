import React,{useState,useEffect} from 'react';
import { Switch, message, Input, Table } from "antd";
import axios from 'axios';
import { api } from '../util';

export default function DynamicTemplate ()
{
    const [data,setData] = useState(null)

    useEffect(() => {
      fetchData();
    }, []);


    const fetchData = async () => {
        message.loading("Loading...")
        try {
          const response = await axios.get(api);
          setData(response.data);
        } catch (error) {
         message.error("Network Error !");
        } finally {
            message.destroy()
        }
      };

      const getItems = () => {
        const item = [{
            label: "Doposit",
            code: 'deposit'
        },
        {
            label: "Withdrawl",
            code: 'withdrawl'
        }
    ]
    return <>
    <div>
      {
        item.map((v)=>{
            return sortCountry(v)    
            })
      }
</div>
    </>
}


//ONLY INPUT, OPTIONS, CHECK TYPE WILL WORKS

const  columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render : (text,i)=>{
        console.log(text)
        return <Input defaultValue={text} style={{width : '20%'}}/>     
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render : (text,i,h,s)=>{
        console.log(text,i,h,s)
        return <Switch defaultChecked={text} />
      }
    },]


const sortCountry = (i)=>{
    
    return<>
    <p>{i.label}</p>
    <Table columns={columns} dataSource={data?.payment[i.code][0].country_sorting} code={i.code} />
    </> 
}
    return <>
        { getItems()}
    </>
}