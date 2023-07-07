import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../util/api';
import { Link } from 'react-router-dom';

function CountryInfo() {
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { countryName } = useParams();

    // const borders = country.map((country) => country.borders);

    useEffect(() => {
        const getCountryByName = async () => {
            try {
                const res = await fetch(`${baseUrl}/name/${countryName}`);

                if (!res.ok) throw new Error("Could not found!");

                const data = await res.json();

                setCountry(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        getCountryByName();
    }, [countryName]);
    return (
        <div className="country_info_wrapper">
            <button><Link to={'/'}>Go Back </Link></button>

            {country?.map((country, index) => (
                <div className="country__info__container" key={index}>
                    <div className="country__info-img">
                        <img src={country.flags.png} alt="" />
                    </div>
                    {isLoading && !error && <h4>loading....</h4>}
                    {!isLoading && error && <h4>{error}</h4>}
                    <div className="country__info">
                        <h3>{country.name.common}</h3>

                        <div className="country__info-left">
                            <h5>
                                Population:{" "}
                                <span>
                                    {new Intl.NumberFormat().format(country.population)}
                                </span>
                            </h5>
                            <h5>
                                Region: <span>{country.region}</span>
                            </h5>
                            <h5>
                                Sub Region: <span>{country.subregion}</span>
                            </h5>
                            <h5>
                                Capital: <span>{country.capital}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default CountryInfo;