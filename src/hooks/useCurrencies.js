import { useLayoutEffect, useState } from "react"

export default function useCurrencies() {
    const [currencies, setCurrencies] = useState([])

    useLayoutEffect(() => {
        fetch('https://openexchangerates.org/api/currencies.json').then(res => {
            res.text().then(result => {
                setCurrencies(Object.keys(JSON.parse(result)))
            })
        })
    }, [])
    
    return currencies
}