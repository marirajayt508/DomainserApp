import React,{useState,useEffect} from 'react';
import { Checkbox, Radio, message, Input, Button } from "antd";
import axios from 'axios';
import { api } from '../util';

export default function DynamicTemplate ()
{
    const [data,setData] = useState(null)

    useEffect(() => {
      fetchData();
    }, []);

    let setup = [
        {
            appLabel : "CUSTOM INPUT",
            appKey : "custom_input"
        },
        {
            appLabel : "COUNTRY SORTING",
            appKey : "country_sorting"
        }
    ]

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

      const getItems = ({appLabel,appKey}) => {
if(data)
{
    return <>
    <div>
    <p>{appLabel}</p>
    {data.payment.deposit.map((items,h)=>{
       return items[appKey].map((inputs,i)=>{
            return <div  key={i}>
                {appKey.toLowerCase().includes(setup[0].appKey) ?
            getInput(inputs)
            :
            sortCountry(inputs,h,i)    
            }
            </div>
        })
})}
</div>
    </>
}
      };

//ONLY INPUT, OPTIONS, CHECK TYPE WILL WORKS

const getInput = (input)=>{
   return <>
   {
    input.type.toLowerCase().includes('options') && <div>
     <Radio></Radio>
    <label>{input.label}</label>
    </div>
   }
   {
    input.type.toLowerCase().includes('text') && <div>
        <label>{input.label}</label><br/>
        <Input style={{width : '20%'}}/>
    </div>
   }
   {
    input.type.toLowerCase().includes('check') && <div>
        <Checkbox>{input.label}</Checkbox>
    </div>
   }
   </>;
}

const sortCountry = (obj,h,i)=>{
    return <Checkbox onChange={(e)=>{changeAction(e,h,i)}} defaultChecked={obj.action}>{obj.country}</Checkbox>;
}

const changeAction = (v,h,i)=>{
 data.payment.deposit[h].country_sorting[i].action=v.target.checked
 setData(data)
}

const show = ()=>{
    console.log(data)
}
    return <>
{setup.map((setup_obj,i)=>{
    return <div key={i}>
        { getItems(setup_obj)}
    </div>
})}
<br/>
        <Button onClick={()=>show()} type="primary" danger>
            Click to View Object In Console
        </Button>
    </>
}