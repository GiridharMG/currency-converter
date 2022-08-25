import React, { useLayoutEffect, useState, useRef, useReducer, createContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { apiKey, baseURL } from '../../const'
import Popup from '../Popup/Popup'

const reducer = (state, action) => {
    switch(action.type) {
        case "SET_RES":
            return {toValue: action.res}
        default: 
            return state
    }
}

export const AppContext = createContext(null)

export default function CurrencyConverter(props) {
    const [currencies, setCurrencies] = useState([])
    const from = useRef('')
    const to = useRef('')
    const fromValue = useRef(0)
    const [state, dispatch] = useReducer(reducer, {toValue: ''})
    const [showPopup, setShowPopup] = useState(false)
    const [message, setMessage] = useState('')

    useLayoutEffect(() => {
        fetch('https://openexchangerates.org/api/currencies.json').then(res => {
            res.text().then(result => {
                setCurrencies(Object.keys(JSON.parse(result)))
            })
        })
    }, [])
    const convert = () => {
        let myHeaders = new Headers();
        myHeaders.append('apikey', apiKey);
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        fetch(baseURL+'conver?to=' + to.current.value + '&from=' + from.current.value + '&amount=' + fromValue.current.value, requestOptions)
            .then(response => response.text())
            .catch(err => {
                setShowPopup(true)
                setMessage('Service not available\nPlease try again later')
            })
            .then(res => {
                if (!JSON.parse(res).result) {
                    setShowPopup(true)
                    setMessage('Service not available\nPlease try again later')
                }
                dispatch({type: 'SET_RES', res: JSON.parse(res).result})
            }).catch(err => {
                setShowPopup(true)
                setMessage('Service not available\nPlease try again later')
            })
    }

    return (
        <>
            <AppContext.Provider value={{showPopup, message, setMessage, setShowPopup}}>
                <Popup />
            </AppContext.Provider>
            {/* <Modal show={showPopup}>
                <Modal.Header closeButton onClick={() => {
                    setMessage('')
                    setShowPopup(false)
                }}>
                    <Modal.Title className='justify-content-center'>
                        <div>Error</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setMessage('')
                        setShowPopup(false)
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <div className='container ml-4 mr-4 pl-4 pr-4 mt-4'>
                <div className='container ml-4 mr-4 pl-4 pr-4 col-md-8'>
                    <nav className='nav navbar mt-4 pt-4'>
                        <h2>Currency Converter</h2>
                    </nav>
                    <div className='row mb-2'>
                        Select currencies to convert
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col col-md-2'>
                                    <div className='float-left mt-1'>From</div>
                                </div>
                                <div className='col'>
                                    <select className='form-select' ref={from}>
                                        <option>Select</option>
                                        {currencies.map((item, index) => {
                                            return (
                                                <option key={'from' + index} value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col col-md-1'>
                                    <div className='float-left mt-1'>To</div>
                                </div>
                                <div className='col'>
                                    <select className='form-select' ref={to}>
                                        <option>Select</option>
                                        {currencies.map((item, index) => {
                                            return (
                                                <option key={'to' + index} value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <input className='form-control col-md-6 mt-3' ref={fromValue}/>
                        </div>
                        <div className='col'>
                            <input className='form-control col-md-6 mt-3' readOnly={true} value={state.toValue} />
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <button className='btn btn-primary mt-3 col-md-6' onClick={convert}>Convert</button>
                    </div>
                </div>
            </div>
        </>
    )
}