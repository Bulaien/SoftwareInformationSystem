import React, { useState, useEffect } from 'react';


const Data = () => {
    const [dates, setDates] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [outputData, setOutputData] = useState([]);
    const [number, setNumber] = useState(5)
    const [newsLines, setNewsLines] = useState([])
    const apikey = process.env.REACT_APP_API_KEY


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://endoflife.date/api/all.json`);
                const data = await response.json();
                setDates(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const News = () => {
        return (
         newsLines?   newsLines.map((newsline, index) => {


                {

                    return (index < 6 ? <div className='newsi'>

                            <a href={newsline.url}>

                                <h2 className='news'> {newsline.title}</h2>

                                <p className='date'>{newsline.publishedAt.toLocaleString('de-DE')}</p>

                                <p className='news'>{newsline.description}</p></a>

                        </div> : null

                    )

                }

                return null;

            }):null

        )
    }

    const Output = () => {
        return (
            <table>
                <thead>
                <tr>
                    <th>Version</th>
                    <th>Release-Datum</th>
                    <th>LTS</th>
                    <th>Support</th>
                    <th>EOL</th>
                </tr>
                </thead>


                {outputData.map((data, index) => {

                    return (
                        (index < number) ?
                            <tr key={index}>
                                <td>{data.cycle}</td>
                                <td>{data.releaseDate}</td>
                                <td>{data.lts ? 'LTS' : ''}</td>
                                <td>{data.support}</td>
                                <td>{data.eol}</td>
                            </tr> : null
                    )
                })}

            </table>
        )
    }
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleButtonClick = async (e) => {
        if (!selectedValue) return
        setNumber(Number(e.target.dataset.value));

        // console.log(e.target.id, number)
        try {
            const response = await fetch(`https://endoflife.date/api/${selectedValue}.json`);
            const data = await response.json();
            setOutputData(data);
            const wireNews = await fetch(`https://newsapi.org/v2/everything?q=${selectedValue}' new version'&language=en&apiKey=${apikey}`);
            const data2 = await wireNews.json();
            setNewsLines(data2.articles);
            console.log(data2)


        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    };


    return (
        <>

            <div className="ausgabe">

                <div className="selector">
                    <h1 className='relatedH1'>Software</h1>
                    <select id="progs" onChange={handleSelectChange}>
                        <option selected={true} disabled={true}>-- Software wählen --</option>
                        {dates.map(date => (
                            <option key={date} value={date}>{date}</option>

                        ))}
                    </select>
                    <span className='buttons'>
                        <button id="btn1" data-value='5' onClick={handleButtonClick}>Alle Daten abrufen</button>
                        <button id="btn2" data-value='1' onClick={handleButtonClick}>Letzte Version abrufen</button>
                    </span>

                    <div id="output">
                        <Output />
                    </div>
                </div>
                <div id="news">
                    <h1 className='relatedH1'>Related Articles</h1>
                    <News />
                </div>
            </div>

        </>
    );
};

export default Data;