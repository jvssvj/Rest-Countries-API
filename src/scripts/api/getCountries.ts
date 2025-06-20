import { setAllCountries } from "../state/globalData"

export async function getCountries(endpoint = 'all') {
    const hasFields = endpoint === 'all'
    const baseUrl = `https://restcountries.com/v3.1/${endpoint}`
    const mainFields = 'flags,name,population,region,capital,cca3'

    const url = hasFields ? `${baseUrl}?fields=${mainFields}` : baseUrl

    const $message = document.querySelector('#message') as HTMLSpanElement

    try {
        const resp = await fetch(url, {
            method: 'GET'
        })

        if (!resp.ok) {
            throw new Error('No results found.')
        }
        $message.textContent = ''
        const data = await resp.json()
        if (endpoint === 'all') {
            setAllCountries(data)
        }

        return data

    } catch (err) {
        console.log(err)
        $message.textContent = err.message
    }
}