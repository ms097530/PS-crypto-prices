import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'

// environment variables must be declared with REACT_APP_ prefix
const envApiKey = process.env.REACT_APP_COINAPI_KEY

export default function Price()
{
    // state to hold info from CoinAPI
    // null = loading
    // { error: ..., message: ...} = error state, something went wrong fetching data
    // { asset_id_base, asset_id_quote...} = fetch successful
    const [coin, setCoin] = useState(null)
    const { symbol } = useParams()
    console.log(envApiKey)

    // my key
    const apiKey = process.env.REACT_APP_COINAPI_KEY

    // * urls for endpoints
    // sandbox endpoints
    // const url = `http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`
    // const url = `https://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`
    // production endpoints
    const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`

    // fetch coin data on component mount and when url changes (shouldn't change for individual Price component)
    useEffect(() =>    
    {
        // function for retrieving coin data from API and updating state
        const getCoin = async () =>
        {
            try
            {
                const res = await axios.get(url)
                // console.log(res.data)
                setCoin(res.data)
            } catch (e)
            {
                console.log('ERROR MESSAGE:', e)
                setCoin({ error: true, message: e.message })
            }
        }

        getCoin()
    }, [url])

    // functions for rendering based on coin state
    const loaded = () =>
    {
        return (
            <div>
                <h1>{coin.asset_id_base}/{coin.asset_id_quote}</h1>
                <h2>{coin.rate}</h2>
            </div>
        )
    }

    const loading = () =>
    {
        return <h1>Loading...</h1>
    }

    const error = () =>
    {
        return <h1>Unable to retrieve information</h1>
    }

    // console.log(symbol)
    // console.log(apiKey)

    // coin request not finished -> loading()
    // error fetching coin data -> error()
    // coin data loaded successfully -> loaded()
    return !coin ? loading() : coin.error ? error() : loaded()
}
