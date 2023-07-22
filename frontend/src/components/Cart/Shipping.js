import React, {useState } from 'react'
import { Button,  FormControl,  Input, InputGroup, InputLeftElement,  Select,  chakra} from '@chakra-ui/react'
import {useDispatch , useSelector} from 'react-redux';
import {ToastContainer ,toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import ship from "../../images/shipping.png"
import { SlHome,SlPin,SlPhone,SlGlobe } from "react-icons/sl";
import "./Shipping.css";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from '../../actions/cartActions';
import Steper from './Stepper';

const Shipping = () => {

    const CGlobe = chakra(SlGlobe);
    const CHome = chakra(SlHome);
    const CPin = chakra(SlPin);
    const CPhone = chakra(SlPhone);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state=>state.user)
    const {shippingInfo} = useSelector(state=>state.cart)

    const [address,setAddress] = useState(shippingInfo.address);
    const [city,setCity] = useState(shippingInfo.city);
    const [state,setState] = useState(shippingInfo.state);
    const [country , setCountry] = useState(shippingInfo.country);
    const [pinCode , setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo , setPhoneNo] = useState(shippingInfo.phoneNo);


      
      
        const shippingSubmit = async (e)=>{
          e.preventDefault();
          if(phoneNo.length<10 || phoneNo.length>10){
            return toast.error("PhoneNo must be of 10 digits", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          }
         
          if(address.length ===0 || city.length ===0 || pinCode.length ===0 || state.length ===0 || country.length ===0){
            return toast.error("Please Fill in complete details", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })

          }

      dispatch(saveShippingInfo({address,pinCode,phoneNo,city,state,country}));
      navigate("/order/confirm")
          
        }
      
  return (
    
        <>
       <Steper step={1}/>
        <MetaData title={`${user.name}'s Shipping`}/>
        <div className='shippingContainer'>
        <div>
            <h1 className='sheading'>Shipping Details</h1>
            <img src={ship} alt='User'/>
        </div>
        <div>
        <form>
        <div>

        
            <div>
                <h4>Address</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CHome color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input  type="text"
                                     placeholder="Address"
                                     required
                                     value={address}
                                     onChange={(e) => setAddress(e.target.value)} />
                        </InputGroup>
                    </FormControl>
            </div>
            <div>
                <h4>PinCode</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CPin color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input type="number"
                                    placeholder="Pin Code"
                                    required
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)} />
                        </InputGroup>
                    </FormControl>
            </div>
            </div>

            <div>
            <div>
                <h4>Phone No.</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CPhone color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input  type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)} />
                        </InputGroup>
                    </FormControl>
            </div>
            <div>
                <h4>City</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CGlobe color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input  type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)} />
                        </InputGroup>
                    </FormControl>
            </div>
            </div>

            <div>
            <div>
                <h4>Country</h4>
                <FormControl>
                       
                            <Select value={country} name='phoneNo' type='text' required onChange={(e)=>setCountry(e.target.value)}>
                            <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                            </Select>
                    </FormControl>
            </div>

           {country && (
            <div>
                <h4>State</h4>
                <FormControl>

                            <Select value={state} name='phoneNo' type='text' required onChange={(e)=>setState(e.target.value)}>
                            <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                            </Select>
                    </FormControl>
            </div>
           )} 
            </div>
                    <Button
                        className='button'
                         borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="orange"
                        width={['50','md']}
                        onClick={shippingSubmit}
                        ml={['0','30px']}
                     >
                       Continue
                    </Button>
                    </form>
        </div>
        
        </div>
        <ToastContainer/>
        
        </>
        
  )
}

export default Shipping;


