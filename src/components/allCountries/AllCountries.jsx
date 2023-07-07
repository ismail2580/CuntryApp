import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../util/api';
import Search from '../search/Search';
import FilterCountry from '../filterCountry/FilterCountry';
import { Link } from 'react-router-dom';

function AllCountries() {
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const getAllCountries = async () => {
        try {
            const res = await fetch(`${baseUrl}/all`)
            if (!res.ok) throw new Error("something went wrong")
            const data = await res.json()
            console.log(data);
            setCountries(data)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }
    const getCountryByName = async (countryName) => {
        try {
            const res = await fetch(`${baseUrl}/name/${countryName}`)
            if (!res.ok) throw new Error("Not Found any Country!")
            const data = await res.json()
            setCountries(data)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }
    const gerCountryByRegion = async (regionName) => {
        try {
            const res = await fetch(`${baseUrl}/region/${regionName}`)
            if (!res.ok) throw new Error("Region Not Found....")
            const data = await res.json();
            setCountries(data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            setError(error.message)
        }
    }
    useEffect(() => {
        getAllCountries()
    }, [])
    return (
        <div className='all_country_wrapper'>
            <div className="country_top">
                <div className="search">
                    <Search onSearch={getCountryByName} />
                </div>
                <div className="filter">
                    <FilterCountry onSelect={gerCountryByRegion} />
                </div>
            </div>
            <div className="country_buttom">
                {isLoading && !error && <h4>loading....</h4>}
                {!isLoading && error && <h4>{error}</h4>}

                {
                    countries?.map((country, index) => (
                        <Link to={`/country/${country.name.common}`}>
                            <div className="country_card" key={index}>
                                <div className="country_img">
                                    <img src={country.flags.png} alt="flags" />
                                </div>
                                <div className="country_data">
                                    <h3>{country.name.common}</h3>
                                    <h6>Population: {country.population}</h6>
                                    <h6>Region: {country.region}</h6>
                                    <h6>Capital: {country.capital}</h6>

                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default AllCountries;